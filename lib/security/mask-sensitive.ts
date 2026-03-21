/**
 * İstemci tarafı PII maskeleme — metin API’ye gitmeden önce basit desenlerle temizlenir.
 * Yanlış pozitifler olabilir; kritik veriler için kullanıcı yine de dikkat etmelidir.
 */
const PLACEHOLDER = "[GİZLENMİŞ]";

type MaskResult = {
  text: string;
  replacementCount: number;
};

function countMatchesGlobal(text: string, re: RegExp): number {
  const m = text.match(re);
  return m ? m.length : 0;
}

/**
 * TC kimlik (11 hane), TR IBAN, Türkiye cep / sabit hat, 16 haneli kart benzeri dizileri maskeler.
 */
export function maskSensitiveText(raw: string): MaskResult {
  let text = raw;
  let replacementCount = 0;

  const patterns: RegExp[] = [
    /\bTR\d{2}(?:\s?\d{4}){5}\s?\d{2}\b/gi,
    /\bTR\d{24}\b/gi,
    /\b[1-9]\d{10}\b/g,
    /(?:\+90\s*|0\s*)5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}\b/g,
    /\b0\d{3}\s*\d{3}\s*\d{2}\s*\d{2}\b/g,
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
  ];

  for (const re of patterns) {
    replacementCount += countMatchesGlobal(text, re);
    text = text.replace(re, PLACEHOLDER);
  }

  return { text, replacementCount };
}

/** Yapıştırma anında sadece sayım (textarea içeriği değişmez). */
export function countSensitivePatterns(snippet: string): number {
  return maskSensitiveText(snippet).replacementCount;
}
