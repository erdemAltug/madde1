"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

const DISMISS_KEY = "clause-signup-nudge-dismissed";

type Props = {
  remaining: number;
  guestLimit: number;
  registeredLimit: number;
};

export function SignupNudgeBanner({
  remaining,
  guestLimit,
  registeredLimit,
}: Props) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;
    setVisible(true);
    captureEvent(AnalyticsEvents.SIGNUP_NUDGE_SHOWN, {
      remaining,
      guest_limit: guestLimit,
    });
  }, [remaining, guestLimit]);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
    captureEvent(AnalyticsEvents.SIGNUP_NUDGE_DISMISSED);
  };

  if (!visible) return null;

  return (
    <div className="rounded-xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/90 to-violet-50/70 px-4 py-3 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              Analizin hazır — sonuçları kaydetmek ister misin?
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              Ücretsiz kayıt ol: günde {registeredLimit} analiz (misafir: {guestLimit}),
              geçmişe erişim ve PDF indirme.
              {remaining <= 1 ? " Bugünkü hakkın azaldı." : null}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            size="sm"
            className="h-9 rounded-lg bg-indigo-600 font-semibold hover:bg-indigo-700"
            asChild
            onClick={() =>
              captureEvent(AnalyticsEvents.SIGNUP_NUDGE_CLICKED, {
                source: "post_analysis_banner",
              })
            }
          >
            <Link href="/giris?kayit=1">Ücretsiz kayıt ol</Link>
          </Button>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/80 hover:text-slate-600"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
