#!/usr/bin/env node
/**
 * PostHog'da "Clause — Ürün sağlığı" panosunu ve grafiklerini oluşturur.
 *
 * Gerekenler (.env.local):
 *   POSTHOG_PERSONAL_API_KEY  PostHog → Settings → Personal API keys
 *                             (izinler: Dashboard: write, Insight: write)
 *   POSTHOG_PROJECT_ID        PostHog → Settings → Project → Project ID (sayı)
 *   NEXT_PUBLIC_POSTHOG_HOST  ör. https://eu.i.posthog.com (zaten var)
 *
 * Kullanım:  node scripts/posthog-dashboard.mjs
 * Tekrar çalıştırırsan yeni bir pano oluşturur; eskisini PostHog'dan silebilirsin.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const envPath = resolve(root, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

const KEY = process.env.POSTHOG_PERSONAL_API_KEY?.trim();
const PROJECT = process.env.POSTHOG_PROJECT_ID?.trim();
// İstemci host'u (eu.i.posthog.com) → yönetim API'si (eu.posthog.com)
const HOST = (process.env.POSTHOG_API_HOST || process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com")
  .trim()
  .replace(/\/$/, "")
  .replace(".i.posthog.com", ".posthog.com");

if (!KEY || !PROJECT) {
  console.error("POSTHOG_PERSONAL_API_KEY ve POSTHOG_PROJECT_ID .env.local içinde olmalı.");
  process.exit(1);
}

async function api(path, body) {
  const res = await fetch(`${HOST}/api/projects/${PROJECT}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${path} → ${res.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

const D30 = { date_from: "-30d" };
const ev = (event, extra = {}) => ({ kind: "EventsNode", event, name: event, ...extra });
const byTool = { breakdown: "tool", breakdown_type: "event" };
const byPath = { breakdown: "tool_path", breakdown_type: "event" };

const trends = (series, opts = {}) => ({
  kind: "InsightVizNode",
  source: { kind: "TrendsQuery", series, dateRange: D30, interval: "day", ...opts },
});
const funnel = (series, opts = {}) => ({
  kind: "InsightVizNode",
  source: {
    kind: "FunnelsQuery",
    series,
    dateRange: D30,
    funnelsFilter: { funnelWindowInterval: 1, funnelWindowIntervalUnit: "day", funnelVizType: "steps" },
    ...opts,
  },
});

const INSIGHTS = [
  {
    name: "1 · Hangi araç kaç kişi tarafından kullanıldı (30 gün)",
    description: "Sonuç üreten benzersiz kişi sayısı, araç bazında.",
    query: trends([ev("Tool_Succeeded", { math: "dau" })], {
      breakdownFilter: byTool,
      trendsFilter: { display: "ActionsBarValue" },
    }),
  },
  {
    name: "2 · Araç kullanım sayısı (toplam, 30 gün)",
    description: "Kaç kez sonuç üretildi — bir kişi birden fazla kez kullanabilir.",
    query: trends([ev("Tool_Succeeded")], {
      breakdownFilter: byTool,
      trendsFilter: { display: "ActionsBarValue" },
    }),
  },
  {
    name: "3 · Başarı oranı — sayfayı açan → sonuç alan (sayfa bazında)",
    description: "Tool_Opened → Tool_Succeeded, aynı sayfada. Düşük oran = araç kafa karıştırıyor ya da hata veriyor.",
    query: funnel([ev("Tool_Opened"), ev("Tool_Succeeded")], { breakdownFilter: byPath }),
  },
  {
    name: "4 · Başlayan → bitiren (tarama, Haklarım, asistan, cevap taslağı)",
    description: "Tool_Started → Tool_Succeeded, araç bazında.",
    query: funnel([ev("Tool_Started"), ev("Tool_Succeeded")], { breakdownFilter: byTool }),
  },
  {
    name: "5 · Hatalar — araç bazında",
    description: "Tool_Failed. Fotoğraf okuma, tarama ve asistan hataları.",
    query: trends([ev("Tool_Failed")], { breakdownFilter: byTool }),
  },
  {
    name: "6 · Ana huni: landing → tarama → sonuç → kayıt",
    description: "Ziyaretçinin ücretsiz hesaba dönüşme yolu.",
    query: funnel(
      [ev("Landing_Viewed"), ev("Analysis_Started"), ev("Analysis_Completed"), ev("Auth_Signup_Completed")],
      { funnelsFilter: { funnelWindowInterval: 7, funnelWindowIntervalUnit: "day", funnelVizType: "steps" } },
    ),
  },
  {
    name: "7 · Günlük kayıtlar",
    description: "Auth_Signup_Completed — nereden kayıt olundu (surface).",
    query: trends([ev("Auth_Signup_Completed")], {
      breakdownFilter: { breakdown: "surface", breakdown_type: "event" },
    }),
  },
  {
    name: "8 · Plus talepleri ve iletişim formları",
    description: "Contact_Form_Submitted, kaynak bazında (pricing_plus = Plus).",
    query: trends([ev("Contact_Form_Submitted")], {
      breakdownFilter: { breakdown: "source", breakdown_type: "event" },
      trendsFilter: { display: "ActionsBarValue" },
    }),
  },
  {
    name: "9 · Geri gelme — kayıttan sonra haftalık",
    description: "Kayıt olanların sonraki haftalarda siteye dönme oranı (kuzey yıldızı).",
    query: {
      kind: "InsightVizNode",
      source: {
        kind: "RetentionQuery",
        dateRange: { date_from: "-8w" },
        retentionFilter: {
          period: "Week",
          totalIntervals: 8,
          retentionType: "retention_first_time",
          targetEntity: { id: "Auth_Signup_Completed", name: "Auth_Signup_Completed", type: "events" },
          returningEntity: { id: "$pageview", name: "$pageview", type: "events" },
        },
      },
    },
  },
  {
    name: "10 · Eyleme dönüşme: hatırlatma, paylaşım, cevap kopyalama",
    description: "Sonuçtan sonra kullanıcı bir şey yaptı mı?",
    query: trends(
      [ev("reminders_saved", { math: "dau" }), ev("reply_copied", { math: "dau" }), ev("Risk_Card_Shared", { math: "dau" }), ev("Rights_Check_Shared", { math: "dau" })],
      { trendsFilter: { display: "ActionsLineGraph" } },
    ),
  },
  {
    name: "11 · Günlük aktif kullanıcı",
    description: "Siteyi açan benzersiz kişi.",
    query: trends([ev("$pageview", { math: "dau" })]),
  },
];

const dashboard = await api("/dashboards/", {
  name: "Clause — Ürün sağlığı",
  description: "Hangi araç kaç kişi, başarı oranı, kayıt hunisi, geri gelme. scripts/posthog-dashboard.mjs ile oluşturuldu.",
  pinned: true,
});
console.log(`Pano oluşturuldu: ${HOST}/project/${PROJECT}/dashboard/${dashboard.id}`);

for (const ins of INSIGHTS) {
  try {
    await api("/insights/", { ...ins, dashboards: [dashboard.id], saved: true });
    console.log(`  ✓ ${ins.name}`);
  } catch (err) {
    console.error(`  ✗ ${ins.name}\n    ${err.message}`);
  }
}
console.log("\nBitti. Yeni olaylar (Tool_*) deploy sonrası gelmeye başlar; ilk günlerde bazı grafikler boş görünebilir.");
