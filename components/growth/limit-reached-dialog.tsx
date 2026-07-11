"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guestLimit: number;
  registeredLimit: number;
  isLoggedIn: boolean;
};

export function LimitReachedDialog({
  open,
  onOpenChange,
  guestLimit,
  registeredLimit,
  isLoggedIn,
}: Props) {
  React.useEffect(() => {
    if (open) {
      captureEvent(AnalyticsEvents.LIMIT_DIALOG_SHOWN, {
        is_logged_in: isLoggedIn,
        guest_limit: guestLimit,
      });
    }
  }, [open, isLoggedIn, guestLimit]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-deep-navy">
            {isLoggedIn
              ? "Bugünlük analiz hakkın doldu"
              : "Günlük ücretsiz hakkın bitti"}
          </DialogTitle>
          <DialogDescription className="text-left text-sm leading-relaxed text-slate-600">
            {isLoggedIn ? (
              <>
                Kayıtlı hesaplarla günde {registeredLimit} analiz kullanabilirsin.
                Yarın sıfırlanır veya ek ihtiyaç için bize yazabilirsin.
              </>
            ) : (
              <>
                Misafir olarak günde {guestLimit} analiz kullanabilirsin. Ücretsiz
                kayıt olursan günde {registeredLimit} analiz + geçmiş kayıtlarına
                erişirsin — kredi kartı gerekmez.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <p>Hakların her gece yarısı sıfırlanır. Şimdilik bekleyebilir veya kayıt olabilirsin.</p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {!isLoggedIn ? (
            <Button
              className="w-full rounded-xl bg-indigo-600 font-semibold hover:bg-indigo-700"
              asChild
              onClick={() =>
                captureEvent(AnalyticsEvents.LIMIT_DIALOG_SIGNUP_CLICKED)
              }
            >
              <Link href="/giris?kayit=1">
                <Sparkles className="mr-2 h-4 w-4" />
                Ücretsiz kayıt ol — günde {registeredLimit} analiz
              </Link>
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl font-semibold"
            onClick={() => onOpenChange(false)}
          >
            Tamam, yarın tekrar denerim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
