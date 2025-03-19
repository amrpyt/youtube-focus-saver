import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import styles
import './styles/tailwind.css';

// Import pages
import Dashboard from './pages/Dashboard';
import Videos from './pages/Videos';
import Login from './pages/Login';
import Layout from './components/Layout';

// Context providers
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Videos />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

// Initialize the app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
} 