import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { getSupabaseService } from "@/lib/supabase/service";
import { SITE_URL } from "@/lib/seo/site";
import { sendPushToUser } from "@/lib/push/server";
import { REGULATION_UPDATES, relevantUpdates } from "@/lib/legal/regulation-updates";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type DueEvent = {
  id: string;
  user_id: string;
  title: string;
  kind: string;
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
    .select("id, user_id, title, kind, due_date, notes, remind_days, reminded_days")
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
      const [mailed, pushed] = await Promise.all([
        sendEmail(email, subject, text, html),
        sendPushToUser(sb, userId, {
          title: subject.replace(/^Hatırlatma: /, ""),
          body: items.length === 1 ? formatTr(first.event.due_date) : lines[0]!.replace(/^• /, ""),
          url: "/panel",
          tag: "clause-reminder",
        }),
      ]);
      if (!mailed && pushed === 0) {
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

  const notices = await sendRegulationNotices(sb, today);

  return NextResponse.json({ today, users: byUser.size, sent, skipped, notices });
}

/**
 * Mevzuat değişikliği: ilgili türde açık tarihi olan kullanıcıya her güncelleme bir kez gider.
 * Pazarlama bildirimi değildir — yalnızca kullanıcının kendi sözleşmesini etkileyen değişiklik.
 */
async function sendRegulationNotices(
  sb: NonNullable<ReturnType<typeof getSupabaseService>>,
  today: string,
): Promise<number> {
  const fresh = relevantUpdates(
    REGULATION_UPDATES.flatMap((u) => u.affects),
    new Date(`${today}T00:00:00Z`),
  );
  if (fresh.length === 0) return 0;

  const { data: events } = await sb
    .from("legal_events")
    .select("user_id, kind")
    .eq("done", false)
    .gte("due_date", today)
    .limit(5000);
  const kindsByUser = new Map<string, Set<string>>();
  for (const e of (events ?? []) as { user_id: string; kind: string }[]) {
    const set = kindsByUser.get(e.user_id) ?? new Set<string>();
    set.add(e.kind);
    kindsByUser.set(e.user_id, set);
  }

  const { data: sentRows } = await sb
    .from("regulation_notices_sent")
    .select("user_id, notice_id")
    .in("notice_id", fresh.map((u) => u.id));
  const already = new Set((sentRows ?? []).map((r) => `${r.user_id}:${r.notice_id}`));

  let count = 0;
  for (const [userId, kinds] of Array.from(kindsByUser.entries())) {
    const updates = relevantUpdates(kinds, new Date(`${today}T00:00:00Z`)).filter(
      (u) => !already.has(`${userId}:${u.id}`),
    );
    if (updates.length === 0) continue;

    const { data: userData } = await sb.auth.admin.getUserById(userId);
    const email = userData?.user?.email;
    const u = updates[0]!;
    const url = `${SITE_URL}${u.cta.href}`;
    const text = [
      "Merhaba,",
      "",
      `Clause takviminizdeki bir sözleşmeyi etkileyen bir mevzuat değişikliği var: ${u.title}`,
      "",
      u.body,
      `Kaynak: ${u.source}`,
      "",
      `${u.cta.label}: ${url}`,
      "",
      "Bu e-posta bilgilendirme amaçlıdır, hukuki tavsiye değildir.",
    ].join("\n");
    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
<p style="font-size:15px">Merhaba,</p>
<p style="font-size:15px">Clause takviminizdeki bir sözleşmeyi etkileyen bir mevzuat değişikliği var:</p>
<div style="border:1px solid #e2e8f0;border-left:4px solid #005BEA;border-radius:12px;padding:12px 14px;margin:8px 0">
<div style="font-weight:700;font-size:15px">${escapeHtml(u.title)}</div>
<div style="font-size:14px;color:#475569;margin-top:6px">${escapeHtml(u.body)}</div>
<div style="font-size:12px;color:#94a3b8;margin-top:6px">Kaynak: ${escapeHtml(u.source)}</div>
</div>
<p style="margin:20px 0"><a href="${url}" style="background:#005BEA;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600;font-size:15px">${escapeHtml(u.cta.label)}</a></p>
<p style="font-size:12px;color:#94a3b8">Bu e-posta bilgilendirme amaçlıdır, hukuki tavsiye değildir.</p>
</div>`;

    try {
      const [mailed, pushed] = await Promise.all([
        email ? sendEmail(email, `Mevzuat değişikliği: ${u.title}`, text, html) : Promise.resolve(false),
        sendPushToUser(sb, userId, { title: u.title, body: u.body.slice(0, 120), url: u.cta.href, tag: u.id }),
      ]);
      if (!mailed && pushed === 0) continue;
      await sb.from("regulation_notices_sent").insert({ user_id: userId, notice_id: u.id });
      count += 1;
    } catch (e) {
      Sentry.captureException(e, { tags: { event: "regulation_notice_send" } });
    }
  }
  return count;
}
