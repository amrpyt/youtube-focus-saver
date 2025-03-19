import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vumeycwzwxwwefrpksql.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bWV5Y3d6d3h3d2VmcnBrc3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODIzNDIsImV4cCI6MjA1NzA1ODM0Mn0.b89cJQY8lGLXhAx_2gFc-8xdFNTa8SMflAFwJS_gFyU';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
export type { SupabaseClient }; 