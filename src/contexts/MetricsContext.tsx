import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { DatabaseService } from '../services/DatabaseService';
import { formatMinutes, formatPercentage } from '../utils/format';

export interface FocusMetrics {
  totalWatchTime: number; // in minutes
  focusedWatchTime: number; // in minutes
  focusPercentage: number; // 0-100
  videoCount: number;
  sessionsCount: number;
  lastVideoDate: string | null;
  formattedTotalWatchTime?: string;
  formattedFocusedWatchTime?: string;
  formattedFocusPercentage?: string;
}

export interface WatchSession {
  id: string;
  userId: string;
  videoId: string;
  startTime: string;
  endTime: string | null;
  duration: number | null; // in seconds
  focusPercentage: number;
  videoTitle: string;
}

interface MetricsContextType {
  metrics: FocusMetrics;
  recentSessions: WatchSession[];
  loading: boolean;
  error: string | null;
  fetchMetrics: () => Promise<void>;
  fetchRecentSessions: () => Promise<void>;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

const defaultMetrics: FocusMetrics = {
  totalWatchTime: 0,
  focusedWatchTime: 0,
  focusPercentage: 0,
  videoCount: 0,
  sessionsCount: 0,
  lastVideoDate: null,
  formattedTotalWatchTime: '0m',
  formattedFocusedWatchTime: '0m',
  formattedFocusPercentage: '0%',
};

export const MetricsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<FocusMetrics>(defaultMetrics);
  const [recentSessions, setRecentSessions] = useState<WatchSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const dbService = new DatabaseService();

  // Load metrics when user changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchMetrics();
      fetchRecentSessions();
    } else {
      setMetrics(defaultMetrics);
      setRecentSessions([]);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchMetrics = async () => {
    if (!isAuthenticated || !user) {
      setMetrics(defaultMetrics);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const userMetrics = await dbService.getUserMetrics(user.id);
      
      if (userMetrics) {
        const formatted: FocusMetrics = {
          ...userMetrics,
          formattedTotalWatchTime: formatMinutes(userMetrics.totalWatchTime),
          formattedFocusedWatchTime: formatMinutes(userMetrics.focusedWatchTime),
          formattedFocusPercentage: formatPercentage(userMetrics.focusPercentage),
        };
        
        setMetrics(formatted);
      } else {
        setMetrics(defaultMetrics);
      }
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError('Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentSessions = async () => {
    if (!isAuthenticated || !user) {
      setRecentSessions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const sessions = await dbService.getRecentWatchSessions(user.id, 10);
      setRecentSessions(sessions);
    } catch (err) {
      console.error('Error fetching watch sessions:', err);
      setError('Failed to load watch sessions');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    metrics,
    recentSessions,
    loading,
    error,
    fetchMetrics,
    fetchRecentSessions,
  };

  return <MetricsContext.Provider value={value}>{children}</MetricsContext.Provider>;
};

export const useMetrics = (): MetricsContextType => {
  const context = useContext(MetricsContext);
  
  if (context === undefined) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  
  return context;
}; 