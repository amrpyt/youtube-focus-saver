import React, { useState } from 'react';
import { useVideos, useSettings } from '../hooks';
import { Video } from '../types';
import { formatDate } from '../utils/format';

export const VideoList: React.FC = () => {
  const { videos, selectedVideo, selectVideo, loading, updateSearchQuery, searchQuery } = useVideos();
  const { settings } = useSettings();
  const [filter, setFilter] = useState<'all' | 'saved' | 'watched'>('all');

  const filteredVideos = videos.filter(video => {
    if (filter === 'all') return true;
    return video.status === filter;
  });

  return (
    <div className={`w-1/3 border-r ${settings.darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-y-auto`}>
      <div className="p-3 sticky top-0 z-10 bg-opacity-90 backdrop-blur-sm"
        style={{ backgroundColor: settings.darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
          className={`w-full px-3 py-2 text-sm rounded ${
            settings.darkMode 
              ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500' 
              : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400'
          } border focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500`}
        />
        
        <div className="flex justify-between mt-2">
          <div className="flex space-x-1 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 rounded ${
                filter === 'all'
                  ? (settings.darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-500 text-white')
                  : (settings.darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700')
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('saved')}
              className={`px-2 py-1 rounded ${
                filter === 'saved'
                  ? (settings.darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-500 text-white')
                  : (settings.darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700')
              }`}
            >
              Saved
            </button>
            <button
              onClick={() => setFilter('watched')}
              className={`px-2 py-1 rounded ${
                filter === 'watched'
                  ? (settings.darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-500 text-white')
                  : (settings.darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700')
              }`}
            >
              Watched
            </button>
          </div>
          <div className="text-xs text-gray-500 py-1">
            {filteredVideos.length} videos
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          {searchQuery ? 'No videos match your search' : 'No videos saved yet'}
        </div>
      ) : (
        <ul>
          {filteredVideos.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
              isSelected={selectedVideo?.id === video.id}
              onClick={() => selectVideo(video)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

interface VideoItemProps {
  video: Video;
  isSelected: boolean;
  onClick: () => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, isSelected, onClick }) => {
  const { settings } = useSettings();
  
  return (
    <li
      className={`p-3 border-b ${
        settings.darkMode ? 'border-gray-700' : 'border-gray-200'
      } cursor-pointer transition-colors ${
        isSelected
          ? (settings.darkMode ? 'bg-gray-700' : 'bg-indigo-50')
          : (settings.darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50')
      }`}
      onClick={onClick}
    >
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-20 h-12 object-cover rounded"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-medium truncate ${settings.darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            {video.title}
          </h3>
          <p className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {video.channelName}
          </p>
          <div className="flex items-center mt-1 space-x-2">
            <span className={`text-xs ${settings.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatDate(video.dateAdded)}
            </span>
            {video.syncStatus && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                video.syncStatus === 'synced'
                  ? (settings.darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800')
                  : video.syncStatus === 'pending'
                    ? (settings.darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800')
                    : (settings.darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700')
              }`}>
                {video.syncStatus === 'synced' ? 'Synced' : video.syncStatus === 'pending' ? 'Pending' : 'Local'}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}; 