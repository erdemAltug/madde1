import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FREE_TOOLS_NAV } from "@/lib/seo/free-tools-routes";
import { REHBER_HUB_LINKS, SOZLESME_ANALIZI_FEATURED } from "@/lib/seo/internal-links";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";

const title = "Ücretsiz hesaplama araçları 2026 — maaş, kira, tazminat";
const description =
  "Brüt net maaş, işsizlik maaşı, kira artışı, kıdem, ihbar, fazla mesai ve yıllık izin hesaplama. Günlük hukuk için ücretsiz LegalTech araçları.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "günlük hukuk ihtiyaçları",
    "ücretsiz hukuk aracı",
    "brüt net maaş hesaplama 2026",
    "işsizlik maaşı hesaplama 2026",
    "kira hesaplama",
    "damga vergisi hesaplama",
    "tahliye taahhütnamesi kontrol",
    SITE_NAME,
  ],
  alternates: { canonical: absoluteUrl("/araclar") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/araclar"),
    type: "website",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(title, description),
};

export default function AraclarHubPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs items={[{ name: "Ücretsiz araçlar", href: "/araclar" }]} />
        <header className="max-w-2xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Günlük hukuk ihtiyaçları için ücretsiz araçlar
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Kira, sözleşme ve tahliye gibi günlük hukuki ihtiyaçlarınız için hesaplayıcı ve ön
            kontrol araçları. Sonuçlar tahminî olabilir; sözleşme metniniz için tam analize geçin.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="araclar-liste">
          <h2 id="araclar-liste" className="sr-only">
            Araç listesi
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {FREE_TOOLS_NAV.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 p-5 transition hover:border-[#005BEA]/30 hover:shadow-md"
                >
                  <Calculator className="h-7 w-7 text-[#005BEA]" aria-hidden />
                  <h3 className="mt-3 font-bold text-madde-ink">{tool.label}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{tool.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#005BEA]">
                    Aracı aç
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold text-madde-ink">İlgili rehberler</h2>
            <ul className="mt-4 space-y-2">
              {REHBER_HUB_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[#005BEA] hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/rehber" className="text-sm font-semibold text-slate-600 hover:text-madde-ink">
                  Tüm rehberler →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-madde-ink">Sözleşme analizi</h2>
            <ul className="mt-4 space-y-2">
              {SOZLESME_ANALIZI_FEATURED.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[#005BEA] hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
