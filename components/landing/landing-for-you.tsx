import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

const ROWS = [
  ["Kimin için?", "Avukatlar, hukuk büroları", "Kiracı, çalışan, tüketici, serbest çalışan — herkes"],
  ["Nasıl konuşur?", "Hukuk dili, içtihat listeleri", "Sade Türkçe, ne yapacağınızı adım adım"],
  ["Nasıl başlarsınız?", "Demo talebi, deneme süresi", "Hemen, ücretsiz — tarama ve araçlar kayıtsız"],
  ["Fiyat", "Aylık yüzlerce lira", "Ücretsiz; isterseniz Plus"],
  ["Hesaplama araçları", "Yok", "Kıdem, ihbar, kira artışı, işsizlik maaşı…"],
  ["Sizin yerinize takip", "Yok", "Kira artışı, bildirim ve itiraz tarihlerinde hatırlatma"],
] as const;

/** Konumlanma: B2B hukuk yazılımlarından ayrıştığımız tek cümle — "sizin için" */
export function LandingForYou() {
  return (
    <section className="border-b border-slate-200/70 bg-white py-16 sm:py-20" aria-labelledby="sizin-icin-baslik">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold text-[#005BEA]">Hukuk sadece avukatların işi değil</p>
          <h2 id="sizin-icin-baslik" className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Hukuk yapay zekâları avukatlar için yapıldı. Clause sizin için.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Hayatınızdaki hukuki anların çoğu bir dava değildir: bir zam talebi, bir iş teklifi, iade edilmeyen bir
            ürün. Bunlar için avukat randevusu beklemenize gerek yok — ama yalnız da kalmamalısınız.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-[0.9fr_1fr_1.15fr] bg-slate-50 text-sm font-semibold text-slate-500 sm:text-[15px]">
              <span className="px-4 py-3.5 sm:px-6" />
              <span className="px-3 py-3.5 sm:px-6">Profesyonel hukuk yazılımları</span>
              <span className="flex items-center gap-2 bg-[#005BEA] px-3 py-3.5 text-white sm:px-6">Clause</span>
            </div>
            <dl>
              {ROWS.map(([k, them, us], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-[0.9fr_1fr_1.15fr] text-sm sm:text-[15px] ${i % 2 ? "bg-white" : "bg-[#FAFAF7]"}`}
                >
                  <dt className="px-4 py-4 font-semibold text-slate-900 sm:px-6">{k}</dt>
                  <dd className="flex items-start gap-2 px-3 py-4 text-slate-500 sm:px-6">
                    <Minus className="mt-0.5 hidden h-4 w-4 shrink-0 text-slate-300 sm:block" aria-hidden />
                    {them}
                  </dd>
                  <dd className="flex items-start gap-2 bg-[#005BEA]/[0.04] px-3 py-4 font-medium text-slate-900 sm:px-6">
                    <Check className="mt-0.5 hidden h-4 w-4 shrink-0 text-[#005BEA] sm:block" aria-hidden />
                    {us}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
