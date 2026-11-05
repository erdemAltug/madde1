import Link from "next/link";
import { ArrowRight, Calculator, GitCompare, Reply, Scale, TrendingUp, Wallet } from "lucide-react";

const DOORS = [
  {
    href: "/haklarim/kontrol",
    icon: Scale,
    title: "Haklarım Kontrolü",
    text: "İşten çıkarıldım, ev sahibi çıkın diyor… 5 soruda hak, alacak ve süre.",
  },
  {
    href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    icon: TrendingUp,
    title: "Kira zammı yasal mı?",
    text: "İstenen artışı bu yılın yasal tavanıyla karşılaştırın.",
  },
  {
    href: "/araclar/kidem-tazminati-hesaplama",
    icon: Wallet,
    title: "Kıdem tazminatı",
    text: "Güncel tavanla ne kadar alacağınızı hesaplayın.",
  },
  {
    href: "/cevap-taslagi",
    icon: Reply,
    title: "Karşı tarafa cevap",
    text: "Ev sahibine, işverene, müşteriye gönderilmeye hazır mesaj.",
  },
  {
    href: "/karsilastir",
    icon: GitCompare,
    title: "Yeni sürümde ne değişti?",
    text: "Eski ve yeni sözleşmeyi karşılaştırın, değişen maddeleri görün.",
  },
  {
    href: "/araclar",
    icon: Calculator,
    title: "Tüm ücretsiz araçlar",
    text: "İhbar, fazla mesai, yıllık izin, brüt-net, işsizlik maaşı.",
  },
] as const;

/** Ücretsiz araçlar ve Haklarım: hesaplayıcılar sayfaya gömülü değil, kart olarak — sayfa kısa kalır. */
export function LandingDoors() {
  return (
    <section className="border-b border-slate-200/70 bg-[#FAFAF7] py-14 sm:py-20" aria-labelledby="kapilar-baslik">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="kapilar-baslik" className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Ücretsiz hukuk araçları
        </h2>
        <p className="mt-2 text-base text-slate-600">Hesaplayın, kontrol edin, cevabınızı hazırlayın. Hepsi ücretsiz, kayıt gerekmez.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOORS.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="group flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-[#005BEA]/40 hover:shadow-md sm:p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#005BEA]/10 text-[#005BEA]">
                  <d.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 text-base font-semibold text-slate-900">
                    {d.title}
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#005BEA] transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                  <span className="mt-1 block text-[15px] leading-snug text-slate-600">{d.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
