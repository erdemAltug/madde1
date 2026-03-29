"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { countSensitivePatterns } from "@/lib/security/mask-sensitive";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSample: () => void;
  disabled?: boolean;
  compact?: boolean;
  /** Yapıştırılan metinde TC / telefon vb. algılanırsa */
  onSensitivePaste?: (detectedPatternCount: number) => void;
};

export function ContractInputPanel({
  value,
  onChange,
  onSample,
  disabled,
  compact,
  onSensitivePaste,
}: Props) {
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onFile = (file: File) => {
    if (!file.type.startsWith("text/") && !file.name.endsWith(".txt")) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const t = typeof reader.result === "string" ? reader.result : "";
      onChange(t);
    };
    reader.readAsText(file);
  };

  return (
    <motion.div
      layout
      className="flex h-full min-h-0 flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Label htmlFor="contract" className="text-base font-semibold text-slate-900">
            Sözleşme metni
          </Label>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Türkçe sözleşmenizi yapıştırın veya .txt dosyası sürükleyin.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onSample}
          disabled={disabled}
        >
          Örnek Sözleşme Analiz Et
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".txt,text/plain"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />

      <div
        className={cn(
          "relative flex min-h-0 flex-1 rounded-lg border-2 border-dashed transition-colors",
          drag ? "border-mint-500/70 bg-mint-50/50" : "border-slate-200",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
      >
        <Textarea
          id="contract"
          data-ph-mask
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={(e) => {
            const clip = e.clipboardData?.getData("text/plain") ?? "";
            if (!clip.trim() || !onSensitivePaste) return;
            const n = countSensitivePatterns(clip);
            if (n > 0) onSensitivePaste(n);
          }}
          disabled={disabled}
          placeholder="Kiracıyım, ev sahibim beni çıkarıyor. Hangi haklarım var?"
          className={
            compact
              ? "min-h-[180px] flex-1 resize-none border-0 bg-transparent text-sm placeholder:text-slate-400 focus-visible:ring-0"
              : "min-h-[288px] flex-1 resize-none border-0 bg-transparent text-sm placeholder:text-slate-400 focus-visible:ring-0"
          }
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-500 backdrop-blur hover:bg-slate-50 hover:text-slate-700"
        >
          <FileUp className="h-3.5 w-3.5" />
          Dosya yükle
        </button>
      </div>
    </motion.div>
  );
}
