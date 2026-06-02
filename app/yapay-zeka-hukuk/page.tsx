import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  YAPAY_ZEKA_HUKUK_SLUGS,
  getYapayZekaHukukConfig,
} from "@/lib/seo/yapay-zeka-hukuk-pages";

export default function YapayZekaHukukHubPage() {
  const pages = YAPAY_ZEKA_HUKUK_SLUGS.map((slug) => getYapayZekaHukukConfig(slug)).filter(
    Boolean,
  );

  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs items={[{ name: "Yapay zeka hukuk", href: "/yapay-zeka-hukuk" }]} />
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Legal AI · Türkiye
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Yapay zeka hukuk rehberleri — sözleşme analizi ve hukuk asistanı
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Günlük ve profesyonel aramalarda sık geçen yapay zeka + hukuk konularını sade
            dille açıklıyoruz. Her sayfa ilgili ücretsiz araç veya sözleşme analizine bağlanır.
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) =>
            page ? (
              <li key={page.slug}>
                <Link
                  href={`/yapay-zeka-hukuk/${page.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-[#005BEA]/30 hover:bg-white hover:shadow-md"
                >
                  <Sparkles className="h-6 w-6 text-[#005BEA]" aria-hidden />
                  <h2 className="mt-3 text-lg font-bold text-madde-ink group-hover:text-[#005BEA]">
                    {page.h1.split("—")[0]?.trim() ?? page.h1}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-3">
                    {page.metaDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#005BEA]">
                    Oku
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
