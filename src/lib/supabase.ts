import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public client — safe to use in browser & server components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service role client — server-only, for admin API routes
export function getServiceSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(supabaseUrl, serviceKey);
}

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string | null;
  read_time: string | null;
  english_summary: string | null;
  burmese_summary: string | null;
  english_content: string | null;
  burmese_content: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};
