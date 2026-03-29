"use client";

import * as React from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { ClauseLogo } from "@/components/brand/clause-logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CREDIT_PACKAGES,
  FAIR_USE_DISCLAIMER,
  type CreditPackageId,
} from "@/lib/credits/packages";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const ORDER: CreditPackageId[] = ["starter", "pro", "business"];

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onPurchaseComplete: () => Promise<void> | void;
  purchase: (id: CreditPackageId) => Promise<void>;
  title?: string;
  description?: string;
  /** vurgulu paket */
  emphasize?: CreditPackageId;
  /** Alt bilgi */
  footerNote?: string;
  /** Aylık kart altı + dip not için adil kullanım */
  showFairUseDisclaimer?: boolean;
};

export function PricingModal({
  open,
  onOpenChange,
  onPurchaseComplete,
  purchase,
  title = "Paket seçin",
  description = "Ödeme adımı şimdilik atlanır; seçtiğiniz paket hesabınıza hemen tanımlanır.",
  emphasize = "pro",
  footerNote = "50 token ile detaylı analiz ve iyileştirme.",
  showFairUseDisclaimer = true,
}: Props) {
  const [busy, setBusy] = React.useState<CreditPackageId | null>(null);

  const run = async (id: CreditPackageId) => {
    captureEvent(AnalyticsEvents.PAYMENT_INITIATED, {
      funnel_step: "confirm_checkout",
      package_id: id,
      package_label: CREDIT_PACKAGES[id].label,
    });
    setBusy(id);
    try {
      await purchase(id);
      captureEvent(AnalyticsEvents.PAYMENT_SUCCESS, {
        package_id: id,
        package_label: CREDIT_PACKAGES[id].label,
      });
      await onPurchaseComplete();
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-slate-200/60 bg-white shadow-2xl shadow-slate-900/15 sm:max-w-lg relative">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-inherit">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>
        <DialogHeader>
          <ClauseLogo className="mb-3" size={40} />
          <DialogTitle className="text-xl font-bold tracking-tight text-deep-navy">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600 font-medium">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          {ORDER.map((id) => {
            const p = CREDIT_PACKAGES[id];
            const em = emphasize === id;
            const isPro = id === "pro";
            const isBusiness = id === "business";
            return (
              <div
                key={id}
                className={cn(
                  "rounded-xl border p-4 transition-shadow soft-elevation",
                  isBusiness
                    ? "bg-slate-900 border-slate-800"
                    : isPro
                    ? cn(
                        "bg-gradient-to-br from-indigo-50 via-white to-sky-50",
                        em
                          ? "border-indigo-300 shadow-lg shadow-indigo-200/30 ring-2 ring-indigo-200/30"
                          : "border-indigo-200/60",
                      )
                    : em
                    ? "border-indigo-200 bg-indigo-50/50 shadow-md"
                    : "border-slate-200 bg-slate-50/50",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={cn("font-bold", isBusiness ? "text-white" : "text-deep-navy")}>{p.label}</p>
                      {isPro ? (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          <Sparkles className="h-3 w-3" aria-hidden />
                          AVUKATLARIN TERCİHİ
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "text-2xl font-extrabold",
                        isBusiness ? "text-white" : "text-indigo-600",
                      )}
                    >
                      {p.priceLabel}
                      {!isBusiness && !p.unlimitedDays ? (
                        <span className="ml-1.5 text-sm font-bold text-slate-600">
                          /ay
                        </span>
                      ) : null}
                      {p.unlimitedDays ? (
                        <span className="ml-1.5 text-sm font-bold text-slate-500">
                          /ay
                        </span>
                      ) : null}
                    </p>
                    <p className={cn(
                      "mt-1 max-w-[260px] text-xs font-medium leading-snug",
                      isBusiness ? "text-slate-400" : "text-slate-600"
                    )}>
                      {p.blurb}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className={cn(
                      "min-h-11 shrink-0 px-4 font-bold",
                      isBusiness
                        ? "bg-slate-700 text-white hover:bg-slate-600"
                        : isPro
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-slate-800 text-white hover:bg-slate-900",
                    )}
                    disabled={busy !== null}
                    onClick={() => void run(id)}
                  >
                    {busy === id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="mr-1.5 h-4 w-4" />
                        {isBusiness ? "İletişime Geç" : "Satın al"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {showFairUseDisclaimer ? (
          <p className="rounded-lg border border-slate-200/60 bg-slate-50 px-3 py-2 text-center text-[11px] leading-relaxed text-slate-600 font-medium">
            {FAIR_USE_DISCLAIMER}
          </p>
        ) : null}
        <p className="text-center text-[11px] text-slate-500 font-medium">{footerNote}</p>
      </DialogContent>
    </Dialog>
  );
}
