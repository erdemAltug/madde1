"use client";

import * as React from "react";
import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
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
  registeredLimit: number;
};

export function SignupUnlockDialog({
  open,
  onOpenChange,
  registeredLimit,
}: Props) {
  React.useEffect(() => {
    if (open) {
      captureEvent(AnalyticsEvents.DETAIL_UNLOCK_SIGNUP_PROMPT_SHOWN);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <Lock className="h-5 w-5 text-indigo-600" />
          </div>
          <DialogTitle className="text-center text-xl text-deep-navy">
            Detaylı analizi görmek için kayıt ol
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed text-slate-600">
            Risk özeti hazır. Madde madde açıklama, mevzuat referansları ve
            iyileştirme önerileri kayıtlı kullanıcılara açık — ücretsiz.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2 rounded-xl border border-indigo-100 bg-indigo-50/50 px-4 py-3 text-sm text-slate-700">
          <li>✓ Detaylı risk analizi ve çözüm önerileri</li>
          <li>✓ Sözleşme iyileştirme (sihirli değnek)</li>
          <li>✓ Günde {registeredLimit} analiz — kredi kartı gerekmez</li>
        </ul>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            className="w-full rounded-xl bg-indigo-600 font-semibold hover:bg-indigo-700"
            asChild
            onClick={() =>
              captureEvent(AnalyticsEvents.DETAIL_UNLOCK_SIGNUP_CLICKED)
            }
          >
            <Link href="/giris?kayit=1">
              <Sparkles className="mr-2 h-4 w-4" />
              Ücretsiz kayıt ol
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full rounded-xl font-medium text-slate-500"
            onClick={() => onOpenChange(false)}
          >
            Önce risk özetine bakayım
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
