import { supabase, SupabaseClient } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export interface Video {
  id: string;
  user_id: string;
  video_id: string;
  title: string;
  url: string;
  thumbnail_url: string;
  channel_name: string;
  description: string;
  transcript?: any[];
  summary?: string;
  date_added: string;
  created_at?: string;
  updated_at?: string;
}

export interface WatchSession {
  id: string;
  user_id: string;
  video_id: string;
  video_title: string;
  start_time: string;
  end_time?: string;
  watch_duration: number;
  focus_score: number;
  pause_count: number;
  tab_switch_count: number;
  completion_rate: number;
}

export interface FocusMetrics {
  totalWatchTime: number;
  focusScore: number;
  pauseCount: number;
  tabSwitchCount: number;
  completionRate: number;
}

interface SessionData {
  id: string;
  video_id: string;
  video_title: string;
  start_time: string;
  end_time: string | null;
  watch_duration: number;
  focus_score: number;
  pause_count: number;
  tab_switch_count: number;
  completion_rate: number;
  [key: string]: any;
}

// Define interface for video data coming from the UI
export interface VideoInput {
  videoId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  channelName: string;
  description: string;
  transcript?: any[];
  summary?: string;
  dateAdded: number;
}

// Define interface for session data coming from the UI
export interface SessionInput {
  videoId: string;
  videoTitle: string;
  startTime: string;
  endTime?: string;
  watchDuration: number;
  focusScore: number;
  pauseCount: number;
  tabSwitchCount: number;
  completionRate: number;
}

export class DatabaseService {
  /**
   * Save a video to Supabase
   */
  async saveVideo(video: VideoInput, userId: string): Promise<{ data: any, error: any }> {
    // Check if video already exists for this user
    const { data: existingVideos } = await supabase
      .from('videos')
      .select('id')
      .eq('user_id', userId)
      .eq('video_id', video.videoId)
      .limit(1);
      
    if (existingVideos && existingVideos.length > 0) {
      // Update existing video
      return await supabase
        .from('videos')
        .update({
          title: video.title,
          description: video.description,
          thumbnail_url: video.thumbnailUrl,
          channel_name: video.channelName,
          summary: video.summary,
          transcript: video.transcript,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingVideos[0].id);
    } else {
      // Insert new video
      return await supabase
        .from('videos')
        .insert({
          id: uuidv4(),
          user_id: userId,
          video_id: video.videoId,
          title: video.title,
          url: video.url,
          thumbnail_url: video.thumbnailUrl,
          channel_name: video.channelName,
          description: video.description,
          transcript: video.transcript,
          summary: video.summary,
          date_added: new Date(video.dateAdded).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
    }
  }
  
  /**
   * Get all videos for a user
   */
  async getVideos(userId: string): Promise<Video[]> {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('user_id', userId)
      .order('date_added', { ascending: false });
      
    if (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
    
    return data || [];
  }
  
  /**
   * Save a watch session
   */
  async saveWatchSession(session: SessionInput, userId: string): Promise<{ data: any, error: any }> {
    return await supabase
      .from('watch_sessions')
      .insert({
        id: uuidv4(),
        user_id: userId,
        video_id: session.videoId,
        video_title: session.videoTitle,
        start_time: session.startTime,
        end_time: session.endTime,
        watch_duration: session.watchDuration,
        focus_score: session.focusScore,
        pause_count: session.pauseCount,
        tab_switch_count: session.tabSwitchCount,
        completion_rate: session.completionRate
      });
  }
  
  /**
   * Update a watch session with end time and metrics
   */
  async updateWatchSession(sessionId: string, data: Partial<SessionInput>): Promise<{ data: any, error: any }> {
    return await supabase
      .from('watch_sessions')
      .update({
        end_time: data.endTime,
        watch_duration: data.watchDuration,
        focus_score: data.focusScore,
        pause_count: data.pauseCount,
        tab_switch_count: data.tabSwitchCount,
        completion_rate: data.completionRate
      })
      .eq('id', sessionId);
  }
  
  /**
   * Get recent watch sessions for a user
   */
  async getRecentSessions(userId: string, limit: number = 5): Promise<SessionInput[]> {
    const { data, error } = await supabase
      .from('watch_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching watch sessions:', error);
      return [];
    }
    
    if (!data) return [];
    
    return data.map((session: SessionData) => ({
      id: session.id,
      videoId: session.video_id,
      videoTitle: session.video_title,
      startTime: session.start_time,
      endTime: session.end_time,
      watchDuration: session.watch_duration,
      focusScore: session.focus_score,
      pauseCount: session.pause_count,
      tabSwitchCount: session.tab_switch_count,
      completionRate: session.completion_rate
    }));
  }
  
  /**
   * Get aggregated user metrics
   */
  async getUserMetrics(userId: string): Promise<FocusMetrics | null> {
    const { data, error } = await supabase
      .from('watch_sessions')
      .select('*')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching user metrics:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      return {
        totalWatchTime: 0,
        focusScore: 0,
        pauseCount: 0,
        tabSwitchCount: 0,
        completionRate: 0
      };
    }
    
    // Aggregate metrics
    let totalWatchTime = 0;
    let totalFocusScore = 0;
    let totalPauseCount = 0;
    let totalTabSwitchCount = 0;
    let totalCompletionRate = 0;
    
    data.forEach((session: SessionData) => {
      totalWatchTime += session.watch_duration || 0;
      totalFocusScore += session.focus_score || 0;
      totalPauseCount += session.pause_count || 0;
      totalTabSwitchCount += session.tab_switch_count || 0;
      totalCompletionRate += session.completion_rate || 0;
    });
    
    return {
      totalWatchTime,
      focusScore: totalFocusScore / data.length,
      pauseCount: totalPauseCount,
      tabSwitchCount: totalTabSwitchCount,
      completionRate: totalCompletionRate / data.length
    };
  }
  
  /**
   * Sync local videos with Supabase
   */
  async syncVideosToCloud(videos: VideoInput[], userId: string): Promise<{ succeeded: number, failed: number }> {
    let succeeded = 0;
    let failed = 0;
    
    for (const video of videos) {
      try {
        const { error } = await this.saveVideo(video, userId);
        if (error) {
          console.error('Error syncing video:', error);
          failed++;
        } else {
          succeeded++;
        }
      } catch (e) {
        console.error('Exception syncing video:', e);
        failed++;
      }
    }
    
    return { succeeded, failed };
  }
} 