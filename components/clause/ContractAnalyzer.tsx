"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ContractInputPanel } from "@/components/workspace/contract-input-panel";
import { AnalysisPanel } from "@/components/workspace/analysis-panel";
import { ShinyAnalyzeButton } from "@/components/magic/shiny-analyze-button";
import { SAMPLE_RENTAL_CONTRACT } from "@/lib/constants";
import { getAllAssistantTexts } from "@/lib/message-text";
import { IMPROVE_FOLLOWUP_USER_MESSAGE } from "@/lib/prompts";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PersonaId } from "@/lib/personas";
import { PersonaPicker } from "@/components/b2c/persona-picker";
import { TrustBadges } from "@/components/b2c/trust-badges";
// MVP: Ödeme askıya alındı
// import { PricingModal } from "@/components/b2c/pricing-modal";
import { WorkspaceModeTabs, type WorkspaceMode } from "@/components/b2c/workspace-mode-tabs";
import { ContractGenerator } from "@/components/b2c/contract-generator";
// import { useWallet } from "@/hooks/use-wallet";
import { useDailyAnalysis } from "@/hooks/use-daily-analysis";
import { useAuthSession } from "@/hooks/use-auth-session";
import { SignupNudgeBanner } from "@/components/growth/signup-nudge-banner";
import { LimitReachedDialog } from "@/components/growth/limit-reached-dialog";
import { AuthModal } from "@/components/auth/AuthModal";
import type { TeaserData } from "@/components/b2c/risk-teaser-dashboard";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { buildInputAnalyticsProps } from "@/lib/analytics/input-props";
import { maskSensitiveText } from "@/lib/security/mask-sensitive";

export type ContractAnalyzerProps = {
  sharePath?: string;
  className?: string;
  compact?: boolean;
  /** Profesyonel analiz: paywall ve rol seçimi kapalı */
  enablePaywall?: boolean;
};

