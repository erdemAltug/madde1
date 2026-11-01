import { CalendarClock } from "lucide-react";
import { daysUntil } from "@/lib/assistant/date-extract";
import { cn } from "@/lib/utils";

export function formatTrDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  try {
    return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(y, m - 1, d),
    );
  } catch {
    return iso;
  }
}

export function countdownLabel(days: number): string {
  if (days < 0) return `${Math.abs(days)} gün geçti`;
  if (days === 0) return "Bugün";
  if (days === 1) return "Yarın";
  return `${days} gün kaldı`;
}

/** Kalan güne göre renk değiştiren tarih çipi: 30+ gri, 8–30 amber, 0–7 kırmızı */
export function CountdownChip({ date, className }: { date: string; className?: string }) {
  const days = daysUntil(date);
  const tone =
    days < 0
      ? "border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
      : days <= 7
        ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
        : days <= 30
          ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300"
          : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold tabular-nums",
        tone,
        className,
      )}
    >
      <CalendarClock className="h-3.5 w-3.5" aria-hidden />
      {countdownLabel(days)}
    </span>
  );
}
