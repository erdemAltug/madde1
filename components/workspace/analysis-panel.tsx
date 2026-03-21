"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StreamingMarkdown } from "@/components/analysis/streaming-markdown";
import { LegalLoadingMessages } from "@/components/workspace/legal-loading-messages";
import { AnalysisActions } from "@/components/workspace/analysis-actions";
import { Separator } from "@/components/ui/separator";

type Props = {
  markdown: string;
  busy: boolean;
  error?: Error | null;
  sharePath?: string;
};

export function AnalysisPanel({
  markdown,
  busy,
  error,
  sharePath,
}: Props) {
  return (
    <motion.div
      layout
      className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-border/80 bg-card/40 shadow-inner backdrop-blur-sm"
    >
      <LegalLoadingMessages active={busy} />

      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Canlı analiz
          </h2>
          <p className="text-xs text-muted-foreground">
            TBK uyumlu ön değerlendirme — hukuki danışmanlık değildir.
          </p>
        </div>
        <AnalysisActions markdown={markdown} sharePath={sharePath} />
      </div>

      <ScrollArea className="min-h-0 flex-1 px-4 py-4 sm:px-5 sm:py-5">
        {error ? (
          <p className="text-sm text-destructive">
            {error.message ||
              "İstek tamamlanamadı. API anahtarlarını ve ağı kontrol edin."}
          </p>
        ) : !markdown && !busy ? (
          <p className="text-sm text-muted-foreground">
            Analiz sonuçları akış halinde burada görünecek. Sol panelden metni
            yapıştırıp &quot;Analiz Et&quot; ile başlayın.
          </p>
        ) : (
          <StreamingMarkdown content={markdown} />
        )}

        {markdown ? (
          <>
            <Separator className="my-8 bg-border/60" />
            <p className="text-center text-xs text-muted-foreground">
              Powered by Madde1.tr — Yapay Zeka Hukuk Asistanı
            </p>
          </>
        ) : null}
      </ScrollArea>
    </motion.div>
  );
}
