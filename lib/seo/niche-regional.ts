import THIN_CONTENT_PATHS from "./thin-content.json";

/**
 * Dar bölgesel / niş anahtar kelime sayfaları — indeks önceliği düşük.
 * Türkiye yüksek niyet sorgularına odaklanırken sitemap + robots noindex ile yumuşak çıkarılır.
 */
export const NICHE_REGIONAL_PATHS = [
  "/rehber/kibris-kira-depozito-anlasmazligi",
  "/blog/kibris-kira-sozlesmesi-7-tuzak",
  "/blog/kira-takip-raporu-yapay-zeka-analizi",
] as const;

export const NICHE_REGIONAL_REHBER_SLUGS = [
  "kibris-kira-depozito-anlasmazligi",
] as const;

export const NICHE_REGIONAL_BLOG_SLUGS = [
  "kibris-kira-sozlesmesi-7-tuzak",
  "kira-takip-raporu-yapay-zeka-analizi",
] as const;

/** scripts/seo-thin-audit.mjs ile üretilir: sığ ve arama trafiği almayan rehber/blog sayfaları. */
const THIN = new Set<string>(THIN_CONTENT_PATHS as string[]);

export function isThinContentPath(path: string): boolean {
  return THIN.has(path.startsWith("/") ? path : `/${path}`);
}

export function isNicheRegionalPath(path: string): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return (
    (NICHE_REGIONAL_PATHS as readonly string[]).includes(normalized) ||
    THIN.has(normalized)
  );
}

export function isNicheRegionalRehberSlug(slug: string): boolean {
  return (
    (NICHE_REGIONAL_REHBER_SLUGS as readonly string[]).includes(slug) ||
    THIN.has(`/rehber/${slug}`)
  );
}

export function isNicheRegionalBlogSlug(slug: string): boolean {
  return (
    (NICHE_REGIONAL_BLOG_SLUGS as readonly string[]).includes(slug) ||
    THIN.has(`/blog/${slug}`)
  );
}
