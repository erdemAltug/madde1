import Link from "next/link";
import { Calculator, FileSearch, Scale, BookOpen } from "lucide-react";
import { FREE_TOOLS_NAV } from "@/lib/seo/free-tools-routes";
import { getRelatedLinksForSozlesme } from "@/lib/seo/internal-links";
import { cn } from "@/lib/utils";

const ANALIZ_LINKS = [
  {
    href: "/analiz/kira-sozlesmesi",
    label: "Kira sözleşmesi AI analizi",
    desc: "TBK risk taraması ve özet.",
  },
  {
    href: "/analiz/is-sozlesmesi",
    label: "İş sözleşmesi risk analizi",
    desc: "Fesih ve ücret maddeleri.",
  },
  {
    href: "/analiz/ticari-sozlesme",
    label: "Ticari sözleşme ön tarama",
    desc: "KOBİ ve tedarik sözleşmeleri.",
  },
] as const;

export function RelatedToolsSection({
  className,
  headingId = "ilgili-araclar",
  slug,
}: {
  className?: string;
  headingId?: string;
  /** /sozlesme-analizi/[slug] için konuya özel rehber bağlantıları */
  slug?: string;
}) {
  const topicLinks = slug ? getRelatedLinksForSozlesme(slug).slice(0, 4) : [];
  return (
    <section
      className={cn("border-t border-slate-200 bg-slate-50/40", className)}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2
          id={headingId}
          className="text-xl font-extrabold tracking-tight text-madde-ink"
        >
          İlgili ücretsiz araçlar ve analiz sayfaları
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-medium text-slate-600">
          Dahili bağlantılar: hesaplayıcılardan tam yapay zeka sözleşme analizine
          geçin; kira sözleşmesi riskleri için önce özet, sonra detay.
        </p>

        {topicLinks.length > 0 ? (
          <div className="mt-6">
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#005BEA]">
              <BookOpen className="h-4 w-4" aria-hidden />
              İlgili rehberler
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {topicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#005BEA]/40 hover:text-[#005BEA]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#005BEA]">
              <Calculator className="h-4 w-4" aria-hidden />
              Ücretsiz araçlar
            </h3>
            <ul className="mt-3 space-y-2">
              {FREE_TOOLS_NAV.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="group block rounded-lg border border-slate-200/80 bg-white px-3 py-2.5 text-sm font-semibold text-madde-ink shadow-sm transition hover:border-[#005BEA]/30 hover:shadow-md"
                  >
                    <span className="text-[#005BEA] group-hover:underline">
                      {t.label}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-slate-500">
                      {t.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#005BEA]">
              <FileSearch className="h-4 w-4" aria-hidden />
              Popüler analiz sayfaları
            </h3>
            <ul className="mt-3 space-y-2">
              {ANALIZ_LINKS.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="group flex items-start gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-2.5 text-sm font-semibold text-madde-ink shadow-sm transition hover:border-[#005BEA]/30 hover:shadow-md"
                  >
                    <Scale
                      className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                      aria-hidden
                    />
                    <span>
                      <span className="text-[#005BEA] group-hover:underline">
                        {a.label}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-slate-500">
                        {a.desc}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-medium text-slate-500">
              Ana sayfa:{" "}
              <Link href="/" className="font-semibold text-[#005BEA] hover:underline">
                Clause — sözleşme analizi
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
