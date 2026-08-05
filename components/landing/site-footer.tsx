import Link from "next/link";
import { ClauseLogo } from "@/components/brand/clause-logo";
import { ModelProviderLogos } from "@/components/landing/model-provider-logos";
import { FREE_TOOLS_NAV } from "@/lib/seo/free-tools-routes";
import {
  REHBER_HUB_LINKS,
  SOZLESME_ANALIZI_FEATURED,
  HUKUKI_ANALIZ_LINKS,
  YAPAY_ZEKA_HUKUK_LINKS,
} from "@/lib/seo/internal-links";
import { TrendingUp } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site/contact";

const POPULAR_SEARCHES = [
  {
    label: "Yapay zeka hukuk asistanı",
    href: "/yapay-zeka-hukuk/yapay-zeka-hukuk-asistani",
  },
  {
    label: "Yapay zeka sözleşme analizi",
    href: "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
  },
  {
    label: "Kira artış hesaplama",
    href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  },
  {
    label: "Tahliye taahhütnamesi kontrol",
    href: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
  },
  {
    label: "Kiracı hakları rehberi",
    href: "/rehber/kiraci-haklari",
  },
  {
    label: "İşten çıkarılınca ne yapılır?",
    href: "/rehber/isten-cikarilinca-ne-yapilir",
  },
  {
    label: "Kira sözleşmesi analizi",
    href: "/sozlesme-analizi/kira-sozlesmesi-analizi",
  },
  {
    label: "Kıdem tazminatı hesaplama",
    href: "/araclar/kidem-tazminati-hesaplama",
  },
  {
    label: "İşten atıldım haklarım",
    href: "/haklarim/isten-atildim-haklarim",
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-slate-200/60 pb-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-500">
            Popüler hukuki aramalar
          </p>
          <div className="flex flex-wrap gap-3">
            {POPULAR_SEARCHES.map((search) => (
              <Link
                key={search.href}
                href={search.href}
                prefetch={true}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                {search.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <ClauseLogo withWordmark size={32} />
            <p className="mt-2 max-w-xs text-sm font-medium text-slate-600">
              Herkes için yapay zeka destekli sözleşme ön kontrolü. Avukat yerine geçmez;
              bilinçli karar için ilk adım.
            </p>
          </div>

          <div className="grid flex-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-5">
            <nav aria-label="Ücretsiz araçlar" className="space-y-2">
              <p className="font-bold text-deep-navy">Ücretsiz araçlar</p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/araclar"
                    prefetch={true}
                    className="font-semibold text-madde-blue hover:underline"
                  >
                    Tüm araçlar
                  </Link>
                </li>
                {FREE_TOOLS_NAV.map((t) => (
                  <li key={t.href}>
                    <Link
                      href={t.href}
                      prefetch={true}
                      className="text-slate-600 font-medium hover:text-deep-navy"
                    >
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Hukuk rehberleri" className="space-y-2">
              <p className="font-bold text-deep-navy">Hukuk rehberleri</p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/gunluk-hukuk"
                    prefetch={true}
                    className="font-semibold text-madde-blue hover:underline"
                  >
                    Günlük hukuk merkezi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rehber"
                    prefetch={true}
                    className="font-semibold text-madde-blue hover:underline"
                  >
                    Tüm rehberler
                  </Link>
                </li>
                {REHBER_HUB_LINKS.slice(0, 12).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="text-slate-600 font-medium hover:text-deep-navy"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Yapay zeka hukuk" className="space-y-2">
              <p className="font-bold text-deep-navy">Yapay zeka hukuk</p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/yapay-zeka-hukuk"
                    prefetch={true}
                    className="font-semibold text-madde-blue hover:underline"
                  >
                    Tüm AI rehberleri
                  </Link>
                </li>
                {YAPAY_ZEKA_HUKUK_LINKS.slice(0, 5).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="text-slate-600 font-medium hover:text-deep-navy"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Sözleşme analizi" className="space-y-2">
              <p className="font-bold text-deep-navy">Sözleşme analizi</p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/sozlesme-analizi"
                    prefetch={true}
                    className="font-semibold text-madde-blue hover:underline"
                  >
                    Tüm analiz türleri
                  </Link>
                </li>
                {SOZLESME_ANALIZI_FEATURED.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="text-slate-600 font-medium hover:text-deep-navy"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-2">
              <p className="font-bold text-deep-navy">Platform</p>
              <Link
                href="/hukuki-analiz"
                prefetch={true}
                className="block text-slate-600 font-medium hover:text-deep-navy"
              >
                Hukuki konular
              </Link>
                {HUKUKI_ANALIZ_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className="block text-slate-600 font-medium hover:text-deep-navy"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#ozellikler"
                prefetch={true}
                className="block text-slate-600 font-medium hover:text-deep-navy"
              >
                Özellikler
              </Link>
              <Link
                href="/blog"
                prefetch={true}
                className="block text-slate-600 font-medium hover:text-deep-navy"
              >
                Blog
              </Link>
              <Link
                href="/hakkimizda"
                prefetch={true}
                className="block text-slate-600 font-medium hover:text-deep-navy"
              >
                Hakkımızda
              </Link>
              <Link
                href="/gizlilik"
                prefetch={true}
                className="block text-slate-600 font-medium hover:text-deep-navy"
              >
                Gizlilik politikası
              </Link>
              <Link
                href="/guvenlik"
                prefetch={true}
                className="block text-slate-600 font-medium hover:text-deep-navy"
              >
                Güvenlik ve KVKK
              </Link>
              <p className="pt-2 font-bold text-deep-navy">İletişim</p>
              <span className="block text-slate-600 font-medium">
                {CONTACT_EMAIL}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-200/60 px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Teknoloji altyapısı
          </p>
          <p className="mx-auto mt-2 max-w-lg text-xs font-medium text-slate-600">
            OpenAI, Claude ve Groq üzerinde çalışan yapay zeka altyapısı.
          </p>
          <ModelProviderLogos className="mt-6" />
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-slate-200/60 bg-white px-4 py-3 text-center">
          <p className="text-xs font-medium text-slate-600">
            Clause, sözleşme metinlerini analiz sonrası kalıcı olarak saklamaz ve üçüncü
            taraflarla paylaşmaz.{" "}
            <Link
              href="/guvenlik"
              prefetch={true}
              className="font-semibold text-indigo-600 underline-offset-2 hover:underline"
            >
              Güvenlik politikamız
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs font-medium text-slate-500">
          © {new Date().getFullYear()} Clause — yapay zeka hukuk asistanı
        </p>
        <p className="mt-1 text-center text-xs font-medium text-slate-400">
          Clause hukuki danışmanlık yerine geçmez. Kesin sonuç için avukata danışınız.
        </p>
      </div>
    </footer>
  );
}
