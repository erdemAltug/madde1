import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Tarayıcıda kullanım (RLS geçerli). Yeni panel: publishable key;
 * eski projeler: NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export function getSupabaseBrowser(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}
