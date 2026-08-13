"use client";

import * as React from "react";
import { Copy, Link2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "clause-analysis-markdown";

type Props = {
  markdown: string;
  sharePath?: string;
  /** Misafir PDF indirmesini AuthModal'a yönlendirmek için */
  onPdfClick?: () => boolean | void;
};

export function AnalysisActions({
  markdown,
  sharePath = "/analiz/kira-sozlesmesi",
  onPdfClick,
}: Props) {
  const [copied, setCopied] = React.useState<"md" | "link" | null>(null);

  const copyMd = async () => {
    if (!markdown.trim()) return;
    await navigator.clipboard.writeText(markdown);
    setCopied("md");
    window.setTimeout(() => setCopied(null), 2000);
  };

  const copyLink = async () => {
    const url = `${window.location.origin}${sharePath}`;
    await navigator.clipboard.writeText(url);
    setCopied("link");
    window.setTimeout(() => setCopied(null), 2000);
  };

  const openPrint = () => {
    if (onPdfClick?.() === false) return;
    if (!markdown.trim()) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, markdown);
    } catch {
      return;
    }
    window.open("/baski", "_blank", "noopener,noreferrer");
  };

  const hasContent = markdown.trim().length > 0;

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={!hasContent}
        onClick={() => void copyMd()}
      >
        <Copy className="h-4 w-4" />
        {copied === "md" ? "Kopyalandı" : "Analizi Kopyala"}
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => void copyLink()}
      >
        <Link2 className="h-4 w-4" />
        {copied === "link" ? "Bağlantı kopyalandı" : "Araç Bağlantısı"}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!hasContent}
        onClick={openPrint}
      >
        <Printer className="h-4 w-4" />
        PDF / Yazdır
      </Button>
    </div>
  );
}
