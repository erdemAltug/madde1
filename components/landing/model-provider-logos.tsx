"use client";

import { cn } from "@/lib/utils";

/** Abstract marks + labels — monochrome default, brand-adjacent color on hover */
const providers = [
  {
    id: "openai",
    label: "OpenAI",
    hoverClass: "group-hover:text-[#10A37F]",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M12 3c-3 5-6 6-6 9s3 4 6 9c3-5 6-6 6-9s-3-4-6-9z" />
        <path d="M6 12h12" />
      </svg>
    ),
  },
  {
    id: "claude",
    label: "Claude",
    hoverClass: "group-hover:text-[#D97757]",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M12 2l2.8 8.5h9L14.8 15.2l2.7 8.5L12 17.7l-5.5 6 2.7-8.5L.2 10.5h9L12 2z" />
      </svg>
    ),
  },
  {
    id: "groq",
    label: "Groq",
    hoverClass: "group-hover:text-[#F55036]",
    svg: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M14 2 3 20h8l-1.2 6L21 4h-7L14 2z" />
      </svg>
    ),
  },
] as const;

export function ModelProviderLogos({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-10 sm:gap-16",
        className,
      )}
    >
      {providers.map((p) => (
        <div
          key={p.id}
          className="group flex flex-col items-center gap-2 text-center text-slate-400 transition-colors"
        >
          <div className={cn("transition-colors duration-300", p.hoverClass)}>
            {p.svg}
          </div>
          <span
            className={cn(
              "text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300",
              p.hoverClass,
            )}
          >
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}
