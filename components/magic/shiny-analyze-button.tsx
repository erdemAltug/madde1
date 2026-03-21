"use client";

import * as React from "react";
import { Scale, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function ShinyAnalyzeButton({
  className,
  loading,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-900/15 transition-transform active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 sm:w-auto",
        className,
      )}
      {...props}
    >
      <span
        className="absolute inset-0 bg-gradient-to-r from-madde-blue via-[#1a7cff] to-madde-blue bg-[length:200%_auto] animate-shine"
        aria-hidden
      />
      <span
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.5), transparent 55%)",
        }}
        aria-hidden
      />
      <span className="pointer-events-none absolute -inset-1 rounded-lg bg-madde-blue/25 opacity-50 blur-md transition-opacity group-hover:opacity-80" />
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        ) : (
          <Scale className="h-5 w-5" aria-hidden />
        )}
        {children}
      </span>
    </button>
  );
}
