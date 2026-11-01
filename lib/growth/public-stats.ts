import { unstable_cache } from "next/cache";
import { getSupabaseService } from "@/lib/supabase/service";

export type PublicStats = {
  /** Hesaplara kaydedilmiş sözleşme taraması */
  analyses: number;
  /** Takvimde takip edilen hukuki tarih */
  trackedDates: number;
};

/** Gösterim eşiği: küçük sayılar güven değil şüphe yaratır, o zaman bant hiç görünmez. */
export const STATS_MIN_TO_SHOW = 100;

async function load(): Promise<PublicStats | null> {
  const sb = getSupabaseService();
  if (!sb) return null;
  const [a, e] = await Promise.all([
    sb.from("contract_analyses").select("id", { count: "exact", head: true }),
    sb.from("legal_events").select("id", { count: "exact", head: true }),
  ]);
  if (a.error && e.error) return null;
  return { analyses: a.count ?? 0, trackedDates: e.count ?? 0 };
}

/** Gerçek sayılar, saatte bir yenilenir. Uydurma rakam yok. */
export const getPublicStats = unstable_cache(load, ["public-stats-v1"], { revalidate: 3600 });
