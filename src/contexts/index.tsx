import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { VideoProvider } from './VideoContext';
import { MetricsProvider } from './MetricsContext';
import { SettingsProvider } from './SettingsContext';

interface Props {
  children: ReactNode;
}

/**
 * AppProvider combines all context providers into a single component
 * for easier use in the app entry point.
 */
export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <VideoProvider>
          <MetricsProvider>
            {children}
          </MetricsProvider>
        </VideoProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};

// Export all contexts for ease of use
export * from './AuthContext';
export * from './VideoContext';
export * from './MetricsContext';
export * from './SettingsContext'; 