export function ContractAnalyzer({
  sharePath = "/analiz/kira-sozlesmesi",
  className,
  compact = false,
  enablePaywall = true,
}: ContractAnalyzerProps) {
  const [mode, setMode] = React.useState<WorkspaceMode>("analyze");
  const [persona, setPersona] = React.useState<PersonaId | null>(null);
  const [teaser, setTeaser] = React.useState<TeaserData | null>(null);
  const [teaserLoading, setTeaserLoading] = React.useState(false);
  const [detailUnlocked, setDetailUnlocked] = React.useState(false);
  const [unlockBusy, _setUnlockBusy] = React.useState(false);
  const [improveBusy, _setImproveBusy] = React.useState(false);
  const [contract, setContract] = React.useState("");
  const [maskNotice, setMaskNotice] = React.useState<string | null>(null);

  const phaseRef = React.useRef<"analysis" | "refactor">("analysis");
  const personaRef = React.useRef<PersonaId>("general");
  const lastInputRef = React.useRef("");

  React.useEffect(() => {
    personaRef.current = persona ?? "general";
  }, [persona]);

  // MVP: Günlük ücretsiz analiz sistemi
  const { userId, isLoggedIn, loading: authLoading } = useAuthSession();
  const dailyAnalysis = useDailyAnalysis(userId);
  const [limitDialogOpen, setLimitDialogOpen] = React.useState(false);
  const [signupUnlockOpen, setSignupUnlockOpen] = React.useState(false);
  const [showSignupNudge, setShowSignupNudge] = React.useState(false);

  const openLimitDialog = React.useCallback(() => {
    setLimitDialogOpen(true);
  }, []);

  const flashMaskNotice = React.useCallback((message: string) => {
    setMaskNotice(message);
    window.setTimeout(() => setMaskNotice(null), 5500);
  }, []);

  const { messages, sendMessage, setMessages, status, error, stop } = useChat({
    id: "clause-main-workspace",
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: async ({
        id: chatId,
        messages: msgs,
        body,
        trigger,
        messageId,
      }) => ({
        body: {
          ...(body && typeof body === "object" ? body : {}),
          id: chatId,
          messages: msgs,
          trigger,
          messageId,
          mode: "contract",
          b2c: enablePaywall,
          persona: personaRef.current,
          phase: phaseRef.current,
        },
      }),
    }),
  });

  const busy = status === "submitted" || status === "streaming";
  const assistantTexts = getAllAssistantTexts(messages);
  const analysisMd = assistantTexts[0] ?? "";
  const refactorMd = assistantTexts[1] ?? "";
  const exportMd = [analysisMd, refactorMd]
    .filter((x) => x.trim().length > 0)
    .join("\n\n---\n\n");

  const prevStatusRef = React.useRef(status);

  React.useEffect(() => {
    const prev = prevStatusRef.current;
    prevStatusRef.current = status;
    if (
      (prev === "streaming" || prev === "submitted") &&
      status === "ready" &&
      messages.length > 0
    ) {
      captureEvent(AnalyticsEvents.ANALYSIS_COMPLETED, {
        phase: phaseRef.current,
        paywall: enablePaywall,
        persona: personaRef.current,
        message_count: messages.length,
        assistant_chars: analysisMd.length + refactorMd.length,
        is_logged_in: isLoggedIn,
        ...buildInputAnalyticsProps(lastInputRef.current, {
          source: "contract_analyzer",
        }),
      });
      if (!isLoggedIn && !authLoading) {
        setShowSignupNudge(true);
      }
    }
  }, [
    status,
    messages.length,
    enablePaywall,
    analysisMd.length,
    refactorMd.length,
    isLoggedIn,
    authLoading,
  ]);

  React.useEffect(() => {
    if (!error) return;
    captureEvent(AnalyticsEvents.ANALYSIS_ERROR, {
      phase: phaseRef.current,
      error_message: error.message?.slice(0, 200),
      ...buildInputAnalyticsProps(lastInputRef.current, {
        source: "contract_analyzer",
      }),
    });
  }, [error]);

  const runAnalysis = async () => {
    const t = contract.trim();
    if (!t) return;
    if (enablePaywall && !persona) return;
    
    // MVP: Günlük limit kontrolü
    if (!dailyAnalysis.canAnalyze()) {
      openLimitDialog();
      return;
    }

    const { text: safeText, replacementCount } = maskSensitiveText(t);
    if (replacementCount > 0) {
      captureEvent(AnalyticsEvents.PRIVACY_MASKING_TOGGLED, {
        context: "analysis_start",
        replacement_count: replacementCount,
      });
      flashMaskNotice(
        `Güvenliğiniz için ${replacementCount} hassas veri alanı maskelenerek modele iletiliyor…`,
      );
    }

    lastInputRef.current = t;
    captureEvent(AnalyticsEvents.ANALYSIS_STARTED, {
      paywall: enablePaywall,
      compact,
      persona: personaRef.current,
      masked_fields: replacementCount,
      mode: phaseRef.current,
      ...buildInputAnalyticsProps(t, { source: "contract_analyzer" }),
    });

    setMessages([]);
    setDetailUnlocked(false);
    setTeaser(null);
    phaseRef.current = "analysis";

    if (enablePaywall && persona) {
      setTeaserLoading(true);
      try {
        const tr = await fetch("/api/analysis/teaser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contractText: safeText,
            persona: personaRef.current,
          }),
        });
        const tj = (await tr.json()) as TeaserData & { error?: string };
        if (tr.ok) {
          setTeaser({
            criticalRiskCount: tj.criticalRiskCount,
            missingClauseCount: tj.missingClauseCount,
            categoryTitles: tj.categoryTitles ?? [],
            securityScore: tj.securityScore,
          });
        }
      } catch {
        setTeaser({
          criticalRiskCount: 2,
          missingClauseCount: 1,
          securityScore: 48,
          categoryTitles: ["Genel risk"],
        });
      } finally {
        setTeaserLoading(false);
      }
    }

    // Analizi tüket
    dailyAnalysis.consumeAnalysis();
    
    window.setTimeout(() => {
      phaseRef.current = "analysis";
      void sendMessage({ text: safeText });
    }, 0);
  };

  // MVP: İyileştirme - ücretsiz (günlük limit dahilinde)
  const runImprove = async () => {
    if (!analysisMd.trim()) return;
    if (enablePaywall && !detailUnlocked) return;
    if (assistantTexts.length >= 2) return;

    // MVP: Günlük limit kontrolü
    if (!dailyAnalysis.canAnalyze()) {
      openLimitDialog();
      return;
    }

    if (!enablePaywall) {
      dailyAnalysis.consumeAnalysis();
      phaseRef.current = "refactor";
      void sendMessage({ text: IMPROVE_FOLLOWUP_USER_MESSAGE });
      return;
    }

    // MVP: Günlük limiti kullan
    dailyAnalysis.consumeAnalysis();
    setDetailUnlocked(true);
    phaseRef.current = "refactor";
    void sendMessage({ text: IMPROVE_FOLLOWUP_USER_MESSAGE });
  };

  // MVP: Unlock askıya alındı
  /*
  const handleUnlock = async () => {
    if (!enablePaywall) {
      setDetailUnlocked(true);
      return;
    }
    setUnlockBusy(true);
    try {
      if (wallet.hasUnlimited() || wallet.credits > 0) {
        const ok = await wallet.consume();
        if (ok) setDetailUnlocked(true);
        return;
      }
      captureEvent(AnalyticsEvents.PAYMENT_INITIATED, {
        funnel_step: "open_checkout_modal",
        source: "workspace_unlock_detail",
        intent: "single",
      });
      setPricingOpen(true);
    } finally {
      setUnlockBusy(false);
    }
  };
  */

  const handleUnlock = async () => {
    if (!isLoggedIn) {
      setSignupUnlockOpen(true);
      return;
    }
    setDetailUnlocked(true);
  };

  // MVP: Purchase fonksiyonları askıya alındı
  /*
  const afterPurchaseUnlock = async () => {
    const ok = await wallet.consume();
    if (ok) setDetailUnlocked(true);
  };

  const afterPurchaseImprove = async () => {
    const ok = await wallet.consume();
    if (!ok) return;
    phaseRef.current = "refactor";
    void sendMessage({ text: IMPROVE_FOLLOWUP_USER_MESSAGE });
  };
  */

  const improveDisabled =
    busy ||
    improveBusy ||
    !analysisMd.trim() ||
    (enablePaywall && !detailUnlocked) ||
    assistantTexts.length >= 2;

  // MVP: Her zaman göster (ücretsiz)
  const showImprove = true;
  // const showImprove = !enablePaywall || (wallet.ready && wallet.hasCompletedPurchase);

  return (
    <div className={cn("space-y-6", className)}>
      <WorkspaceModeTabs
        mode={mode}
        onModeChange={setMode}
        disabled={busy}
      />

      {mode === "create" ? (
        <ContractGenerator compact={compact} />
      ) : (
        <>
          {maskNotice ? (
            <div
              role="status"
              className="rounded-lg border border-emerald-200/90 bg-emerald-50/95 px-3 py-2 text-sm font-medium text-emerald-950 shadow-sm"
            >
              {maskNotice}
            </div>
          ) : null}
          <TrustBadges compact={compact} />
          {enablePaywall ? (
            <PersonaPicker
              value={persona}
              onChange={setPersona}
              disabled={busy}
            />
          ) : null}

          <div
            className={cn(
              "grid gap-6",
              compact
                ? "grid-cols-1 xl:grid-cols-2 xl:gap-8"
                : "lg:grid-cols-2 lg:gap-8",
            )}
          >
            <div className="flex min-w-0 flex-col gap-4">
              <ContractInputPanel
                value={contract}
                onChange={setContract}
                disabled={busy}
                compact={compact}
                onSample={() => setContract(SAMPLE_RENTAL_CONTRACT)}
                onSensitivePaste={(n) => {
                  captureEvent(AnalyticsEvents.PRIVACY_MASKING_TOGGLED, {
                    context: "paste_detection",
                    patterns_detected: n,
                  });
                  flashMaskNotice(
                    n === 1
                      ? "Güvenliğiniz için yapıştırdığınız metinde hassas bir desen algılandı; analiz başlatıldığında otomatik maskelenecek."
                      : `Güvenliğiniz için ${n} hassas desen algılandı; analiz başlatıldığında maskelenecek.`,
                  );
                }}
              />
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-col gap-1">
                  <ShinyAnalyzeButton
                    loading={busy}
                    disabled={
                      !contract.trim() ||
                      (enablePaywall ? !persona : false)
                    }
                    onClick={() => void runAnalysis()}
                  >
                    Ücretsiz risk taraması başlat
                  </ShinyAnalyzeButton>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {enablePaywall
                      ? "Lansman: hızlı risk özeti ücretsiz · detaylı rapor ve PDF hesapla ücretsiz"
                      : "Tam analiz başlatılıyor..."}
                  </p>
                </div>
                {showImprove ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="gap-2 border-[#00E676]/50 bg-[#00E676]/10 font-bold text-madde-ink hover:bg-[#00E676]/18"
                    disabled={improveDisabled}
                    onClick={() => void runImprove()}
                  >
                    <Wand2 className="h-4 w-4 shrink-0" />
                    Sihirli değnek (iyileştir)
                  </Button>
                ) : null}
                {busy ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => void stop()}
                  >
                    Durdur
                  </Button>
                ) : null}
              </div>
              {showImprove &&
              enablePaywall &&
              detailUnlocked &&
              analysisMd &&
              !refactorMd ? (
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Sözleşmeyi iyileştir: ücretsiz (günlük limit dahilinde)
                </p>
              ) : null}
            </div>

            <div className="min-w-0">
            {showSignupNudge && !isLoggedIn && analysisMd && !busy ? (
              <div className="mb-4">
                <SignupNudgeBanner
                  remaining={dailyAnalysis.remaining}
                  guestLimit={dailyAnalysis.guestLimit}
                  registeredLimit={dailyAnalysis.registeredLimit}
                />
              </div>
            ) : null}
            <AnalysisPanel
              analysisMarkdown={analysisMd}
              refactorMarkdown={refactorMd}
              markdownForExport={exportMd}
              originalContractText={contract}
              busy={busy}
              error={error}
              sharePath={sharePath}
              compact={compact}
              paywallActive={enablePaywall}
              teaser={teaser}
              teaserLoading={teaserLoading}
              detailUnlocked={detailUnlocked || !enablePaywall}
              onRequestUnlock={() => void handleUnlock()}
              unlockBusy={unlockBusy}
              isLoggedIn={isLoggedIn}
              registeredLimit={dailyAnalysis.registeredLimit}
              onRequestServerPurge={() => {
                setMessages([]);
                setTeaser(null);
                setDetailUnlocked(false);
              }}
            />
            </div>
          </div>
        </>
      )}

      {/* MVP: Ödeme askıya alındı - PricingModal kaldırıldı */}
      {/*
      <PricingModal
        open={pricingOpen}
        onOpenChange={setPricingOpen}
        purchase={wallet.purchase}
        emphasize="pro"
        title="Detayı aç — 149,99 TL/Ay"
        description="50 token ile detaylı mevzuat analizi, AI mütalaası ve dilekçe taslakları. Ödeme adımı atlanır; haklarınız hemen tanımlanır."
        onPurchaseComplete={async () => {
          await afterPurchaseUnlock();
        }}
      />

      <PricingModal
        open={pricingImproveOpen}
        onOpenChange={setPricingImproveOpen}
        purchase={wallet.purchase}
        emphasize="pro"
        title="Sözleşmeyi iyileştir — 149,99 TL/Ay"
        description="50 token ile sınırsız kullanım. Profesyonel, sade nihai metin için aylık plan seçin."
        footerNote="İyileştirme 3 token kullanır. Profesyonel planda dönem içi sınırsız tur; adil kullanım geçerlidir."
        onPurchaseComplete={async () => {
          await afterPurchaseImprove();
        }}
      />
      */}
      <LimitReachedDialog
        open={limitDialogOpen}
        onOpenChange={setLimitDialogOpen}
        guestLimit={dailyAnalysis.guestLimit}
        registeredLimit={dailyAnalysis.registeredLimit}
        isLoggedIn={isLoggedIn}
      />
      <AuthModal
        open={signupUnlockOpen}
        onOpenChange={setSignupUnlockOpen}
      />
    </div>
  );
}
