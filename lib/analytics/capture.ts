import posthog from "posthog-js";
import { getOrCreateDeviceId } from "@/lib/device-id";
import { getDeviceContext } from "@/lib/analytics/device-context";
import { deriveToolEvent, ToolEvents } from "@/lib/analytics/tool-events";

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
    const base = { device_id: deviceId || undefined, ...getDeviceContext() };
    posthog.capture(event, { ...base, ...properties });
    // Birleşik araç ölçümü: Tool_Started / Tool_Succeeded / Tool_Failed + tool
    const derived = deriveToolEvent(event, properties);
    if (derived) posthog.capture(derived.event, { ...base, ...derived.properties });
  } catch {
    /* ignore */
  }
}

/** Araç sayfası açıldı — Tool_Opened (başarı oranının paydası) */
export function captureToolOpened(tool: string): void {
  if (typeof window === "undefined") return;
  captureEvent(ToolEvents.OPENED, { tool, tool_path: window.location.pathname });
}
