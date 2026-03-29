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
          "max-h-[92vh] w-[95vw] max-w-4xl flex flex-col gap-0 overflow-hidden border border-slate-200/60 bg-white p-0 shadow-2xl shadow-slate-900/20 sm:rounded-xl",
        )}
      >
        <DialogHeader className="shrink-0 space-y-2 border-b border-slate-200/60 bg-white px-6 py-5 text-left">
          <ClauseLogo className="mb-1" size={36} />
          <DialogTitle className="text-3xl font-bold tracking-tight text-deep-navy">
            Sözleşme analizi
          </DialogTitle>
          <DialogDescription className="text-sm font-medium leading-relaxed text-slate-600">
            Ücretsiz güven özeti ve risk görünümü; tam analiz ve düzeltme
            önerileri{" "}
            <span className="font-semibold text-indigo-600">4,99 TL</span>{" "}
            ile açılır. Bu araç hukuki danışmanlık sunmaz.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
          <ContractAnalyzer sharePath={sharePath} compact />
        </div>
      </DialogContent>
    </Dialog>
  );
}
