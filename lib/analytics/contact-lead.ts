import posthog from "posthog-js";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import {
  buildContactLeadProperties,
  type ContactLeadPayload,
} from "@/lib/analytics/contact-lead-props";

/** İletişim formu başarılı — tarayıcıda PostHog + identify */
export function trackContactLeadSubmitted(payload: ContactLeadPayload): void {
  const built = buildContactLeadProperties(payload, "client");

  captureEvent(built.event, built.properties);

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  try {
    posthog.identify(built.distinct_id, built.person);
  } catch {
    /* ignore */
  }
}

/** Form hata (isteğe bağlı funnel) */
export function trackContactLeadError(
  payload: Partial<ContactLeadPayload> & { source?: string; error_message: string },
): void {
  captureEvent(AnalyticsEvents.CONTACT_FORM_ERROR, {
    source: payload.source ?? "enterprise",
    contact_email: payload.email,
    error_message: payload.error_message.slice(0, 200),
  });
}
