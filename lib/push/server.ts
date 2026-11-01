import webpush from "web-push";
import type { SupabaseClient } from "@supabase/supabase-js";

let configured: boolean | null = null;

function configure(): boolean {
  if (configured !== null) return configured;
  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim();
  const priv = process.env.VAPID_PRIVATE_KEY?.trim();
  const subject = process.env.VAPID_SUBJECT?.trim() || "mailto:destek@tryclause.tech";
  configured = Boolean(pub && priv);
  if (configured) webpush.setVapidDetails(subject, pub!, priv!);
  return configured;
}

export type PushPayload = { title: string; body: string; url: string; tag?: string };

/**
 * Kullanıcının tüm cihazlarına push gönderir. Süresi dolmuş abonelikleri (404/410) siler.
 * VAPID anahtarları yoksa hiçbir şey yapmaz. Dönen değer: başarılı gönderim sayısı.
 */
export async function sendPushToUser(
  sb: SupabaseClient,
  userId: string,
  payload: PushPayload,
): Promise<number> {
  if (!configure()) return 0;
  const { data } = await sb
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth")
    .eq("user_id", userId);

  let ok = 0;
  for (const s of data ?? []) {
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        JSON.stringify(payload),
        { TTL: 60 * 60 * 24 },
      );
      ok += 1;
    } catch (err) {
      const code = (err as { statusCode?: number }).statusCode;
      if (code === 404 || code === 410) {
        await sb.from("push_subscriptions").delete().eq("id", s.id);
      }
    }
  }
  return ok;
}
