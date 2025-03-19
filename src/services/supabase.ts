import { createClient } from '@supabase/supabase-js';

// The URL and key would typically come from environment variables
// Define the variables with default empty strings to avoid TypeScript errors
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 