import Link from "next/link";
import { Scale, ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { HAKLARIM_SLUGS, getHaklarimConfig } from "@/lib/seo/haklarim-pages";

export default function HaklarimHubPage() {
  const pages = HAKLARIM_SLUGS.map((slug) => getHaklarimConfig(slug)).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumbs items={[{ name: "Haklarım", href: "/haklarim" }]} />
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Senaryoya göre haklar
          </p>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Haklarım — günlük hukuk senaryoları
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            &quot;İşten atıldım haklarım ne?&quot;, &quot;depozito iade hakkım&quot; gibi aramalara
            net yanıt. Bilgilendirme amaçlıdır; dava ve icra için avukata danışın.
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) =>
            page ? (
              <li key={page.slug}>
                <Link
                  href={`/haklarim/${page.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-[#005BEA]/30 hover:bg-white hover:shadow-md"
                >
                  <Scale className="h-6 w-6 text-[#005BEA]" aria-hidden />
                  <h2 className="mt-3 text-lg font-bold text-madde-ink group-hover:text-[#005BEA]">
                    {page.h1.split("—")[0]?.trim() ?? page.h1}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-3">
                    {page.metaDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#005BEA]">
                    Oku
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
