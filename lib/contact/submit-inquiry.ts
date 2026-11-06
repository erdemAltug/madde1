import * as Sentry from "@sentry/nextjs";
import { buildContactLeadProperties } from "@/lib/analytics/contact-lead-props";
import { capturePostHogServer } from "@/lib/analytics/posthog-server";
import { CONTACT_EMAIL } from "@/lib/site/contact";
import { getSupabaseService } from "@/lib/supabase/service";
import type { ContactInquiryInput } from "@/lib/contact/schema";

/** Gelen kutusunda talep türü bir bakışta görünsün */
const SUBJECT_LABEL: Record<string, string> = {
  pricing_plus: "💳 PLUS ÜYELİK TALEBİ",
  pricing_b2c: "Bireysel talep",
  enterprise: "🏢 Kurumsal talep",
  plan_single: "🎯 PAKET TALEBİ — Tek Seferlik",
  plan_personal: "🎯 PAKET TALEBİ — Bireysel",
  plan_business: "🎯 PAKET TALEBİ — Şirketim",
};

/** Talepler bu adrese gider (Vercel'de LEAD_NOTIFY_EMAIL); yoksa genel iletişim adresi */
function leadRecipients(): string[] {
  const raw = process.env.LEAD_NOTIFY_EMAIL?.trim();
  const list = raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : [];
  return list.length ? list : [CONTACT_EMAIL];
}

async function sendViaResend(input: ContactInquiryInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from =
    process.env.RESEND_FROM_EMAIL ?? "Clause <onboarding@resend.dev>";
  const label = SUBJECT_LABEL[input.source ?? ""] ?? input.source ?? "İletişim";
  const subject = `[Clause] ${label} — ${input.name} <${input.email}>`;
  const text = [
    `Kaynak: ${input.source ?? "web"}`,
    `Ad: ${input.name}`,
    `E-posta: ${input.email}`,
    "",
    input.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: leadRecipients(),
      reply_to: input.email,
      subject,
      text,
    }),
  });

  return res.ok;
}

async function persistInquiry(input: ContactInquiryInput): Promise<void> {
  const sb = getSupabaseService();
  if (!sb) return;

  const { error } = await sb.from("contact_inquiries").insert({
    source: input.source ?? "enterprise",
    name: input.name,
    email: input.email,
    message: input.message,
  });

  if (error) {
    Sentry.captureException(error, { tags: { event: "contact_db_insert" } });
  }
}

export async function submitContactInquiry(
  input: ContactInquiryInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await persistInquiry(input);

    const mailed = await sendViaResend(input).catch(() => false);
    if (!mailed) {
      // Talep veritabanında ve PostHog'da kalır; e-posta gitmediyse görünür olsun
      Sentry.captureMessage("Lead e-postası gönderilemedi (RESEND_API_KEY / gönderen alan adı?)", {
        level: "error",
        tags: { event: "contact_mail_failed", source: input.source ?? "web" },
      });
    }

    const lead = buildContactLeadProperties(
      {
        name: input.name,
        email: input.email,
        message: input.message,
        source: input.source,
      },
      "server",
    );

    await capturePostHogServer(
      lead.distinct_id,
      lead.event,
      lead.properties,
      lead.person,
    );

    Sentry.withScope((scope) => {
      scope.setLevel("warning");
      scope.setTag("event", "contact_inquiry");
      scope.setTag("source", input.source ?? "web");
      scope.setTag("posthog_event", lead.event);
      scope.setUser({ email: input.email, username: input.name });
      scope.setContext("contact", {
        name: input.name,
        email: input.email,
        source: input.source ?? "web",
        message: input.message.slice(0, 2000),
        message_preview: lead.properties.message_preview,
      });
      Sentry.captureMessage("📩 YENİ İLETİŞİM TALEBİ", {
        fingerprint: ["contact-inquiry"],
      });
    });

    return { ok: true };
  } catch (err) {
    Sentry.captureException(err, { tags: { event: "contact_submit_error" } });
    return { ok: false, error: "Mesaj gönderilemedi. Lütfen tekrar deneyin." };
  }
}
