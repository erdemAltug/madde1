import Link from "next/link";
import { ArrowRight, Link2 } from "lucide-react";
import type { InternalLink } from "@/lib/seo/internal-links";
import { cn } from "@/lib/utils";

type Props = {
  links: InternalLink[];
  title?: string;
  description?: string;
  className?: string;
};

export function InternalLinksSection({
  links,
  title = "İlgili rehberler ve araçlar",
  description = "Aynı konudaki diğer sayfalarımız — dahili bağlantılar ile hukuki bilgiye ulaşın.",
  className,
}: Props) {
  if (links.length === 0) return null;

  return (
    <section
      className={cn("border-t border-slate-200 bg-slate-50/50", className)}
      aria-labelledby="ic-link-baslik"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2
          id="ic-link-baslik"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-madde-ink"
        >
          <Link2 className="h-5 w-5 text-[#005BEA]" aria-hidden />
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-medium text-slate-600">{description}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full flex-col rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition hover:border-[#005BEA]/30 hover:shadow-md"
              >
                <span className="flex items-center justify-between gap-2 text-sm font-semibold text-[#005BEA] group-hover:underline">
                  {link.label}
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
                </span>
                {link.description ? (
                  <span className="mt-1 text-xs font-medium text-slate-500">
                    {link.description}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
