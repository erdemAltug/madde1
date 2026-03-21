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

const ORDER: CreditPackageId[] = ["single", "monthly"];

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
  emphasize = "single",
  footerNote = "4,99 TL — tek tam analiz erişimi.",
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
      <DialogContent className="max-h-[92vh] overflow-y-auto border-white/30 bg-white/92 shadow-2xl shadow-slate-900/15 backdrop-blur-2xl sm:max-w-lg">
        <DialogHeader>
          <ClauseLogo className="mb-3" size={40} />
          <DialogTitle className="text-xl font-bold tracking-tight text-madde-ink">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          {ORDER.map((id) => {
            const p = CREDIT_PACKAGES[id];
            const em = emphasize === id;
            const isSingle = id === "single";
            return (
              <div
                key={id}
                className={cn(
                  "rounded-xl border p-4 transition-shadow",
                  isSingle
                    ? cn(
                        "bg-gradient-to-br from-[#0066FF]/12 via-white to-sky-50/90",
                        em
                          ? "border-[#0066FF] shadow-lg shadow-[#0066FF]/25 ring-2 ring-[#0066FF]/35"
                          : "border-[#0066FF]/40",
                      )
                    : em
                      ? "border-madde-blue bg-madde-blue/[0.07] shadow-md shadow-madde-blue/10"
                      : "border-slate-200 bg-slate-50/50",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-slate-900">{p.label}</p>
                      {isSingle ? (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-[#0066FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          <Sparkles className="h-3 w-3" aria-hidden />
                          En popüler
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "text-2xl font-extrabold",
                        isSingle ? "text-[#0066FF]" : "text-madde-blue",
                      )}
                    >
                      {p.priceLabel}
                      {isSingle ? (
                        <span className="ml-1.5 text-sm font-bold text-slate-700">
                          / tek seferlik
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 max-w-[260px] text-xs font-medium leading-snug text-slate-600">
                      {p.blurb}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className={cn(
                      "min-h-11 shrink-0 px-4 font-bold text-white",
                      isSingle && "bg-[#0066FF] hover:bg-[#0052CC]",
                      !isSingle &&
                        em &&
                        "bg-madde-blue hover:bg-madde-blue-deep",
                      !isSingle &&
                        !em &&
                        "bg-slate-800 hover:bg-slate-900",
                    )}
                    disabled={busy !== null}
                    onClick={() => void run(id)}
                  >
                    {busy === id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="mr-1.5 h-4 w-4" />
                        Satın al
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {showFairUseDisclaimer ? (
          <p className="rounded-lg border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-center text-[11px] leading-relaxed text-slate-600">
            {FAIR_USE_DISCLAIMER}
          </p>
        ) : null}
        <p className="text-center text-[11px] text-slate-500">{footerNote}</p>
      </DialogContent>
    </Dialog>
  );
}
