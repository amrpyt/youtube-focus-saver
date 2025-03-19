"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = exports.supabaseAnonKey = exports.supabaseUrl = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
exports.supabaseUrl = 'https://vumeycwzwxwwefrpksql.supabase.co';
exports.supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bWV5Y3d6d3h3d2VmcnBrc3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODIzNDIsImV4cCI6MjA1NzA1ODM0Mn0.b89cJQY8lGLXhAx_2gFc-8xdFNTa8SMflAFwJS_gFyU';
exports.supabase = (0, supabase_js_1.createClient)(exports.supabaseUrl, exports.supabaseAnonKey);
