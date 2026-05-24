import Link from "next/link";
import { Scale, ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { HUKUKI_ANALIZ_LINKS } from "@/lib/seo/internal-links";
import {
  HUKUKI_ANALIZ_SLUGS,
  getHukukiAnalizConfig,
} from "@/lib/seo/hukuki-analiz-pages";

export default function HukukiAnalizHubPage() {
  const topics = HUKUKI_ANALIZ_SLUGS.map((slug) => getHukukiAnalizConfig(slug)).filter(
    Boolean,
  );

  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs items={[{ name: "Hukuki konular", href: "/hukuki-analiz" }]} />
        <header className="max-w-2xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Hukuki konular — günlük hayattaki sorunlarınız için
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Kira, iş ve sözleşme kaynaklı sorunları hukuki jargon olmadan özetliyoruz. Her
            sayfa ilgili ücretsiz araç ve sözleşme analizine bağlanır.
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {topics.map((topic) =>
            topic ? (
              <li key={topic.slug}>
                <Link
                  href={`/hukuki-analiz/${topic.slug}`}
                  className="group flex gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-[#005BEA]/30 hover:shadow-md"
                >
                  <Scale className="h-6 w-6 shrink-0 text-[#005BEA]" aria-hidden />
                  <div>
                    <h2 className="font-bold text-madde-ink group-hover:text-[#005BEA]">
                      {topic.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">{topic.metaDescription}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#005BEA]">
                      Oku
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </li>
            ) : null,
          )}
        </ul>

        <div className="mt-12 flex flex-wrap gap-2">
          {HUKUKI_ANALIZ_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-[#005BEA]"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
