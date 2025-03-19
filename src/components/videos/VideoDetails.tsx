import React, { useState } from 'react';
import { Video } from '../../types';
import Button from '../common/Button';
import { useVideos } from '../../contexts/VideoContext';

interface VideoDetailsProps {
  video: Video;
  onClose: () => void;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ video, onClose }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'transcript' | 'summary'>('details');
  const { updateVideo } = useVideos();

  const handleStatusChange = async (status: 'saved' | 'processing' | 'watched') => {
    await updateVideo({ ...video, status });
  };

  const openVideo = () => {
    window.open(video.url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative pb-[56.25%] bg-gray-900">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="absolute h-full w-full object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{video.title}</h2>
        <p className="text-sm text-gray-700 mt-1">{video.channelName}</p>
        
        <div className="flex justify-between items-center mt-4">
          <Button onClick={openVideo} variant="primary">
            Open in YouTube
          </Button>
          
          <div className="flex items-center space-x-2">
            <select 
              value={video.status}
              onChange={(e) => handleStatusChange(e.target.value as any)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            >
              <option value="saved">Saved</option>
              <option value="processing">Processing</option>
              <option value="watched">Watched</option>
            </select>
          </div>
        </div>
        
        <div className="border-b border-gray-200 mt-6">
          <nav className="-mb-px flex" aria-label="Tabs">
            {(['details', 'transcript', 'summary'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-4 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-4">
          {activeTab === 'details' && (
            <div className="prose max-w-none">
              <p>{video.description || 'No description available.'}</p>
            </div>
          )}
          
          {activeTab === 'transcript' && (
            <div className="prose max-w-none">
              {video.transcript ? (
                <p>{video.transcript}</p>
              ) : (
                <p className="text-gray-500 italic">No transcript available.</p>
              )}
            </div>
          )}
          
          {activeTab === 'summary' && (
            <div className="prose max-w-none">
              {video.summary ? (
                <p>{video.summary}</p>
              ) : (
                <p className="text-gray-500 italic">No summary available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails; 