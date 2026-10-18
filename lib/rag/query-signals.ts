export type StatuteRef = {
  kanunNo: string;
  maddeNo: string;
  short: string;
};

type LawHit = { kanunNo: string; short: string };

const LAW_DETECTORS: Array<{ re: RegExp; kanunNo: string; short: string }> = [
  { re: /\b(tbk|6098|borçlar kanunu|borclar kanunu)\b/i, kanunNo: "6098", short: "TBK" },
  { re: /\b(iş kanunu|is kanunu|4857|işk)\b/i, kanunNo: "4857", short: "İşK" },
  { re: /\b(ttk|6102|ticaret kanunu)\b/i, kanunNo: "6102", short: "TTK" },
  { re: /\b(kvkk|6698)\b/i, kanunNo: "6698", short: "KVKK" },
  { re: /\b(tkhk|6502|tüketicinin korunması)\b/i, kanunNo: "6502", short: "TKHK" },
];

const SHORT_TO_LAW: Record<string, LawHit> = {
  tbk: { kanunNo: "6098", short: "TBK" },
  "6098": { kanunNo: "6098", short: "TBK" },
  ttk: { kanunNo: "6102", short: "TTK" },
  "6102": { kanunNo: "6102", short: "TTK" },
  kvkk: { kanunNo: "6698", short: "KVKK" },
  "6698": { kanunNo: "6698", short: "KVKK" },
  tkhk: { kanunNo: "6502", short: "TKHK" },
  "6502": { kanunNo: "6502", short: "TKHK" },
  işk: { kanunNo: "4857", short: "İşK" },
  isk: { kanunNo: "4857", short: "İşK" },
  "iş kanunu": { kanunNo: "4857", short: "İşK" },
  "is kanunu": { kanunNo: "4857", short: "İşK" },
  "4857": { kanunNo: "4857", short: "İşK" },
};

const EXPANSIONS: Array<{ re: RegExp; phrase: string }> = [
  {
    re: /kıdem|kidem|ihbar|işten çıkar|isten cikar|işten atıl|istifa/i,
    phrase: "kıdem tazminatı ihbar süresi iş sözleşmesinin feshinde bildirim",
  },
  {
    re: /fazla mesai|fazla çalışma|fazla calisma/i,
    phrase: "fazla çalışma ücreti iş kanunu",
  },
  {
    re: /tüketici|tuketici|ayıplı|ayipli|cayma/i,
    phrase: "ayıplı mal tüketici hakem heyeti cayma hakkı",
  },
  {
    re: /cezai şart|cezai sart|rekabet yasağı|rekabet yasagi/i,
    phrase: "cezai şart aşırı yararlanma genel işlem koşulları",
  },
];

/** Metindeki kanun + madde çiftleri. Metadata lookup için. */
export function parseStatuteRefs(text: string): StatuteRef[] {
  const refs: StatuteRef[] = [];
  const seen = new Set<string>();

  const push = (law: LawHit, maddeNo: string) => {
    if (!/^\d{1,4}$/.test(maddeNo)) return;
    if (maddeNo === law.kanunNo) return;
    const key = `${law.kanunNo}:${maddeNo}`;
    if (seen.has(key)) return;
    seen.add(key);
    refs.push({ kanunNo: law.kanunNo, maddeNo, short: law.short });
  };

  const near = /(TBK|TTK|KVKK|TKHK|İşK|İş\s*Kanunu|Is\s*Kanunu|6098|4857|6102|6698|6502)(?:\s*sayılı)?[^\d\n]{0,48}?m(?:adde)?\.?\s*(\d{1,4})/giu;
  for (const m of text.matchAll(near)) {
    const law = SHORT_TO_LAW[m[1]!.toLocaleLowerCase("tr-TR").replace(/\s+/g, " ")];
    if (law) push(law, m[2]!);
  }

  const bare = /\b(TBK|TTK|KVKK|TKHK|İşK)\s+(\d{1,3})\b/giu;
  for (const m of text.matchAll(bare)) {
    const law = SHORT_TO_LAW[m[1]!.toLocaleLowerCase("tr-TR")];
    if (law) push(law, m[2]!);
  }

  // Sözleşme içindeki "Madde 1" başlıklarını kanun maddesi sanma.
  // Yalnız kısa sorularda, tek kanun geçiyorsa bağla.
  if (refs.length < 4 && text.length <= 400) {
    const laws = detectLaws(text);
    if (laws.length === 1) {
      const only = laws[0]!;
      for (const m of text.matchAll(/\bmadde\s+(\d{1,4})\b/giu)) {
        push(only, m[1]!);
        if (refs.length >= 4) break;
      }
    }
  }

  return refs.slice(0, 4);
}

/** Konuşma dilini mevzuat cümlesine yaklaştırır. Kanun metni uydurmaz. */
export function expandLegalQuery(text: string): string {
  const phrases: string[] = [];
  const rent = /kira|kiracı|kiraci|ev sahibi|depozito|tahliye|güvence/i.test(text);
  const rentRaise = /zam|artış|artis|tavan|tüfe|tufe|enflasyon/i.test(text);
  if (rent) {
    phrases.push(
      "konut ve çatılı işyeri kirası kira bedeli tahliye güvence bedeli",
    );
  }
  if (rent && rentRaise) {
    phrases.push(
      "kira bedelinin belirlenmesi tüketici fiyat endeksi on iki aylık ortalama",
    );
  }
  for (const rule of EXPANSIONS) {
    if (rule.re.test(text)) phrases.push(rule.phrase);
  }
  return phrases.join(" ").slice(0, 400);
}

export function buildLightEmbedText(text: string): string {
  const expansion = expandLegalQuery(text);
  const head = text.replace(/\s+/g, " ").trim().slice(0, expansion ? 700 : 2500);
  if (!expansion) return head;
  return `${head}\n${expansion}`.slice(0, 2500);
}

function detectLaws(text: string): LawHit[] {
  const found: LawHit[] = [];
  const seen = new Set<string>();
  for (const d of LAW_DETECTORS) {
    if (!d.re.test(text) || seen.has(d.kanunNo)) continue;
    seen.add(d.kanunNo);
    found.push({ kanunNo: d.kanunNo, short: d.short });
  }
  return found;
}
