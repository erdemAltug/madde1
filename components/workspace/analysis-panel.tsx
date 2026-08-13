"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StreamingMarkdown } from "@/components/analysis/streaming-markdown";
import { LegalLoadingMessages } from "@/components/workspace/legal-loading-messages";
import { AnalysisActions } from "@/components/workspace/analysis-actions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  RiskTeaserDashboard,
  type TeaserData,
} from "@/components/b2c/risk-teaser-dashboard";
import { ContractDiffPanel } from "@/components/b2c/contract-diff-panel";
import { extractImprovedContractSection } from "@/lib/extract-improved-contract";
import { cn } from "@/lib/utils";
import { LegalAiDisclaimer } from "@/components/legal/legal-ai-disclaimer";
import { SITE_HOST } from "@/lib/seo/site";

type Props = {
  analysisMarkdown: string;
  refactorMarkdown: string;
  markdownForExport: string;
  originalContractText: string;
  busy: boolean;
  error?: Error | null;
  sharePath?: string;
  compact?: boolean;
  paywallActive?: boolean;
  teaser?: TeaserData | null;
  teaserLoading?: boolean;
  detailUnlocked?: boolean;
  onRequestUnlock?: () => void;
  unlockBusy?: boolean;
  isLoggedIn?: boolean;
  registeredLimit?: number;
  /** Sunucu tarafı kayıt yok sayılır; sohbet ve özet sıfırlanır */
  onRequestServerPurge?: () => void;
};

