import { config as loadEnv } from "dotenv";
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";

loadEnv({ path: join(process.cwd(), ".env.local") });
loadEnv();

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "src", "content", "blog");
const STATE_PATH = join(ROOT, "scripts", "data", "content-engine-state.json");

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tryclause.tech"
).replace(/\/$/, "");

const CTA_BLOCK = `> **Kişisel hukuk asistanınız:** Sözleşmenizdeki riskleri tarayın; kayıt olduğunuzda rapor hesabınızda saklanır. [Ücretsiz tarama ↗](${SITE_URL}/giris?kayit=1&next=/hesabim)`;

type TopicPool = "kira" | "is" | "tuketici";

type Topic = {
  id: string;
  pool: TopicPool;
  query: string;
  ctaHref: string;
};

const TOPIC_POOLS: Topic[] = [
  // Kira Hukuku
  {
    id: "kira-zam-2026",
    pool: "kira",
    query: "Ev sahibi kiraya yüzde kaç zam yapabilir 2026?",
    ctaHref: "/araclar/kira-analizi",
  },
  {
    id: "kira-tahliye-taahhut",
    pool: "kira",
    query: "Tahliye taahhütnamesi geçerlilik şartları",
    ctaHref: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
  },
  {
    id: "kira-depozito-iade",
    pool: "kira",
    query: "Depozito iadesi vermeyen ev sahibine ne yapılır?",
    ctaHref: "/kira-sozlesmesi-analizi",
  },
  // İş Hukuku
  {
    id: "is-istifa-kidem",
    pool: "is",
    query: "Kendi isteğiyle ayrılan işçi kıdem tazminatı alabilir mi?",
    ctaHref: "/araclar/kidem-tazminati-hesaplama",
  },
  {
    id: "is-mobbing-fesih",
    pool: "is",
    query: "Mobbing nedeniyle haklı fesih rehberi",
    ctaHref: "/araclar/tazminat-hesaplama",
  },
  {
    id: "is-ihbar-hesap",
    pool: "is",
    query: "İhbar süresi ve ihbar tazminatı hesaplama",
    ctaHref: "/araclar/ihbar-tazminati-hesaplama",
  },
  // Tüketici Hukuku
  {
    id: "tuketici-ayipli-mal",
    pool: "tuketici",
    query: "Ayıplı mal iadesi ve Tüketici Hakem Heyeti başvurusu",
    ctaHref: "/dilekce-olusturucu",
  },
  {
    id: "tuketici-ikinci-el",
    pool: "tuketici",
    query: "İkinci el araç alımında sözleşme tuzakları",
    ctaHref: "/araclar/sozlesme-tuzak-tarama",
  },
  {
    id: "is-istifa-kidem-2026",
    pool: "is",
    query: "Kendi isteğiyle ayrılan işçi kıdem tazminatı alabilir mi 2026?",
    ctaHref: "/araclar/kidem-tazminati-hesaplama",
  },
  {
    id: "is-issizlik-maasi-2026",
    pool: "is",
    query: "İşsizlik maaşı 2026 ne kadar kaç ay alınır?",
    ctaHref: "/araclar/issizlik-maasi-hesaplama",
  },
  {
    id: "is-kidem-tavani-2026",
    pool: "is",
    query: "Kıdem tazminatı tavanı 2026 ne kadar?",
    ctaHref: "/araclar/kidem-tazminati-hesaplama",
  },
  {
    id: "is-fazla-mesai-hesap",
    pool: "is",
    query: "Fazla mesai ücreti nasıl hesaplanır 2026?",
    ctaHref: "/araclar/fazla-mesai-ucreti-hesaplama",
  },
  {
    id: "kira-zam-itiraz-dilekce",
    pool: "kira",
    query: "Ev sahibine kira zammı itiraz dilekçesi nasıl yazılır?",
    ctaHref: "/dilekce-olusturucu",
  },
  {
    id: "kira-ihtarname-nasil",
    pool: "kira",
    query: "Kira için ihtarname nasıl çekilir 2026?",
    ctaHref: "/dilekce-olusturucu",
  },
  {
    id: "is-rekabet-yasagi",
    pool: "is",
    query: "İş sözleşmesinde rekabet yasağı geçerli mi?",
    ctaHref: "/is-sozlesmesi-analizi",
  },
  {
    id: "sozlesme-cezai-sart",
    pool: "is",
    query: "Sözleşmede cezai şart ne zaman geçersiz sayılır?",
    ctaHref: "/araclar/sozlesme-tuzak-tarama",
  },
];

