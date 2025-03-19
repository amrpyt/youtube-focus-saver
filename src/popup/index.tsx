import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/tailwind.css';
import { authService, AuthUser } from '../services/auth';
import AppComponent from './App';
import './index.css';
import { AppProvider } from '../contexts';

// Define our Video type
interface Video {
  id: string;
  videoId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  channelName: string;
  dateAdded: number;
  syncStatus?: 'synced' | 'pending' | 'failed';
  transcript?: string | string[];
}

// Simple video item component with Apple HIG inspired design
const VideoItem: React.FC<{video: Video}> = ({ video }) => {
  const openVideo = () => {
    chrome.tabs.create({ url: video.url });
  };

  return (
    <button 
      onClick={openVideo}
      className="w-full flex items-start gap-3 p-3 text-left rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="relative w-24 h-14 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={video.thumbnailUrl || 'default-thumbnail.jpg'} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate leading-tight">{video.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{video.channelName}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {new Date(video.dateAdded).toLocaleDateString(undefined, { 
            month: 'short', 
            day: 'numeric'
          })}
        </p>
      </div>
      {video.syncStatus && (
        <div className="flex-shrink-0">
          {video.syncStatus === 'synced' && (
            <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-600/30">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mr-1"></span>
              Synced
            </span>
          )}
          {video.syncStatus === 'pending' && (
            <span className="inline-flex items-center rounded-full bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-300 ring-1 ring-inset ring-yellow-700/10 dark:ring-yellow-600/30">
              <span className="inline-block w-1.5 h-1.5 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-1"></span>
              Pending
            </span>
          )}
        </div>
      )}
    </button>
  );
};

// Simple empty state component
const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10">
    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </div>
    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">No saved videos</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px]">
      Watch YouTube videos and they'll appear here automatically
    </p>
  </div>
);

// Add a safe transcript rendering function to handle all possible cases
const renderTranscript = (transcript: string | string[] | undefined) => {
  if (!transcript) {
    return <p>No transcript available</p>;
  }
  
  if (Array.isArray(transcript)) {
    return (
      <div>
        {transcript.map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ))}
      </div>
    );
  }
  
  if (typeof transcript === 'string') {
    return <p>{transcript}</p>;
  }
  
  return <p>No transcript available</p>;
};

// Main app component
const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);

  // Dashboard URL - this would be your deployed web app
  const dashboardUrl = chrome.runtime.getURL('dashboard.html');

  // Load videos and settings when component mounts
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Check if user is authenticated
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        // Load videos
        chrome.storage.local.get('youtubeFocusSaver:videos', (result) => {
          const loadedVideos = result['youtubeFocusSaver:videos'] || [];
          setVideos(loadedVideos);
        });
        
        // Check if cloud sync is enabled
        chrome.storage.local.get('youtubeFocusSaver:settings', (result) => {
          const loadedSettings = result['youtubeFocusSaver:settings'];
          if (loadedSettings) {
            setCloudSyncEnabled(loadedSettings.cloudSyncEnabled || false);
          }
          setSettingsLoaded(true);
        });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Apply theme based on system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    // Set initial theme
    handleChange();
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Open dashboard in new tab
  const openDashboard = () => {
    chrome.tabs.create({ url: dashboardUrl });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-sm font-semibold">YouTube Focus Saver</h1>
        <button
          onClick={openDashboard}
          className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600 h-8 px-3"
        >
          Open Dashboard
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full py-8">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500"></div>
          </div>
        ) : videos.length > 0 ? (
          <div className="py-1 divide-y divide-gray-100 dark:divide-gray-800">
            {videos.map(video => (
              <VideoItem key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Footer with sync status */}
      {settingsLoaded && cloudSyncEnabled && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            {user ? (
              <>
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                <span>Synced</span>
              </>
            ) : (
              <>
                <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                <span>Cloud sync off</span>
              </>
            )}
          </div>
          <button 
            onClick={openDashboard}
            className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Manage
          </button>
        </div>
      )}
    </div>
  );
};

// Create root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
const root = createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <AppProvider>
      <AppComponent />
    </AppProvider>
  </React.StrictMode>
);
