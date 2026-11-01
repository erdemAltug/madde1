import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { DarkScope } from "@/components/theme/dark-scope";
import { CARD_KINDS, parseRiskCard, riskCardQuery, riskVerdict } from "@/lib/share/risk-card";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";
import { cn } from "@/lib/utils";

type Props = { searchParams?: Record<string, string | undefined> };

export function generateMetadata({ searchParams }: Props): Metadata {
  const d = parseRiskCard(searchParams ?? {});
  const v = riskVerdict(d);
  const title = `${CARD_KINDS[d.kind]}: ${v.label}`;
  const image = absoluteUrl(`/kart/og?${riskCardQuery(d)}`);
  const description = "Sözleşmeni imzalamadan önce Clause ile ücretsiz kontrol et. Kişisel veriler maskelenir.";
  return {
    title,
    description,
    // Paylaşım sayfaları kullanıcıya özel; arama sonuçlarında yer almasın
    robots: { index: false, follow: true },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "website",
      locale: "tr_TR",
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const TONE = {
  risk: "border-l-red-500",
  warn: "border-l-amber-500",
  good: "border-l-emerald-500",
} as const;

export default function KartPage({ searchParams }: Props) {
  const d = parseRiskCard(searchParams ?? {});
  const v = riskVerdict(d);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <SiteNavbar />
      <DarkScope>
      <main className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <div className={cn("rounded-3xl border border-l-8 border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8", TONE[v.tone])}>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{CARD_KINDS[d.kind]} ön kontrolü</p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{v.label}</h1>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["Güven skoru", `${d.score}/100`],
              ["Kritik madde", String(d.critical)],
              ["Eksik madde", String(d.missing)],
            ].map(([k, val]) => (
              <div key={k} className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                <dt className="text-xs text-slate-600 dark:text-slate-400">{k}</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-50">{val}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
            Bu kartta sözleşmenin kendisi ya da kişisel bilgi yok; yalnızca ön kontrol özeti var.
          </p>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Sen de imzalamadan önce kontrol et</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Ücretsiz, kayıt gerekmez. Kimlik ve telefon bilgileri otomatik maskelenir.</p>
          <Link
            href="/?open=1"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-xl bg-[#005BEA] px-6 text-base font-semibold text-white hover:bg-[#004cc4]"
          >
            Sözleşmemi kontrol et <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
      </DarkScope>
      <SiteFooter />
    </div>
  );
}
