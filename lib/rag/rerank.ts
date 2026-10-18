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
