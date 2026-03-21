import type { MetadataRoute } from "next";
import { CONTRACT_ANALYSIS_SLUGS } from "@/lib/seo/contract-analysis-pages";
import { SOZLESME_ANALIZI_SLUGS } from "@/lib/seo/sozlesme-analizi-pages";
import { FREE_TOOLS_SITEMAP_PATHS } from "@/lib/seo/free-tools-routes";
import { SITE_URL } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: lastMod, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/blog`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guvenlik`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${SITE_URL}/baski`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const araclar: MetadataRoute.Sitemap = FREE_TOOLS_SITEMAP_PATHS.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: lastMod,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const analiz: MetadataRoute.Sitemap = CONTRACT_ANALYSIS_SLUGS.map((slug) => ({
    url: `${SITE_URL}/analiz/${slug}`,
    lastModified: lastMod,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const sozlesmeAnalizi: MetadataRoute.Sitemap = SOZLESME_ANALIZI_SLUGS.map(
    (slug) => ({
      url: `${SITE_URL}/sozlesme-analizi/${slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.88,
    }),
  );

  return [...staticRoutes, ...araclar, ...analiz, ...sozlesmeAnalizi];
}
