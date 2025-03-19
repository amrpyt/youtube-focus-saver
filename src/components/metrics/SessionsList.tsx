import React from 'react';
import { WatchSession } from '../../types';
import Card from '../common/Card';

interface SessionsListProps {
  sessions: WatchSession[];
  className?: string;
}

const SessionsList: React.FC<SessionsListProps> = ({ sessions, className = '' }) => {
  return (
    <Card 
      title="Recent Watch Sessions" 
      className={className}
      noPadding
    >
      <div className="divide-y divide-gray-200">
        {sessions.length === 0 ? (
          <p className="px-5 py-4 text-sm text-gray-500 italic">No watch sessions recorded yet.</p>
        ) : (
          sessions.map((session, index) => (
            <div key={session.id || index} className="px-5 py-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate" style={{ maxWidth: '250px' }}>
                    {session.videoTitle || 'Unknown Video'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(session.startTime).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Focus: {Math.round(session.focusPercentage)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    Distractions: {session.distractionCount || 0}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default SessionsList; 