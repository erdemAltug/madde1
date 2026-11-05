/** Retrieval sonucundan okunabilir atıf etiketi üretir. */
export function buildCiteLabel(input: {
  type: "kanun_maddesi" | "emsal_karar" | "hukuki_not";
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
  const mdShort = pickStr(md, ["short"]);

  if (input.type === "kanun_maddesi" && maddeNo) {
    const short =
      mdShort ||
      shortLawName(kanunAdi) ||
      shortLawName(input.source) ||
      shortLawName(input.category) ||
      (kanunNo ? `Kanun ${kanunNo}` : null) ||
      "Mevzuat";
    return `${short} m.${maddeNo}`;
  }

  if (input.type === "kanun_maddesi") {
    const fromText = parseMaddeFromText(input.content);
    if (fromText) return fromText;
  }

  if (input.type === "emsal_karar") {
    const esas = pickStr(md, ["esas_no", "esas", "karar_no"]);
    if (esas) return `Emsal ${esas}`;
    return `Emsal #${input.id.slice(0, 8)}`;
  }

  if (input.type === "hukuki_not") {
    return `Not #${input.id.slice(0, 8)}`;
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
  if (s.includes("tüketici") || s.includes("6502")) return "TKHK";
  if (s.includes("icra ve iflas") || s.includes("2004")) return "İİK";
  if (s.includes("hukuk muhakemeleri") || s.includes("6100")) return "HMK";
  if (s.includes("medeni") || s.includes("4721")) return "TMK";
  if (s.includes("kat mülkiyeti") || s.includes("634")) return "KMK";
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
  // Sıra önemli: "1475 s. İşK m.14" önce yakalanır ve maskelenir; yoksa içindeki
  // "İşK m.14" (4857 — çağrı üzerine çalışma) ayrı bir atıf sanılır.
  const patterns: Array<[RegExp, (m: RegExpExecArray) => string]> = [
    [
      /\b1475\s*(?:s\.|sayılı)?\s*(?:İşK|İş\s*Kanunu(?:'nun)?|Kanun(?:'un|un)?)?[^\n\d]{0,20}?m(?:adde)?\.?\s*(\d+)/giu,
      (m) => `1475 m.${m[1]}`,
    ],
    [
      /(?<!\p{L})(TBK|TTK|KVKK|TKHK|İİK|HMK|TMK|KMK|İşK|IsK|İş\s*K\.)\s*m(?:adde)?\.?\s*(\d+(?:\/[a-zçğıöşü])?)/giu,
      (m) => `${m[1]} m.${m[2]}`,
    ],
    [
      /\b(6098|4857|6102|6698|6502|2004|6100|4721|634)\s*(?:sayılı)?[^\n]{0,40}?[Mm](?:adde|\.)\s*(\d+(?:\/[a-zçğıöşü])?)/gu,
      (m) => `${m[1]} m.${m[2]}`,
    ],
    [/\bMadde\s*(\d+)\b/g, (m) => `Madde ${m[1]}`],
  ];
  let rest = text;
  for (const [re, label] of patterns) {
    rest = rest.replace(new RegExp(re.source, re.flags), (...args) => {
      const groups = args.slice(0, -2) as string[];
      const m = Object.assign([...groups], { index: 0, input: "" }) as unknown as RegExpExecArray;
      refs.add(label(m).replace(/\s+/g, " "));
      return " ".repeat(groups[0]!.length);
    });
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
      (a) => a === n || shareMadde(a, n),
    );
    if (ok) grounded.push(c);
    else ungrounded.push(c);
  }
  return { grounded, ungrounded };
}

const LAW_ALIASES: Array<[RegExp, string]> = [
  [/^(6098|tbk)/, "tbk"],
  [/^(1475)/, "1475"],
  [/^(4857|işk|isk|işk\.|iş k\.)/, "isk"],
  [/^(6502|tkhk)/, "tkhk"],
  [/^(2004|iik)/, "iik"],
  [/^(6100|hmk)/, "hmk"],
  [/^(4721|tmk)/, "tmk"],
  [/^(634|kmk)/, "kmk"],
  [/^(6102|ttk)/, "ttk"],
  [/^(6698|kvkk)/, "kvkk"],
];

function normalizeCite(s: string): string {
  const t = s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/sayılı|s\.\s/g, "")
    .replace(/madde\.?/g, "m.")
    .replace(/\s+/g, "");
  return t;
}

function lawOf(norm: string): string | null {
  for (const [re, key] of LAW_ALIASES) if (re.test(norm)) return key;
  return null;
}

/** Aynı kanun + aynı madde (harf eki dahil). Kanunu belirsiz "Madde N" yalnız madde ile eşleşir. */
function shareMadde(a: string, b: string): boolean {
  const ma = a.match(/m\.?(\d+(?:\/[a-zçğıöşü])?)/u);
  const mb = b.match(/m\.?(\d+(?:\/[a-zçğıöşü])?)/u);
  if (!ma || !mb || ma[1] !== mb[1]) return false;
  const la = lawOf(a);
  const lb = lawOf(b);
  return !la || !lb || la === lb;
}
