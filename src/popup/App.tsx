import React from 'react';
import { useAuth } from '../hooks';

const App: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">YouTube Focus Saver</h1>
      
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.email}</p>
          <p>Authenticated successfully!</p>
        </div>
      ) : (
        <div>
          <p>Not authenticated</p>
          <p>Please login to access your saved videos and metrics.</p>
        </div>
      )}
    </div>
  );
};

export default App; 