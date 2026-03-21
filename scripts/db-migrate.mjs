#!/usr/bin/env node
/**
 * SQL migrasyonu: önce DATABASE_URL (varsa), yoksa NEXT_PUBLIC_SUPABASE_URL + şifre ile
 * doğrudan Postgres URI üretilir (db.<ref>.supabase.co:5432).
 *
 * Şifre: tercihen SUPABASE_DB_PASSWORD (sunucu/CLI; tarayıcı bundle’ına gitmez).
 * NEXT_PUBLIC_SUPABASE_PASSWORD yalnızca geçiş için desteklenir — mümkünse kullanmayın.
 *
 * Pooler (IPv4): SUPABASE_DB_HOST + SUPABASE_DB_PORT + gerekirse SUPABASE_DB_USER=postgres.<ref>
 *
 * Kullanım: npm run db:migrate
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvLocal() {
  const p = resolve(root, ".env.local");
  if (!existsSync(p)) {
    console.error("Missing .env.local");
    process.exit(1);
  }
  const text = readFileSync(p, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

const defaultSql = resolve(
  root,
  "supabase/migrations/002_pgvector_profiles_legal_rag.sql",
);
const sqlPath = resolve(root, process.argv[2] || defaultSql);

function refFromSiteUrl(siteUrl) {
  try {
    const u = new URL(siteUrl.trim());
    const h = u.hostname;
    if (!h.endsWith(".supabase.co")) return null;
    const sub = h.slice(0, -".supabase.co".length);
    if (sub.includes(".")) return null;
    return sub;
  } catch {
    return null;
  }
}

function refFromDatabaseUrl(databaseUrl) {
  try {
    const u = new URL(databaseUrl.trim());
    const m = u.hostname.match(/^db\.([a-z0-9]+)\.supabase\.co$/i);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

/** @returns {string | null} */
function resolveConnectionString() {
  const explicit = process.env.DATABASE_URL?.trim();
  if (explicit) return explicit;

  const siteUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const password =
    process.env.SUPABASE_DB_PASSWORD?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PASSWORD?.trim();

  if (!siteUrl || !password) return null;

  const ref = refFromSiteUrl(siteUrl);
  if (!ref) return null;

  const host =
    process.env.SUPABASE_DB_HOST?.trim() || `db.${ref}.supabase.co`;
  const port = process.env.SUPABASE_DB_PORT?.trim() || "5432";
  const pooler = host.includes("pooler.supabase.com");
  const user =
    process.env.SUPABASE_DB_USER?.trim() ||
    (pooler ? `postgres.${ref}` : "postgres");

  const encUser = encodeURIComponent(user);
  const encPass = encodeURIComponent(password);
  return `postgresql://${encUser}:${encPass}@${host}:${port}/postgres`;
}

loadEnvLocal();

if (
  process.env.NEXT_PUBLIC_SUPABASE_PASSWORD &&
  !process.env.SUPABASE_DB_PASSWORD
) {
  console.warn(
    "Uyarı: NEXT_PUBLIC_SUPABASE_PASSWORD istemci bundle’ına girebilir. Mümkünse SUPABASE_DB_PASSWORD kullanın.\n",
  );
}

const url = resolveConnectionString();
if (!url) {
  console.error(
    "Bağlantı bilgisi yok. Şunlardan biri gerekli:\n" +
      "  • DATABASE_URL=postgresql://...\n" +
      "  veya\n" +
      "  • NEXT_PUBLIC_SUPABASE_URL + (SUPABASE_DB_PASSWORD | NEXT_PUBLIC_SUPABASE_PASSWORD)\n" +
      "  IPv4 / pooler için: SUPABASE_DB_HOST, SUPABASE_DB_PORT, isteğe SUPABASE_DB_USER",
  );
  process.exit(1);
}

const siteRef = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? refFromSiteUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
  : null;
const dbRef = refFromDatabaseUrl(url);
if (siteRef && dbRef && siteRef !== dbRef) {
  console.error(
    `Proje uyumsuz: NEXT_PUBLIC_SUPABASE_URL ref’i “${siteRef}”, DATABASE_URL host’undaki ref “${dbRef}”.`,
  );
  console.error(
    "İkisi aynı proje olmalı. Tam URI kullanıyorsanız host’u kontrol edin.\n",
  );
}

const sql = readFileSync(sqlPath, "utf8");
const client = new Client({
  connectionString: url,
  ssl:
    url.includes("supabase.co") || url.includes("pooler.supabase.com")
      ? { rejectUnauthorized: false }
      : undefined,
});

try {
  await client.connect();
  await client.query(sql);
  console.log("OK:", sqlPath.replace(root + "/", ""));
} catch (e) {
  const msg = String(e.message || e);
  console.error(msg);
  if (msg.includes("allow_list") || msg.includes("tenant allow")) {
    console.error(
      "\nBu hata Supabase’te veritabanı erişiminin IP ile kısıtlandığını gösterir; bilgisayarınızın IP’si izin listesinde değil.",
    );
    console.error(
      "Çözüm: Dashboard → Project Settings → Database → Network / Allowed IP addresses (veya Connection pooling ağ ayarları) bölümünde IP ekleyin:",
    );
    console.error(
      "  • Geliştirme: mevcut genel IP’nizi ekleyin; veya geçici 0.0.0.0/0 (üretimde daraltın).",
    );
    console.error(
      "Alternatif: SQL Editor’dan migration dosyasını yapıştırıp çalıştırın (yerel IP kısıtına takılmaz).\n",
    );
  } else if (msg.includes("getaddrinfo")) {
    console.error(
      "\nDNS çözülemedi — Direct host IPv6 olabilir. Connect → Session pooler URI’sindeki host’u kullanın:",
    );
    console.error(
      "  SUPABASE_DB_HOST=...pooler.supabase.com  SUPABASE_DB_PORT=<paneldeki port>",
    );
    if (siteRef) {
      console.error(
        `\nPooler kullanıcısı genelde: postgres.${siteRef} (panel metnine bakın).`,
      );
    }
  }
  process.exit(1);
} finally {
  await client.end().catch(() => {});
}
