"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
// The URL and key would typically come from environment variables
// Define the variables with default empty strings to avoid TypeScript errors
var supabaseUrl = process.env.VITE_SUPABASE_URL || '';
var supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
// Create Supabase client
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
