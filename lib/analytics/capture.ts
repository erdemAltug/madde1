import posthog from "posthog-js";
import { getOrCreateDeviceId } from "@/lib/device-id";
import { getDeviceContext } from "@/lib/analytics/device-context";

/**
 * Sadece tarayıcıda çalışır. PostHog anahtarı yoksa veya init olmadan no-op.
 * device_id ve sayfa bağlamı otomatik eklenir.
 */
export function captureEvent(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    const deviceId = getOrCreateDeviceId();
    posthog.capture(event, {
      device_id: deviceId || undefined,
      ...getDeviceContext(),
      ...properties,
    });
  } catch {
    /* ignore */
  }
}
