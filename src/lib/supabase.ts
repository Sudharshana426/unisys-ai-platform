
import { createClient } from '@supabase/supabase-js';

// When using Lovable's Supabase integration, these values are automatically injected
// during the build process from the connected Supabase project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL and/or Anon Key not found in environment variables.');
  console.info('Make sure you have connected your Supabase project in the Lovable interface.');
}

// Create a single supabase client for interacting with your database
// Use dummy values if environment variables are not available (for development only)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
