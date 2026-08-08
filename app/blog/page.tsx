import Link from "next/link";
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
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Clause blog
          </h1>
          <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">
            <strong>Yapay zeka sözleşme analizi</strong>, kira ve iş hukuku, TBK
            pratikleri ve LegalTech. Uzun kuyruk sorulara net, arama motoru dostu
            yanıtlar.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Daha derin rehberler için{" "}
            <Link href="/rehber" className="font-semibold text-indigo-600 hover:underline">
              hukuk rehberleri
            </Link>{" "}
            bölümüne bakın.
          </p>
        </header>

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
