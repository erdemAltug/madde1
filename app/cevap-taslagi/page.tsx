import type { Metadata } from "next";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { ReplyComposer } from "@/components/assistant/reply-composer";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

const title = "Ev sahibine, işverene, müşteriye cevap taslağı — ücretsiz";
const description =
  "Kira zammına itiraz, depozito iadesi, ödenmeyen maaş ve geciken ödeme için hazır cevap taslağı. Kibar veya kararlı ton, WhatsApp ya da resmi yazı.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/cevap-taslagi") },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/cevap-taslagi"),
    type: "website",
    locale: "tr_TR",
  },
};

type Props = { searchParams?: { senaryo?: string } };

export default function CevapTaslagiPage({ searchParams }: Props) {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-[#005BEA]">Karşı tarafa cevap</p>
          <h1 className="mt-1 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ne diyeceğinizi biz yazalım
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Durumu seçin, birkaç bilgi girin. Kanuna dayanan, gönderilmeye hazır bir mesaj ya da resmi yazı taslağı
            hemen oluşsun.
          </p>
        </header>
        <div className="mt-8">
          <ReplyComposer initialScenario={searchParams?.senaryo} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
