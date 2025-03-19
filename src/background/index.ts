/**
 * Background Script for YouTube Focus Saver
 * 
 * This script runs in the background and:
 * 1. Listens for tab updates to detect YouTube video pages
 * 2. Handles syncing with Supabase if enabled
 * 3. Manages API requests to Gemini for summaries
 */

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab is a YouTube video page
  if (
    changeInfo.status === 'complete' &&
    tab.url &&
    tab.url.includes('youtube.com/watch')
  ) {
    // Send message to content script to extract video data
    chrome.tabs.sendMessage(tabId, { action: 'extractVideoData' });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'videoSaved') {
    // A video was saved, check if we need to sync or generate summary
    handleNewVideo(message.video);
  }
  return true; // Keep the message channel open for async responses
});

/**
 * Handle a newly saved video
 */
async function handleNewVideo(video: any) {
  try {
    // Get user settings
    const settings = await getUserSettings();
    
    // Check if Supabase sync is enabled
    if (settings.cloudSyncEnabled) {
      syncVideoToSupabase(video);
    }
    
    // Check if AI summaries are enabled
    if (settings.generateSummaries && video.transcript && video.transcript.length > 0) {
      generateVideoSummary(video);
    }
  } catch (error) {
    console.error('Error handling new video:', error);
  }
}

/**
 * Get user settings from storage
 */
async function getUserSettings(): Promise<any> {
  return new Promise((resolve) => {
    chrome.storage.local.get('youtubeFocusSaver:settings', (result) => {
      const defaultSettings = {
        cloudSyncEnabled: false,
        autoSaveVideos: true,
        darkMode: 'system',
        generateSummaries: false,
        apiKeys: {},
        notifications: {
          enabled: true,
          frequency: 'always'
        }
      };
      
      const settings = result['youtubeFocusSaver:settings'] || defaultSettings;
      resolve(settings);
    });
  });
}

/**
 * Sync a video to Supabase if integration is enabled
 */
async function syncVideoToSupabase(video: any) {
  try {
    // This would be implemented when Supabase integration is added
    console.log('Syncing video to Supabase:', video.id);
    
    // Update sync status in local storage
    updateVideoSyncStatus(video.id, 'synced');
  } catch (error) {
    console.error('Error syncing to Supabase:', error);
    updateVideoSyncStatus(video.id, 'failed');
  }
}

/**
 * Update the sync status of a video
 */
function updateVideoSyncStatus(videoId: string, status: 'synced' | 'pending' | 'failed') {
  chrome.storage.local.get('youtubeFocusSaver:videos', (result) => {
    const videos = result['youtubeFocusSaver:videos'] || [];
    const videoIndex = videos.findIndex((v: any) => v.id === videoId);
    
    if (videoIndex >= 0) {
      videos[videoIndex].syncStatus = status;
      chrome.storage.local.set({ 'youtubeFocusSaver:videos': videos });
    }
  });
}

/**
 * Generate an AI summary of the video using Gemini API
 */
async function generateVideoSummary(video: any) {
  try {
    // Get API key for Gemini
    const settings = await getUserSettings();
    const apiKey = settings.apiKeys.gemini;
    
    if (!apiKey) {
      console.warn('Gemini API key not configured. Skipping summary generation.');
      return;
    }
    
    // This would call the Gemini API to generate a summary
    console.log('Generating summary for video:', video.id);
    
    // For now, let's just update with a placeholder
    const summary = 'AI summary will be generated here when Gemini API is integrated.';
    
    // Update video with summary
    updateVideoWithSummary(video.id, summary);
  } catch (error) {
    console.error('Error generating summary:', error);
  }
}

/**
 * Update a video with its AI-generated summary
 */
function updateVideoWithSummary(videoId: string, summary: string) {
  chrome.storage.local.get('youtubeFocusSaver:videos', (result) => {
    const videos = result['youtubeFocusSaver:videos'] || [];
    const videoIndex = videos.findIndex((v: any) => v.id === videoId);
    
    if (videoIndex >= 0) {
      videos[videoIndex].summary = summary;
      chrome.storage.local.set({ 'youtubeFocusSaver:videos': videos });
    }
  });
}

// Initialize extension when installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // First-time installation
    const defaultSettings = {
      cloudSyncEnabled: false,
      autoSaveVideos: true,
      darkMode: 'system',
      generateSummaries: false,
      apiKeys: {},
      notifications: {
        enabled: true,
        frequency: 'always'
      }
    };
    
    // Save default settings
    chrome.storage.local.set({ 'youtubeFocusSaver:settings': defaultSettings });
    
    // Initialize videos array
    chrome.storage.local.set({ 'youtubeFocusSaver:videos': [] });
    
    // Log installation
    console.log('YouTube Focus Saver installed successfully!');
  } else if (details.reason === 'update') {
    // Extension was updated
    console.log('YouTube Focus Saver updated successfully!');
  }
});
