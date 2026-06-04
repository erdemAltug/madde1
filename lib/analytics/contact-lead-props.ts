import { AnalyticsEvents } from "@/lib/analytics/events";

export type ContactLeadPayload = {
  name: string;
  email: string;
  message: string;
  source?: string;
};

/** PostHog / Sentry için ortak alanlar */
export function buildContactLeadProperties(
  payload: ContactLeadPayload,
  channel: "client" | "server",
) {
  const excerpt = payload.message.trim().slice(0, 400);
  return {
    event: AnalyticsEvents.CONTACT_FORM_SUBMITTED,
    distinct_id: payload.email.trim().toLowerCase(),
    properties: {
      source: payload.source ?? "enterprise",
      contact_name: payload.name,
      contact_email: payload.email,
      message_preview: excerpt,
      message_length: payload.message.length,
      lead_channel: channel,
      is_lead: true,
    },
    person: {
      email: payload.email,
      name: payload.name,
      last_contact_source: payload.source ?? "enterprise",
      last_contact_at: new Date().toISOString(),
    },
  };
}
