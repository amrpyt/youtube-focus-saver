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
  channelName?: string;
  description?: string;
  transcript?: string;
  summary?: string;
  dateAdded: string;
  status: 'saved' | 'watched' | 'archived' | 'processing';
  syncStatus?: 'local' | 'synced' | 'pending';
  userId?: string;
}

export interface AppSettings {
  cloudSync: boolean;
  autoSaveVideos: boolean;
  darkMode: boolean;
  generateSummary: boolean;
  openAiApiKey: string;
  notifyNewFeatures: boolean;
}

export interface User {
  id: string;
  email: string;
  createdAt?: string;
  lastLogin?: string;
}

export interface FocusMetric {
  id?: string;
  user_id: string;
  date: string;
  total_watch_time: number;
  focus_time: number;
  distraction_count: number;
  videos_watched: number;
}

export interface WatchSession {
  id: string;
  videoId: string;
  userId: string;
  startTime: string;
  endTime: string | null;
  duration: number | null; // in seconds
  focusPercentage: number;
  videoTitle: string;
  distractionCount: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
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

export interface FocusMetrics {
  totalWatchTime: number; // in minutes
  focusedWatchTime: number; // in minutes
  focusPercentage: number; // 0-100
  videoCount: number;
  sessionsCount: number;
  lastVideoDate: string | null;
  formattedTotalWatchTime?: string;
  formattedFocusedWatchTime?: string;
  formattedFocusPercentage?: string;
}
