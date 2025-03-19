/**
 * YouTube Service
 * 
 * A hybrid service that combines:
 * 1. Official YouTube Data API v3 for metadata
 * 2. Transcript extraction for captions
 */

import { VideoMetadata, TranscriptItem, YouTubeServiceConfig, VideoData } from '../types';

// Types for video data
export interface VideoMetadata {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  tags?: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage?: string;
  duration?: string;
  viewCount?: string;
  likeCount?: string;
}

export interface TranscriptItem {
  text: string;
  start: number; // Start time in seconds
  duration: number; // Duration in seconds
}

export type Transcript = TranscriptItem[];

export interface YouTubeServiceConfig {
  apiKey?: string; // Optional: Only needed for Data API features
}

export class YouTubeService {
  private config: YouTubeServiceConfig;

  constructor(config: YouTubeServiceConfig = {}) {
    this.config = config;
  }

  /**
   * Extract YouTube video ID from URL
   */
  public extractVideoId(url: string): string | null {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  }

  /**
   * Get complete video data including metadata and transcript
   */
  public async getCompleteVideoData(url: string): Promise<VideoData> {
    const videoId = this.extractVideoId(url);
    
    if (!videoId) {
      throw new Error("Could not extract video ID from URL");
    }
    
    // Create result object
    const result: VideoData = {
      videoId,
      url
    };
    
    try {
      // Try to get metadata from YouTube API if configured
      if (this.config.apiKey) {
        result.metadata = await this.fetchVideoMetadataFromApi(videoId);
      } else {
        // Fallback to DOM extraction
        result.metadata = this.extractMetadataFromPage();
      }
    } catch (error) {
      console.error("Error fetching video metadata:", error);
      // Fallback to DOM extraction if API fails
      result.metadata = this.extractMetadataFromPage();
    }
    
    try {
      // Get transcript
      result.transcript = await this.fetchTranscript(videoId);
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
    
    return result;
  }

  /**
   * Fetch video metadata using YouTube API
   */
  private async fetchVideoMetadataFromApi(videoId: string): Promise<VideoMetadata> {
    if (!this.config.apiKey) {
      throw new Error("YouTube API key not configured");
    }
    
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${this.config.apiKey}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error("No video found with the given ID");
      }
      
      const item = data.items[0];
      const snippet = item.snippet;
      
      // Map API response to our metadata structure
      const metadata: VideoMetadata = {
        videoId,
        title: snippet.title,
        description: snippet.description,
        thumbnails: snippet.thumbnails,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        tags: snippet.tags || []
      };
      
      if (item.contentDetails) {
        metadata.duration = item.contentDetails.duration;
      }
      
      if (item.statistics) {
        metadata.viewCount = parseInt(item.statistics.viewCount, 10) || 0;
        metadata.likeCount = parseInt(item.statistics.likeCount, 10) || 0;
      }
      
      return metadata;
    } catch (error) {
      console.error("Error fetching from YouTube API:", error);
      throw error;
    }
  }

  /**
   * Extract metadata directly from the YouTube page DOM
   */
  private extractMetadataFromPage(): VideoMetadata {
    // Basic fallback when API is not available
    const metadata: VideoMetadata = {
      videoId: this.extractVideoId(window.location.href) || "",
      title: document.title.replace(" - YouTube", ""),
      description: "",
      thumbnails: {},
      channelTitle: "",
      publishedAt: new Date().toISOString()
    };
    
    // Try to get channel name
    const channelElement = document.querySelector("ytd-video-owner-renderer .ytd-channel-name a");
    if (channelElement) {
      metadata.channelTitle = channelElement.textContent?.trim() || "";
    }
    
    // Try to get description (simplified, might need adjustments based on YouTube's DOM)
    const descriptionElement = document.querySelector("#description-inline-expander");
    if (descriptionElement) {
      metadata.description = descriptionElement.textContent?.trim() || "";
    }
    
    // Try to get thumbnails
    const thumbnailUrl = `https://i.ytimg.com/vi/${metadata.videoId}/hqdefault.jpg`;
    metadata.thumbnails = {
      default: { url: `https://i.ytimg.com/vi/${metadata.videoId}/default.jpg`, width: 120, height: 90 },
      medium: { url: `https://i.ytimg.com/vi/${metadata.videoId}/mqdefault.jpg`, width: 320, height: 180 },
      high: { url: thumbnailUrl, width: 480, height: 360 }
    };
    
    return metadata;
  }

  /**
   * Fetch video transcript
   */
  private async fetchTranscript(videoId: string): Promise<TranscriptItem[]> {
    try {
      // First try to get transcript from user-selected caption track
      let transcript = await this.getTranscriptFromCurrentTrack();
      
      if (transcript && transcript.length > 0) {
        return transcript;
      }
      
      // If that fails, try to get auto-generated transcript
      transcript = await this.getAutoGeneratedTranscript();
      
      return transcript || [];
    } catch (error) {
      console.error("Error fetching transcript:", error);
      return [];
    }
  }

  /**
   * Get transcript from the currently selected caption track
   */
  private async getTranscriptFromCurrentTrack(): Promise<TranscriptItem[]> {
    return new Promise((resolve) => {
      // This is a simplified implementation
      // In a real extension, you would need to interact with YouTube's caption system
      
      // For simplicity, we'll try to extract captions from the DOM
      const captionWindows = document.querySelectorAll(".ytp-caption-segment");
      if (captionWindows && captionWindows.length > 0) {
        const transcript: TranscriptItem[] = [];
        
        // Rough timestamp estimation - this would need refinement in a real app
        let currentTime = 0;
        
        captionWindows.forEach((caption) => {
          const text = caption.textContent || "";
          if (text.trim()) {
            transcript.push({
              text: text.trim(),
              start: currentTime,
              duration: 2 // Assuming 2 seconds per caption segment
            });
            
            currentTime += 2;
          }
        });
        
        resolve(transcript);
      } else {
        // If no captions in DOM, we can't get them this way
        resolve([]);
      }
    });
  }

  /**
   * Get auto-generated transcript if available
   */
  private async getAutoGeneratedTranscript(): Promise<TranscriptItem[]> {
    // In a real implementation, this would interact with YouTube's
    // transcript API or parse the transcript data from the page
    
    // For now, this is a placeholder that returns an empty array
    // A real implementation would need to use Chrome extension capabilities
    // to extract transcript data from YouTube's internal API
    return [];
  }
} 