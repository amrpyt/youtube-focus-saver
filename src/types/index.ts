// Type definitions for YouTube Focus Saver

export interface VideoMetadata {
  videoId: string;
  title: string;
  description: string;
  thumbnails: {
    default?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    high?: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  channelTitle: string;
  publishedAt: string;
  duration?: string;
  viewCount?: number;
  likeCount?: number;
  tags?: string[];
}

export interface TranscriptItem {
  text: string;
  start: number;
  duration: number;
}

export interface Video {
  id: string;
  videoId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  channelName: string;
  description: string;
  transcript: TranscriptItem[];
  summary: string;
  dateAdded: number;
  status: 'saved' | 'archived' | 'deleted';
  syncStatus?: 'synced' | 'pending' | 'failed';
}

export interface AppSettings {
  cloudSyncEnabled: boolean;
  autoSaveVideos: boolean;
  darkMode: 'light' | 'dark' | 'system';
  generateSummaries: boolean;
  apiKeys: {
    [key: string]: string;
  };
  notifications: {
    enabled: boolean;
    frequency: string;
  };
}

export interface YouTubeServiceConfig {
  apiKey?: string;
}

export interface VideoData {
  videoId: string;
  url: string;
  metadata?: VideoMetadata;
  transcript?: TranscriptItem[];
}
