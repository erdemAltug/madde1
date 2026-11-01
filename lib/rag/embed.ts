const CACHE_MAX = 256;
/** Aynı sorgu (persona boost, tekrar eden sohbet soruları) için gömmeyi yeniden istemez. */
const cache = new Map<string, number[]>();

function cacheGet(key: string): number[] | undefined {
  const hit = cache.get(key);
  if (hit) {
    cache.delete(key);
    cache.set(key, hit);
  }
  return hit;
}

function cacheSet(key: string, value: number[]) {
  cache.set(key, value);
  if (cache.size > CACHE_MAX) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

/** OpenAI text-embedding-3-small (1536-d) — pgvector şemasıyla uyumlu. */
export async function embedText(
  text: string,
  opts?: { maxChars?: number },
): Promise<number[] | null> {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return null;

  const maxChars = opts?.maxChars ?? 3000;
  const input = text.replace(/\s+/g, " ").trim().slice(0, maxChars);
  if (!input) return null;

  const cached = cacheGet(input);
  if (cached) return cached;

  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input,
      }),
    });
    if (!res.ok) {
      console.error("[rag/embed]", await res.text().catch(() => res.status));
      return null;
    }
    const data = (await res.json()) as {
      data?: Array<{ embedding?: number[] }>;
    };
    const emb = data.data?.[0]?.embedding;
    if (!Array.isArray(emb) || emb.length === 0) return null;
    cacheSet(input, emb);
    return emb;
  } catch (err) {
    console.error("[rag/embed]", err);
    return null;
  }
}
