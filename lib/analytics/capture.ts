import posthog from "posthog-js";

/**
 * Sadece tarayıcıda çalışır. PostHog anahtarı yoksa veya init olmadan no-op.
 */
export function captureEvent(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.capture(event, properties);
  } catch {
    /* ignore */
  }
}
