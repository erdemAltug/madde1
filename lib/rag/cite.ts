/** Retrieval sonucundan okunabilir atıf etiketi üretir. */
export function buildCiteLabel(input: {
  type: "kanun_maddesi" | "emsal_karar";
  content: string;
  category?: string | null;
  source?: string | null;
  metadata?: Record<string, unknown> | null;
  id: string;
}): string {
  const md = input.metadata ?? {};
  const kanunNo = pickStr(md, ["kanun_no", "kanunNo"]);
  const maddeNo = pickStr(md, ["madde_no", "maddeNo", "madde"]);
  const kanunAdi = pickStr(md, ["kanun_adi", "kanunAdi"]);

  if (maddeNo) {
    const short =
      shortLawName(kanunAdi) ||
      shortLawName(input.source) ||
      shortLawName(input.category) ||
      (kanunNo ? `Kanun ${kanunNo}` : null) ||
      "Mevzuat";
    return `${short} m.${maddeNo}`;
  }

  const fromText = parseMaddeFromText(input.content);
  if (fromText) return fromText;

  if (input.type === "emsal_karar") {
    const esas = pickStr(md, ["esas_no", "esas", "karar_no"]);
    if (esas) return `Emsal ${esas}`;
    return `Emsal #${input.id.slice(0, 8)}`;
  }

  const src = (input.source || input.category || "Mevzuat").trim();
  return `${src.slice(0, 40)} #${input.id.slice(0, 6)}`;
}

function pickStr(
  md: Record<string, unknown>,
  keys: string[],
): string | null {
  for (const k of keys) {
    const v = md[k];
    if (v != null && String(v).trim()) return String(v).trim();
  }
  return null;
}

function shortLawName(raw?: string | null): string | null {
  if (!raw) return null;
  const s = raw.toLowerCase();
  if (s.includes("borçlar") || /\btbk\b/.test(s) || s.includes("6098"))
    return "TBK";
  if (s.includes("iş kanunu") || s.includes("is kanunu") || s.includes("4857"))
    return "İşK";
  if (s.includes("ticaret") || s.includes("6102") || /\bttk\b/.test(s))
    return "TTK";
  if (s.includes("kvkk") || s.includes("6698")) return "KVKK";
  return null;
}

function parseMaddeFromText(content: string): string | null {
  const head = content.slice(0, 500);
  const m = head.match(
    /(?:TBK|TTK|İş\s*Kanunu|Is\s*Kanunu|KVKK|6098|4857|6102|6698)[^\n]{0,40}?[Mm]adde\s*(\d+)/u,
  );
  if (m) {
    const law = shortLawName(m[0]) || "Mevzuat";
    return `${law} m.${m[1]}`;
  }
  const m2 = head.match(/^\s*Madde\s*(\d+)\s*[-–—:]/m);
  if (m2) return `Madde ${m2[1]}`;
  return null;
}

/** Model çıktısındaki olası madde atıflarını yakala. */
export function extractCitedRefs(text: string): string[] {
  const refs = new Set<string>();
  const patterns = [
    /\b(TBK|TTK|KVKK|İşK|IsK)\s*m(?:adde)?\.?\s*(\d+)/gi,
    /\b(6098|4857|6102|6698)\s*(?:sayılı)?[^\n]{0,20}?[Mm]adde\s*(\d+)/g,
    /\bMadde\s*(\d+)\b/g,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    const r = new RegExp(re.source, re.flags);
    while ((m = r.exec(text)) !== null) {
      if (m[2]) refs.add(`${m[1]} m.${m[2]}`.replace(/\s+/g, " "));
      else if (m[1] && !m[2]) refs.add(`Madde ${m[1]}`);
    }
  }
  return [...refs];
}

export function verifyCitations(
  outputText: string,
  allowedCites: string[],
): { grounded: string[]; ungrounded: string[] } {
  const cited = extractCitedRefs(outputText);
  const normAllowed = allowedCites.map(normalizeCite);
  const grounded: string[] = [];
  const ungrounded: string[] = [];
  for (const c of cited) {
    const n = normalizeCite(c);
    const ok = normAllowed.some(
      (a) => a === n || a.includes(n) || n.includes(a) || shareMadde(a, n),
    );
    if (ok) grounded.push(c);
    else ungrounded.push(c);
  }
  return { grounded, ungrounded };
}

function normalizeCite(s: string): string {
  return s
    .toLowerCase()
    .replace(/işk|isk/g, "isk")
    .replace(/madde\.?/g, "m.")
    .replace(/\s+/g, "");
}

function shareMadde(a: string, b: string): boolean {
  const ma = a.match(/m\.?(\d+)/);
  const mb = b.match(/m\.?(\d+)/);
  return Boolean(ma && mb && ma[1] === mb[1]);
}
