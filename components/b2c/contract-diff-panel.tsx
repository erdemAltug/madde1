"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ReactDiffViewerStylesOverride } from "react-diff-viewer-continued";

const ReactDiffViewer = dynamic(
  () => import("react-diff-viewer-continued"),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-slate-500">Karşılaştırma yükleniyor…</p>
    ),
  },
);

/** Uzun hukuk metinlerinde satır kırılımı + tablo taşması önleme */
const diffStyles: ReactDiffViewerStylesOverride = {
  diffContainer: {
    width: "100%",
    maxWidth: "100%",
    fontSize: "13px",
    lineHeight: 1.55,
    borderRadius: "8px",
  },
  contentText: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },
  lineContent: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },
  gutter: {
    minWidth: "36px",
    flexShrink: 0,
  },
  lineNumber: {
    fontSize: "11px",
  },
};

type Props = {
  original: string;
  improved: string;
  className?: string;
};

export function ContractDiffPanel({ original, improved, className }: Props) {
  /** Geniş ekranda yan yana; dar ekranda tek sütun (satır satır +/- daha okunaklı) */
  const [split, setSplit] = React.useState(false);

  React.useEffect(() => {
    const q = window.matchMedia("(min-width: 1100px)");
    const fn = () => setSplit(q.matches);
    fn();
    q.addEventListener("change", fn);
    return () => q.removeEventListener("change", fn);
  }, []);

  const [onlyChanges, setOnlyChanges] = React.useState(false);

  if (!original.trim() || !improved.trim()) return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50/90 to-white p-4 shadow-sm",
        className,
      )}
    >
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900">
            Neyin değişti?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            {split ? (
              <>
                <span className="font-medium text-red-800">Sol</span> sütun
                önceki metin,{" "}
                <span className="font-medium text-emerald-800">sağ</span>{" "}
                sütun iyileştirilmiş hali.{" "}
                <span className="text-slate-500">
                  Vurgular, silinen veya değişen satırlar ile yeni eklenenleri
                  ayırt etmenizi sağlar.
                </span>
              </>
            ) : (
              <>
                Aşağıda satırlar tek sütunda;{" "}
                <span className="font-medium text-red-800">−</span> eski,{" "}
                <span className="font-medium text-emerald-800">+</span> yeni
                metindir. Geniş ekranda yan yana görünür.
              </>
            )}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={onlyChanges ? "default" : "outline"}
            className="h-8 text-xs font-semibold"
            onClick={() => setOnlyChanges((v) => !v)}
          >
            {onlyChanges ? "Tüm metni göster" : "Sadece değişenler"}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "max-h-[min(65vh,560px)] w-full min-w-0 overflow-auto rounded-lg border border-slate-200 bg-white",
          "[&_table]:w-full [&_table]:table-fixed",
        )}
      >
        <ReactDiffViewer
          oldValue={original}
          newValue={improved}
          splitView={split}
          leftTitle="Önceki metin"
          rightTitle="İyileştirilmiş"
          showDiffOnly={onlyChanges}
          useDarkTheme={false}
          styles={diffStyles}
          hideSummary={false}
        />
      </div>
    </div>
  );
}
