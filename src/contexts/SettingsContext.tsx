import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { DatabaseService } from '../services/DatabaseService';

export interface AppSettings {
  cloudSync: boolean;
  autoSaveVideos: boolean;
  darkMode: boolean;
  generateSummary: boolean;
  openAiApiKey: string;
  notifyNewFeatures: boolean;
}

const defaultSettings: AppSettings = {
  cloudSync: false,
  autoSaveVideos: true,
  darkMode: false,
  generateSummary: false,
  openAiApiKey: '',
  notifyNewFeatures: true,
};

interface SettingsContextType {
  settings: AppSettings;
  loading: boolean;
  error: string | null;
  updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettingsLocal] = useLocalStorage<AppSettings>('app_settings', defaultSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const dbService = new DatabaseService();

  // Sync with database when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      syncSettingsWithDatabase();
    }
  }, [isAuthenticated, user]);

  const syncSettingsWithDatabase = async () => {
    if (!isAuthenticated || !user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Get settings from database
      const dbSettings = await dbService.getUserSettings(user.id);
      
      if (dbSettings) {
        // Database settings take precedence over local
        setSettingsLocal({
          ...settings,
          ...dbSettings,
        });
      } else {
        // Save local settings to database if no db settings exist
        await dbService.saveUserSettings(user.id, settings);
      }
    } catch (err) {
      console.error('Error syncing settings with database:', err);
      setError('Failed to sync settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      setLoading(true);
      setError(null);
      
      // Update local settings
      const updatedSettings = { ...settings, ...newSettings };
      setSettingsLocal(updatedSettings);
      
      // Sync to database if authenticated
      if (isAuthenticated && user) {
        await dbService.saveUserSettings(user.id, updatedSettings);
      }
    } catch (err) {
      console.error('Error updating settings:', err);
      setError('Failed to update settings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetSettings = () => {
    setSettingsLocal(defaultSettings);
    
    if (isAuthenticated && user) {
      dbService.saveUserSettings(user.id, defaultSettings)
        .catch(err => {
          console.error('Error resetting settings in database:', err);
          setError('Failed to reset settings in cloud');
        });
    }
  };

  const value = {
    settings,
    loading,
    error,
    updateSettings,
    resetSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  
  return context;
}; 