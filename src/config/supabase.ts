import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://vumeycwzwxwwefrpksql.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bWV5Y3d6d3h3d2VmcnBrc3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODIzNDIsImV4cCI6MjA1NzA1ODM0Mn0.b89cJQY8lGLXhAx_2gFc-8xdFNTa8SMflAFwJS_gFyU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database tables
export interface SavedVideo {
    id: number;
    user_id: string;
    video_id: string;
    title: string;
    description?: string;
    thumbnail_url?: string;
    channel_name?: string;
    duration?: number;
    transcript?: string;
    created_at: string;
}

export interface WatchHistory {
    id: number;
    user_id: string;
    video_id: string;
    start_time: string;
    end_time?: string;
    duration_watched?: number;
    completed: boolean;
}

export interface FocusMetrics {
    id: number;
    user_id: string;
    video_id: string;
    session_id: number;
    focus_score: number;
    tab_switches: number;
    pauses: number;
    rewinds: number;
    measured_at: string;
}

export interface UserPreferences {
    user_id: string;
    auto_save: boolean;
    notifications_enabled: boolean;
    focus_mode_enabled: boolean;
    theme: 'light' | 'dark';
    updated_at: string;
} 