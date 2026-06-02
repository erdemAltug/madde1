import * as Sentry from "@sentry/nextjs";
import { CONTACT_EMAIL } from "@/lib/site/contact";
import { getSupabaseService } from "@/lib/supabase/service";
import type { ContactInquiryInput } from "@/lib/contact/schema";

async function sendViaResend(input: ContactInquiryInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from =
    process.env.RESEND_FROM_EMAIL ?? "Clause <onboarding@resend.dev>";
  const subject = `[Clause] ${input.source ?? "İletişim"} — ${input.name}`;
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
      to: [CONTACT_EMAIL],
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

    const emailed = await sendViaResend(input);

    Sentry.captureMessage("📩 İletişim formu", {
      level: "info",
      tags: { event: "contact_inquiry", source: input.source ?? "web" },
      extra: {
        name: input.name,
        email: input.email,
        message: input.message.slice(0, 500),
        emailed,
        to: CONTACT_EMAIL,
      },
    });

    return { ok: true };
  } catch (err) {
    Sentry.captureException(err, { tags: { event: "contact_submit_error" } });
    return { ok: false, error: "Mesaj gönderilemedi. Lütfen tekrar deneyin." };
  }
}
