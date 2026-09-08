/**
 * İstemci tarafı PII maskeleme — metin API’ye gitmeden önce basit desenlerle temizlenir.
 * Yanlış pozitifler olabilir; kritik veriler için kullanıcı yine de dikkat etmelidir.
 */
const PLACEHOLDER = "[GİZLENMİŞ]";

export type MaskDetectionKind =
  | "tc"
  | "phone"
  | "iban"
  | "card"
  | "email"
  | "name";

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
  kind: Exclude<MaskDetectionKind, "name">;
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

const NAME_TOKEN =
  "[A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\\s+[A-ZÇĞİÖŞÜ][a-zçğıöşü]+){0,3}";

/** Etiketli taraf isimleri — TC rakamlarıyla çakışmaz */
const PARTY_LABEL_RE = new RegExp(
  `(?:Kiracı|Kiraya\\s*Veren|Kiralayan|İşveren|İşçi|Taraf|Alıcı|Satıcı|Müşteri|Yüklenici|Adı\\s*Soyadı|Ad\\s*/\\s*Soyad)\\s*[:：]\\s*(${NAME_TOKEN})`,
  "giu",
);

const SAYIN_RE = new RegExp(`Sayın\\s+(${NAME_TOKEN})`, "giu");

const PARTY_LABELS = ["[Taraf A]", "[Taraf B]", "[Taraf C]", "[Taraf D]"];

function anonymizePartyNames(text: string): {
  text: string;
  count: number;
  sample: string | null;
} {
  const found: string[] = [];
  const collect = (re: RegExp) => {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const name = m[1]?.trim();
      if (!name || name.length < 3) continue;
      if (/\d/.test(name)) continue;
      if (!found.includes(name)) found.push(name);
    }
  };
  collect(PARTY_LABEL_RE);
  collect(SAYIN_RE);

  if (!found.length) return { text, count: 0, sample: null };

  let out = text;
  let count = 0;
  found.slice(0, PARTY_LABELS.length).forEach((name, i) => {
    const label = PARTY_LABELS[i] ?? `[Taraf ${i + 1}]`;
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "g");
    const before = out;
    out = out.replace(re, label);
    if (out !== before) count += 1;
  });

  return {
    text: out,
    count,
    sample: found
      .slice(0, 2)
      .map((_, i) => PARTY_LABELS[i])
      .join(", "),
  };
}

/**
 * TC, IBAN, telefon, kart, e-posta ve etiketli taraf isimlerini maskeler.
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

  const parties = anonymizePartyNames(text);
  text = parties.text;
  if (parties.count > 0 && parties.sample) {
    replacementCount += parties.count;
    detections.push({
      kind: "name",
      label: "Taraf isimleri",
      sample: parties.sample,
      count: parties.count,
    });
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
