import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout';
import MetricsOverview, { FocusMetrics } from './components/MetricsOverview';
import VideoCard from './components/VideoCard';

// Import global styles
import '../styles/tailwind.css';

interface Video {
  id: string;
  videoId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  channelName: string;
  dateAdded: number;
  watchDuration?: number;
  focusScore?: number;
}

const Dashboard: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [metrics, setMetrics] = useState<FocusMetrics>({
    totalWatchTime: 0,
    averageFocusScore: 0,
    averageCompletionRate: 0,
    totalVideosWatched: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isMetricsLoading, setIsMetricsLoading] = useState(true);
  
  // Load mock data immediately without delay
  useEffect(() => {
    try {
      // Get runtime URL for icon to use as fallback
      const iconUrl = chrome.runtime.getURL('icons/icon128.png');
      console.log('Icon URL:', iconUrl);
      
      // Mock videos data with local icons
      const mockVideos: Video[] = [
        {
          id: '1',
          videoId: 'dQw4w9WgXcQ',
          title: 'Introduction to React Hooks',
          url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnailUrl: iconUrl,
          channelName: 'React Tutorials',
          dateAdded: Date.now() - 86400000,
          watchDuration: 1245,
          focusScore: 0.85
        },
        {
          id: '2',
          videoId: 'Ke90Tje7VS0',
          title: 'TypeScript for Beginners',
          url: 'https://youtube.com/watch?v=Ke90Tje7VS0',
          thumbnailUrl: iconUrl,
          channelName: 'Programming with TS',
          dateAdded: Date.now() - 172800000,
          watchDuration: 2874,
          focusScore: 0.72
        },
        {
          id: '3',
          videoId: 'X7IBa7vZjmo',
          title: 'Design Systems with Tailwind CSS',
          url: 'https://youtube.com/watch?v=X7IBa7vZjmo',
          thumbnailUrl: iconUrl,
          channelName: 'Frontend Masters',
          dateAdded: Date.now() - 259200000,
          watchDuration: 1782,
          focusScore: 0.91
        },
        {
          id: '4',
          videoId: 'jS4aFq5-91M',
          title: 'Next.js App Router Tutorial',
          url: 'https://youtube.com/watch?v=jS4aFq5-91M',
          thumbnailUrl: iconUrl,
          channelName: 'Next.js Official',
          dateAdded: Date.now() - 345600000,
          watchDuration: 4320,
          focusScore: 0.65
        }
      ];
      
      console.log('Setting mock videos:', mockVideos);
      setVideos(mockVideos);
      setIsLoading(false);
      
      // Mock metrics data
      const mockMetrics: FocusMetrics = {
        totalWatchTime: 10221,
        averageFocusScore: 0.78,
        averageCompletionRate: 0.83,
        totalVideosWatched: 24
      };
      
      console.log('Setting mock metrics:', mockMetrics);
      setMetrics(mockMetrics);
      setIsMetricsLoading(false);
    } catch (error) {
      console.error('Error loading mock data:', error);
      // Set data anyway to ensure UI renders
      setIsLoading(false);
      setIsMetricsLoading(false);
    }
  }, []);
  
  const handleViewVideo = (id: string) => {
    console.log(`View video details for ID: ${id}`);
  };
  
  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Dashboard</h2>
          <MetricsOverview metrics={metrics} isLoading={isMetricsLoading} />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold tracking-tight">Recent Videos</h2>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600 h-9 px-4">
              View All
            </button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="flex justify-between mt-4">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No videos found</p>
                </div>
              ) : (
                videos.map(video => (
                  <VideoCard 
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    channelName={video.channelName}
                    thumbnailUrl={video.thumbnailUrl}
                    dateAdded={video.dateAdded}
                    watchDuration={video.watchDuration}
                    focusScore={video.focusScore}
                    onView={handleViewVideo}
                  />
                ))
              )}
            </div>
          )}
        </div>
        
        <div className="pb-8">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Focus Insights</h2>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-4">
              <p>Based on your focus metrics, you focus best during videos that are 10-15 minutes long.</p>
              <p className="font-medium text-gray-900 dark:text-white">Recommendations:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Try watching videos in the morning to improve focus</li>
                <li>Videos from "React Tutorials" channel show your highest engagement</li>
                <li>Consider enabling fewer browser tabs while watching to reduce distractions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Use React 18's createRoot API
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <Dashboard />
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found');
  }
}); 