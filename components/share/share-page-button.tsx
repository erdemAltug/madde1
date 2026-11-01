"use client";

import * as React from "react";
import { Check, Share2 } from "lucide-react";
import { captureEvent } from "@/lib/analytics/capture";
import { cn } from "@/lib/utils";

type Props = {
  /** Paylaşım metni — sayfanın cevapladığı soru, ör. "Kira zammın yasal mı?" */
  text: string;
  path: string;
  className?: string;
};

/**
 * "Arkadaşına gönder": kira ve iş sorunları WhatsApp gruplarında konuşulur.
 * Yalnız sayfa bağlantısı paylaşılır; kullanıcının girdiği rakamlar değil.
 */
export function SharePageButton({ text, path, className }: Props) {
  const [copied, setCopied] = React.useState(false);

  const share = async () => {
    const url = `${window.location.origin}${path}?utm_source=share&utm_medium=friend`;
    captureEvent("page_shared", { path });
    if (navigator.share) {
      await navigator.share({ text, url }).catch(() => {});
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank", "noopener");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={() => void share()}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-[#005BEA]/40",
        className,
      )}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4 text-[#005BEA]" />}
      Aynı durumdaki bir arkadaşına gönder
    </button>
  );
}
