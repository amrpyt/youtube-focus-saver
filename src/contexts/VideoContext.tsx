import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video } from '../types';
import { useAuth } from './AuthContext';
import { DatabaseService } from '../services/DatabaseService';

interface VideoContextType {
  videos: Video[];
  loading: boolean;
  error: string | null;
  selectedVideo: Video | null;
  searchQuery: string;
  refreshing: boolean;
  fetchVideos: () => Promise<void>;
  deleteVideo: (videoId: string) => Promise<void>;
  selectVideo: (video: Video | null) => void;
  updateSearchQuery: (query: string) => void;
  updateVideo: (video: Video) => Promise<void>;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, isAuthenticated } = useAuth();
  const dbService = new DatabaseService();

  // Fetch videos when user changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchVideos();
    } else {
      setVideos([]);
      setSelectedVideo(null);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchVideos = async () => {
    if (!isAuthenticated || !user) {
      setVideos([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const fetchedVideos = await dbService.getVideos(user.id);
      setVideos(fetchedVideos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const refreshVideos = async () => {
    if (!isAuthenticated || !user) return;

    try {
      setRefreshing(true);
      setError(null);
      
      const fetchedVideos = await dbService.getVideos(user.id);
      setVideos(fetchedVideos);
    } catch (err) {
      console.error('Error refreshing videos:', err);
      setError('Failed to refresh videos');
    } finally {
      setRefreshing(false);
    }
  };

  const deleteVideo = async (videoId: string) => {
    if (!isAuthenticated || !user) return;

    try {
      setError(null);
      
      await dbService.deleteVideo(user.id, videoId);
      
      // Update local state
      setVideos(prevVideos => prevVideos.filter(video => video.videoId !== videoId));
      
      // Clear selected video if it was deleted
      if (selectedVideo?.videoId === videoId) {
        setSelectedVideo(null);
      }
    } catch (err) {
      console.error('Error deleting video:', err);
      setError('Failed to delete video');
      throw err;
    }
  };

  const updateVideo = async (updatedVideo: Video) => {
    if (!isAuthenticated || !user) return;

    try {
      setError(null);
      
      // Update in database
      await dbService.saveVideo(user.id, updatedVideo);
      
      // Update local state
      setVideos(prevVideos => 
        prevVideos.map(video => 
          video.id === updatedVideo.id ? updatedVideo : video
        )
      );
      
      // Update selected video if it was the one updated
      if (selectedVideo?.id === updatedVideo.id) {
        setSelectedVideo(updatedVideo);
      }
    } catch (err) {
      console.error('Error updating video:', err);
      setError('Failed to update video');
      throw err;
    }
  };

  const selectVideo = (video: Video | null) => {
    setSelectedVideo(video);
  };

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const value = {
    videos,
    loading,
    error,
    selectedVideo,
    searchQuery,
    refreshing,
    fetchVideos,
    deleteVideo,
    selectVideo,
    updateSearchQuery,
    updateVideo,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};

export const useVideos = (): VideoContextType => {
  const context = useContext(VideoContext);
  
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  
  return context;
}; 