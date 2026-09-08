import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  /** Örn. "TBK m. 344" */
  cite: string;
  /** Mevzuat metnine dış bağlantı (isteğe bağlı) */
  href?: string;
  children: ReactNode;
  className?: string;
};

/** İçerik güvenilirliği için kanun madde alıntı bloğu */
export function StatuteCite({ cite, href, children, className }: Props) {
  return (
    <aside
      className={cn(
        "my-6 rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3.5",
        className,
      )}
    >
      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
        <BookOpen className="h-3.5 w-3.5" aria-hidden />
        Mevzuat atfı
        {href ? (
          <>
            {" · "}
            <Link
              href={href}
              className="text-[#005BEA] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {cite}
            </Link>
          </>
        ) : (
          <span className="normal-case tracking-normal text-slate-700">
            {" "}
            — {cite}
          </span>
        )}
      </p>
      <blockquote className="border-l-2 border-[#005BEA]/40 pl-3 text-sm leading-relaxed text-slate-700">
        {children}
      </blockquote>
    </aside>
  );
}