type EngineState = {
  usedTopicIds: string[];
  lastGeneratedAt: string | null;
  lastSlug: string | null;
  poolCursor: number;
};

type GeneratedArticle = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  keywords: string[];
  markdownBody: string;
  faqs: { question: string; answer: string }[];
};

function loadState(): EngineState {
  if (!existsSync(STATE_PATH)) {
    return {
      usedTopicIds: [],
      lastGeneratedAt: null,
      lastSlug: null,
      poolCursor: 0,
    };
  }
  try {
    return JSON.parse(readFileSync(STATE_PATH, "utf8")) as EngineState;
  } catch {
    return {
      usedTopicIds: [],
      lastGeneratedAt: null,
      lastSlug: null,
      poolCursor: 0,
    };
  }
}

function saveState(state: EngineState) {
  mkdirSync(dirname(STATE_PATH), { recursive: true });
  writeFileSync(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

const BLOCKED_TOPIC = /kıbrıs|kibris|kktc|cyprus/i;

function isAllowedTopic(topic: Topic): boolean {
  return !BLOCKED_TOPIC.test(topic.query) && !BLOCKED_TOPIC.test(topic.id);
}

function pickTopic(state: EngineState): Topic {
  const unused = TOPIC_POOLS.filter(
    (t) => isAllowedTopic(t) && !state.usedTopicIds.includes(t.id),
  );
  const pool =
    unused.length > 0
      ? unused
      : TOPIC_POOLS.filter(isAllowedTopic);
  if (unused.length === 0) {
    state.usedTopicIds = [];
  }
  const idx = state.poolCursor % Math.max(pool.length, 1);
  state.poolCursor = (state.poolCursor + 1) % Math.max(pool.length, 1);
  return pool[idx]!;
}

function slugify(input: string): string {
  return input
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function existingSlugs(): Set<string> {
  if (!existsSync(OUT_DIR)) return new Set();
  return new Set(
    readdirSync(OUT_DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, "")),
  );
}

function uniqueSlug(base: string): string {
  const taken = existingSlugs();
  let slug = slugify(base);
  if (!slug) slug = `hukuk-rehberi-${Date.now()}`;
  if (!taken.has(slug)) return slug;
  let i = 2;
  while (taken.has(`${slug}-${i}`)) i += 1;
  return `${slug}-${i}`;
}

function wordCount(text: string): number {
  return text
    .replace(/[#>*_`\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function insertCta(markdown: string): string {
  if (markdown.includes("Clause.ai Ücretsiz Sözleşme Taramasını Deneyin")) {
    return markdown;
  }
  const parts = markdown.split(/\n(?=##\s)/);
  if (parts.length >= 2) {
    const head = parts[0] ?? "";
    const rest = parts.slice(1).join("\n");
    const midCut = Math.max(1, Math.floor(parts.length / 2));
    const before = parts.slice(1, midCut).join("\n");
    const after = parts.slice(midCut).join("\n");
    if (before.trim() && after.trim()) {
      return `${head}\n${before}\n\n${CTA_BLOCK}\n\n${after}`.trim();
    }
    return `${head}\n\n${CTA_BLOCK}\n\n${rest}`.trim();
  }
  return `${markdown.trim()}\n\n${CTA_BLOCK}\n`;
}

function buildPrompt(topic: Topic): string {
  return `Sen Clause.ai için Türkçe LegalTech içerik editörüsün. Tüketici odaklı, pratik ve SEO dostu bir hukuk rehberi yaz.

Konu (ana arama sorgusu): "${topic.query}"
Kategori: ${topic.pool}
Hedef kelime sayısı: 1200–1500 (Türkçe kelime).

Kurallar:
- Bilgilendirme amaçlıdır; hukuki danışmanlık / avukatlık yerine geçmez diye en az bir kez belirt.
- Güncel Türkiye hukuku dilinde yaz (TBK, İş Kanunu, tüketici mevzuatı).
- Kıbrıs, KKTC veya yurt dışı hukuk yazma; niş bölgesel içerik yok.
- Kesin dava sonucu veya kesin parasal taahhüt verme.
- Alt başlıklar (##), kısa paragraflar, madde listeleri kullan.
- Son kullanıcıya aksiyon adımları ver.
- Clause ürün adını doğal geçir; agresif satış yapma.
- Yalnızca TEK bir JSON nesnesi döndür. Markdown kod çiti kullanma.

JSON şeması:
{
  "title": "H1 başlık (soru veya fayda odaklı)",
  "slug": "url-slug-turkce-ascii",
  "metaTitle": "max ~60 karakter SEO title",
  "metaDescription": "max ~155 karakter meta description",
  "excerpt": "1-2 cümle özet",
  "keywords": ["3-6 anahtar kelime"],
  "markdownBody": "Tam makale gövdesi Markdown (## başlıklar, listeler). CTA ekleme — sistem ekleyecek.",
  "faqs": [
    {"question": "...", "answer": "..."},
    {"question": "...", "answer": "..."},
    {"question": "...", "answer": "..."}
  ]
}`;
}

function parseArticleJson(raw: string): GeneratedArticle {
  let t = raw.trim();
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start >= 0 && end > start) t = t.slice(start, end + 1);
  const parsed = JSON.parse(t) as Record<string, unknown>;

  const faqsRaw = Array.isArray(parsed.faqs) ? parsed.faqs : [];
  const faqs = faqsRaw
    .map((f) => {
      const o = f as Record<string, unknown>;
      return {
        question: String(o.question || "").trim(),
        answer: String(o.answer || "").trim(),
      };
    })
    .filter((f) => f.question && f.answer)
    .slice(0, 6);

  const keywords = Array.isArray(parsed.keywords)
    ? parsed.keywords.map((k) => String(k).trim()).filter(Boolean).slice(0, 8)
    : [];

  return {
    title: String(parsed.title || "").trim(),
    slug: String(parsed.slug || "").trim(),
    metaTitle: String(parsed.metaTitle || "").trim(),
    metaDescription: String(parsed.metaDescription || "").trim(),
    excerpt: String(parsed.excerpt || "").trim(),
    keywords,
    markdownBody: String(parsed.markdownBody || "").trim(),
    faqs,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function uniqueIds(ids: Array<string | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of ids) {
    const v = id?.trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

function geminiModelCandidates(): string[] {
  return uniqueIds([
    process.env.GEMINI_CONTENT_MODEL,
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-3.7-flash",
  ]);
}

function groqModelCandidates(): string[] {
  return uniqueIds([
    process.env.GROQ_CONTENT_MODEL,
    process.env.GROQ_LEGAL_MODEL === "llama-3.3-70b-versatile"
      ? undefined
      : process.env.GROQ_LEGAL_MODEL,
    "llama-3.1-8b-instant",
    "openai/gpt-oss-20b",
    "openai/gpt-oss-120b",
    "llama-3.3-70b-versatile",
  ]);
}

function extractGeminiText(data: {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
}): string {
  return (
    data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text || "")
      .join("")
      .trim() || ""
  );
}

async function generateWithGeminiModel(
  prompt: string,
  model: string,
  opts?: { json?: boolean; maxOutputTokens?: number; retries?: number },
): Promise<string> {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new Error("GEMINI_API_KEY missing");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
  const maxRetries = opts?.retries ?? 1;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: opts?.maxOutputTokens ?? 8192,
          ...(opts?.json === false
            ? {}
            : { responseMimeType: "application/json" }),
        },
      }),
    });

    if (res.ok) {
      const data = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = extractGeminiText(data);
      if (!text) throw new Error(`Gemini ${model} returned empty content`);
      return text;
    }

    const errText = await res.text();
    lastError = new Error(
      `Gemini ${model} error ${res.status}: ${errText.slice(0, 280)}`,
    );

    const retryable = res.status === 503 || res.status === 429;
    if (!retryable || attempt >= maxRetries) {
      throw lastError;
    }

    const delayMs = 4000 * 2 ** attempt;
    console.warn(
      `[content-engine] ${model} ${res.status}; retry ${attempt + 1}/${maxRetries} in ${delayMs}ms`,
    );
    await sleep(delayMs);
  }

  throw lastError ?? new Error(`Gemini ${model} request failed`);
}

async function listGeminiGenerateModels(key: string): Promise<string[]> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`,
  );
  if (!res.ok) return [];
  const listed = (await res.json()) as {
    models?: { name?: string; supportedGenerationMethods?: string[] }[];
  };
  return (listed.models ?? [])
    .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
    .map((m) => m.name?.replace(/^models\//, "") || "")
    .filter(
      (n) =>
        Boolean(n) &&
        /flash|lite/i.test(n) &&
        !/image|tts|live|embed|omni|audio/i.test(n),
    );
}

async function resolveGeminiModels(): Promise<string[]> {
  const fallback = geminiModelCandidates();
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return fallback;
  try {
    const live = await listGeminiGenerateModels(key);
    if (live.length === 0) return fallback;
    console.log(
      `[content-engine] Gemini live generateContent models: ${live.slice(0, 12).join(", ")}`,
    );
    const liteFirst = [
      ...live.filter((n) => /lite/i.test(n)),
      ...live.filter((n) => !/lite/i.test(n)),
    ].slice(0, 8);
    return uniqueIds([...liteFirst, ...fallback]);
  } catch {
    return fallback;
  }
}

async function generateWithGemini(prompt: string): Promise<string> {
  const models = await resolveGeminiModels();
  const errors: string[] = [];

  for (const model of models) {
    try {
      const text = await generateWithGeminiModel(prompt, model);
      console.log(`[content-engine] Gemini ok: ${model}`);
      return text;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(msg);
      console.warn(
        `[content-engine] Gemini fallback skip ${model}: ${msg.slice(0, 180)}`,
      );
    }
  }

  throw new Error(
    `All Gemini models failed (${models.slice(0, 8).join(", ")}). Last: ${errors.at(-1) ?? "unknown"}`,
  );
}

async function generateWithGroq(prompt: string): Promise<string> {
  if (!process.env.GROQ_API_KEY?.trim()) {
    throw new Error("GROQ_API_KEY missing");
  }

  const models = groqModelCandidates();
  const errors: string[] = [];

  for (const modelId of models) {
    try {
      const { text } = await generateText({
        model: groq(modelId),
        prompt,
        maxOutputTokens: 8192,
        temperature: 0.7,
      });
      if (!text?.trim()) throw new Error(`Groq ${modelId} empty`);
      console.log(`[content-engine] Groq ok: ${modelId}`);
      return text;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${modelId}: ${msg}`);
      console.warn(
        `[content-engine] Groq fallback skip ${modelId}: ${msg.slice(0, 180)}`,
      );
    }
  }

  throw new Error(`All Groq models failed. Last: ${errors.at(-1) ?? "unknown"}`);
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY?.trim()) {
    throw new Error("OPENAI_API_KEY missing");
  }
  const modelId = process.env.OPENAI_CONTENT_MODEL?.trim() || "gpt-4o-mini";
  const { text } = await generateText({
    model: openai(modelId),
    prompt,
    maxOutputTokens: 8192,
    temperature: 0.7,
  });
  if (!text?.trim()) throw new Error("OpenAI returned empty content");
  console.log(`[content-engine] OpenAI ok: ${modelId}`);
  return text;
}

