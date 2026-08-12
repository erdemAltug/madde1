import type { MetadataRoute } from "next";
import { CONTRACT_ANALYSIS_SLUGS } from "@/lib/seo/contract-analysis-pages";
import { SOZLESME_ANALIZI_SLUGS } from "@/lib/seo/sozlesme-analizi-pages";
import { REHBER_SLUGS, getRehberConfig } from "@/lib/seo/rehber-pages";
import { HUKUKI_ANALIZ_SLUGS } from "@/lib/seo/hukuki-analiz-pages";
import { FREE_TOOLS_SITEMAP_PATHS } from "@/lib/seo/free-tools-routes";
import { YAPAY_ZEKA_HUKUK_SLUGS } from "@/lib/seo/yapay-zeka-hukuk-pages";
import { BLOG_SLUGS, getBlogPost } from "@/lib/seo/blog-posts";
import { getAllMdxBlogPosts, getMdxBlogSlugs } from "@/lib/seo/mdx-blog";
import { HAKLARIM_SLUGS } from "@/lib/seo/haklarim-pages";
import { INTENT_PILLAR_CATEGORIES } from "@/lib/seo/intent-pillars";
import { isNicheRegionalPath } from "@/lib/seo/niche-regional";
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
    {
      url: `${SITE_URL}/gunluk-hukuk`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.94,
    },
    ...INTENT_PILLAR_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/${category}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.97,
    })),
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
    ...REHBER_SLUGS.filter(
      (slug) => !isNicheRegionalPath(`/rehber/${slug}`),
    ).map((slug) => ({
      url: `${SITE_URL}/rehber/${slug}`,
      lastModified: new Date(
        getRehberConfig(slug)?.updatedAt ?? lastMod.toISOString(),
      ),
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

  const blogSlugs = Array.from(new Set(BLOG_SLUGS.concat(getMdxBlogSlugs())));
  const mdxBySlug = Object.fromEntries(
    getAllMdxBlogPosts().map((p) => [p.slug, p]),
  );

  const blog: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    ...blogSlugs
      .filter((slug) => !isNicheRegionalPath(`/blog/${slug}`))
      .map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(
        mdxBySlug[slug]?.updatedAt ??
          getBlogPost(slug)?.updatedAt ??
          lastMod.toISOString(),
      ),
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
