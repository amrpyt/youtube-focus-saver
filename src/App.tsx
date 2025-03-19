import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import { MetricsProvider } from './contexts/MetricsContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Videos from './pages/Videos';
import Dashboard from './pages/Dashboard';
import './styles/tailwind.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <VideoProvider>
        <MetricsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/videos" replace />} />
                <Route path="videos" element={<Videos />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<Navigate to="/videos" replace />} />
            </Routes>
          </BrowserRouter>
        </MetricsProvider>
      </VideoProvider>
    </AuthProvider>
  );
};

export default App; 