async function generateArticleRaw(prompt: string): Promise<string> {
  const providers: Array<{ name: string; run: () => Promise<string> }> = [];

  if (process.env.GEMINI_API_KEY?.trim()) {
    providers.push({ name: "Gemini", run: () => generateWithGemini(prompt) });
  }
  if (process.env.GROQ_API_KEY?.trim()) {
    providers.push({ name: "Groq", run: () => generateWithGroq(prompt) });
  }
  if (process.env.OPENAI_API_KEY?.trim()) {
    providers.push({ name: "OpenAI", run: () => generateWithOpenAI(prompt) });
  }

  if (providers.length === 0) {
    throw new Error(
      "Set GEMINI_API_KEY, GROQ_API_KEY, or OPENAI_API_KEY for content generation.",
    );
  }

  const errors: string[] = [];
  for (const provider of providers) {
    try {
      return await provider.run();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${provider.name}: ${msg}`);
      console.warn(
        `[content-engine] ${provider.name} exhausted; next provider. ${msg.slice(0, 200)}`,
      );
    }
  }

  throw new Error(
    `All content providers failed. ${errors.join(" | ").slice(0, 800)}`,
  );
}

async function probeProviders(): Promise<void> {
  const ping = 'Reply with JSON only: {"ok":true}';
  console.log("[content-engine] probe start");

  if (process.env.GEMINI_API_KEY?.trim()) {
    const key = process.env.GEMINI_API_KEY.trim();
    try {
      const listRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`,
      );
      if (listRes.ok) {
        const listed = (await listRes.json()) as {
          models?: { name?: string }[];
        };
        const names = (listed.models ?? [])
          .map((m) => m.name?.replace(/^models\//, "") ?? "")
          .filter((n) => Boolean(n) && /flash|lite/i.test(n))
          .slice(0, 20);
        console.log(
          `[content-engine] Gemini listed flash/lite: ${names.join(", ")}`,
        );
      } else {
        console.warn(
          `[content-engine] Gemini list models ${listRes.status}: ${(await listRes.text()).slice(0, 160)}`,
        );
      }
    } catch (err) {
      console.warn("[content-engine] Gemini list failed", err);
    }

    for (const model of await resolveGeminiModels()) {
      try {
        const text = await generateWithGeminiModel(ping, model, {
          json: true,
          maxOutputTokens: 64,
          retries: 0,
        });
        console.log(
          `[content-engine] probe Gemini ${model} OK: ${text.slice(0, 80)}`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(
          `[content-engine] probe Gemini ${model} FAIL: ${msg.slice(0, 180)}`,
        );
      }
    }
  } else {
    console.warn("[content-engine] probe skip Gemini (no key)");
  }

  if (process.env.GROQ_API_KEY?.trim()) {
    for (const modelId of groqModelCandidates().slice(0, 4)) {
      try {
        const { text } = await generateText({
          model: groq(modelId),
          prompt: ping,
          maxOutputTokens: 32,
          temperature: 0,
        });
        console.log(
          `[content-engine] probe Groq ${modelId} OK: ${text.slice(0, 80)}`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(
          `[content-engine] probe Groq ${modelId} FAIL: ${msg.slice(0, 180)}`,
        );
      }
    }
  } else {
    console.warn("[content-engine] probe skip Groq (no key)");
  }

  if (process.env.OPENAI_API_KEY?.trim()) {
    try {
      const text = await generateWithOpenAI(ping);
      console.log(`[content-engine] probe OpenAI OK: ${text.slice(0, 80)}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[content-engine] probe OpenAI FAIL: ${msg.slice(0, 180)}`);
    }
  } else {
    console.warn("[content-engine] probe skip OpenAI (no key)");
  }
}

function yamlEscape(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes("\n") || value.includes('"')) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

function renderMdx(article: GeneratedArticle, topic: Topic): string {
  const today = new Date().toISOString().slice(0, 10);
  const body = insertCta(article.markdownBody);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const lines = [
    "---",
    `title: ${yamlEscape(article.title)}`,
    `metaTitle: ${yamlEscape(article.metaTitle || article.title)}`,
    `metaDescription: ${yamlEscape(article.metaDescription || article.excerpt)}`,
    `excerpt: ${yamlEscape(article.excerpt)}`,
    `slug: ${yamlEscape(article.slug)}`,
    `category: ${topic.pool}`,
    `topicId: ${topic.id}`,
    `query: ${yamlEscape(topic.query)}`,
    `ctaHref: ${yamlEscape(topic.ctaHref)}`,
    `ctaLabel: ${yamlEscape("Ücretsiz sözleşme taraması")}`,
    `publishedAt: ${today}`,
    `updatedAt: ${today}`,
    `keywords: ${JSON.stringify(article.keywords)}`,
    `faqs: ${JSON.stringify(article.faqs)}`,
    `faqJsonLd: ${JSON.stringify(faqJsonLd)}`,
    "generator: clause-auto-content-engine",
    "---",
    "",
    body,
    "",
    "## Sıkça sorulan sorular",
    "",
    ...article.faqs.flatMap((f) => [
      `### ${f.question}`,
      "",
      f.answer,
      "",
    ]),
    "",
    "---",
    "",
    "*Bu yazı bilgilendirme amaçlıdır; hukuki danışmanlık veya avukatlık hizmeti yerine geçmez. Somut olayınız için uzman görüşü alın.*",
    "",
  ];

  return lines.join("\n");
}

async function main() {
  if (process.argv.includes("--probe")) {
    await probeProviders();
    return;
  }

  const state = loadState();
  const topic = pickTopic(state);
  console.log(`[content-engine] topic=${topic.id} query="${topic.query}"`);

  const raw = await generateArticleRaw(buildPrompt(topic));
  let article = parseArticleJson(raw);

  if (!article.title || !article.markdownBody) {
    throw new Error("Generated article missing title or body");
  }

  let words = wordCount(article.markdownBody);
  if (words < 900) {
    console.warn(
      `[content-engine] body short (${words} words); requesting expansion…`,
    );
    const expandPrompt = `${buildPrompt(topic)}

Önceki taslak çok kısaydı (${words} kelime). Aynı JSON şemasında markdownBody'yi 1200–1500 kelimeye genişlet.
Önceki başlık: ${article.title}`;
    const expanded = await generateArticleRaw(expandPrompt);
    article = parseArticleJson(expanded);
    words = wordCount(article.markdownBody);
  }

  article.slug = uniqueSlug(article.slug || article.title);
  if (!article.metaTitle) article.metaTitle = article.title.slice(0, 60);
  if (!article.metaDescription) {
    article.metaDescription = (article.excerpt || article.title).slice(0, 155);
  }
  if (!article.excerpt) article.excerpt = article.metaDescription;
  if (article.faqs.length < 3) {
    article.faqs.push(
      {
        question: `${topic.query} — kısa yanıt nedir?`,
        answer:
          "Somut olay, sözleşme metni ve güncel mevzuata bağlıdır. Bu rehber genel bilgilendirme sunar; kritik kararlar için uzman desteği alın.",
      },
      {
        question: "Clause sözleşmemi nasıl tarar?",
        answer: `Clause.ai üzerinden ücretsiz ön tarama ile riskli maddeleri hızlıca işaretleyebilirsiniz: ${SITE_URL}`,
      },
      {
        question: "Bu içerik hukuki danışmanlık mıdır?",
        answer:
          "Hayır. Bilgilendirme amaçlıdır; avukatlık veya resmi temsil yerine geçmez.",
      },
    );
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const outPath = join(OUT_DIR, `${article.slug}.mdx`);
  writeFileSync(outPath, renderMdx(article, topic), "utf8");

  state.usedTopicIds = Array.from(new Set(state.usedTopicIds.concat(topic.id)));
  state.lastGeneratedAt = new Date().toISOString();
  state.lastSlug = article.slug;
  saveState(state);

  console.log(
    `[content-engine] wrote ${outPath} (~${wordCount(article.markdownBody)} words)`,
  );
  console.log(`[content-engine] slug=${article.slug}`);
}

main().catch((err) => {
  console.error("[content-engine] failed:", err);
  process.exit(1);
});
