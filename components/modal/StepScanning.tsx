"use client";

import * as React from "react";
import { ScanSearch } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  "Sözleşme taranıyor...",
  "TBK maddeleri kontrol ediliyor...",
  "Risk haritası çıkarılıyor...",
] as const;

/** Target wall-clock for the scanning step (< 3s). */
export const SCAN_DURATION_MS = 2600;

type Props = {
  className?: string;
};

export function StepScanning({ className }: Props) {
  const [stageIndex, setStageIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(6);

  React.useEffect(() => {
    const stageMs = SCAN_DURATION_MS / STAGES.length;
    const stageTimer = window.setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, STAGES.length - 1));
    }, stageMs);

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / SCAN_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setProgress(Math.round(6 + eased * 92));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.clearInterval(stageTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 px-4 py-10 text-center",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--cta-primary)]/20" />
        <span className="absolute inset-2 animate-pulse rounded-full bg-[var(--cta-primary)]/15" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--cta-primary)] text-white shadow-[0_0_28px_rgba(37,99,235,0.45)]">
          <ScanSearch className="h-8 w-8" aria-hidden />
        </div>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <p className="text-base font-bold text-deep-navy">{STAGES[stageIndex]}</p>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--cta-primary)] to-[#60a5fa] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs font-medium tabular-nums text-slate-500">
          %{progress}
        </p>
      </div>
    </div>
  );
}
