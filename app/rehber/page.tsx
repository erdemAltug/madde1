import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { REHBER_HUB_LINKS } from "@/lib/seo/internal-links";
import { REHBER_SLUGS, getRehberConfig } from "@/lib/seo/rehber-pages";

export default function RehberHubPage() {
  const guides = REHBER_SLUGS.map((slug) => getRehberConfig(slug)).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs items={[{ name: "Hukuk rehberleri", href: "/rehber" }]} />
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Herkes için hukuk bilgisi
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Hukuk rehberleri — avukat olmadan önce bilmeniz gerekenler
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Clause, profesyonel hukuk bürolarından önce sıradan insanların sözleşme ve hak
            konularında yön bulması için hazırladığı rehberleri sunar. İçerikler bilgilendirme
            amaçlıdır; kesin sonuç için avukata danışın.
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) =>
            guide ? (
              <li key={guide.slug}>
                <Link
                  href={`/rehber/${guide.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-[#005BEA]/30 hover:bg-white hover:shadow-md"
                >
                  <BookOpen
                    className="h-6 w-6 text-[#005BEA]"
                    aria-hidden
                  />
                  <h2 className="mt-3 text-lg font-bold text-madde-ink group-hover:text-[#005BEA]">
                    {guide.h1.split("—")[0]?.trim() ?? guide.h1}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-3">
                    {guide.metaDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#005BEA]">
                    Rehberi oku
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ) : null,
          )}
        </ul>

        <section className="mt-16 rounded-2xl border border-[#005BEA]/20 bg-gradient-to-br from-slate-50 to-indigo-50/40 p-6">
          <h2 className="text-lg font-bold text-madde-ink">Yapay zeka hukuk rehberleri</h2>
          <p className="mt-2 text-sm text-slate-600">
            Legal AI, yapay zeka sözleşme analizi ve ücretsiz hukuk asistanı aramaları için
            ayrı rehber kümemiz.
          </p>
          <Link
            href="/yapay-zeka-hukuk"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#005BEA] hover:underline"
          >
            Yapay zeka hukuk sayfalarına git
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-madde-ink">Konuya göre hızlı erişim</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {REHBER_HUB_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-[#005BEA]/40 hover:text-[#005BEA]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
