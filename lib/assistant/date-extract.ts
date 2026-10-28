/**
 * Sözleşme metninden kritik tarihleri çıkarır (deterministik, sunucu çağrısı yok).
 *
 * Yakalananlar:
 *  - Açık tarihler: 01.09.2026, 1/9/2026, 1 Eylül 2026
 *  - Başlangıç tarihi + süre ("1 yıl", "12 ay") → bitiş, yenileme, kira artış dönemi
 *  - Deneme süresi ("deneme süresi 2 ay") → deneme süresinin sonu
 *  - Aylık ödeme günü ("her ayın 5'i") → bir sonraki ödeme günü
 *
 * Çıktı bilgilendirme amaçlıdır; kullanıcı kaydetmeden önce tarihleri görür ve düzenleyebilir.
 */

export type LegalEventKind =
  | "renewal"
  | "rent_increase"
  | "contract_end"
  | "notice"
  | "payment"
  | "probation"
  | "deadline"
  | "other";

export type KeyDate = {
  /** Benzersiz anahtar (aynı tarihi iki kez önermemek için) */
  key: string;
  kind: LegalEventKind;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** Kullanıcıya neden önerildiğini anlatan kısa açıklama */
  hint: string;
};

const MONTHS: Record<string, number> = {
  ocak: 1,
  şubat: 2,
  subat: 2,
  mart: 3,
  nisan: 4,
  mayıs: 5,
  mayis: 5,
  haziran: 6,
  temmuz: 7,
  ağustos: 8,
  agustos: 8,
  eylül: 9,
  eylul: 9,
  ekim: 10,
  kasım: 11,
  kasim: 11,
  aralık: 12,
  aralik: 12,
};

const NUMBER_WORDS: Record<string, number> = {
  bir: 1,
  iki: 2,
  üç: 3,
  uc: 3,
  dört: 4,
  dort: 4,
  beş: 5,
  bes: 5,
  altı: 6,
  alti: 6,
  yedi: 7,
  sekiz: 8,
  dokuz: 9,
  on: 10,
  "on iki": 12,
  "oniki": 12,
};

type FoundDate = { date: Date; index: number; context: string; after: string };

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function toIsoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function makeDate(y: number, m: number, d: number): Date | null {
  if (y < 100) y += 2000;
  if (y < 1990 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(y, m - 1, d);
  if (date.getMonth() !== m - 1) return null;
  return date;
}

export function addMonths(d: Date, months: number): Date {
  const r = new Date(d.getFullYear(), d.getMonth() + months, d.getDate());
  // Ay sonu taşmasını düzelt (31 Ocak + 1 ay → 28/29 Şubat)
  if (r.getDate() !== d.getDate()) r.setDate(0);
  return r;
}

export function addDays(d: Date, days: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}

function startOfToday(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function contextAt(text: string, index: number): string {
  return text.slice(Math.max(0, index - 60), index).toLocaleLowerCase("tr-TR");
}

function afterAt(text: string, index: number, length: number): string {
  return text.slice(index + length, index + length + 40).toLocaleLowerCase("tr-TR");
}

function findDates(text: string): FoundDate[] {
  const out: FoundDate[] = [];

  const numeric = /\b(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})\b/g;
  for (const m of Array.from(text.matchAll(numeric))) {
    const date = makeDate(Number(m[3]), Number(m[2]), Number(m[1]));
    if (date && m.index !== undefined) {
      out.push({
        date,
        index: m.index,
        context: contextAt(text, m.index),
        after: afterAt(text, m.index, m[0].length),
      });
    }
  }

  const named =
    /\b(\d{1,2})\s+(ocak|şubat|subat|mart|nisan|mayıs|mayis|haziran|temmuz|ağustos|agustos|eylül|eylul|ekim|kasım|kasim|aralık|aralik)\s+(\d{4})\b/gi;
  for (const m of Array.from(text.matchAll(named))) {
    const month = MONTHS[m[2].toLocaleLowerCase("tr-TR")];
    const date = month ? makeDate(Number(m[3]), month, Number(m[1])) : null;
    if (date && m.index !== undefined) {
      out.push({
        date,
        index: m.index,
        context: contextAt(text, m.index),
        after: afterAt(text, m.index, m[0].length),
      });
    }
  }

  return out.sort((a, b) => a.index - b.index);
}

function parseCount(raw: string): number | null {
  const s = raw.trim().toLocaleLowerCase("tr-TR");
  if (/^\d+$/.test(s)) return Number(s);
  return NUMBER_WORDS[s] ?? null;
}

/** "1 (bir) yıl", "12 ay", "bir yıllık" → ay cinsinden süre */
function findDurationMonths(lower: string): number | null {
  const re =
    /(?:süre|müddet|süresi|müddeti)[^.\n]{0,40}?(\d{1,2}|bir|iki|üç|dört|beş|altı|yedi|sekiz|dokuz|on iki|on)\s*(?:\([^)]{1,15}\)\s*)?(yıl|sene|ay)/gi;
  for (const m of Array.from(lower.matchAll(re))) {
    const before = lower.slice(Math.max(0, (m.index ?? 0) - 12), m.index ?? 0);
    // "deneme süresi 2 ay" sözleşme süresi değildir
    if (before.includes("deneme")) continue;
    const n = parseCount(m[1]);
    if (!n) continue;
    return m[2] === "ay" ? n : n * 12;
  }
  return null;
}