export function AnalysisPanel({
  analysisMarkdown,
  refactorMarkdown,
  markdownForExport,
  originalContractText,
  busy,
  error,
  sharePath,
  compact,
  paywallActive,
  teaser,
  teaserLoading,
  detailUnlocked,
  onRequestUnlock,
  unlockBusy,
  isLoggedIn = false,
  registeredLimit = 10,
  onRequestServerPurge,
}: Props) {
  const [paywallPulse, setPaywallPulse] = React.useState(false);
  const [purgeDone, setPurgeDone] = React.useState(false);

  const bumpPaywallHint = React.useCallback(() => {
    setPaywallPulse(true);
    window.setTimeout(() => setPaywallPulse(false), 700);
  }, []);

  const showActions =
    Boolean(markdownForExport.trim()) &&
    (!paywallActive || Boolean(detailUnlocked));

  const improvedForDiff = React.useMemo(() => {
    if (!refactorMarkdown.trim()) return "";
    return (
      extractImprovedContractSection(refactorMarkdown) ?? refactorMarkdown
    ).trim();
  }, [refactorMarkdown]);

  const showDiff =
    Boolean(originalContractText.trim()) &&
    improvedForDiff.length > 40 &&
    !busy;

  const hasAnyPanelContent =
    Boolean(analysisMarkdown) ||
    Boolean(refactorMarkdown) ||
    busy ||
    (paywallActive && (teaserLoading || teaser));

  const showLegalDisclaimer =
    busy ||
    Boolean(analysisMarkdown) ||
    Boolean(refactorMarkdown) ||
    (paywallActive && (teaserLoading || teaser));

  const showPurge =
    Boolean(onRequestServerPurge) &&
    (Boolean(analysisMarkdown) || Boolean(refactorMarkdown)) &&
    (!paywallActive || detailUnlocked);

  const body = (
    <>
        {showLegalDisclaimer ? (
          <LegalAiDisclaimer className="mb-4" />
        ) : null}

        {error ? (
          <p className="text-sm font-medium text-red-700">
            {error.message ||
              "İstek tamamlanamadı. API anahtarlarını ve ağı kontrol edin."}
          </p>
        ) : null}

        {paywallActive && (teaserLoading || teaser) ? (
          <RiskTeaserDashboard
            data={teaser ?? null}
            loading={teaserLoading}
            className="mb-5"
            onCategoryInteract={bumpPaywallHint}
          />
        ) : null}

        {!hasAnyPanelContent && !busy ? (
          <p className="text-sm text-slate-600">
            {paywallActive
              ? "Sözleşmenizi yükleyin; anında hızlı risk özeti görün. Detaylı rapor ve PDF hesapla ücretsizdir."
              : "Analiz sonuçları akış halinde burada görünecek. Metninizi yapıştırıp analiz ile başlayın."}
          </p>
        ) : null}

        {analysisMarkdown && paywallActive && !detailUnlocked ? (
          <div
            className={cn(
              "relative min-h-[220px] rounded-xl border border-slate-200/80 bg-slate-50/40 shadow-inner transition-shadow duration-300",
              paywallPulse &&
                "ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-white",
            )}
          >
            <div
              className={cn(
                "max-h-[min(420px,55vh)] overflow-hidden px-1 py-2 sm:max-h-[min(480px,60vh)]",
                "blur-[9px] select-none",
              )}
              aria-hidden
            >
              <StreamingMarkdown content={analysisMarkdown} variant="light" />
            </div>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-white from-30% via-white/92 to-transparent px-3 pb-6 pt-28">
              <div className="pointer-events-auto w-full max-w-md text-center">
                <p className="text-base font-bold tracking-tight text-slate-900">
                  Hızlı risk özeti hazır. Detaylı rapor ve PDF lansman boyunca
                  ücretsizdir.
                </p>
                <Button
                  type="button"
                  className="mt-4 h-12 w-full bg-indigo-600 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 sm:w-auto sm:px-6 sm:text-base"
                  onClick={() => onRequestUnlock?.()}
                  disabled={unlockBusy || busy}
                >
                  {unlockBusy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Detaylı Yasal Risk Raporunu ve PDF'i İndir"
                  )}
                </Button>
                {!isLoggedIn ? (
                  <p className="mt-2 text-[11px] text-slate-500">
                    Hesap oluşturun — lansman döneminde kredi kartı gerekmez.
                  </p>
                ) : (
                  <p className="mt-2 text-[11px] text-slate-500">
                    Rapor ve PDF lansman boyunca ücretsiz açılır.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {analysisMarkdown && (!paywallActive || detailUnlocked) ? (
          <StreamingMarkdown content={analysisMarkdown} variant="light" />
        ) : null}

        {refactorMarkdown && (!paywallActive || detailUnlocked) ? (
          <>
            <Separator className="my-8 bg-slate-200" />
            <p className="mb-3 text-sm font-bold text-slate-900">
              İyileştirilmiş sözleşme (Faz 2)
            </p>
            {showDiff ? (
              <ContractDiffPanel
                className="mb-6"
                original={originalContractText.trim()}
                improved={improvedForDiff}
              />
            ) : null}
            {showDiff ? (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tam metin
              </p>
            ) : null}
            <StreamingMarkdown content={refactorMarkdown} variant="light" />
          </>
        ) : null}

        {markdownForExport.trim() && (!paywallActive || detailUnlocked) ? (
          <>
            <Separator className="my-8 bg-slate-200" />
            {showPurge ? (
              <div className="mb-6 rounded-xl border border-[#0f766e]/25 bg-[#ecfdf5]/60 px-4 py-4">
                <p className="text-sm font-semibold text-[#0a1628]">
                  Veri güvenliği
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Analiz tamamlandıktan sonra ham sözleşme metni sunucularımızda
                  kalıcı tutulmaz. İsterseniz aşağıdaki düğme ile oturumdaki
                  sonuçları da temizleyebilirsiniz.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3 border-[#0f766e]/40 font-semibold text-[#0f766e] hover:bg-emerald-50"
                  disabled={purgeDone}
                  onClick={() => {
                    if (purgeDone) return;
                    setPurgeDone(true);
                    window.setTimeout(() => onRequestServerPurge?.(), 750);
                  }}
                >
                  {purgeDone ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Silindi — oturum temizlendi
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Verilerimi sunucudan şimdi sil
                    </>
                  )}
                </Button>
              </div>
            ) : null}
            <p className="text-center text-xs text-slate-500">
              Powered by {SITE_HOST} — Yapay Zeka Hukuk Asistanı
            </p>
          </>
        ) : null}
    </>
  );

  return (
    <motion.div
      layout
      className={
        compact
          ? "relative flex min-h-[280px] min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          : "relative flex h-full min-h-[320px] min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      }
    >
      <LegalLoadingMessages active={busy} />

      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-slate-900">
            {paywallActive ? "Risk özeti ve detay" : "Canlı analiz"}
          </h2>
          <p className="text-xs text-slate-600">
            {paywallActive
              ? "Misafir: anında risk özeti · Rapor ve PDF: ücretsiz hesap"
              : "TBK uyumlu ön değerlendirme — hukuki danışmanlık değildir."}
          </p>
        </div>
        {showActions ? (
          <AnalysisActions
            markdown={markdownForExport}
            sharePath={sharePath}
          />
        ) : null}
      </div>

      {compact ? (
        <div className="min-w-0 flex-1 overflow-x-hidden px-4 py-4 sm:px-5 sm:py-5">
          {body}
        </div>
      ) : (
        <ScrollArea className="min-h-0 flex-1 px-4 py-4 sm:px-5 sm:py-5">
          {body}
        </ScrollArea>
      )}
    </motion.div>
  );
}
