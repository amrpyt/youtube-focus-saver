import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/tailwind.css';

// Define types for our data
interface Video {
  id: string;
  videoId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  channelName: string;
  description: string;
  transcript: Array<{text: string, start: number, duration: number}>;
  summary: string;
  dateAdded: number;
  status: string;
  syncStatus?: 'synced' | 'pending' | 'failed';
}

interface AppSettings {
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

// Component for each video item in the list
const VideoItem: React.FC<{video: Video, onSelect: (video: Video) => void}> = ({ video, onSelect }) => {
  return (
    <div 
      className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow cursor-pointer mb-4"
      onClick={() => onSelect(video)}
    >
      <div className="relative">
        <img 
          src={video.thumbnailUrl || 'default-thumbnail.jpg'} 
          alt={video.title} 
          className="w-full h-36 object-cover"
        />
        {video.syncStatus && (
          <div className="absolute top-2 right-2">
            {video.syncStatus === 'synced' && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Synced</span>
            )}
            {video.syncStatus === 'pending' && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Pending</span>
            )}
            {video.syncStatus === 'failed' && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Failed</span>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">{video.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs">{video.channelName}</p>
        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
          {new Date(video.dateAdded).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

// Component for video details view
const VideoDetails: React.FC<{video: Video, onBack: () => void}> = ({ video, onBack }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'transcript' | 'summary'>('info');

  const openInYouTube = () => {
    chrome.tabs.create({ url: video.url });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b dark:border-gray-700">
        <button
          onClick={onBack}
          className="mr-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-medium text-lg truncate flex-1">Video Details</h2>
      </div>

      <div className="relative">
        <img 
          src={video.thumbnailUrl || 'default-thumbnail.jpg'} 
          alt={video.title} 
          className="w-full h-48 object-cover"
        />
        <button
          onClick={openInYouTube}
          className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8,8.001c0,0-0.195-1.378-0.795-1.985c-0.76-0.797-1.613-0.801-2.004-0.847c-2.799-0.202-6.997-0.202-6.997-0.202 h-0.009c0,0-4.198,0-6.997,0.202c-0.39,0.047-1.242,0.051-2.003,0.847C2.395,6.623,2.2,8.001,2.2,8.001S2,9.62,2,11.238v1.517 c0,1.618,0.2,3.237,0.2,3.237s0.195,1.378,0.795,1.985c0.761,0.797,1.76,0.771,2.205,0.855c1.6,0.153,6.8,0.201,6.8,0.201 s4.203-0.006,7.001-0.209c0.391-0.047,1.243-0.051,2.004-0.847c0.6-0.607,0.795-1.985,0.795-1.985s0.2-1.618,0.2-3.237v-1.517 C22,9.62,21.8,8.001,21.8,8.001z M9.935,14.594l-0.001-5.62l5.404,2.82L9.935,14.594z"></path>
          </svg>
          Watch on YouTube
        </button>
      </div>

      <div className="px-4 py-3">
        <h1 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{video.title}</h1>
        <p className="text-sm text-gray-700 dark:text-gray-300">{video.channelName}</p>
      </div>

      <div className="border-b dark:border-gray-700">
        <div className="flex">
          <button
            className={`flex-1 py-2 text-center text-sm ${
              activeTab === 'info' 
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Info
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm ${
              activeTab === 'transcript' 
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('transcript')}
          >
            Transcript
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm ${
              activeTab === 'summary' 
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'info' && (
          <div>
            <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">{video.description}</p>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Added: {new Date(video.dateAdded).toLocaleString()}
            </div>
          </div>
        )}

        {activeTab === 'transcript' && (
          <div>
            {video.transcript && video.transcript.length > 0 ? (
              <div className="space-y-2">
                {video.transcript.map((item, index) => (
                  <div key={index} className="pb-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(item.start)}
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{item.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No transcript available for this video.
              </div>
            )}
          </div>
        )}

        {activeTab === 'summary' && (
          <div>
            {video.summary ? (
              <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">{video.summary}</p>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No summary available for this video. 
                <br />
                <br />
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                  onClick={() => alert('AI summary generation would be triggered here')}
                >
                  Generate Summary
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Component for settings view
const Settings: React.FC<{settings: AppSettings, onSave: (settings: AppSettings) => void, onBack: () => void}> = ({ settings, onSave, onBack }) => {
  const [formState, setFormState] = useState<AppSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormState(prev => {
      if (name.startsWith('apiKeys.')) {
        const key = name.split('.')[1];
        return {
          ...prev,
          apiKeys: {
            ...prev.apiKeys,
            [key]: value
          }
        };
      }
      
      if (name.startsWith('notifications.')) {
        const key = name.split('.')[1];
        return {
          ...prev,
          notifications: {
            ...prev.notifications,
            [key]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
          }
        };
      }
      
      return {
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      };
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b dark:border-gray-700">
        <button
          onClick={onBack}
          className="mr-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-medium text-lg">Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">General</h3>
            
            <div className="flex items-center justify-between py-2">
              <label className="text-sm">Dark Mode</label>
              <select 
                name="darkMode" 
                value={formState.darkMode}
                onChange={handleChange}
                className="bg-gray-100 dark:bg-gray-700 border-none rounded p-1 text-sm"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <label className="text-sm">Auto-save videos</label>
              <input 
                type="checkbox" 
                name="autoSaveVideos" 
                checked={formState.autoSaveVideos}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Cloud Sync</h3>
            
            <div className="flex items-center justify-between py-2">
              <label className="text-sm">Enable Supabase Sync</label>
              <input 
                type="checkbox" 
                name="cloudSyncEnabled" 
                checked={formState.cloudSyncEnabled}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">AI Features</h3>
            
            <div className="flex items-center justify-between py-2">
              <label className="text-sm">Generate AI Summaries</label>
              <input 
                type="checkbox" 
                name="generateSummaries" 
                checked={formState.generateSummaries}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
            </div>
            
            {formState.generateSummaries && (
              <div className="mt-2">
                <label className="block text-sm mb-1">Gemini API Key</label>
                <input 
                  type="password" 
                  name="apiKeys.gemini" 
                  value={formState.apiKeys.gemini || ''}
                  onChange={handleChange}
                  placeholder="Enter your Gemini API key"
                  className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded border-none text-sm"
                />
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Notifications</h3>
            
            <div className="flex items-center justify-between py-2">
              <label className="text-sm">Show notifications</label>
              <input 
                type="checkbox" 
                name="notifications.enabled" 
                checked={formState.notifications.enabled}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
            </div>
            
            {formState.notifications.enabled && (
              <div className="flex items-center justify-between py-2">
                <label className="text-sm">Notification frequency</label>
                <select 
                  name="notifications.frequency" 
                  value={formState.notifications.frequency}
                  onChange={handleChange}
                  className="bg-gray-100 dark:bg-gray-700 border-none rounded p-1 text-sm"
                >
                  <option value="always">Always</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main app component
const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    cloudSyncEnabled: false,
    autoSaveVideos: true,
    darkMode: 'system',
    generateSummaries: false,
    apiKeys: {},
    notifications: {
      enabled: true,
      frequency: 'always'
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load videos and settings when component mounts
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load videos
        chrome.storage.local.get('youtubeFocusSaver:videos', (result) => {
          const loadedVideos = result['youtubeFocusSaver:videos'] || [];
          setVideos(loadedVideos);
          setFilteredVideos(loadedVideos);
        });
        
        // Load settings
        chrome.storage.local.get('youtubeFocusSaver:settings', (result) => {
          const loadedSettings = result['youtubeFocusSaver:settings'];
          if (loadedSettings) {
            setSettings(loadedSettings);
          }
        });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Apply theme based on settings
  useEffect(() => {
    const applyTheme = () => {
      if (settings.darkMode === 'dark' || 
          (settings.darkMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    applyTheme();
    
    // Listen for system theme changes if using system setting
    if (settings.darkMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [settings.darkMode]);

  // Filter videos when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVideos(videos);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = videos.filter(video => 
      video.title.toLowerCase().includes(query) || 
      video.channelName.toLowerCase().includes(query) ||
      video.description.toLowerCase().includes(query)
    );
    
    setFilteredVideos(filtered);
  }, [searchQuery, videos]);

  // Save settings to storage
  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    chrome.storage.local.set({ 'youtubeFocusSaver:settings': newSettings });
    setShowSettings(false);
  };

  // Helper function to format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // If showing settings
  if (showSettings) {
    return (
      <Settings 
        settings={settings}
        onSave={handleSaveSettings}
        onBack={() => setShowSettings(false)}
      />
    );
  }

  // If a video is selected, show its details
  if (selectedVideo) {
    return (
      <VideoDetails 
        video={selectedVideo}
        onBack={() => setSelectedVideo(null)}
      />
    );
  }

  // Main video list view
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h1 className="font-bold text-lg text-gray-900 dark:text-white">YouTube Focus Saver</h1>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVideos.map(video => (
              <VideoItem 
                key={video.id} 
                video={video} 
                onSelect={(video) => setSelectedVideo(video)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">No videos found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
              {searchQuery 
                ? "No videos match your search. Try different keywords."
                : "Start watching YouTube videos to automatically save them here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Render the app
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Helper function used in component
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
