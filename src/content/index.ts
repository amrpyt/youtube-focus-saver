/**
 * Content Script for YouTube Focus Saver
 * 
 * This script runs on YouTube pages and extracts video information.
 * It detects when users are watching a video and automatically
 * saves the video data for later viewing.
 */

import { YouTubeService } from '../services/youtube';

// Initialize YouTube service
const youtubeService = new YouTubeService();

// Track processed videos to avoid duplicates
const processedVideos = new Set<string>();

/**
 * Save video data to extension storage
 */
async function saveVideoData(data: any) {
  try {
    // Generate a unique identifier for the video
    const id = data.videoId;
    
    // Create the video object to save
    const videoToSave = {
      id,
      videoId: data.videoId,
      title: data.metadata?.title || 'Unknown Title',
      url: data.url,
      thumbnailUrl: data.metadata?.thumbnails?.medium?.url || '',
      channelName: data.metadata?.channelTitle || 'Unknown Channel',
      description: data.metadata?.description || '',
      transcript: data.transcript || [],
      summary: '',  // Will be populated later by Gemini API if enabled
      dateAdded: Date.now(),
      status: 'saved'
    };

    // Save to Chrome storage
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
        console.log('Video saved successfully:', videoToSave.title);
        
        // Show subtle notification if enabled
        showSavedNotification(videoToSave.title);
        
        // Send message to background script for potential syncing
        chrome.runtime.sendMessage({
          action: 'videoSaved',
          video: videoToSave
        });
      });
    });
  } catch (error) {
    console.error('Error saving video data:', error);
  }
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
    return;
  }
  
  const url = window.location.href;
  const videoId = youtubeService.extractVideoId(url);
  
  if (!videoId) {
    console.error('Could not extract video ID from URL:', url);
    return;
  }
  
  // Skip if already processed
  if (processedVideos.has(videoId)) {
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
      saveVideoData(videoData);
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
  });
}

// Initialize when the page is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
