import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fpfatrgnieliwlqxbkrk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwZmF0cmduaWVsaXdscXhia3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNjIxMjUsImV4cCI6MjA1MTgzODEyNX0.B9B1J6uFzeyc4EJFWVSJ9Kiiur3btjkW2fxAfM9cFcc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
