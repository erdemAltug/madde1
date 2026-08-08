"use client";

import Link from "next/link";
import { FileDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

type Props = {
  source: string;
  visible: boolean;
  onDismiss?: () => void;
  className?: string;
};

/** Araç sonuç ekranlarında sticky dönüşüm çubuğu */
export function ToolResultSignupBar({
  source,
  visible,
  onDismiss,
  className,
}: Props) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-indigo-200/80 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <FileDown className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              Sonucu PDF olarak saklamak veya dilekçe taslağı üretmek ister misiniz?
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              Ücretsiz kayıt ile geçmişe erişim, PDF indirme ve daha fazla analiz
              hakkı açılır. Bu araç hukuki tavsiye yerine geçmez.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            size="sm"
            className="h-10 rounded-lg bg-indigo-600 font-semibold hover:bg-indigo-700"
            asChild
            onClick={() =>
              captureEvent(AnalyticsEvents.SIGNUP_NUDGE_CLICKED, {
                source: `tool_result_bar:${source}`,
              })
            }
          >
            <Link href={`/giris?kayit=1&next=${encodeURIComponent(source)}`}>
              Ücretsiz kayıt ol
            </Link>
          </Button>
          {onDismiss ? (
            <button
              type="button"
              onClick={onDismiss}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
