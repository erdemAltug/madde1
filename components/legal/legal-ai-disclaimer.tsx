import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";

/** YMYL / E-E-A-T uyumlu varsayılan sorumluluk reddi */
export const YMYL_DISCLAIMER_TEXT =
  "Clause bir yapay zeka ön inceleme aracıdır; avukatlık veya resmi hukuki danışmanlık hizmeti vermez. Mevzuat referansları: 6098 sayılı TBK ve 4857 sayılı İş Kanunu.";

type Props = {
  className?: string;
  variant?: "panel" | "inline" | "banner";
  /** Özel metin; verilmezse YMYL varsayılanı */
  text?: string;
};

export function LegalAiDisclaimer({
  className,
  variant = "panel",
  text = YMYL_DISCLAIMER_TEXT,
}: Props) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-2.5 text-slate-800",
        variant === "banner"
          ? "rounded-md border border-amber-200/80 bg-amber-50/70 px-3 py-2"
          : "rounded-lg border border-slate-200/90 bg-slate-50/90",
        variant === "panel" && "px-3 py-2.5",
        variant === "inline" && "px-2.5 py-2",
        className,
      )}
    >
      <Scale
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          variant === "banner" ? "text-amber-800" : "text-[#0f766e]",
        )}
        aria-hidden
      />
      <p className="text-[11px] font-medium leading-relaxed tracking-tight sm:text-xs">
        {text}
      </p>
    </div>
  );
}
