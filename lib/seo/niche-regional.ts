/**
 * Dar bölgesel / niş anahtar kelime sayfaları — indeks önceliği düşük.
 * Türkiye yüksek niyet sorgularına odaklanırken sitemap + robots noindex ile yumuşak çıkarılır.
 */
export const NICHE_REGIONAL_PATHS = [
  "/rehber/kibris-kira-depozito-anlasmazligi",
  "/blog/kibris-kira-sozlesmesi-7-tuzak",
] as const;

export const NICHE_REGIONAL_REHBER_SLUGS = [
  "kibris-kira-depozito-anlasmazligi",
] as const;

export const NICHE_REGIONAL_BLOG_SLUGS = [
  "kibris-kira-sozlesmesi-7-tuzak",
] as const;

export function isNicheRegionalPath(path: string): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return (NICHE_REGIONAL_PATHS as readonly string[]).includes(normalized);
}

export function isNicheRegionalRehberSlug(slug: string): boolean {
  return (NICHE_REGIONAL_REHBER_SLUGS as readonly string[]).includes(slug);
}

export function isNicheRegionalBlogSlug(slug: string): boolean {
  return (NICHE_REGIONAL_BLOG_SLUGS as readonly string[]).includes(slug);
}
