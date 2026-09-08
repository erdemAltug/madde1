"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import {
  FREELANCE_CHECKLIST_TOOL_PATH,
  KIDEM_IHBAR_TOOL_PATH,
  KIRA_ANALIZI_TOOL_PATH,
  TAHLIYE_TOOL_PATH,
} from "@/lib/seo/free-tools-routes";

const KiraAnaliziCalculator = dynamic(
  () =>
    import("@/components/growth/kira-analizi-calculator").then(
      (m) => m.KiraAnaliziCalculator,
    ),
  { ssr: false },
);
const TazminatHub = dynamic(
  () => import("@/components/growth/tazminat-hub").then((m) => m.TazminatHub),
  { ssr: false },
);
const TahliyeValidityChecklist = dynamic(
  () =>
    import("@/components/growth/tahliye-validity-checklist").then(
      (m) => m.TahliyeValidityChecklist,
    ),
  { ssr: false },
);
const FreelanceChecklistWidget = dynamic(
  () =>
    import("@/components/growth/freelance-checklist").then(
      (m) => m.FreelanceChecklistWidget,
    ),
  { ssr: false },
);
const RentIncreaseCalculator = dynamic(
  () =>
    import("@/components/growth/rent-increase-calculator").then(
      (m) => m.RentIncreaseCalculator,
    ),
  { ssr: false },
);

/** Rehber slug → gömülü hesaplayıcı (çift yönlü dahili linkleme) */
const EMBED_BY_SLUG: Record<
  string,
  { title: string; href: string; node: ReactNode }
> = {
  "kiraci-haklari": {
    title: "Kira zammı yasal tavan hesaplayıcı",
    href: KIRA_ANALIZI_TOOL_PATH,
    node: <KiraAnaliziCalculator analyticsToolId="kira_analizi_page" />,
  },
  "kira-artisi-haklari": {
    title: "Kira artış oranı hesaplayıcı",
    href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    node: (
      <RentIncreaseCalculator
        embedded
        analyticsToolId="rent_increase_page"
        analyticsSurface="tool_page"
      />
    ),
  },
  "kidem-ihbar-tazminati": {
    title: "Kıdem & ihbar tazminatı hesaplama",
    href: KIDEM_IHBAR_TOOL_PATH,
    node: <TazminatHub />,
  },
  "tahliye-taahhutnamesi-rehberi": {
    title: "Tahliye taahhüdü tarih kontrolü",
    href: TAHLIYE_TOOL_PATH,
    node: <TahliyeValidityChecklist embedded />,
  },
  "tahliye-sureci": {
    title: "Tahliye taahhüdü tarih kontrolü",
    href: TAHLIYE_TOOL_PATH,
    node: <TahliyeValidityChecklist embedded />,
  },
  "freelance-sozlesme-rehberi": {
    title: "Freelance sözleşme kontrol listesi",
    href: FREELANCE_CHECKLIST_TOOL_PATH,
    node: <FreelanceChecklistWidget embedded />,
  },
};

export function RehberToolEmbed({ slug }: { slug: string }) {
  const embed = EMBED_BY_SLUG[slug];
  if (!embed) return null;

  return (
    <section className="not-prose my-10 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-lg font-bold text-madde-ink">{embed.title}</h2>
        <a
          href={embed.href}
          className="text-xs font-semibold text-[#005BEA] hover:underline"
        >
          Tam sayfa araç →
        </a>
      </div>
      {embed.node}
    </section>
  );
}
