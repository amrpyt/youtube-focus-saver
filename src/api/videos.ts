import { supabase } from './supabase';
import { Video } from '../types';

/**
 * Fetch all videos for the current user
 */
export const fetchVideos = async (userId: string): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', userId)
    .order('date_added', { ascending: false });
  
  if (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
  
  return data as Video[];
};

/**
 * Add a new video
 */
export const addVideo = async (video: Omit<Video, 'id'>, userId: string): Promise<Video> => {
  const { data, error } = await supabase
    .from('videos')
    .insert([{
      ...video,
      user_id: userId,
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding video:', error);
    throw error;
  }
  
  return data as Video;
};

/**
 * Update an existing video
 */
export const updateVideo = async (video: Video, userId: string): Promise<Video> => {
  const { data, error } = await supabase
    .from('videos')
    .update(video)
    .eq('id', video.id)
    .eq('user_id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating video:', error);
    throw error;
  }
  
  return data as Video;
};

/**
 * Delete a video
 */
export const deleteVideo = async (videoId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', videoId)
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
}; 