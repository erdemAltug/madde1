import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { FaqItem } from "@/lib/seo/rehber-types";

export type MdxBlogPost = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  category?: string;
  ctaHref: string;
  ctaLabel: string;
  faqs: FaqItem[];
  faqJsonLd: Record<string, unknown> | null;
  body: string;
};

const BLOG_DIR = join(process.cwd(), "src", "content", "blog");

function parseJsonField<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Minimal YAML-ish frontmatter parser for our generator output. */
export function parseMdxDocument(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const trimmed = raw.replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("---")) {
    return { data: {}, body: trimmed };
  }
  const end = trimmed.indexOf("\n---", 3);
  if (end < 0) return { data: {}, body: trimmed };
  const fm = trimmed.slice(3, end).trim();
  const body = trimmed.slice(end + 4).replace(/^\n/, "");
  const data: Record<string, string> = {};
  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    data[key] = value;
  }
  return { data, body };
}

function toPost(slugFromFile: string, raw: string): MdxBlogPost | null {
  const { data, body } = parseMdxDocument(raw);
  const slug = (data.slug || slugFromFile).trim();
  const title = (data.title || "").trim();
  if (!slug || !title || !body.trim()) return null;

  const faqs = parseJsonField<FaqItem[]>(data.faqs, []);
  const keywords = parseJsonField<string[]>(data.keywords, []);
  const faqJsonLd = parseJsonField<Record<string, unknown> | null>(
    data.faqJsonLd,
    null,
  );

  return {
    slug,
    h1: title,
    metaTitle: data.metaTitle || title,
    metaDescription: data.metaDescription || data.excerpt || title,
    excerpt: data.excerpt || data.metaDescription || title,
    keywords,
    publishedAt: data.publishedAt || data.updatedAt || "2026-01-01",
    updatedAt: data.updatedAt || data.publishedAt || "2026-01-01",
    category: data.category,
    ctaHref: data.ctaHref || "/",
    ctaLabel: data.ctaLabel || "Ücretsiz sözleşme taraması",
    faqs,
    faqJsonLd,
    body,
  };
}

export function getAllMdxBlogPosts(): MdxBlogPost[] {
  if (!existsSync(BLOG_DIR)) return [];
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: MdxBlogPost[] = [];
  for (const file of files) {
    const slugFromFile = file.replace(/\.mdx$/, "");
    const raw = readFileSync(join(BLOG_DIR, file), "utf8");
    const post = toPost(slugFromFile, raw);
    if (post) posts.push(post);
  }
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getMdxBlogPost(slug: string): MdxBlogPost | undefined {
  return getAllMdxBlogPosts().find((p) => p.slug === slug);
}

export function getMdxBlogSlugs(): string[] {
  return getAllMdxBlogPosts().map((p) => p.slug);
}
