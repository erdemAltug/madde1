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
        "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-transform active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 sm:w-auto",
        className,
      )}
      {...props}
    >
      <span
        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-shine"
        aria-hidden
      />
      <span
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.45), transparent 55%)",
        }}
        aria-hidden
      />
      <span className="pointer-events-none absolute -inset-1 rounded-lg opacity-70 blur-md bg-gradient-to-r from-cyan-400/30 via-primary/40 to-teal-400/30 group-hover:opacity-100 transition-opacity" />
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
