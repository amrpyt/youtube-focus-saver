/**
 * Content Script for YouTube Focus Saver
 * 
 * This script runs on YouTube pages and extracts video information.
 * It detects when users are watching a video and automatically
 * saves the video data for later viewing.
 */

import { YouTubeService } from '../services/youtube';
import { authService } from '../services/auth';
import { DatabaseService } from '../services/database';

// Initialize services
const youtubeService = new YouTubeService();
const dbService = new DatabaseService();

// Track processed videos to avoid duplicates
const processedVideos = new Set<string>();
// Track watch sessions
let currentWatchSession: { id: number | null, videoId: string, startTime: number } | null = null;
// Track focus metrics
let focusMetrics = {
  tabSwitches: 0,
  pauses: 0,
  rewinds: 0
};

/**
 * Save video data to extension storage and Supabase
 */
async function saveVideoData(data: any) {
  try {
    // Generate a unique identifier for the video
    const id = data.videoId;
    
    // Create the video object to save
    const videoToSave = {
      videoId: data.videoId,
      title: data.metadata?.title || 'Unknown Title',
      url: data.url,
      thumbnailUrl: data.metadata?.thumbnails?.medium?.url || '',
      channelName: data.metadata?.channelTitle || 'Unknown Channel',
      description: data.metadata?.description || '',
      transcript: JSON.stringify(data.transcript || []),
      dateAdded: Date.now(),
      status: 'saved'
    };

    // Save to Chrome storage regardless of login status
    // This ensures videos are saved even if user isn't logged in yet
    chrome.storage.local.get('youtubeFocusSaver:videos', (result) => {
      const videos = result['youtubeFocusSaver:videos'] || [];
      
      // Check if video already exists
      const existingIndex = videos.findIndex((v: any) => v.videoId === id);
      
      if (existingIndex >= 0) {
        // Update existing video
        videos[existingIndex] = {
          ...videos[existingIndex],
          ...videoToSave,
          dateAdded: videos[existingIndex].dateAdded, // Preserve original date
        };
      } else {
        // Add new video
        videos.push(videoToSave);
      }
      
      // Save back to storage
      chrome.storage.local.set({ 'youtubeFocusSaver:videos': videos }, () => {
        console.log('Video saved to local storage:', videoToSave.title);
      });
    });

    // If user is logged in, save to Supabase
    const currentUser = await ensureAuth();
    if (currentUser) {
      const supabaseVideoData = {
        user_id: currentUser.id,
        video_id: data.videoId,
        title: data.metadata?.title || 'Unknown Title',
        description: data.metadata?.description || '',
        thumbnail_url: data.metadata?.thumbnails?.medium?.url || '',
        channel_name: data.metadata?.channelTitle || 'Unknown Channel',
        duration: data.metadata?.duration || 0,
        transcript: JSON.stringify(data.transcript || [])
      };

      const savedVideo = await dbService.saveVideo(supabaseVideoData, currentUser.id);
      if (savedVideo) {
        console.log('Video saved to Supabase:', savedVideo.title);
        showSavedNotification(videoToSave.title);
        
        // Start tracking watch session
        startWatchSession(data.videoId);
      }
    }
  } catch (error) {
    console.error('Error saving video data:', error);
  }
}

/**
 * Start tracking a watch session for this video
 */
async function startWatchSession(videoId: string) {
  const currentUser = await ensureAuth();
  if (!currentUser) return;

  // If already watching this video, don't create a new session
  if (currentWatchSession && currentWatchSession.videoId === videoId) return;

  // End any existing session
  if (currentWatchSession) {
    await endWatchSession();
  }

  // Start new session
  const sessionId = await dbService.startWatchSession(currentUser.id, videoId);
  if (sessionId) {
    currentWatchSession = {
      id: sessionId,
      videoId,
      startTime: Date.now()
    };
    
    // Reset focus metrics for new session
    resetFocusMetrics();
    
    // Setup focus tracking
    setupFocusTracking();
  }
}

/**
 * End the current watch session
 */
async function endWatchSession() {
  if (!currentWatchSession || !currentWatchSession.id) return;
  
  const durationWatched = Math.floor((Date.now() - currentWatchSession.startTime) / 1000);
  await dbService.endWatchSession(currentWatchSession.id, durationWatched);
  
  // Record focus metrics
  await recordFocusMetrics();
  
  currentWatchSession = null;
}

/**
 * Reset focus metrics for a new session
 */
function resetFocusMetrics() {
  focusMetrics = {
    tabSwitches: 0,
    pauses: 0,
    rewinds: 0
  };
}

/**
 * Setup focus tracking events
 */
function setupFocusTracking() {
  // Track tab visibility changes
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Track video player events
  const videoElement = document.querySelector('video');
  if (videoElement) {
    videoElement.addEventListener('pause', () => { focusMetrics.pauses++; });
    videoElement.addEventListener('seeking', handleVideoSeeking);
  }
}

/**
 * Handle visibility change events (tab switching)
 */
function handleVisibilityChange() {
  if (document.hidden) {
    focusMetrics.tabSwitches++;
  }
}

/**
 * Handle video seeking events (to detect rewinds)
 */
