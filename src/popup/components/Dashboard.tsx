import React, { useState, useEffect } from 'react';
import { AuthUser } from '../../services/auth';
import { DatabaseService } from '../../services/database';

interface DashboardProps {
  user: AuthUser;
  onSignOut: () => void;
  onBackToVideos: () => void;
}

interface FocusMetrics {
  totalWatchTime: number;
  focusScore: number;
  pauseCount: number;
  tabSwitchCount: number;
  completionRate: number;
}

interface VideoSession {
  id: string;
  videoId: string;
  videoTitle: string;
  startTime: string;
  endTime: string | null;
  watchDuration: number;
  focusScore: number;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSignOut, onBackToVideos }) => {
  const [metrics, setMetrics] = useState<FocusMetrics | null>(null);
  const [recentSessions, setRecentSessions] = useState<VideoSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'overview' | 'sessions' | 'trends'>('overview');
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dbService = new DatabaseService();
        
        // Fetch aggregated metrics
        const userMetrics = await dbService.getUserMetrics(user.id);
        if (userMetrics) {
          setMetrics(userMetrics);
        }
        
        // Fetch recent sessions
        const sessions = await dbService.getRecentSessions(user.id, 5);
        if (sessions) {
          setRecentSessions(sessions);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user.id]);
  
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            onClick={onBackToVideos}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-bold text-lg text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {user.email}
          </div>
          <button
            onClick={onSignOut}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex border-b dark:border-gray-700">
        <button
          className={`flex-1 py-2 text-center text-sm ${
            activeView === 'overview' 
              ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button
          className={`flex-1 py-2 text-center text-sm ${
            activeView === 'sessions' 
              ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveView('sessions')}
        >
          Recent Sessions
        </button>
        <button
          className={`flex-1 py-2 text-center text-sm ${
            activeView === 'trends' 
              ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveView('trends')}
        >
          Trends
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : activeView === 'overview' ? (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Focus Overview</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Watch Time</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics ? formatDuration(metrics.totalWatchTime) : '0h 0m'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Focus Score</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics ? `${Math.round(metrics.focusScore * 100)}%` : '0%'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
                <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-1">Completion Rate</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {metrics ? `${Math.round(metrics.completionRate * 100)}%` : '0%'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
                <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pause Count</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {metrics ? metrics.pauseCount : 0}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
                <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tab Switches</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {metrics ? metrics.tabSwitchCount : 0}
                </p>
              </div>
            </div>
          </div>
        ) : activeView === 'sessions' ? (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Sessions</h2>
            
            {recentSessions.length > 0 ? (
              <div className="space-y-4">
                {recentSessions.map(session => (
                  <div key={session.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {session.videoTitle}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>
                        {new Date(session.startTime).toLocaleDateString()} at {new Date(session.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                      <span>{formatDuration(session.watchDuration)}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm mr-2">Focus Score:</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            session.focusScore > 0.7 ? 'bg-green-500' : 
                            session.focusScore > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.round(session.focusScore * 100)}%` }}
                        ></div>
                      </div>
                      <div className="ml-2 text-sm font-medium">
                        {Math.round(session.focusScore * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No watch sessions recorded yet. Start watching videos to track your focus!
              </div>
            )}
          </div>
        ) : (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Focus Trends</h2>
            
            {/* Placeholder for chart - in a real implementation, you would use a chart library */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-48 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Focus trends visualization will be shown here.<br />
                Coming soon in the next update.
              </p>
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Your focus has been improving over time. Keep up the good work!</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Best focus time: Mornings (9-11 AM)</li>
                <li>Most watched category: Educational</li>
                <li>Average session length: {metrics ? formatDuration(metrics.totalWatchTime / (recentSessions.length || 1)) : '0m'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 