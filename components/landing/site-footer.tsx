import Link from "next/link";
import { ClauseLogo } from "@/components/brand/clause-logo";
import { ModelProviderLogos } from "@/components/landing/model-provider-logos";
import { FREE_TOOLS_NAV } from "@/lib/seo/free-tools-routes";
import { SITE_HOST } from "@/lib/seo/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div>
          <ClauseLogo withWordmark size={32} />
          <p className="mt-2 max-w-xs text-sm font-medium text-slate-600">
            Ücretsiz özet, şeffaf fiyatlar, TBK odaklı ön analiz.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm">
          <nav aria-label="Ücretsiz araçlar" className="space-y-2">
            <p className="font-semibold text-slate-900">Ücretsiz araçlar</p>
            <ul className="space-y-1.5">
              {FREE_TOOLS_NAV.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="block text-slate-600 hover:text-madde-blue"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#ucretsiz-araclar"
              className="block pt-1 text-xs font-semibold text-madde-blue hover:underline"
            >
              Bento ızgarasına git
            </Link>
          </nav>
          <div className="space-y-2">
            <p className="font-semibold text-slate-900">Ürün</p>
            <Link
              href="/#ozellikler"
              className="block text-slate-600 hover:text-madde-blue"
            >
              Özellikler
            </Link>
            <Link
              href="/#fiyatlandirma"
              className="block text-slate-600 hover:text-madde-blue"
            >
              Fiyatlandırma
            </Link>
            <Link
              href="/analiz/kira-sozlesmesi"
              className="block text-slate-600 hover:text-madde-blue"
            >
              Kira analizi
            </Link>
            <Link
              href="/blog"
              className="block text-slate-600 hover:text-madde-blue"
            >
              Blog
            </Link>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-slate-900">Yasal</p>
            <Link
              href="/guvenlik"
              className="block text-slate-600 hover:text-madde-blue"
            >
              Gizlilik ve güvenlik
            </Link>
            <span className="block text-slate-600">Kullanım şartları</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-100 px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-slate-500">
            Model altyapısı
          </p>
          <p className="mx-auto mt-2 max-w-lg text-xs font-medium text-slate-600">
            OpenAI, Claude ve Groq üzerinde çalışan yapı; görev ve yük durumuna
            göre model seçimi değişebilir.
          </p>
          <ModelProviderLogos className="mt-8" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-[#0f766e]/20 bg-[#f0fdf4]/80 px-4 py-3 text-center">
          <p className="text-xs font-semibold leading-relaxed text-[#0a1628]">
            Clause, sözleşme metninizi analiz akışı sonrasında kalıcı olarak
            saklamaz ve üçüncü taraflarla pazarlama amacıyla paylaşmaz. Ayrıntılar{" "}
            <Link href="/guvenlik" className="text-[#0f766e] underline-offset-2 hover:underline">
              güvenlik sayfamızda
            </Link>
            .
          </p>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Powered by {SITE_HOST} — Yapay Zeka Hukuk Asistanı
        </p>
        <p className="mt-1 text-center text-xs text-slate-500">
          Clause — ön analiz aracıdır; hukuki danışmanlık yerine geçmez.
        </p>
      </div>
    </footer>
  );
}
