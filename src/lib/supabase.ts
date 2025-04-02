
import { createClient } from '@supabase/supabase-js';

// Check if environment variables are defined, otherwise use fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-public-anon-key';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

