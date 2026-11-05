import Link from "next/link";
import { PageHero } from "@/components/landing/page-hero";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { BLOG_SLUGS, getBlogPost } from "@/lib/seo/blog-posts";
import { getAllMdxBlogPosts } from "@/lib/seo/mdx-blog";

type IndexPost = {
  slug: string;
  h1: string;
  excerpt: string;
  publishedAt: string;
};

export default function BlogIndexPage() {
  const legacy: IndexPost[] = BLOG_SLUGS.map((slug) => getBlogPost(slug))
    .filter(Boolean)
    .map((post) => ({
      slug: post!.slug,
      h1: post!.h1,
      excerpt: post!.excerpt,
      publishedAt: post!.publishedAt,
    }));

  const mdx: IndexPost[] = getAllMdxBlogPosts().map((post) => ({
    slug: post.slug,
    h1: post.h1,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
  }));

  const bySlug = new Map<string, IndexPost>();
  for (const p of legacy.concat(mdx)) bySlug.set(p.slug, p);
  const posts = Array.from(bySlug.values()).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <PageHero
        emoji="📰"
        eyebrow="Gündelik hukuk yazıları"
        title={<>Hayatın içinden <span className="text-[#005BEA]">hukuk soruları</span>, net cevaplar</>}
        lede={<>Kira, iş, tüketici ve sözleşme konularında en çok sorulan soruları güncel kanun ve rakamlarla yanıtlıyoruz. Daha kapsamlı anlatımlar için <Link href="/rehber" className="font-semibold text-[#005BEA] hover:underline">hukuk rehberlerine</Link> bakın.</>}
        chips={[
          { label: "Yıllık izin kaç gün?", href: "/blog/yillik-izin-hakki-kac-gun-2026" },
          { label: "Kira sözleşmesi yaparken", href: "/blog/kira-sozlesmesi-yaparken-dikkat-edilmesi-gerekenler" },
          { label: "İşten çıkarılanın hakları", href: "/blog/isten-cikarilan-iscinin-haklari-2026" },
        ]}
      />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">

        <ul className="mt-10 divide-y divide-slate-200">
          {posts.map((post) => (
            <li key={post.slug} className="py-6 first:pt-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {post.publishedAt}
              </p>
              <h2 className="mt-1 text-xl font-bold text-madde-ink">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-indigo-700"
                  prefetch={true}
                >
                  {post.h1}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:underline"
                prefetch={true}
              >
                Devamını oku →
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
