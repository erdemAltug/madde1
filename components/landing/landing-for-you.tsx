import { Briefcase, Gavel, Home, Laptop, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

/** Konumlanma: herkes için gündelik hukuk asistanı — kimseyi dışlamadan */
const AUDIENCES = [
  { icon: Home, who: "Kiracı ve ev sahibi", what: "Kira artışı, depozito, tahliye ve sözleşme maddeleri" },
  { icon: Briefcase, who: "Çalışan", what: "Kıdem, ihbar, fazla mesai, izin ve işsizlik maaşı" },
  { icon: ShoppingBag, who: "Tüketici", what: "İade, cayma hakkı, abonelik iptali ve şikâyet" },
  { icon: Laptop, who: "Serbest çalışan", what: "Hizmet sözleşmesi, ödeme vadesi, fikri haklar" },
  { icon: Gavel, who: "Hukukçular", what: "Hızlı ön tarama ve müvekkile sade dilde özet" },
] as const;

export function LandingForYou() {
  return (
    <section className="border-b border-slate-200/70 bg-white py-16 sm:py-20" aria-labelledby="herkes-icin-baslik">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold text-[#005BEA]">Hukuk hayatın bir parçası</p>
          <h2 id="herkes-icin-baslik" className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Hukuk herkes için anlaşılır olmalı
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Hayatınızdaki hukuki anların çoğu bir dava değildir: bir zam talebi, bir iş teklifi, iade edilmeyen bir
            ürün. Clause bu anlarda ilk adımı kolaylaştırır; gerektiğinde bir hukukçuyla daha hazırlıklı görüşmenizi
            sağlar.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {AUDIENCES.map(({ icon: Icon, who, what }, i) => (
            <li key={who}>
              <Reveal delay={0.04 * i} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#FAFAF7] p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005BEA]/10 text-[#005BEA]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="mt-4 text-base font-bold text-slate-900">{who}</span>
                  <span className="mt-1 text-[15px] leading-snug text-slate-600">{what}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
