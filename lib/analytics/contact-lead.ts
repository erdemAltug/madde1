import posthog from "posthog-js";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

/** İletişim formu — PostHog Live events / kişi profilinde görünür */
export function trackContactLeadSubmitted(payload: {
  name: string;
  email: string;
  message: string;
  source?: string;
}): void {
  const excerpt = payload.message.trim().slice(0, 400);

  captureEvent(AnalyticsEvents.CONTACT_FORM_SUBMITTED, {
    source: payload.source ?? "enterprise",
    contact_name: payload.name,
    contact_email: payload.email,
    message_preview: excerpt,
    message_length: payload.message.length,
  });

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  try {
    posthog.identify(payload.email, {
      email: payload.email,
      name: payload.name,
      last_contact_source: payload.source ?? "enterprise",
    });
    posthog.capture(AnalyticsEvents.CONTACT_FORM_SUBMITTED, {
      source: payload.source ?? "enterprise",
      contact_name: payload.name,
      contact_email: payload.email,
      message_preview: excerpt,
    });
  } catch {
    /* ignore */
  }
}
