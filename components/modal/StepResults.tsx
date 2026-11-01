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
import { KeyDatesCard } from "@/components/assistant/key-dates-card";
import { ShareRiskCardButton } from "@/components/share/share-risk-card-button";
import { TrustStrip } from "@/components/legal/trust-strip";
import type { PersonaId } from "@/lib/personas";

type Props = {
  teaser: TeaserData;
  /** Tarih çıkarma için taranan metin */
  contractText?: string;
  isLoggedIn?: boolean;
  persona?: PersonaId;
  onAnalyzeAgain: () => void;
  onRequestFullReport: () => void;
};

export function StepResults({
  teaser,
  contractText,
  isLoggedIn,
  persona,
  onAnalyzeAgain,
  onRequestFullReport,
}: Props) {
  const score =
    typeof teaser.securityScore === "number"
      ? Math.round(teaser.securityScore)
      : Math.max(0, 100 - teaser.criticalRiskCount * 12 - teaser.missingClauseCount * 8);

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

      {contractText ? <KeyDatesCard contractText={contractText} /> : null}

      <ShareRiskCardButton
        score={score}
        critical={teaser.criticalRiskCount}
        missing={teaser.missingClauseCount}
        persona={persona}
      />

      {isLoggedIn ? (
        <Button
          variant="outline"
          className="w-full rounded-xl font-semibold"
          asChild
        >
          <Link href="/analiz">Tam analizi aç · Arşive kaydet</Link>
        </Button>
      ) : (
        <Button
          type="button"
          className="w-full rounded-xl bg-deep-navy font-semibold text-white hover:bg-deep-navy/90"
          onClick={onRequestFullReport}
        >
          Tam raporu aç · Ücretsiz hesap
        </Button>
      )}

      <button
        type="button"
        onClick={onAnalyzeAgain}
        className="w-full text-center text-sm font-semibold text-slate-500 hover:text-deep-navy"
      >
        Başka bir sözleşme tara
      </button>

      <TrustStrip />
    </div>
  );
}
