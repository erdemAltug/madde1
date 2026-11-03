/**
 * Basit, süreç içi sabit pencere limiti. Serverless'ta her örnek kendi sayacını tutar;
 * kötüye kullanımı yavaşlatmak için yeterli, kesin kota için değil.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5_000) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
    }
    return { ok: true, retryAfterSec: 0 };
  }
  if (b.count >= limit) {
    return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, retryAfterSec: 0 };
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

const HOUR = 60 * 60 * 1000;

/** Saatlik IP limiti; aşıldıysa hazır 429 yanıtı döner, aşılmadıysa null. */
export function limitByIp(
  req: Request,
  name: string,
  perHour: number,
): Response | null {
  const r = rateLimit(`${name}:${clientIp(req)}`, perHour, HOUR);
  if (r.ok) return null;
  return Response.json(
    { error: "Kısa sürede çok fazla istek gönderildi. Biraz sonra tekrar deneyin." },
    { status: 429, headers: { "Retry-After": String(r.retryAfterSec) } },
  );
}
