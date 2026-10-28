import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { getSupabaseService } from "@/lib/supabase/service";
import { SITE_URL } from "@/lib/seo/site";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type DueEvent = {
  id: string;
  user_id: string;
  title: string;
  due_date: string;
  notes: string | null;
  remind_days: number[] | null;
  reminded_days: number[] | null;
};

/** Türkiye saatine göre bugünün tarihi (YYYY-MM-DD) */
function todayInIstanbul(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(new Date());
}

function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

function diffDays(fromIso: string, toIso: string): number {
  const a = Date.parse(`${fromIso}T00:00:00Z`);
  const b = Date.parse(`${toIso}T00:00:00Z`);
  return Math.round((b - a) / 86_400_000);
}

function formatTr(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function whenLabel(days: number): string {
  if (days === 0) return "bugün";
  if (days === 1) return "yarın";
  return `${days} gün sonra`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

async function sendEmail(to: string, subject: string, text: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const from = process.env.RESEND_FROM_EMAIL ?? "Clause <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text, html }),
  });
  return res.ok;
}

/**
 * Günlük çalışır (vercel.json → crons). Her açık tarih için remind_days içindeki gün kala
 * (varsayılan 30, 7, 1 ve 0) kullanıcıya tek bir özet e-posta gönderir.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sb = getSupabaseService();
  if (!sb) return NextResponse.json({ error: "service_unavailable" }, { status: 503 });

  const today = todayInIstanbul();
  const horizon = addDaysIso(today, 31);

  const { data, error } = await sb
    .from("legal_events")
    .select("id, user_id, title, due_date, notes, remind_days, reminded_days")
    .eq("done", false)
    .gte("due_date", today)
    .lte("due_date", horizon)
    .limit(2000);

  if (error) {
    Sentry.captureException(error, { tags: { event: "reminders_query" } });
    return NextResponse.json({ error: "query_failed" }, { status: 500 });
  }

  const byUser = new Map<string, { event: DueEvent; days: number }[]>();
  for (const ev of (data ?? []) as DueEvent[]) {
    const days = diffDays(today, ev.due_date);
    const wanted = new Set([...(ev.remind_days ?? [30, 7, 1]), 0]);
    const already = new Set(ev.reminded_days ?? []);
    if (!wanted.has(days) || already.has(days)) continue;
    const list = byUser.get(ev.user_id) ?? [];
    list.push({ event: ev, days });
    byUser.set(ev.user_id, list);
  }

  let sent = 0;
  let skipped = 0;

  for (const [userId, items] of Array.from(byUser.entries())) {
    const { data: userData } = await sb.auth.admin.getUserById(userId);
    const email = userData?.user?.email;
    if (!email) {
      skipped += 1;
      continue;
    }

    items.sort((a, b) => a.days - b.days);
    const first = items[0];
    const subject =
      items.length === 1
        ? `Hatırlatma: ${first.event.title} ${whenLabel(first.days)}`
        : `Hatırlatma: ${items.length} hukuki tarihiniz yaklaşıyor`;

    const lines = items.map(
      ({ event, days }) =>
        `• ${event.title} — ${formatTr(event.due_date)} (${whenLabel(days)})${event.notes ? `\n  ${event.notes}` : ""}`,
    );
    const panelUrl = `${SITE_URL}/panel`;
    const text = [
      "Merhaba,",
      "",
      "Clause takviminizde yaklaşan tarihler var:",
      "",
      ...lines,
      "",
      `Panelinizde ayrıntıları görün: ${panelUrl}`,
      "",
      "Bu e-posta bilgilendirme amaçlıdır, hukuki tavsiye değildir.",
      "Hatırlatmaları panelden tamamlandı olarak işaretleyerek durdurabilirsiniz.",
    ].join("\n");

    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
<p style="font-size:15px">Merhaba,</p>
<p style="font-size:15px">Clause takviminizde yaklaşan tarihler var:</p>
${items
  .map(
    ({ event, days }) => `<div style="border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;margin:8px 0">
<div style="font-weight:700;font-size:15px">${escapeHtml(event.title)}</div>
<div style="font-size:14px;color:#475569;margin-top:2px">${formatTr(event.due_date)} · <strong style="color:${days <= 7 ? "#b91c1c" : "#b45309"}">${whenLabel(days)}</strong></div>
${event.notes ? `<div style="font-size:13px;color:#64748b;margin-top:6px">${escapeHtml(event.notes)}</div>` : ""}
</div>`,
  )
  .join("")}
<p style="margin:20px 0"><a href="${panelUrl}" style="background:#005BEA;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600;font-size:15px">Panelimi aç</a></p>
<p style="font-size:12px;color:#94a3b8">Bu e-posta bilgilendirme amaçlıdır, hukuki tavsiye değildir. Hatırlatmaları panelden tamamlandı olarak işaretleyerek durdurabilirsiniz.</p>
</div>`;

    try {
      const ok = await sendEmail(email, subject, text, html);
      if (!ok) {
        skipped += 1;
        continue;
      }
      sent += 1;
      for (const { event, days } of items) {
        await sb
          .from("legal_events")
          .update({ reminded_days: [...(event.reminded_days ?? []), days] })
          .eq("id", event.id);
      }
    } catch (e) {
      skipped += 1;
      Sentry.captureException(e, { tags: { event: "reminders_send" } });
    }
  }

  return NextResponse.json({ today, users: byUser.size, sent, skipped });
}
