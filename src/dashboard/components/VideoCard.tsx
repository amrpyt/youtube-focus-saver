import React, { useState, useEffect } from 'react';

export interface VideoCardProps {
  id: string;
  title: string;
  channelName: string;
  thumbnailUrl: string;
  dateAdded: number;
  watchDuration?: number;
  focusScore?: number;
  onView: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  channelName,
  thumbnailUrl,
  dateAdded,
  watchDuration,
  focusScore,
  onView
}) => {
  const [imageError, setImageError] = useState(false);
  const [localThumbnail, setLocalThumbnail] = useState<string | null>(null);
  
  useEffect(() => {
    // Get the icon path directly from the extension
    try {
      const fallbackImage = chrome.runtime.getURL('icons/icon128.png');
      console.log("Fallback image URL:", fallbackImage);
      setLocalThumbnail(fallbackImage);
    } catch (error) {
      console.error("Failed to get extension icon:", error);
    }
  }, []);
  
  const formatDuration = (seconds: number): string => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Use static image as backup when both thumbnail and local icon fail
  const staticFallback = "data:image/png;base64,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";

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all h-full"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <img 
          src={imageError ? (localThumbnail || staticFallback) : thumbnailUrl} 
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          onClick={() => onView(id)}
          className="absolute bottom-3 right-3 inline-flex items-center justify-center rounded-md text-xs font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 bg-white text-gray-900 hover:bg-gray-50 opacity-0 group-hover:opacity-100 h-8 px-3"
        >
          View Details
        </button>
        
        {watchDuration && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(watchDuration)}
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {channelName}
        </p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(dateAdded).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            })}
          </span>
          
          {focusScore !== undefined && (
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div 
                  className={`h-full ${
                    focusScore > 0.7 ? 'bg-emerald-500' : 
                    focusScore > 0.4 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.round(focusScore * 100)}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {Math.round(focusScore * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard; 