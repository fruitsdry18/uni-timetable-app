import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://umsolycodmhgfsxlkxhi.supabase.co";
const supabaseAnonKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtc29seWNvZG1oZ2ZzeGxreGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNzk0MDUsImV4cCI6MjA5OTg1NTQwNX0._xpC1O2pn6nQhcaAzkxVj9cwwdYQjgx25jY_4H-FWAw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
