/**
 * İstemci tarafı PII maskeleme — metin API’ye gitmeden önce basit desenlerle temizlenir.
 * Yanlış pozitifler olabilir; kritik veriler için kullanıcı yine de dikkat etmelidir.
 */
const PLACEHOLDER = "[GİZLENMİŞ]";

export type MaskDetectionKind = "tc" | "phone" | "iban" | "card" | "email";

export type MaskDetection = {
  kind: MaskDetectionKind;
  label: string;
  /** Kullanıcıya gösterilen örnek (kısmen maskeli) */
  sample: string;
  count: number;
};

type MaskResult = {
  text: string;
  replacementCount: number;
  detections: MaskDetection[];
};

function countMatchesGlobal(text: string, re: RegExp): number {
  const m = text.match(re);
  return m ? m.length : 0;
}

function firstMatch(text: string, re: RegExp): string | null {
  const m = text.match(re);
  return m?.[0] ?? null;
}

function maskTcSample(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 4) return "***********";
  return `${digits.slice(0, 4)}${"*".repeat(7)}`;
}

function maskPhoneSample(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length >= 10) {
    const local = digits.slice(-10);
    return `+90 ${local.slice(0, 3)} *** ** **`;
  }
  return raw.replace(/\d(?=\d{2})/g, "*");
}

function maskIbanSample(raw: string): string {
  const compact = raw.replace(/\s/g, "");
  if (compact.length < 8) return "TR************************";
  return `${compact.slice(0, 4)} **** **** **** ${compact.slice(-4)}`;
}

function maskCardSample(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8) return "**** **** **** ****";
  return `${digits.slice(0, 4)} **** **** ${digits.slice(-4)}`;
}

function maskEmailSample(raw: string): string {
  const [user, domain] = raw.split("@");
  if (!domain) return "***@***";
  const u = user?.slice(0, 2) ?? "*";
  return `${u}***@${domain}`;
}

const RULES: {
  kind: MaskDetectionKind;
  label: string;
  patterns: RegExp[];
  sample: (raw: string) => string;
}[] = [
  {
    kind: "iban",
    label: "IBAN",
    patterns: [/\bTR\d{2}(?:\s?\d{4}){5}\s?\d{2}\b/gi, /\bTR\d{24}\b/gi],
    sample: maskIbanSample,
  },
  {
    kind: "tc",
    label: "TC Kimlik No",
    patterns: [/\b[1-9]\d{10}\b/g],
    sample: maskTcSample,
  },
  {
    kind: "phone",
    label: "Telefon",
    patterns: [
      /(?:\+90\s*|0\s*)5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}\b/g,
      /\b0\d{3}\s*\d{3}\s*\d{2}\s*\d{2}\b/g,
    ],
    sample: maskPhoneSample,
  },
  {
    kind: "card",
    label: "Kart No",
    patterns: [/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g],
    sample: maskCardSample,
  },
  {
    kind: "email",
    label: "E-posta",
    patterns: [/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi],
    sample: maskEmailSample,
  },
];

/**
 * TC kimlik (11 hane), TR IBAN, Türkiye cep / sabit hat, kart, e-posta maskeler.
 */
export function maskSensitiveText(raw: string): MaskResult {
  let text = raw;
  let replacementCount = 0;
  const detections: MaskDetection[] = [];

  for (const rule of RULES) {
    let kindCount = 0;
    let sampleRaw: string | null = null;
    for (const re of rule.patterns) {
      kindCount += countMatchesGlobal(text, re);
      if (!sampleRaw) sampleRaw = firstMatch(text, re);
      text = text.replace(re, PLACEHOLDER);
    }
    if (kindCount > 0 && sampleRaw) {
      replacementCount += kindCount;
      detections.push({
        kind: rule.kind,
        label: rule.label,
        sample: rule.sample(sampleRaw),
        count: kindCount,
      });
    }
  }

  return { text, replacementCount, detections };
}

/** Yapıştırma anında sadece sayım (textarea içeriği değişmez). */
export function countSensitivePatterns(snippet: string): number {
  return maskSensitiveText(snippet).replacementCount;
}

export function detectSensitivePatterns(snippet: string): MaskDetection[] {
  return maskSensitiveText(snippet).detections;
}