function findProbationMonths(lower: string): number | null {
  const m =
    /deneme\s+süresi[^.\n]{0,30}?(\d{1,2}|bir|iki|üç|dört)\s*(?:\([^)]{1,15}\)\s*)?(ay|hafta)/i.exec(
      lower,
    );
  if (!m) return null;
  const n = parseCount(m[1]);
  if (!n) return null;
  return m[2] === "hafta" ? n / 4 : n;
}

function findPaymentDay(lower: string): number | null {
  const m = /her\s+ay(?:ın|in)?\s+(\d{1,2})\s*['’.]?\s*(?:i|ı|u|ü|si|sı|sü|su|inci|ıncı|üncü|uncu|\.)?\s*(?:gün|günü|tarih)/i.exec(
    lower,
  );
  if (!m) return null;
  const day = Number(m[1]);
  return day >= 1 && day <= 31 ? day : null;
}

function isLease(lower: string): boolean {
  return /kira(cı|ya veren|lanan| bedeli| sözleşmesi)/.test(lower);
}

function isEmployment(lower: string): boolean {
  return /(işçi|işveren|iş sözleşmesi|ücret|çalışan)/.test(lower);
}

/** Bugünden sonraki ilk yıl dönümü */
function nextAnniversary(start: Date, today: Date): Date {
  let d = new Date(start);
  let i = 0;
  while (d < today && i < 100) {
    i += 1;
    d = addMonths(start, 12 * i);
  }
  return d;
}

export function extractKeyDates(text: string, now: Date = new Date()): KeyDate[] {
  if (!text || text.trim().length < 40) return [];

  const lower = text.toLocaleLowerCase("tr-TR");
  const today = startOfToday(now);
  const lease = isLease(lower);
  const employment = !lease && isEmployment(lower);
  const found = findDates(text);
  const results: KeyDate[] = [];

  const push = (k: KeyDate) => {
    if (!results.some((r) => r.key === k.key)) results.push(k);
  };

  const startHit = found.find((f) => /başla|başlangıç|itibaren|teslim/.test(f.context));
  const endPattern = /bitiş|sona er|son bulur|sonlan|tahliye/;
  const endHit = found.find(
    (f) => f !== startHit && (endPattern.test(f.context.slice(-30)) || endPattern.test(f.after)),
  );
  const durationMonths = findDurationMonths(lower);

  let endDate: Date | null = endHit?.date ?? null;
  if (!endDate && startHit && durationMonths) {
    endDate = addMonths(startHit.date, durationMonths);
  }

  if (endDate && endDate >= today) {
    push({
      key: `end-${toIsoDate(endDate)}`,
      kind: lease ? "renewal" : "contract_end",
      title: lease ? "Kira döneminin sonu / yenileme" : "Sözleşmenin sona ermesi",
      date: toIsoDate(endDate),
      hint: endHit
        ? "Sözleşmede bitiş tarihi olarak geçiyor."
        : "Başlangıç tarihi ve sözleşme süresinden hesaplandı.",
    });

    if (lease) {
      // TBK m.347: kiracı, dönem sonundan en az 15 gün önce bildirimde bulunmazsa sözleşme 1 yıl uzar.
      const notice = addDays(endDate, -15);
      if (notice >= today) {
        push({
          key: `notice-${toIsoDate(notice)}`,
          kind: "notice",
          title: "Taşınacaksanız bildirim için son gün",
          date: toIsoDate(notice),
          hint: "TBK m.347: dönem bitiminden en az 15 gün önce yazılı bildirim gerekir.",
        });
      }
    }
  }

  if (lease && startHit) {
    const anniversary = nextAnniversary(startHit.date, today);
    push({
      key: `increase-${toIsoDate(anniversary)}`,
      kind: "rent_increase",
      title: "Kira artış dönemi",
      date: toIsoDate(anniversary),
      hint: "Yıllık artış, sözleşmenin yıl dönümünde ve yasal tavan içinde uygulanabilir.",
    });
  }

  if (employment && startHit) {
    const probation = findProbationMonths(lower);
    if (probation) {
      const end = addDays(startHit.date, Math.round(probation * 30));
      if (end >= today) {
        push({
          key: `probation-${toIsoDate(end)}`,
          kind: "probation",
          title: "Deneme süresinin sonu",
          date: toIsoDate(end),
          hint: "Deneme süresinde iş sözleşmesi bildirim süresi olmadan feshedilebilir (İş K. m.15).",
        });
      }
    }
  }

  const payDay = findPaymentDay(lower);
  if (payDay) {
    let next = makeDate(today.getFullYear(), today.getMonth() + 1, Math.min(payDay, 28));
    if (next && next < today) next = addMonths(next, 1);
    if (next) {
      push({
        key: `payment-${toIsoDate(next)}`,
        kind: "payment",
        title: lease ? "Kira ödeme günü" : "Ödeme günü",
        date: toIsoDate(next),
        hint: `Sözleşmeye göre her ayın ${payDay}. günü.`,
      });
    }
  }

  // Bağlamı belirsiz ama ileri tarihli diğer açık tarihler
  for (const f of found) {
    if (f === startHit || f === endHit || f.date < today) continue;
    push({
      key: `date-${toIsoDate(f.date)}`,
      kind: "deadline",
      title: "Sözleşmede geçen tarih",
      date: toIsoDate(f.date),
      hint: `Metinde geçiyor: "…${f.context.slice(-40).trim()}"`,
    });
  }

  return results
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);
}

/** Bugünden son tarihe kalan gün (negatif = geçmiş) */
export function daysUntil(isoDate: string, now: Date = new Date()): number {
  const [y, m, d] = isoDate.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const today = startOfToday(now);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}
