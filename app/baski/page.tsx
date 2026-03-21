"use client";

import * as React from "react";
import { StreamingMarkdown } from "@/components/analysis/streaming-markdown";
import { Button } from "@/components/ui/button";
import { SITE_HOST } from "@/lib/seo/site";

const KEYS = [
  "clause-analysis-markdown",
  "clause-generator-markdown",
  "madde1-analysis-markdown",
  "madde1-generator-markdown",
] as const;

export default function BaskiPage() {
  const [md, setMd] = React.useState("");

  React.useEffect(() => {
    try {
      for (const k of KEYS) {
        const v = sessionStorage.getItem(k);
        if (v) {
          setMd(v);
          return;
        }
      }
      setMd("");
    } catch {
      setMd("");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 print:bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10 print:py-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <h1 className="font-serif text-xl font-semibold text-slate-900">
            Clause — Analiz çıktısı
          </h1>
          <Button type="button" onClick={() => window.print()}>
            Yazdır / PDF
          </Button>
        </div>
        {md ? (
          <StreamingMarkdown content={md} variant="light" className="print:prose-sm" />
        ) : (
          <p className="text-sm text-slate-600 print:hidden">
            Yazdırma için önce ana ekrandan &quot;PDF / Yazdır&quot; ile bu sayfayı
            açın.
          </p>
        )}
        <p className="mt-12 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
          Powered by {SITE_HOST} — Yapay Zeka Hukuk Asistanı
        </p>
      </div>
    </div>
  );
}
