"use client";

import * as React from "react";
import { BookOpen, Gavel, StickyNote, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  /** Örn. "TBK m.344" */
  label: string;
  /** Kaynağın kısa metni; yoksa çip tıklanamaz, yalnız etiket gösterir */
  snippet?: string;
  kind?: string;
  className?: string;
};

/**
 * Mevzuat referans çipi: tıklanınca kaynağın kendisini (RAG'dan gelen metin) açar.
 * Kullanıcı "bu madde ne diyor?" sorusunu sohbetten çıkmadan görür.
 */
export function StatuteChip({ label, snippet, kind, className }: Props) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const Icon = kind === "emsal_karar" ? Gavel : kind === "hukuki_not" ? StickyNote : BookOpen;

  if (!snippet) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
          className,
        )}
      >
        <Icon className="h-3 w-3" aria-hidden />
        {label}
      </span>
    );
  }

  return (
    <span className={cn("inline-block", open && "w-full", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
          open
            ? "border-[#005BEA] bg-[#005BEA]/10 text-[#005BEA]"
            : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[#005BEA]/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
        )}
      >
        <Icon className="h-3 w-3" aria-hidden />
        {label}
      </button>
      {open ? (
        <span
          id={id}
          role="region"
          aria-label={`${label} kaynak metni`}
          className="mt-2 block rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <span className="mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-slate-500">
            {kind === "emsal_karar" ? "Yargı pratiği" : kind === "hukuki_not" ? "Hukuki not" : "Mevzuat metni"}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Kapat"
              className="rounded p-0.5 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
          <span className="block font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-200">
            {snippet}
            {snippet.length >= 400 ? "…" : ""}
          </span>
        </span>
      ) : null}
    </span>
  );
}
