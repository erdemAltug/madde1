import posthog from "posthog-js";
import { getOrCreateDeviceId } from "@/lib/device-id";
import { getDeviceContext } from "@/lib/analytics/device-context";

let bootstrapped = false;

export function bootstrapPostHogIdentity(): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  if (bootstrapped) return;

  try {
    const deviceId = getOrCreateDeviceId();
    if (deviceId) {
      posthog.identify(deviceId, {
        device_id: deviceId,
        identity_type: "device",
      });
    }
    posthog.register({
      device_id: deviceId || undefined,
      ...getDeviceContext(),
    });
    bootstrapped = true;
  } catch {
    /* ignore */
  }
}

/** Kayıt / giriş sonrası cihaz geçmişini kullanıcıya bağla */
export function identifyAuthUser(
  userId: string,
  traits?: Record<string, string | undefined>,
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  try {
    const deviceId = getOrCreateDeviceId();
    if (deviceId && deviceId !== userId) {
      posthog.alias(userId, deviceId);
    }
    posthog.identify(userId, {
      ...traits,
      device_id: deviceId,
      identity_type: "auth",
    });
    posthog.register({ device_id: deviceId, auth_user_id: userId });
  } catch {
    /* ignore */
  }
}

export function refreshPageContext(): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.register(getDeviceContext());
  } catch {
    /* ignore */
  }
}
