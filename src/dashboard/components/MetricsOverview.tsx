import React from 'react';

export interface FocusMetrics {
  totalWatchTime: number;
  averageFocusScore: number;
  averageCompletionRate: number;
  totalVideosWatched: number;
}

interface MetricsOverviewProps {
  metrics: FocusMetrics;
  isLoading?: boolean;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ 
  metrics, 
  isLoading = false 
}) => {
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-24 rounded mb-3"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-8 w-20 rounded mt-5"></div>
          </div>
        ))}
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score > 0.7) return 'bg-emerald-500';
    if (score > 0.4) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="flex flex-col justify-between h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Watch Time</div>
        <div className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
          {formatDuration(metrics.totalWatchTime)}
        </div>
      </div>
      
      <div className="flex flex-col justify-between h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Focus Score</div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-3xl font-semibold text-gray-900 dark:text-white">
            {Math.round(metrics.averageFocusScore * 100)}%
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mt-1">
            <div 
              className={`h-full ${getScoreColor(metrics.averageFocusScore)}`}
              style={{ width: `${Math.round(metrics.averageFocusScore * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-between h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-3xl font-semibold text-gray-900 dark:text-white">
            {Math.round(metrics.averageCompletionRate * 100)}%
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mt-1">
            <div 
              className="h-full bg-blue-500"
              style={{ width: `${Math.round(metrics.averageCompletionRate * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col justify-between h-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-md">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Videos Watched</div>
        <div className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
          {metrics.totalVideosWatched}
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview; 