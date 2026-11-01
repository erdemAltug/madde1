/** Sorgu kelimelerinin metinde geçme oranı. 4 karakterden kısa tokenler sayılmaz. */
export function lexicalOverlap(query: string, content: string): number {
  const tokens = tokenize(query);
  if (tokens.length === 0 || !content) return 0;
  const hay = content.toLocaleLowerCase("tr-TR");
  let hit = 0;
  for (const token of tokens) {
    if (hay.includes(token)) hit += 1;
  }
  return hit / tokens.length;
}

export function blendRetrievalScore(
  similarity: number,
  lexical: number,
  exact: boolean,
): number {
  if (exact) return 1 + Math.max(0, similarity);
  return similarity * 0.75 + lexical * 0.25;
}

function tokenize(query: string): string[] {
  return query
    .toLocaleLowerCase("tr-TR")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= 4);
}

const RRF_K = 60;

/**
 * Reciprocal Rank Fusion: vektör ve tam metin listelerini skor ölçeğinden
 * bağımsız birleştirir. Girdi: her kanalın id listesi (en iyiden kötüye).
 */
export function reciprocalRankFusion(rankings: string[][]): Map<string, number> {
  const scores = new Map<string, number>();
  for (const list of rankings) {
    list.forEach((id, idx) => {
      scores.set(id, (scores.get(id) ?? 0) + 1 / (RRF_K + idx + 1));
    });
  }
  return scores;
}

/** Aynı kanun maddesinin iki kopyası (farklı tablo/sürüm) listeyi doldurmasın. */
export function dedupeKey(citeLabel: string, content: string): string {
  if (/\bm\.\d+/.test(citeLabel)) return citeLabel.toLocaleLowerCase("tr-TR");
  return content.slice(0, 160).replace(/\s+/g, " ").toLocaleLowerCase("tr-TR");
}
