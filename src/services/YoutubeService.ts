/// <reference types="vite/client" />

import { Video } from '../types';

interface VideoMetadata {
  videoId: string;
  title: string;
  description: string;
  channelId: string;
  channelName: string;
  publishedAt: string;
  thumbnailUrl: string;
  duration: string;
}

interface TranscriptItem {
  text: string;
  start: number;
  duration: number;
}

interface YouTubeServiceConfig {
  apiKey?: string;
}

class YouTubeService {
  private apiKey: string;

  constructor(config?: YouTubeServiceConfig) {
    this.apiKey = (import.meta.env?.VITE_YOUTUBE_API_KEY as string) || config?.apiKey || '';
  }

  // Add ID property to the returned object
  async getVideoDetails(inputVideoId: string): Promise<Video> {
    try {
      // Mock video details fetch for now
      console.log(`Fetching video details for ${inputVideoId}`);
      
      // Generate a timestamp for dateAdded
      const dateAdded = new Date().toISOString();
      
      // Sample video data - in a real implementation this would come from YouTube API
      const videoId = inputVideoId || "dQw4w9WgXcQ"; // Use input or default
      const title = "Sample Video Title";
      const url = `https://www.youtube.com/watch?v=${videoId}`;
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      const channelName = "Sample Channel";
      const description = "This is a sample video description.";
      
      return {
        id: Math.random().toString(36).substring(2, 15), // Generate a random ID
        videoId,
        title,
        url,
        thumbnailUrl,
        channelName,
        description,
        dateAdded,
        status: 'saved',
      };
    } catch (error) {
      console.error("Error fetching video details:", error);
      throw new Error("Failed to fetch video details");
    }
  }

  // This would be done server-side in a real implementation
  async getTranscript(videoId: string): Promise<string | null> {
    try {
      // This is a placeholder - actual transcript fetching requires
      // either YouTube Data API captions endpoint or a third-party service
      console.warn('Transcript fetching not implemented in client-side service');
      return null;
    } catch (error) {
      console.error('Error fetching transcript:', error);
      return null;
    }
  }

  // Generate a summary (placeholder - would be done by an AI service)
  async generateSummary(videoId: string, transcript: string): Promise<string | null> {
    try {
      // This is a placeholder - actual summary generation would use
      // an AI service like OpenAI's GPT API
      console.warn('Summary generation not implemented in client-side service');
      return null;
    } catch (error) {
      console.error('Error generating summary:', error);
      return null;
    }
  }
}

export default new YouTubeService(); 