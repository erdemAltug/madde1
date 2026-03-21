"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClauseLogo } from "@/components/brand/clause-logo";
import { ContractAnalyzer } from "@/components/clause/ContractAnalyzer";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sharePath?: string;
};

export function ContractAnalyzerModal({
  open,
  onOpenChange,
  sharePath = "/analiz/kira-sozlesmesi",
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-[min(96vw,1280px)] flex-col gap-0 overflow-hidden border border-slate-200/90 bg-white p-0 shadow-2xl shadow-slate-900/20 sm:rounded-2xl",
          "left-1/2 top-2 translate-x-[-50%] translate-y-0 sm:top-[50%] sm:max-h-[min(92dvh,900px)] sm:translate-y-[-50%]",
        )}
      >
        <DialogHeader className="shrink-0 space-y-2 border-b border-slate-200/70 bg-white px-4 py-4 pr-12 text-left sm:px-6 sm:py-5 sm:pr-14">
          <ClauseLogo className="mb-1" size={36} />
          <DialogTitle className="text-lg font-bold tracking-tight text-madde-ink sm:text-xl">
            Sözleşme analizi
          </DialogTitle>
          <DialogDescription className="text-xs font-medium leading-relaxed text-slate-600 sm:text-sm">
            Ücretsiz güven özeti ve risk görünümü; tam analiz ve düzeltme
            önerileri{" "}
            <span className="font-semibold text-madde-blue">4,99 TL</span>{" "}
            ile açılır. Bu araç hukuki danışmanlık sunmaz.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-3 py-3 sm:px-6 sm:py-5">
          <ContractAnalyzer sharePath={sharePath} compact />
        </div>
      </DialogContent>
    </Dialog>
  );
}
