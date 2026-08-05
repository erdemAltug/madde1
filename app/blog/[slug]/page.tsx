import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RehberPageLayout } from "@/components/seo/rehber-page-layout";
import { BLOG_SLUGS, getBlogPost } from "@/lib/seo/blog-posts";
import { getRelatedLinksForBlog } from "@/lib/seo/internal-links";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Blog" };
  const path = `/blog/${params.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [...post.keywords, "Clause blog", "legal AI", SITE_NAME],
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: `${post.metaTitle} | ${SITE_NAME}`,
      description: post.excerpt,
      url: absoluteUrl(path),
      type: "article",
      locale: "tr_TR",
      publishedTime: post.publishedAt,
      images: openGraphArticleImages(defaultOgAlt(post.metaTitle)),
    },
    twitter: twitterSummaryLargeImage(post.metaTitle, post.excerpt),
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();
  return (
    <RehberPageLayout
      config={post}
      basePath="/blog"
      hub={{ name: "Blog", href: "/blog" }}
      relatedLinks={getRelatedLinksForBlog(params.slug)}
    />
  );
}
