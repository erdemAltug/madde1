"use client";

import * as React from "react";
import { Check, Share2 } from "lucide-react";
import type { PersonaId } from "@/lib/personas";
import { riskCardQuery, type CardKind } from "@/lib/share/risk-card";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

const KIND_BY_PERSONA: Record<string, CardKind> = {
  tenant: "kira",
  job_seeker: "is",
  freelancer: "hizmet",
};

type Props = {
  score: number;
  critical: number;
  missing: number;
  persona?: PersonaId;
};

export function ShareRiskCardButton({ score, critical, missing, persona }: Props) {
  const [copied, setCopied] = React.useState(false);

  const share = async () => {
    const kind = (persona && KIND_BY_PERSONA[persona]) || "sozlesme";
    const url = `${window.location.origin}/kart?${riskCardQuery({ score, critical, missing, kind })}`;
    const text = "Sözleşmemi imzalamadan önce Clause'da kontrol ettim:";
    captureEvent(AnalyticsEvents.RISK_CARD_SHARED, { kind });

    if (navigator.share) {
      await navigator.share({ title: "Risk kartım — Clause", text, url }).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      navigator.vibrate?.(30);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank", "noopener");
    }
  };

  return (
    <button
      type="button"
      onClick={() => void share()}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-[#005BEA]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4 text-[#005BEA]" />}
      {copied ? "Bağlantı kopyalandı" : "Risk kartını paylaş (kişisel veri içermez)"}
    </button>
  );
}
