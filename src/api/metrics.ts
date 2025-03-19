import { supabase } from './supabase';
import { FocusMetric, WatchSession } from '../types';

/**
 * Fetch daily metrics for a user
 */
export const fetchDailyMetrics = async (
  userId: string, 
  days: number = 30
): Promise<FocusMetric[]> => {
  // Calculate the date for 'days' ago
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const { data, error } = await supabase
    .from('user_metrics')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate.toISOString().split('T')[0])
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching daily metrics:', error);
    throw error;
  }
  
  return data as FocusMetric[];
};

/**
 * Fetch watch sessions for a user
 */
export const fetchWatchSessions = async (
  userId: string, 
  limit: number = 50
): Promise<WatchSession[]> => {
  const { data, error } = await supabase
    .from('watch_sessions')
    .select('*, videos(title)')
    .eq('user_id', userId)
    .order('start_time', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching watch sessions:', error);
    throw error;
  }
  
  // Process the joined data to include video_title
  return data.map(session => ({
    ...session,
    video_title: session.videos?.title || 'Unknown Video',
  })) as WatchSession[];
};

/**
 * Add a new watch session
 */
export const addWatchSession = async (
  session: Omit<WatchSession, 'id' | 'user_id'>, 
  userId: string
): Promise<WatchSession> => {
  const newSession = {
    ...session,
    user_id: userId,
  };
  
  const { data, error } = await supabase
    .from('watch_sessions')
    .insert([newSession])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding watch session:', error);
    throw error;
  }
  
  return data as WatchSession;
};

/**
 * Update an existing watch session
 */
export const updateWatchSession = async (
  sessionId: string,
  updates: Partial<WatchSession>,
  userId: string
): Promise<WatchSession> => {
  const { data, error } = await supabase
    .from('watch_sessions')
    .update(updates)
    .eq('id', sessionId)
    .eq('user_id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating watch session:', error);
    throw error;
  }
  
  return data as WatchSession;
}; 