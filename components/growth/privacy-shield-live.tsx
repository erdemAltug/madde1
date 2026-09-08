"use client";

import * as React from "react";
import { ShieldCheck } from "lucide-react";
import {
  detectSensitivePatterns,
  type MaskDetection,
} from "@/lib/security/mask-sensitive";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  /** false ise metin kısa olsa bile bandı göster (bilgilendirme) */
  compact?: boolean;
};

/** Yapıştırma anında canlı gizlilik kalkanı chip’leri */
export function PrivacyShieldLive({ text, className, compact }: Props) {
  const detections = React.useMemo(
    () => (text.trim().length > 20 ? detectSensitivePatterns(text) : []),
    [text],
  );

  if (detections.length === 0 && compact) return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-emerald-200/90 bg-emerald-50/80 px-3 py-2.5",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-2">
        <ShieldCheck
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
          aria-hidden
        />
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-xs font-bold text-emerald-950">
            Gizlilik Kalkanı
            {detections.length > 0
              ? ` — ${detections.reduce((a, d) => a + d.count, 0)} alan maskelenecek`
              : " — TC, telefon ve benzeri veriler modele gitmeden önce tarayıcıda gizlenir"}
          </p>
          {detections.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {detections.map((d) => (
                <DetectionChip key={d.kind} detection={d} />
              ))}
            </ul>
          ) : null}
          <p className="text-[10px] leading-relaxed text-emerald-800/90">
            Sunucuya yalnızca anonimleştirilmiş metin iletilir.
          </p>
        </div>
      </div>
    </div>
  );
}

function DetectionChip({ detection }: { detection: MaskDetection }) {
  return (
    <li className="inline-flex max-w-full items-center gap-1 rounded-full border border-emerald-300/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-emerald-900">
      <span className="shrink-0">{detection.label}</span>
      <span className="truncate font-mono text-[10px] font-medium text-emerald-700">
        {detection.sample}
      </span>
      {detection.count > 1 ? (
        <span className="rounded-full bg-emerald-100 px-1.5 text-[10px] text-emerald-800">
          ×{detection.count}
        </span>
      ) : null}
    </li>
  );
}
