import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/seo/faq-section";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import type { MdxBlogPost } from "@/lib/seo/mdx-blog";
import { buildArticleJsonLd } from "@/lib/seo/faq-schema";
import { absoluteUrl } from "@/lib/seo/site";

type Props = {
  post: MdxBlogPost;
};

export function MdxBlogLayout({ post }: Props) {
  const path = `/blog/${post.slug}`;
  const articleLd = buildArticleJsonLd({
    headline: post.h1,
    description: post.metaDescription,
    url: absoluteUrl(path),
    dateModified: post.updatedAt,
  });

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {post.faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.faqJsonLd) }}
        />
      ) : null}
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            {
              name: post.h1.split("—")[0]?.trim() ?? post.h1,
              href: path,
            },
          ]}
        />
        <article>
          <header>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Yayın: {post.publishedAt}
              {post.category ? ` · ${post.category}` : null}
            </p>
            <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
              {post.h1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {post.excerpt}
            </p>
          </header>

          <div className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-headings:text-madde-ink prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-slate-700 prose-blockquote:border-[var(--cta-primary)] prose-blockquote:bg-slate-50 prose-blockquote:not-italic">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>

          <div className="mt-10 rounded-2xl border border-[var(--cta-primary)]/20 bg-gradient-to-br from-slate-50 to-blue-50/40 p-6">
            <h2 className="text-lg font-bold text-madde-ink">
              Sözleşmenizi kontrol edin
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Bu rehber bilgilendirme amaçlıdır. Kendi sözleşmeniz için ücretsiz
              ön tarama yapın.
            </p>
            <Link
              href={post.ctaHref}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--cta-primary)] hover:underline"
            >
              {post.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {post.faqs.length > 0 && !post.body.includes("## Sıkça sorulan sorular") ? (
            <FaqSection faqs={post.faqs} />
          ) : null}

          <LegalAiDisclaimer className="mt-10" />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
