import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Tarayıcıda kullanım (RLS geçerli). Yeni panel: publishable key;
 * eski projeler: NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * Uses singleton pattern to prevent multiple GoTrueClient instances.
 */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (cachedClient) {
    return cachedClient;
  }
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  
  cachedClient = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  
  return cachedClient;
}
