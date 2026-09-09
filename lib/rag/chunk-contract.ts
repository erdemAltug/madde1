/**
 * Sözleşmeden retrieval sorguları üretir.
 * Fixed-size chunk yerine madde/başlık sınırları + risk odaklı pencereler.
 */
export function extractContractQueries(
  contractText: string,
  opts?: { maxQueries?: number; maxQueryChars?: number },
): string[] {
  const maxQueries = opts?.maxQueries ?? 4;
  const maxQueryChars = opts?.maxQueryChars ?? 900;
  const text = contractText.replace(/\r\n/g, "\n").trim();
  if (!text) return [];

  const parts: string[] = [];

  const byMadde = text.split(
    /(?=\n\s*(?:MADDE|Madde|Article)\s*\d+\s*[:.\-–)]?\s*)/u,
  );
  if (byMadde.length >= 2) {
    for (const p of byMadde) {
      const t = p.trim();
      if (t.length >= 80) parts.push(t.slice(0, maxQueryChars));
    }
  }

  if (parts.length < 2) {
    const byBlank = text.split(/\n{2,}/);
    for (const p of byBlank) {
      const t = p.trim();
      if (t.length >= 100) parts.push(t.slice(0, maxQueryChars));
    }
  }

  if (parts.length === 0) {
    parts.push(text.slice(0, maxQueryChars));
    if (text.length > maxQueryChars * 2) {
      const mid = Math.floor(text.length / 2);
      parts.push(text.slice(mid, mid + maxQueryChars));
    }
    if (text.length > maxQueryChars) {
      parts.push(text.slice(-maxQueryChars));
    }
  }

  const scored = parts
    .map((p) => ({ p, s: riskScore(p) }))
    .sort((a, b) => b.s - a.s);

  const out: string[] = [];
  const seen = new Set<string>();
  for (const { p } of scored) {
    const key = p.slice(0, 120).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
    if (out.length >= maxQueries) break;
  }
  return out;
}

function riskScore(s: string): number {
  const keys = [
    "fesih",
    "tazminat",
    "cezai",
    "ceza",
    "kesinti",
    "ücret",
    "maaş",
    "kira",
    "artış",
    "tahliye",
    "depozito",
    "rekabet",
    "gizlilik",
    "fikri",
    "telif",
    "fazla mesai",
    "ihbar",
    "kıdem",
    "sorumluluk",
    "tek taraflı",
    "muafiyet",
  ];
  const lower = s.toLowerCase();
  let n = 0;
  for (const k of keys) if (lower.includes(k)) n += 2;
  return n + Math.min(5, Math.floor(s.length / 400));
}
