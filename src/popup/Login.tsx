import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type AuthMode = 'signIn' | 'signUp';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { signIn, signUp, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);
    
    try {
      if (mode === 'signUp') {
        const { error } = await signUp(email, password);
        if (error) throw error;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
    } catch (err) {
      console.error('Auth error:', err);
      setFormError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md p-4">
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold">YouTube Focus Saver</h1>
        <p className="text-gray-600 text-sm">
          {mode === 'signIn' ? 'Sign in to your account' : 'Create a new account'}
        </p>
      </div>
      
      {(formError || error) && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {formError || error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading
              ? 'Loading...'
              : mode === 'signIn'
              ? 'Sign In'
              : 'Sign Up'}
          </button>
        </div>
      </form>
      
      <div className="text-center text-sm">
        {mode === 'signIn' ? (
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('signUp')}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('signIn')}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login; 