import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_TEXT =
  "Bu rapor yapay zeka tarafından üretilmiştir ve hukuki danışmanlık yerine geçmez. Kritik kararlar için lütfen bir avukata danışın.";

type Props = {
  className?: string;
  variant?: "panel" | "inline";
};

export function LegalAiDisclaimer({
  className,
  variant = "panel",
}: Props) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-2.5 rounded-lg border border-slate-200/90 bg-slate-50/90 text-slate-800",
        variant === "panel" ? "px-3 py-2.5" : "px-2.5 py-2",
        className,
      )}
    >
      <Scale
        className="mt-0.5 h-4 w-4 shrink-0 text-[#0f766e]"
        aria-hidden
      />
      <p className="text-[11px] font-medium leading-relaxed tracking-tight sm:text-xs">
        {DEFAULT_TEXT}
      </p>
    </div>
  );
}
