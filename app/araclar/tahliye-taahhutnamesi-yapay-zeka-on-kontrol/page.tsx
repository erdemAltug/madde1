import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { TahliyeCheckWidget } from "@/components/growth/tahliye-check-widget";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { TahliyeAracSeoArticle } from "@/components/seo/araclar/tahliye-arac-seo-article";
import { TAHLIYE_TOOL_PATH } from "@/lib/seo/free-tools-routes";
import { defaultOgAlt, openGraphArticleImages, twitterSummaryLargeImage } from "@/lib/seo/og";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const path = TAHLIYE_TOOL_PATH;
const canonical = absoluteUrl(path);
const title =
  "Tahliye taahhütnamesi yapay zeka ön kontrol — usul ve içerik riskleri";

export const metadata: Metadata = {
  title,
  description:
    "Tahliye taahhütnamesini legal AI assistant ile ön taramadan geçirin. Kira sözleşmesi riskleri ve sözleşme analizi için Clause tam analiz sayfalarına geçin.",
  keywords: [
    "tahliye taahhütnamesi yapay zeka",
    "tahliye taahhütnamesi kontrolü",
    "kira sözleşmesi riskleri",
    "sözleşme analizi",
    "legal AI assistant",
    "Clause",
  ],
  alternates: { canonical },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description:
      "Taahhütname metninde tipik riskleri listeleyen ücretsiz ön kontrol.",
    url: canonical,
    type: "article",
    locale: "tr_TR",
    images: openGraphArticleImages(defaultOgAlt(title)),
  },
  twitter: twitterSummaryLargeImage(
    title,
    "AI destekli tahliye taahhütnamesi ön inceleme — Clause.",
  ),
};

export default function TahliyeYapayZekaOnKontrolPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Ücretsiz araçlar", href: "/#ucretsiz-araclar" },
            { name: "Tahliye taahhütnamesi yapay zeka ön kontrol", href: path },
          ]}
        />
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Tahliye taahhütnamesi yapay zeka ön kontrol
          </h1>
          <p className="mt-3 text-base font-medium text-slate-600">
            Metninizi yapıştırın; AI tipik riskleri listeler. Kesin hukuki sonuç
            için avukat görüşü şarttır.{" "}
            <Link
              href="/analiz/tahliye-taahhutnamesi"
              className="font-semibold text-madde-blue hover:underline"
            >
              Tam tahliye taahhütnamesi analizi
            </Link>
            .
          </p>
        </header>

        <section
          aria-labelledby="widget-baslik"
          className="mb-14 min-h-[280px]"
        >
          <h2 id="widget-baslik" className="sr-only">
            Taahhütname ön kontrol aracı
          </h2>
          <TahliyeCheckWidget />
        </section>

        <section aria-labelledby="rehber-tahliye">
          <h2 id="rehber-tahliye" className="sr-only">
            Hukuki rehber ve SEO içeriği
          </h2>
          <TahliyeAracSeoArticle />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
