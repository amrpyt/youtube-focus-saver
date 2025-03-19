import React, { useState } from 'react';
import { useVideos, useSettings, useAuth } from '../hooks';
import { formatDate } from '../utils/format';

type TabType = 'info' | 'transcript' | 'summary';

export const VideoDetails: React.FC = () => {
  const { selectedVideo, deleteVideo, syncVideoToCloud } = useVideos();
  const { settings } = useSettings();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('info');

  if (!selectedVideo) return null;

  const handleDeleteVideo = () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      deleteVideo(selectedVideo.videoId);
    }
  };

  const handleSyncVideo = () => {
    syncVideoToCloud(selectedVideo.videoId)
      .then(() => {
        alert('Video synced to cloud successfully!');
      })
      .catch((error) => {
        alert(`Failed to sync video: ${error.message}`);
      });
  };

  const handleOpenVideo = () => {
    window.open(selectedVideo.url, '_blank');
  };

  return (
    <div className={`flex-1 overflow-y-auto ${settings.darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="p-4">
        <div className="flex mb-4">
          <div className="mr-4">
            <img 
              src={selectedVideo.thumbnailUrl} 
              alt={selectedVideo.title} 
              className="w-32 h-24 object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <h2 className={`text-lg font-semibold ${settings.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedVideo.title}
            </h2>
            <p className={`text-sm ${settings.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedVideo.channelName}
            </p>
            <p className={`text-xs mt-1 ${settings.darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Saved on {formatDate(selectedVideo.dateAdded)}
            </p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={handleOpenVideo}
                className="px-3 py-1 text-xs text-white bg-red-600 hover:bg-red-700 rounded"
              >
                Open in YouTube
              </button>
              
              {isAuthenticated && selectedVideo.syncStatus !== 'synced' && (
                <button
                  onClick={handleSyncVideo}
                  className="px-3 py-1 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded"
                >
                  Sync to Cloud
                </button>
              )}
              
              <button
                onClick={handleDeleteVideo}
                className={`px-3 py-1 text-xs rounded ${
                  settings.darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className={`flex border-b ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'info'
                  ? (settings.darkMode 
                      ? 'text-indigo-400 border-b-2 border-indigo-400' 
                      : 'text-indigo-600 border-b-2 border-indigo-600')
                  : (settings.darkMode ? 'text-gray-400' : 'text-gray-500')
              }`}
              onClick={() => setActiveTab('info')}
            >
              Information
            </button>
            
            {selectedVideo.transcript && (
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'transcript'
                    ? (settings.darkMode 
                        ? 'text-indigo-400 border-b-2 border-indigo-400' 
                        : 'text-indigo-600 border-b-2 border-indigo-600')
                    : (settings.darkMode ? 'text-gray-400' : 'text-gray-500')
                }`}
                onClick={() => setActiveTab('transcript')}
              >
                Transcript
              </button>
            )}
            
            {selectedVideo.summary && (
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'summary'
                    ? (settings.darkMode 
                        ? 'text-indigo-400 border-b-2 border-indigo-400' 
                        : 'text-indigo-600 border-b-2 border-indigo-600')
                    : (settings.darkMode ? 'text-gray-400' : 'text-gray-500')
                }`}
                onClick={() => setActiveTab('summary')}
              >
                Summary
              </button>
            )}
          </div>
          
          <div className="py-4">
            {activeTab === 'info' && (
              <div className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedVideo.description ? (
                  <p className="text-sm whitespace-pre-line">{selectedVideo.description}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No description available</p>
                )}
              </div>
            )}
            
            {activeTab === 'transcript' && (
              <div className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedVideo.transcript ? (
                  <p className="text-sm whitespace-pre-line">{selectedVideo.transcript}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No transcript available</p>
                )}
              </div>
            )}
            
            {activeTab === 'summary' && (
              <div className={`${settings.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedVideo.summary ? (
                  <p className="text-sm whitespace-pre-line">{selectedVideo.summary}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No summary available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 