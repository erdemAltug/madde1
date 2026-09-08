"use client";

import * as React from "react";
import Link from "next/link";
import { AnalysisDeliverables } from "@/components/analysis/analysis-deliverables";
import type { TeaserData } from "@/components/b2c/risk-teaser-dashboard";
import { Button } from "@/components/ui/button";
import { buildOnIncelemeRaporuMarkdown } from "@/lib/print/build-on-inceleme-raporu";
import { openPrintMarkdown } from "@/lib/print/open-print-markdown";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

type Props = {
  teaser: TeaserData;
  isLoggedIn?: boolean;
  onAnalyzeAgain: () => void;
  onRequestFullReport: () => void;
};

export function StepResults({
  teaser,
  isLoggedIn,
  onAnalyzeAgain,
  onRequestFullReport,
}: Props) {
  const openPdf = () => {
    const md = buildOnIncelemeRaporuMarkdown({ teaser });
    openPrintMarkdown(md);
    captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
      source: "wizard_on_inceleme_pdf",
    });
  };

  return (
    <div className="space-y-5">
      <AnalysisDeliverables
        teaser={teaser}
        variant="wizard"
        detailUnlocked={Boolean(isLoggedIn)}
        onPdfClick={openPdf}
      />

      {isLoggedIn ? (
        <Button
          variant="outline"
          className="w-full rounded-xl font-semibold"
          asChild
        >
          <Link href="/analiz">Tam analizi aç · Arşive kaydet</Link>
        </Button>
      ) : null}

      <button
        type="button"
        onClick={onAnalyzeAgain}
        className="w-full text-center text-sm font-semibold text-slate-500 hover:text-deep-navy"
      >
        Başka bir sözleşme tara
      </button>

      <p className="text-center text-[11px] leading-relaxed text-slate-400">
        Özet tahmindir; Clause avukatlık veya resmi danışmanlık vermez.
      </p>
    </div>
  );
}
