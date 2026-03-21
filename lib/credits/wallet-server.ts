import { getSupabaseService } from "@/lib/supabase/service";

export type WalletRow = {
  device_id: string;
  credits: number;
  unlimited_until: string | null;
};

const TABLE = "user_credits";

export async function getWallet(deviceId: string): Promise<WalletRow | null> {
  const sb = getSupabaseService();
  if (!sb) return null;
  const { data, error } = await sb
    .from(TABLE)
    .select("device_id, credits, unlimited_until")
    .eq("device_id", deviceId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as WalletRow | null;
}

export async function ensureWallet(deviceId: string): Promise<WalletRow> {
  const existing = await getWallet(deviceId);
  if (existing) return existing;
  const sb = getSupabaseService();
  if (!sb) {
    return { device_id: deviceId, credits: 0, unlimited_until: null };
  }
  const { data, error } = await sb
    .from(TABLE)
    .insert({ device_id: deviceId, credits: 0 })
    .select("device_id, credits, unlimited_until")
    .single();
  if (error) throw new Error(error.message);
  return data as WalletRow;
}

export async function applyCredits(
  deviceId: string,
  deltaCredits: number,
  setUnlimitedDays?: number,
): Promise<WalletRow> {
  const sb = getSupabaseService();
  const row = await ensureWallet(deviceId);
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
    return { device_id: deviceId, credits, unlimited_until };
  }
  const { data, error } = await sb
    .from(TABLE)
    .upsert(
      {
        device_id: deviceId,
        credits,
        unlimited_until,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "device_id" },
    )
    .select("device_id, credits, unlimited_until")
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
export async function tryConsumeCredit(deviceId: string): Promise<ConsumeResult> {
  const sb = getSupabaseService();
  if (!sb) return "no_backend";
  const row = await ensureWallet(deviceId);
  if (isUnlimitedActive(row.unlimited_until)) return "ok";
  if (row.credits < 1) return "no_credit";
  const next = row.credits - 1;
  const { error } = await sb
    .from(TABLE)
    .update({
      credits: next,
      updated_at: new Date().toISOString(),
    })
    .eq("device_id", deviceId);
  if (error) throw new Error(error.message);
  return "ok";
}
