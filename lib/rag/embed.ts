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
    return Array.isArray(emb) && emb.length > 0 ? emb : null;
  } catch (err) {
    console.error("[rag/embed]", err);
    return null;
  }
}
