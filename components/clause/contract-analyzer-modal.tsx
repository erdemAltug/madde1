"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClauseLogo } from "@/components/brand/clause-logo";
import { StepInput } from "@/components/modal/StepInput";
import {
  SCAN_DURATION_MS,
  StepScanning,
} from "@/components/modal/StepScanning";
import { StepResults } from "@/components/modal/StepResults";
import type { TeaserData } from "@/components/b2c/risk-teaser-dashboard";
import { LimitReachedDialog } from "@/components/growth/limit-reached-dialog";
import { SAMPLE_RENTAL_CONTRACT } from "@/lib/constants";
import { maskSensitiveText } from "@/lib/security/mask-sensitive";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useDailyAnalysis } from "@/hooks/use-daily-analysis";
import type { PersonaId } from "@/lib/personas";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { buildInputAnalyticsProps } from "@/lib/analytics/input-props";
import { cn } from "@/lib/utils";

type WizardStep = "input" | "scanning" | "results";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sharePath?: string;
};

const FALLBACK_TEASER: TeaserData = {
  criticalRiskCount: 3,
  missingClauseCount: 1,
  securityScore: 25,
  categoryTitles: [
    "Haksız cezai şart",
    "Tahliye taahhüdü riski",
    "Aşırı kira artışı",
  ],
};

async function fetchTeaser(
  contractText: string,
  persona: PersonaId,
): Promise<TeaserData> {
  const { text: safeText, replacementCount } = maskSensitiveText(contractText);
  if (replacementCount > 0) {
    captureEvent(AnalyticsEvents.PRIVACY_MASKING_TOGGLED, {
      context: "wizard_analysis_start",
      replacement_count: replacementCount,
    });
  }

  try {
    const tr = await fetch("/api/analysis/teaser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contractText: safeText, persona }),
    });
    const tj = (await tr.json()) as TeaserData & { error?: string };
    if (tr.ok) {
      return {
        criticalRiskCount: tj.criticalRiskCount,
        missingClauseCount: tj.missingClauseCount,
        categoryTitles: tj.categoryTitles ?? [],
        securityScore: tj.securityScore,
      };
    }
  } catch {
    /* fallback below */
  }
  return FALLBACK_TEASER;
}

export function ContractAnalyzerModal({
  open,
  onOpenChange,
}: Props) {
  const [step, setStep] = React.useState<WizardStep>("input");
  const [persona, setPersona] = React.useState<PersonaId>("general");
  const [contractText, setContractText] = React.useState("");
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [teaser, setTeaser] = React.useState<TeaserData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [limitDialogOpen, setLimitDialogOpen] = React.useState(false);

  const { userId, isLoggedIn } = useAuthSession();
  const dailyAnalysis = useDailyAnalysis(userId);
  const { canAnalyze, consumeAnalysis, isLoaded } = dailyAnalysis;

  const resetWizard = React.useCallback(() => {
    setStep("input");
    setPersona("general");
    setContractText("");
    setFileName(null);
    setTeaser(null);
    setError(null);
  }, []);

  React.useEffect(() => {
    if (!open) {
      const t = window.setTimeout(resetWizard, 200);
      return () => window.clearTimeout(t);
    }
  }, [open, resetWizard]);

  const runWizard = React.useCallback(
    async (text: string, nextPersona: PersonaId, source: "demo" | "manual") => {
      const trimmed = text.trim();
      if (!trimmed) {
        setError("Analiz için sözleşme metni gerekli.");
        return;
      }
      if (!isLoaded) return;
      if (!canAnalyze()) {
        setLimitDialogOpen(true);
        return;
      }

      setError(null);
      setPersona(nextPersona);
      setContractText(trimmed);
      setStep("scanning");
      setTeaser(null);

      captureEvent(AnalyticsEvents.ANALYSIS_STARTED, {
        paywall: true,
        compact: true,
        persona: nextPersona,
        source: `wizard_${source}`,
        ...buildInputAnalyticsProps(trimmed, { source: "contract_analyzer" }),
      });

      consumeAnalysis();

      const started = performance.now();
      const teaserPromise = fetchTeaser(trimmed, nextPersona);

      const [data] = await Promise.all([
        teaserPromise,
        new Promise<void>((resolve) => {
          window.setTimeout(resolve, SCAN_DURATION_MS);
        }),
      ]);

      setTeaser(data);
      setStep("results");

      captureEvent(AnalyticsEvents.ANALYSIS_COMPLETED, {
        phase: "teaser_wizard",
        paywall: true,
        persona: nextPersona,
        duration_ms: Math.round(performance.now() - started),
        is_logged_in: isLoggedIn,
        ...buildInputAnalyticsProps(trimmed, { source: "contract_analyzer" }),
      });

      if (!isLoggedIn) {
        captureEvent(AnalyticsEvents.DETAIL_UNLOCK_SIGNUP_PROMPT_SHOWN, {
          source: "wizard_teaser_results",
        });
      }
    },
    [canAnalyze, consumeAnalysis, isLoaded, isLoggedIn],
  );

  const onStartDemo = () => {
    void runWizard(SAMPLE_RENTAL_CONTRACT, "tenant", "demo");
  };

  const onStartAnalysis = () => {
    void runWizard(contractText, persona, "manual");
  };

  const title =
    step === "input"
      ? "Ücretsiz sözleşme analizi"
      : step === "scanning"
        ? "Analiz devam ediyor"
        : "Risk özeti hazır";

  const description =
    step === "input"
      ? "Dosyanızı yükleyin veya örnekle saniyeler içinde deneyin."
      : step === "scanning"
        ? "Yapay zeka sözleşmenizi tarıyor."
        : "Ücretsiz özet aşağıda; kritik detaylar kayıtla açılır.";

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "max-h-[92vh] w-[95vw] max-w-lg flex flex-col gap-0 overflow-hidden border border-slate-200/60 bg-white p-0 shadow-2xl shadow-slate-900/20 sm:rounded-xl",
          )}
        >
          <DialogHeader className="shrink-0 space-y-1.5 border-b border-slate-200/60 bg-white px-5 py-4 text-left sm:px-6">
            <ClauseLogo className="mb-0.5" size={32} />
            <DialogTitle className="text-xl font-bold tracking-tight text-deep-navy sm:text-2xl">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-slate-600">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 py-5 sm:px-6">
            {step === "input" ? (
              <StepInput
                persona={persona}
                onPersonaChange={setPersona}
                contractText={contractText}
                onContractTextChange={setContractText}
                fileName={fileName}
                onFileNameChange={setFileName}
                onStartDemo={onStartDemo}
                onStartAnalysis={onStartAnalysis}
                error={error}
              />
            ) : null}
            {step === "scanning" ? <StepScanning /> : null}
            {step === "results" && teaser ? (
              <StepResults
                teaser={teaser}
                isLoggedIn={isLoggedIn}
                onAnalyzeAgain={resetWizard}
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <LimitReachedDialog
        open={limitDialogOpen}
        onOpenChange={setLimitDialogOpen}
        guestLimit={dailyAnalysis.guestLimit}
        registeredLimit={dailyAnalysis.registeredLimit}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
