import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: Error | null;
}

export interface AuthSession {
  user: {
    id: string;
    email: string | null;
  };
}

export class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { user: null, error };
      }
      
      if (!data || !data.user) {
        return { user: null, error: new Error('No user returned from login') };
      }
      
      return {
        user: {
          id: data.user.id,
          email: data.user.email || '',
        },
        error: null,
      };
    } catch (error) {
      console.error('Login error:', error);
      return { user: null, error: error as Error };
    }
  }
  
  async signup(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        return { user: null, error };
      }
      
      if (!data || !data.user) {
        return { user: null, error: new Error('No user returned from signup') };
      }
      
      return {
        user: {
          id: data.user.id,
          email: data.user.email || '',
        },
        error: null,
      };
    } catch (error) {
      console.error('Signup error:', error);
      return { user: null, error: error as Error };
    }
  }
  
  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
  
  async getSession(): Promise<AuthSession | null> {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Get session error:', error);
      throw error;
    }
    
    if (!data.session) {
      return null;
    }
    
    return {
      user: {
        id: data.session.user.id,
        email: data.session.user.email || null,
      },
    };
  }

  async refreshSession(): Promise<AuthUser | null> {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Refresh session error:', error);
        return null;
      }
      
      if (!data || !data.session) {
        return null;
      }
      
      return {
        id: data.session.user.id,
        email: data.session.user.email || '',
      };
    } catch (error) {
      console.error('Refresh session error:', error);
      return null;
    }
  }
  
  onAuthStateChange(callback: (event: string, session: AuthSession | null) => void) {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        callback(event, {
          user: {
            id: session.user.id,
            email: session.user.email || null,
          },
        });
      } else {
        callback(event, null);
      }
    });
    
    return data;
  }
}

// Export a singleton instance
export const authService = new AuthService(); 