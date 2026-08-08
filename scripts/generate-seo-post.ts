import "dotenv/config";

import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "src", "content", "blog");
const STATE_PATH = join(ROOT, "scripts", "data", "content-engine-state.json");

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tryclause.tech"
).replace(/\/$/, "");

const CTA_BLOCK = `> 🛡️ **Yasal Haklarınızı Koruyun:** Kira veya iş sözleşmenizdeki gizli riskleri ve aleyhinize olan maddeleri 5 saniyede tespit etmek için [Clause.ai Ücretsiz Sözleşme Taramasını Deneyin ↗](${SITE_URL})`;

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
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
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

function pickTopic(state: EngineState): Topic {
  const unused = TOPIC_POOLS.filter((t) => !state.usedTopicIds.includes(t.id));
  const pool = unused.length > 0 ? unused : TOPIC_POOLS;
  if (unused.length === 0) {
    state.usedTopicIds = [];
  }
  const idx = state.poolCursor % pool.length;
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
- Güncel Türkiye hukuku dilinde yaz (TBK, İş Kanunu, tüketici mevzuatı bağlamı).
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

async function generateWithGemini(prompt: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new Error("GEMINI_API_KEY missing");
  // Eski: gemini-1.5-pro / gemini-2.0-flash — Yeni: gemini-2.5-flash
  const model =
    process.env.GEMINI_CONTENT_MODEL?.trim() || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini error ${res.status}: ${errText.slice(0, 400)}`);
  }
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts
    ?.map((p) => p.text || "")
    .join("")
    .trim();
  if (!text) throw new Error("Gemini returned empty content");
  return text;
}

async function generateWithAiSdk(prompt: string): Promise<string> {
  const model = process.env.OPENAI_API_KEY
    ? openai(process.env.OPENAI_CONTENT_MODEL?.trim() || "gpt-4o-mini")
    : process.env.GROQ_API_KEY
      ? groq(process.env.GROQ_LEGAL_MODEL?.trim() || "llama-3.3-70b-versatile")
      : null;
  if (!model) throw new Error("No OPENAI_API_KEY or GROQ_API_KEY");

  const { text } = await generateText({
    model,
    prompt,
    maxOutputTokens: 8192,
    temperature: 0.7,
  });
  return text;
}

async function generateArticleRaw(prompt: string): Promise<string> {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY?.trim());
  const hasFallback =
    Boolean(process.env.OPENAI_API_KEY?.trim()) ||
    Boolean(process.env.GROQ_API_KEY?.trim());

  if (hasGemini) {
    try {
      return await generateWithGemini(prompt);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // Free-tier 429 / quota → OpenAI/Groq'a düş
      if (hasFallback && /\b429\b|quota|Too Many Requests/i.test(msg)) {
        console.warn(
          `[content-engine] Gemini quota/rate-limit; falling back. ${msg.slice(0, 160)}`,
        );
        return generateWithAiSdk(prompt);
      }
      throw err;
    }
  }

  if (hasFallback) {
    return generateWithAiSdk(prompt);
  }

  throw new Error(
    "Set GEMINI_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY for content generation.",
  );
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
