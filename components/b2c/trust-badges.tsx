import { CreditCard, Scale, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
  { icon: Zap, text: "Anında analiz — metni yapıştırın, sonuçlar akışla gelsin" },
  {
    icon: Scale,
    text: "Mevzuata duyarlı bilgilendirme; hukuki danışmanlık ve mahkeme sonucu vaat etmez",
  },
  {
    icon: CreditCard,
    text: "Ödeme, güvenli ödeme altyapısı üzerinden (yakında aktif)",
  },
];

/** Modal ve dar alanlar için kısa satırlar */
const COMPACT_ITEMS = [
  {
    icon: Zap,
    text: "Metni yapıştırın veya dosya yükleyin; analiz hemen başlar",
  },
  {
    icon: Scale,
    text: "Bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez",
  },
  
];

type Props = {
  className?: string;
  /** Analiz modalı gibi dar yerlerde daha kısa metin */
  compact?: boolean;
};

export function TrustBadges({ className, compact = false }: Props) {
  const items = compact ? COMPACT_ITEMS : DEFAULT_ITEMS;
  return (
    <ul
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-mint-50/40 px-3 py-3 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2 sm:px-4",
        compact && "gap-2.5 py-2.5 sm:flex-col sm:items-stretch",
        className,
      )}
    >
      {items.map(({ icon: Icon, text }) => (
        <li
          key={text}
          className="flex min-w-0 items-start gap-2.5 text-xs font-medium leading-snug text-slate-600 sm:min-w-[200px] sm:max-w-[340px]"
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-mint-100 text-navy-700 border border-mint-200/50">
            <Icon className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}
