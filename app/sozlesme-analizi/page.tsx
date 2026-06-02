import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  SOZLESME_ANALIZI_SLUGS,
  getSozlesmeAnaliziConfig,
} from "@/lib/seo/sozlesme-analizi-pages";
import { YAPAY_ZEKA_HUKUK_LINKS } from "@/lib/seo/internal-links";

export default function SozlesmeAnaliziHubPage() {
  const pages = SOZLESME_ANALIZI_SLUGS.map((slug) =>
    getSozlesmeAnaliziConfig(slug),
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[{ name: "Sözleşme analizi", href: "/sozlesme-analizi" }]}
        />
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Yapay zeka · TBK uyumlu ön tarama
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Yapay zeka sözleşme analizi — türüne göre risk taraması
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Her sayfa bir sözleşme türüne özeldir: kira, iş, freelance, KVKK ve daha
            fazlası. Metninizi yapıştırarak ücretsiz güven özeti alın; ardından detaylı
            analize geçin. Hukuki danışmanlık yerine geçmez.
          </p>
        </header>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) =>
            page ? (
              <li key={page.slug}>
                <Link
                  href={`/sozlesme-analizi/${page.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-[#005BEA]/30 hover:shadow-md"
                >
                  <FileText
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#005BEA]"
                    aria-hidden
                  />
                  <span>
                    <span className="block font-semibold text-madde-ink group-hover:text-[#005BEA]">
                      {page.navLabel}
                    </span>
                    <span className="mt-1 block text-xs text-slate-500 line-clamp-2">
                      {page.metaDescription}
                    </span>
                  </span>
                </Link>
              </li>
            ) : null,
          )}
        </ul>

        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-madde-ink">Yapay zeka hukuk rehberleri</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {YAPAY_ZEKA_HUKUK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-[#005BEA]/40 hover:text-[#005BEA]"
              >
                {link.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
