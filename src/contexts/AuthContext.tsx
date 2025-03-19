import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService, authService, AuthUser, AuthSession } from '../services/AuthService';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signUp: (email: string, password: string) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for an existing session on component mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const session = await authService.getSession();
      
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Session check error:', err);
      setUser(null);
      setIsAuthenticated(false);
      setError('Failed to check authentication status');
    } finally {
      setLoading(false);
    }
  };

  // Setup auth state change listener
  useEffect(() => {
    const subscription = authService.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { user: authUser, error: authError } = await authService.login(email, password);
      
      if (authError) {
        setError(authError.message);
        return { error: authError };
      }
      
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email,
        });
        setIsAuthenticated(true);
      }
      
      return {};
    } catch (err) {
      console.error('Login error:', err);
      const error = new Error('An error occurred during login');
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { user: authUser, error: authError } = await authService.signup(email, password);
      
      if (authError) {
        setError(authError.message);
        return { error: authError };
      }
      
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email,
        });
        setIsAuthenticated(true);
      }
      
      return {};
    } catch (err) {
      console.error('Signup error:', err);
      const error = new Error('An error occurred during signup');
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.logout();
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
      setError('An error occurred during logout');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 