function handleVideoSeeking(e: Event) {
  const video = e.target as HTMLVideoElement;
  const currentTime = video.currentTime;
  const previousTime = video.dataset.previousTime ? parseFloat(video.dataset.previousTime) : 0;
  
  // If seeking backwards by more than 2 seconds, count as a rewind
  if (previousTime > 0 && currentTime < previousTime - 2) {
    focusMetrics.rewinds++;
  }
  
  // Update previous time
  video.dataset.previousTime = currentTime.toString();
}

/**
 * Record focus metrics for the session
 */
async function recordFocusMetrics() {
  if (!currentWatchSession || !currentWatchSession.id) return;
  
  const currentUser = await ensureAuth();
  if (!currentUser) return;
  
  // Calculate focus score (simple algorithm - can be improved)
  // Lower tab switches and pauses = higher focus score
  let focusScore = 1.0;  
  focusScore -= Math.min(0.5, focusMetrics.tabSwitches * 0.05); // Lose up to 0.5 for tab switches
  focusScore -= Math.min(0.3, focusMetrics.pauses * 0.05);      // Lose up to 0.3 for pauses
  
  // Rewinds can be good (reviewing content) or bad (distraction)
  // Currently treating as neutral, can be refined with more data
  
  // Ensure score is between 0 and 1
  focusScore = Math.max(0, Math.min(1, focusScore));
  
  const metricsData = {
    user_id: currentUser.id,
    video_id: currentWatchSession.videoId,
    session_id: currentWatchSession.id,
    focus_score: focusScore,
    tab_switches: focusMetrics.tabSwitches,
    pauses: focusMetrics.pauses,
    rewinds: focusMetrics.rewinds
  };
  
  await dbService.recordFocusMetrics(metricsData);
  console.log('Focus metrics recorded:', metricsData);
}

/**
 * Ensure user is authenticated or prompt for login
 */
async function ensureAuth() {
  // Check if already authenticated
  let currentUser = authService.getCurrentUser();
  
  if (!currentUser) {
    // Try to refresh session
    currentUser = await authService.refreshSession();
  }
  
  if (!currentUser) {
    // If still not authenticated, prompt to login via popup
    chrome.runtime.sendMessage({
      action: 'promptLogin',
      source: 'content',
      data: { returnUrl: window.location.href }
    });
    return null;
  }
  
  return currentUser;
}

/**
 * Show a subtle notification that a video was saved
 */
function showSavedNotification(title: string) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'youtube-focus-saver-notification';
  notification.textContent = `Saved: ${title}`;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '4px',
    zIndex: '9999',
    fontSize: '14px',
    maxWidth: '300px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.3s ease-in-out',
    opacity: '0'
  });
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 10);
  
  // Remove after a few seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300); // Wait for fade out animation
  }, 3000);
}

/**
 * Process the current YouTube video
 */
async function processCurrentVideo() {
  // Check if we're on a YouTube watch page
  if (!window.location.href.includes('youtube.com/watch')) {
    // If we leave a watch page, end the current session
    if (currentWatchSession) {
      await endWatchSession();
    }
    return;
  }
  
  const url = window.location.href;
  const videoId = youtubeService.extractVideoId(url);
  
  if (!videoId) {
    console.error('Could not extract video ID from URL:', url);
    return;
  }
  
  // If we changed videos, end the previous session
  if (currentWatchSession && currentWatchSession.videoId !== videoId) {
    await endWatchSession();
  }
  
  // Skip full processing if already processed, but still track session
  if (processedVideos.has(videoId)) {
    // If user is logged in, start watch session for this video
    const currentUser = await ensureAuth();
    if (currentUser && (!currentWatchSession || currentWatchSession.videoId !== videoId)) {
      await startWatchSession(videoId);
    }
    return;
  }
  
  // Mark as processed to avoid duplicates
  processedVideos.add(videoId);
  
  console.log('Processing YouTube video:', videoId);
  
  try {
    // Get video metadata and transcript
    const videoData = await youtubeService.getCompleteVideoData(url);
    
    // Save the video data
    if (videoData && videoData.metadata) {
      await saveVideoData(videoData);
    }
  } catch (error) {
    console.error('Error processing video:', error);
  }
}

/**
 * Main initialization function
 */
function init() {
  console.log('YouTube Focus Saver content script initialized');
  
  // Process the initial video (if on a watch page)
  processCurrentVideo();
  
  // Setup listener for URL changes (YouTube is a SPA)
  let lastUrl = location.href;
  
  // Create a new observer for URL changes
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      
      // URL changed, check if it's a video
      setTimeout(() => {
        processCurrentVideo();
      }, 1000); // Small delay to ensure page is loaded
    }
  });
  
  // Start observing
  observer.observe(document, { subtree: true, childList: true });
  
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'extractVideoData') {
      processCurrentVideo().then(() => {
        sendResponse({ success: true });
      }).catch(error => {
        sendResponse({ success: false, error: error.message });
      });
      return true; // Indicates async response
    }
    
    // Handle auth state changes from popup
    if (message.type === 'AUTH_STATE_CHANGE') {
      if (message.payload) {
        // User logged in, try to process current video for logged-in user
        processCurrentVideo();
      } else {
        // User logged out, end current session
        if (currentWatchSession) {
          endWatchSession();
        }
      }
    }
  });
  
  // Handle page unload to end session
  window.addEventListener('beforeunload', () => {
    if (currentWatchSession) {
      endWatchSession();
    }
  });
}

// Initialize when the page is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
