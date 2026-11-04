#!/usr/bin/env node
/**
 * Sığ rehber/blog sayfalarını bulur ve lib/seo/thin-content.json'a yazar.
 * Listedeki sayfalar noindex alır ve sitemap'ten çıkar (lib/seo/niche-regional.ts).
 *
 * Önce `npm run build` çalıştırın; script .next/server/app altındaki HTML'i okur.
 *
 * Kullanım:
 *   node scripts/seo-thin-audit.mjs                       # sadece kelime sayısına göre
 *   node scripts/seo-thin-audit.mjs --gsc Sayfalar.csv    # GSC "Sayfalar" dışa aktarımıyla
 *   Seçenekler: --min-words 300  --min-impr 20  --dry
 *
 * GSC verisi verilirse: en az --min-impr gösterim alan sayfa, sığ olsa bile indekste kalır
 * (Google onu zaten seviyor; derinleştirilecekler listesine yazılır).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const MIN_WORDS = Number(opt("min-words", 300));
const MIN_IMPR = Number(opt("min-impr", 20));
const GSC = opt("gsc", null);
const DRY = args.includes("--dry");

const appDir = join(root, ".next", "server", "app");
if (!existsSync(appDir)) {
  console.error("Önce `npm run build` çalıştırın (.next/server/app bulunamadı).");
  process.exit(1);
}

function mainWords(html) {
  const m = html.match(/<main[\s\S]*?<\/main>/i);
  const body = (m ? m[0] : html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ");
  return body.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
}

/** GSC CSV → { "/rehber/x": gösterim } */
function readGsc(file) {
  const text = readFileSync(resolve(file), "utf8").replace(/^﻿/, "");
  const lines = text.split(/\r?\n/).filter(Boolean);
  const head = lines[0].split(",").map((h) => h.replace(/"/g, "").toLowerCase());
  const imprCol = head.findIndex((h) => h.includes("gösterim") || h.includes("impression"));
  if (imprCol < 0) throw new Error("CSV'de 'Gösterimler' sütunu bulunamadı.");
  const out = {};
  for (const line of lines.slice(1)) {
    const cols = line.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((c) => c.replace(/,$/, "").replace(/^"|"$/g, ""));
    try {
      const path = new URL(cols[0]).pathname.replace(/\/$/, "") || "/";
      out[path] = Number(String(cols[imprCol]).replace(/\./g, "").replace(",", ".")) || 0;
    } catch {
      /* başlık dışı satır */
    }
  }
  return out;
}

const impressions = GSC ? readGsc(GSC) : null;
const rows = [];
for (const section of ["rehber", "blog"]) {
  const dir = join(appDir, section);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".html")) continue;
    const path = `/${section}/${f.replace(/\.html$/, "")}`;
    const words = mainWords(readFileSync(join(dir, f), "utf8"));
    rows.push({ path, words, impr: impressions ? impressions[path] ?? 0 : null });
  }
}

const thin = rows.filter((r) => r.words < MIN_WORDS);
const drop = thin.filter((r) => r.impr === null || r.impr < MIN_IMPR);
const deepen = thin.filter((r) => r.impr !== null && r.impr >= MIN_IMPR);

console.log(`Taranan: ${rows.length} rehber/blog sayfası · sığ (<${MIN_WORDS} kelime): ${thin.length}`);
console.log(`İndeksten çıkarılacak: ${drop.length}`);
if (deepen.length) {
  console.log(`\nSığ ama gösterim alıyor — derinleştirin (${deepen.length}):`);
  for (const r of deepen.sort((a, b) => b.impr - a.impr)) {
    console.log(`  ${String(r.impr).padStart(5)} gösterim · ${r.words} kelime · ${r.path}`);
  }
}

if (!DRY) {
  const out = join(root, "lib", "seo", "thin-content.json");
  writeFileSync(out, JSON.stringify(drop.map((r) => r.path).sort(), null, 2) + "\n");
  console.log(`\nYazıldı: lib/seo/thin-content.json — tekrar build alın ve deploy edin.`);
}
