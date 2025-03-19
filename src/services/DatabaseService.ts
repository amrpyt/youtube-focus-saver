import { supabase } from './supabase';
import { Video, WatchSession, FocusMetrics, AppSettings } from '../types';

interface SessionInput {
  videoId: string;
  videoTitle: string;
  startTime: string;
  endTime?: string | null;
  watchDuration?: number | null;
  focusPercentage: number;
}

export class DatabaseService {
  // Videos methods
  async getVideos(userId: string): Promise<Video[]> {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('user_id', userId)
      .order('date_added', { ascending: false });
    
    if (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
    
    return data.map(video => ({
      id: video.id,
      videoId: video.video_id,
      title: video.title,
      url: video.url,
      thumbnailUrl: video.thumbnail_url,
      channelName: video.channel_name,
      description: video.description,
      transcript: video.transcript,
      summary: video.summary,
      dateAdded: video.date_added,
      status: video.status,
      userId: video.user_id
    }));
  }
  
  async saveVideo(userId: string, video: Video): Promise<{ data: any, error: any }> {
    // Check if video already exists
    const { data: existingVideos } = await supabase
      .from('videos')
      .select('id')
      .eq('video_id', video.videoId)
      .eq('user_id', userId);
    
    const videoData = {
      video_id: video.videoId,
      title: video.title,
      url: video.url,
      thumbnail_url: video.thumbnailUrl,
      channel_name: video.channelName || '',
      description: video.description || '',
      transcript: video.transcript || '',
      summary: video.summary || '',
      date_added: video.dateAdded,
      status: video.status,
      user_id: userId
    };
    
    if (existingVideos && existingVideos.length > 0) {
      // Update existing record
      return await supabase
        .from('videos')
        .update(videoData)
        .eq('id', existingVideos[0].id);
    } else {
      // Insert new record
      return await supabase
        .from('videos')
        .insert([videoData]);
    }
  }
  
  async deleteVideo(userId: string, videoId: string): Promise<void> {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('video_id', videoId)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  }
  
  // Watch sessions methods
  async startWatchSession(userId: string, session: SessionInput): Promise<{ data: any, error: any }> {
    const sessionData = {
      user_id: userId,
      video_id: session.videoId,
      video_title: session.videoTitle,
      start_time: session.startTime,
      end_time: null,
      duration: null,
      focus_percentage: session.focusPercentage
    };
    
    return await supabase
      .from('watch_sessions')
      .insert([sessionData]);
  }
  
  async endWatchSession(sessionId: string, endTime: string, watchDuration: number, focusPercentage: number): Promise<{ data: any, error: any }> {
    const sessionData = {
      end_time: endTime,
      duration: watchDuration,
      focus_percentage: focusPercentage
    };
    
    return await supabase
      .from('watch_sessions')
      .update(sessionData)
      .eq('id', sessionId);
  }
  
  async getRecentWatchSessions(userId: string, limit: number = 10): Promise<WatchSession[]> {
    const { data, error } = await supabase
      .from('watch_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching watch sessions:', error);
      throw error;
    }
    
    return data.map(session => ({
      id: session.id,
      userId: session.user_id,
      videoId: session.video_id,
      videoTitle: session.video_title,
      startTime: session.start_time,
      endTime: session.end_time,
      duration: session.duration,
      focusPercentage: session.focus_percentage,
      distractionCount: session.distraction_count || 0
    }));
  }
  
  // Metrics methods
  async getUserMetrics(userId: string): Promise<FocusMetrics | null> {
    const { data, error } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Error fetching user metrics:', error);
      throw error;
    }
    
    return {
      totalWatchTime: data.total_watch_time,
      focusedWatchTime: data.focused_watch_time,
      focusPercentage: data.focus_percentage,
      videoCount: data.video_count,
      sessionsCount: data.sessions_count,
      lastVideoDate: data.last_video_date
    };
  }
  
  async recordFocusMetrics(metricsData: {
    userId: string;
    videoId: string;
    watchDuration: number;
    focusedTime: number;
  }): Promise<void> {
    const { data: existingMetrics } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', metricsData.userId);
    
    const focusPercentage = metricsData.watchDuration > 0 
      ? (metricsData.focusedTime / metricsData.watchDuration) * 100 
      : 0;
    
    const now = new Date().toISOString();
    
    if (existingMetrics && existingMetrics.length > 0) {
      // Update existing metrics
      const current = existingMetrics[0];
      const updatedMetrics = {
        total_watch_time: current.total_watch_time + (metricsData.watchDuration / 60), // convert to minutes
        focused_watch_time: current.focused_watch_time + (metricsData.focusedTime / 60), // convert to minutes
        focus_percentage: ((current.focused_watch_time + (metricsData.focusedTime / 60)) / 
          (current.total_watch_time + (metricsData.watchDuration / 60))) * 100,
        video_count: current.video_count + 1,
        sessions_count: current.sessions_count + 1,
        last_video_date: now
      };
      
      await supabase
        .from('user_metrics')
        .update(updatedMetrics)
        .eq('user_id', metricsData.userId);
    } else {
      // Create new metrics record
      const newMetrics = {
        user_id: metricsData.userId,
        total_watch_time: metricsData.watchDuration / 60, // convert to minutes
        focused_watch_time: metricsData.focusedTime / 60, // convert to minutes
        focus_percentage: focusPercentage,
        video_count: 1,
        sessions_count: 1,
        last_video_date: now
      };
      
      await supabase
        .from('user_metrics')
        .insert([newMetrics]);
    }
  }
  
  // Settings methods
  async getUserSettings(userId: string): Promise<AppSettings | null> {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      console.error('Error fetching user settings:', error);
      throw error;
    }
    
    return {
      cloudSync: data.cloud_sync,
      autoSaveVideos: data.auto_save_videos,
      darkMode: data.dark_mode,
      generateSummary: data.generate_summary,
      openAiApiKey: data.openai_api_key || '',
      notifyNewFeatures: data.notify_new_features
    };
  }
  
  async saveUserSettings(userId: string, settings: AppSettings): Promise<void> {
    const { data: existingSettings } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId);
    
    const settingsData = {
      user_id: userId,
      cloud_sync: settings.cloudSync,
      auto_save_videos: settings.autoSaveVideos,
      dark_mode: settings.darkMode,
      generate_summary: settings.generateSummary,
      openai_api_key: settings.openAiApiKey,
      notify_new_features: settings.notifyNewFeatures
    };
    
    if (existingSettings && existingSettings.length > 0) {
      // Update existing settings
      await supabase
        .from('user_settings')
        .update(settingsData)
        .eq('user_id', userId);
    } else {
      // Create new settings record
      await supabase
        .from('user_settings')
        .insert([settingsData]);
    }
  }
} 