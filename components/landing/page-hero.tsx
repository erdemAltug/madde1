import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

type Crumb = { name: string; href: string };

/** İç sayfa başlığı — landing ile aynı sıcak dil: krem zemin, amber etiket, net başlık, gündelik soru çipleri */
export function PageHero({
  crumbs,
  eyebrow,
  emoji,
  title,
  lede,
  chips,
}: {
  crumbs?: Crumb[];
  eyebrow: string;
  emoji?: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  chips?: { label: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#FAFAF7]">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-12 lg:px-8">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <div className="max-w-2xl">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-900">
            {emoji ? <span aria-hidden>{emoji}</span> : null}
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2.6rem] sm:leading-[1.12]">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{lede}</p>
          {chips?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Sık aranan konular">
              {chips.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-[#005BEA]/50 hover:text-[#005BEA]"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
