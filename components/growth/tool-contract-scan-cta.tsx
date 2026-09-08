"use client";

import Link from "next/link";
import { FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureEvent } from "@/lib/analytics/capture";
import { AnalyticsEvents } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

type Props = {
  source: string;
  href?: string;
  /** Kalın ilk satır — örn. "Yasal sınırınız ₺34.465 olarak hesaplandı." */
  highlight?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  className?: string;
};

/** Hesaplayıcı → sözleşme tarama köprüsü (dinamik sonuç kancası) */
export function ToolContractScanCta({
  source,
  href = "/sozlesme-analizi/kira-sozlesmesi-analizi",
  highlight,
  title = "Ev sahibinin sözleşmeye eklediği tahliye taahhüdü veya haksız artış maddesi var mı?",
  body = "Kira kontratını yapıştır veya PDF yükle — 15 saniyede aleyhine olan maddeleri tarayalım (ücretsiz).",
  ctaLabel = "Kontratı tara — ücretsiz",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-[#005BEA]/30 bg-[#005BEA]/[0.05] px-4 py-4 sm:px-5",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="min-w-0 space-y-1.5">
          {highlight ? (
            <p className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
              {highlight}
            </p>
          ) : null}
          <p
            className={cn(
              "leading-snug text-slate-800",
              highlight ? "text-xs font-semibold sm:text-sm" : "text-sm font-bold",
            )}
          >
            {title}
          </p>
          <p className="text-xs leading-relaxed text-slate-600">{body}</p>
        </div>
        <Button
          size="sm"
          className="h-11 w-full gap-1.5 rounded-xl bg-[#005BEA] font-semibold hover:bg-[#0049c0] sm:w-auto sm:self-start"
          asChild
          onClick={() => {
            captureEvent(AnalyticsEvents.HERO_CTA_CLICKED, {
              source: `tool_scan_bridge:${source}`,
            });
          }}
        >
          <Link href={href}>
            <FileSearch className="h-4 w-4" />
            {ctaLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
}
