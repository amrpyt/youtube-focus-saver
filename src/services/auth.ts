import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  createdAt: string;
}

class AuthService {
  /**
   * Get the current logged in user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      return null;
    }
    
    return {
      id: session.user.id,
      email: session.user.email!,
      createdAt: session.user.created_at
    };
  }
  
  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null, error: string | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return { user: null, error: error.message };
    }
    
    if (!data || !data.user) {
      return { user: null, error: 'No user data returned' };
    }
    
    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        createdAt: data.user.created_at
      },
      error: null
    };
  }
  
  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string): Promise<{ user: AuthUser | null, error: string | null }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (error) {
      return { user: null, error: error.message };
    }
    
    if (!data || !data.user) {
      return { user: null, error: 'No user data returned' };
    }
    
    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        createdAt: data.user.created_at
      },
      error: null
    };
  }
  
  /**
   * Sign out the current user
   */
  async signOut(): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { error: error.message };
    }
    
    return { error: null };
  }
  
  /**
   * Send a password reset email
   */
  async resetPassword(email: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: chrome.runtime.getURL('popup.html')
    });
    
    if (error) {
      return { error: error.message };
    }
    
    return { error: null };
  }
}

export const authService = new AuthService(); 