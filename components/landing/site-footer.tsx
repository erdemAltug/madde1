import Link from "next/link";
import { ClauseLogo } from "@/components/brand/clause-logo";
import { ModelProviderLogos } from "@/components/landing/model-provider-logos";
import { FREE_TOOLS_NAV } from "@/lib/seo/free-tools-routes";
import { TrendingUp } from "lucide-react";

const POPULAR_SEARCHES = [
  { label: "Kira Tahliye Analizi", href: "/araclar/tahliye-taahhutnamesi-kontrolu" },
  { label: "Kıdem Tazminatı Hesaplama", href: "/#fiyatlandirma" },
  { label: "Kira Artış Oranı", href: "/araclar/kira-artis-hesaplama" },
  { label: "Damga Vergisi", href: "/araclar/damga-vergisi-hesaplama" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Popular Searches */}
        <div className="mb-8 pb-8 border-b border-slate-200/60">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-4">
            Popüler Hukuki Aramalar
          </p>
          <div className="flex flex-wrap gap-3">
            {POPULAR_SEARCHES.map((search) => (
              <Link
                key={search.href}
                href={search.href}
                prefetch={true}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-slate-200"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                {search.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <ClauseLogo withWordmark size={32} />
            <p className="mt-2 max-w-xs text-sm text-slate-600 font-medium">
              Yapay zeka destekli hukuki analiz platformu. Veriye dayalı strateji ve içtihat desteği.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            <nav aria-label="Ücretsiz araçlar" className="space-y-2">
              <p className="font-bold text-deep-navy">Ücretsiz Araçlar</p>
              <ul className="space-y-1.5">
                {FREE_TOOLS_NAV.map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} prefetch={true} className="text-slate-600 font-medium hover:text-deep-navy">
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-2">
              <p className="font-bold text-deep-navy">Platform</p>
              <Link href="/#ozellikler" prefetch={true} className="block text-slate-600 font-medium hover:text-deep-navy">
                Özellikler
              </Link>
              <Link href="/#fiyatlandirma" prefetch={true} className="block text-slate-600 font-medium hover:text-deep-navy">
                Fiyatlandırma
              </Link>
              <Link href="/analiz/kira-sozlesmesi" prefetch={true} className="block text-slate-600 font-medium hover:text-deep-navy">
                Kira Analizi
              </Link>
              <Link href="/blog" prefetch={true} className="block text-slate-600 font-medium hover:text-deep-navy">
                Blog
              </Link>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-deep-navy">İletişim</p>
              <a href="mailto:tryclauseai@gmail.com" className="block text-slate-600 font-medium hover:text-deep-navy">
                tryclauseai@gmail.com
              </a>
              <Link href="/guvenlik" prefetch={true} className="block text-slate-600 font-medium hover:text-deep-navy">
                Gizlilik ve Güvenlik
              </Link>
              <span className="block text-slate-600 font-medium">Kullanım Şartları</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-200/60 px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Teknoloji Altyapısı
          </p>
          <p className="mx-auto mt-2 max-w-lg text-xs text-slate-600 font-medium">
            OpenAI, Claude ve Groq üzerinde çalışan yapay zeka altyapısı.
          </p>
          <ModelProviderLogos className="mt-6" />
        </div>
        
        <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-slate-200/60 bg-white px-4 py-3 text-center">
          <p className="text-xs text-slate-600 font-medium">
            clause.ai, sözleşme metinlerini analiz sonrası kalıcı olarak saklamaz ve üçüncü taraflarla paylaşmaz.{" "}
            <Link href="/guvenlik" prefetch={true} className="text-indigo-600 font-semibold underline-offset-2 hover:underline">
              Güvenlik Politikamız
            </Link>
          </p>
        </div>
        
        <p className="mt-6 text-center text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} clause.ai — Yapay Zeka Hukuk Asistanı
        </p>
        <p className="mt-1 text-center text-xs text-slate-400 font-medium">
          clause.ai, hukuki danışmanlık yerine geçmez. Kesin sonuç için avukata danışınız.
        </p>
      </div>
    </footer>
  );
}
