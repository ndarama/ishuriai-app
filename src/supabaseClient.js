import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase configuration. Please check your .env file.');
  console.log('Required environment variables:');
  console.log('- VITE_SUPABASE_URL');
  console.log('- VITE_SUPABASE_ANON_KEY');
} else {
  console.log('Supabase URL:', SUPABASE_URL);
  console.log('Supabase Anon Key:', SUPABASE_ANON_KEY ? 'Present' : 'Missing');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
