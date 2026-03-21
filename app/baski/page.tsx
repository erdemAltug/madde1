"use client";

import * as React from "react";
import { StreamingMarkdown } from "@/components/analysis/streaming-markdown";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "madde1-analysis-markdown";

export default function BaskiPage() {
  const [md, setMd] = React.useState("");

  React.useEffect(() => {
    try {
      const v = sessionStorage.getItem(STORAGE_KEY);
      setMd(v || "");
    } catch {
      setMd("");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 print:bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10 print:py-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <h1 className="font-serif text-xl font-semibold text-slate-900">
            Madde1 — Analiz çıktısı
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
          Powered by Madde1.tr — Yapay Zeka Hukuk Asistanı
        </p>
      </div>
    </div>
  );
}
