import type { MetadataRoute } from "next";
import { CONTRACT_ANALYSIS_SLUGS } from "@/lib/seo/contract-analysis-pages";
import { SOZLESME_ANALIZI_SLUGS } from "@/lib/seo/sozlesme-analizi-pages";
import { REHBER_SLUGS } from "@/lib/seo/rehber-pages";
import { HUKUKI_ANALIZ_SLUGS } from "@/lib/seo/hukuki-analiz-pages";
import { FREE_TOOLS_SITEMAP_PATHS } from "@/lib/seo/free-tools-routes";
import { YAPAY_ZEKA_HUKUK_SLUGS } from "@/lib/seo/yapay-zeka-hukuk-pages";
import { BLOG_SLUGS } from "@/lib/seo/blog-posts";
import { HAKLARIM_SLUGS } from "@/lib/seo/haklarim-pages";
import { SITE_URL } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: lastMod, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/guvenlik`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${SITE_URL}/hakkimizda`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/gizlilik`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/analiz`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/sozlesme-analizi`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.93,
    },
    {
      url: `${SITE_URL}/yapay-zeka-hukuk`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  const araclar: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/araclar`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    ...FREE_TOOLS_SITEMAP_PATHS.map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  const rehber: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/rehber`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    ...REHBER_SLUGS.map((slug) => ({
      url: `${SITE_URL}/rehber/${slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  const hukukiAnaliz: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/hukuki-analiz`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...HUKUKI_ANALIZ_SLUGS.map((slug) => ({
      url: `${SITE_URL}/hukuki-analiz/${slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

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

  const yapayZekaHukuk: MetadataRoute.Sitemap = [
    ...YAPAY_ZEKA_HUKUK_SLUGS.map((slug) => ({
      url: `${SITE_URL}/yapay-zeka-hukuk/${slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  const blog: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    ...BLOG_SLUGS.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
  ];

  const haklarim: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/haklarim`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.91,
    },
    ...HAKLARIM_SLUGS.map((slug) => ({
      url: `${SITE_URL}/haklarim/${slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: 0.88,
    })),
  ];

  return [
    ...staticRoutes,
    ...araclar,
    ...rehber,
    ...hukukiAnaliz,
    ...haklarim,
    ...yapayZekaHukuk,
    ...analiz,
    ...sozlesmeAnalizi,
    ...blog,
  ];
}
