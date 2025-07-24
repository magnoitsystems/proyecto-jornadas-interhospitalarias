// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oqvuufcfvjsenpiexrwq.supabase.cogit"; // tu URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdnV1ZmNmdmpzZW5waWV4cndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzU5MzksImV4cCI6MjA2ODk1MTkzOX0.StlTyJM6rtb8Xku3MNWvjsm00UMWZeFEto5JqGARHWM"; // tu public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
