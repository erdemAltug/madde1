import { getSupabaseService } from "@/lib/supabase/service";

export type WalletRow = {
  id: string;
  user_id: string;
  credits: number;
  unlimited_until: string | null;
  created_at: string;
  updated_at: string;
};

const TABLE = "user_credits";

export async function getWallet(userId: string): Promise<WalletRow | null> {
  const sb = getSupabaseService();
  if (!sb) return null;
  const { data, error } = await sb
    .from(TABLE)
    .select("id, user_id, credits, unlimited_until, created_at, updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as WalletRow | null;
}

export async function ensureWallet(userId: string): Promise<WalletRow> {
  const existing = await getWallet(userId);
  if (existing) return existing;
  const sb = getSupabaseService();
  if (!sb) {
    return { 
      id: "", 
      user_id: userId, 
      credits: 0, 
      unlimited_until: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
  const { data, error } = await sb
    .from(TABLE)
    .insert({ user_id: userId, credits: 0 })
    .select("id, user_id, credits, unlimited_until, created_at, updated_at")
    .single();
  if (error) throw new Error(error.message);
  return data as WalletRow;
}

export async function applyCredits(
  userId: string,
  deltaCredits: number,
  setUnlimitedDays?: number,
): Promise<WalletRow> {
  const sb = getSupabaseService();
  const row = await ensureWallet(userId);
  let credits = row.credits + deltaCredits;
  if (credits < 0) credits = 0;
  let unlimited_until = row.unlimited_until;
  if (setUnlimitedDays && setUnlimitedDays > 0) {
    const base = new Date();
    unlimited_until = new Date(
      base.getTime() + setUnlimitedDays * 86400000,
    ).toISOString();
  }
  if (!sb) {
    return { ...row, credits, unlimited_until };
  }
  const { data, error } = await sb
    .from(TABLE)
    .upsert(
      {
        id: row.id || undefined,
        user_id: userId,
        credits,
        unlimited_until,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("id, user_id, credits, unlimited_until, created_at, updated_at")
    .single();
  if (error) throw new Error(error.message);
  return data as WalletRow;
}

export function isUnlimitedActive(until: string | null): boolean {
  if (!until) return false;
  return new Date(until).getTime() > Date.now();
}

export type ConsumeResult = "ok" | "no_credit" | "no_backend";

/** 1 kredi düş veya sınırsız aktifse geç. Supabase yoksa no_backend. */
export async function tryConsumeCredit(userId: string): Promise<ConsumeResult> {
  const sb = getSupabaseService();
  if (!sb) return "no_backend";
  const row = await ensureWallet(userId);
  if (isUnlimitedActive(row.unlimited_until)) return "ok";
  if (row.credits < 1) return "no_credit";
  const next = row.credits - 1;
  const { error } = await sb
    .from(TABLE)
    .update({
      credits: next,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return "ok";
}
