"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textOf).join("");
  }
  if (React.isValidElement(node)) {
    return textOf(node.props.children);
  }
  return "";
}

function lineTone(
  raw: string,
): "risk" | "suggest" | "missing" | "risk-heading" | "summary" | undefined {
  if (/analiz\s*özeti/i.test(raw) && raw.length < 120) return "summary";
  if (/kritik\s*risk/i.test(raw) && raw.length < 80) return "risk-heading";
  if (raw.includes("📊")) return "summary";
  if (raw.includes("🔴")) return "risk";
  if (raw.includes("🟢")) return "suggest";
  if (raw.includes("⚪")) return "missing";
  return undefined;
}

const mdDark =
  "prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-p:text-foreground/90 prose-p:break-words prose-li:my-1 prose-li:break-words prose-strong:text-foreground [overflow-wrap:anywhere]";

const mdLight =
  "prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-p:break-words prose-li:my-1 prose-li:break-words [overflow-wrap:anywhere]";

export function StreamingMarkdown({
  content,
  className,
  variant = "light",
}: {
  content: string;
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <div className={cn(variant === "dark" ? mdDark : mdLight, className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => {
            const t = textOf(children);
            const tone = lineTone(t);
            return (
              <h1
                {...props}
                className={cn(
                  "mt-6 mb-4 scroll-mt-24 border-b border-slate-200 pb-2 text-xl font-bold tracking-tight first:mt-0",
                  tone === "summary" &&
                    (variant === "dark"
                      ? "border-blue-500/30 text-blue-100"
                      : "border-blue-200 text-blue-900"),
                  tone === "risk-heading" &&
                    (variant === "dark"
                      ? "rounded-md border border-red-500/40 bg-red-950/30 px-3 py-2 text-red-100"
                      : "rounded-md border border-red-300 bg-red-50 px-3 py-2 text-red-900"),
                  tone === "suggest" &&
                    (variant === "dark"
                      ? "border-emerald-500/30 text-emerald-100"
                      : "border-emerald-200 text-emerald-900"),
                )}
              >
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const t = textOf(children);
            const tone = lineTone(t);
            return (
              <h2
                {...props}
                className={cn(
                  "mt-8 mb-3 text-lg tracking-tight first:mt-0",
                  tone === "risk-heading" &&
                    (variant === "dark"
                      ? "rounded-md border border-red-500/40 bg-red-950/30 px-3 py-2 text-red-100"
                      : "rounded-md border border-red-300 bg-red-50 px-3 py-2 text-red-900"),
                )}
              >
                {children}
              </h2>
            );
          },
          li: ({ children, ...props }) => {
            const t = textOf(children);
            const tone = lineTone(t);
            return (
              <li
                {...props}
                className={cn(
                  "rounded-md pl-1",
                  tone === "risk" &&
                    (variant === "dark"
                      ? "border-l-4 border-red-500 bg-red-950/25 py-2 pr-2"
                      : "border-l-4 border-red-500 bg-red-50 py-2 pr-2"),
                  tone === "suggest" &&
                    (variant === "dark"
                      ? "border-l-4 border-emerald-500 bg-emerald-950/20 py-2 pr-2"
                      : "border-l-4 border-emerald-600 bg-emerald-50 py-2 pr-2"),
                  tone === "missing" &&
                    (variant === "dark"
                      ? "border-l-4 border-slate-400 bg-slate-900/40 py-2 pr-2"
                      : "border-l-4 border-slate-400 bg-slate-100 py-2 pr-2"),
                )}
              >
                {children}
              </li>
            );
          },
          p: ({ children, ...props }) => (
            <p {...props} className="break-words [overflow-wrap:anywhere]">
              {children}
            </p>
          ),
          code: ({ className: c, children, ...props }) => (
            <code
              {...props}
              className={cn(
                "whitespace-pre-wrap break-all rounded px-1.5 py-0.5 text-[0.85em]",
                variant === "dark"
                  ? "bg-secondary/80 text-foreground"
                  : "bg-slate-100 text-slate-900",
                c,
              )}
            >
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
