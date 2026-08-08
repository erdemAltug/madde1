import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RehberPageLayout } from "@/components/seo/rehber-page-layout";
import { MdxBlogLayout } from "@/components/seo/mdx-blog-layout";
import { BLOG_SLUGS, getBlogPost } from "@/lib/seo/blog-posts";
import { getMdxBlogPost, getMdxBlogSlugs } from "@/lib/seo/mdx-blog";
import { getRelatedLinksForBlog } from "@/lib/seo/internal-links";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  const slugs = new Set([...BLOG_SLUGS, ...getMdxBlogSlugs()]);
  return [...slugs].map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const mdx = getMdxBlogPost(params.slug);
  if (mdx) {
    const path = `/blog/${params.slug}`;
    return {
      title: mdx.metaTitle,
      description: mdx.metaDescription,
      keywords: [...mdx.keywords, "Clause blog", "legal AI", SITE_NAME],
      alternates: { canonical: absoluteUrl(path) },
      openGraph: {
        title: `${mdx.metaTitle} | ${SITE_NAME}`,
        description: mdx.excerpt,
        url: absoluteUrl(path),
        type: "article",
        locale: "tr_TR",
        publishedTime: mdx.publishedAt,
        images: openGraphArticleImages(defaultOgAlt(mdx.metaTitle)),
      },
      twitter: twitterSummaryLargeImage(mdx.metaTitle, mdx.excerpt),
    };
  }

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
  const mdx = getMdxBlogPost(params.slug);
  if (mdx) return <MdxBlogLayout post={mdx} />;

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
