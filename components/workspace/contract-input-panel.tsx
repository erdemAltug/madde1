"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSample: () => void;
  disabled?: boolean;
};

export function ContractInputPanel({
  value,
  onChange,
  onSample,
  disabled,
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
      className="flex h-full min-h-[320px] flex-col gap-4 rounded-xl border border-border/80 bg-card/60 p-4 shadow-inner backdrop-blur-sm sm:p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Label htmlFor="contract" className="text-base text-foreground">
            Sözleşme metni
          </Label>
          <p className="mt-1 text-sm text-muted-foreground">
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
          "relative flex min-h-0 flex-1 flex-col rounded-lg border-2 border-dashed transition-colors",
          drag ? "border-primary/70 bg-primary/5" : "border-border",
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Kira, hizmet veya diğer sözleşme metninizi buraya yapıştırın…"
          className="min-h-[240px] flex-1 resize-none border-0 bg-transparent focus-visible:ring-0 sm:min-h-[360px]"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur hover:bg-secondary hover:text-secondary-foreground"
        >
          <FileUp className="h-3.5 w-3.5" />
          Dosya yükle
        </button>
      </div>
    </motion.div>
  );
}
