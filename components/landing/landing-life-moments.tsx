import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

/** Hayatın hukuki anları — her biri o anda işe yarayan araca ya da rehbere açılır */
const MOMENTS = [
  { emoji: "🏠", when: "Ev kiralarken", what: "Sözleşmedeki tuzakları imzadan önce görün", href: "/kira-sozlesmesi-analizi" },
  { emoji: "📈", when: "Ev sahibi zam istediğinde", what: "Yasal tavanı hesaplayın, cevabınızı yazın", href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama" },
  { emoji: "📦", when: "Taşınırken", what: "Depozitonuzu geri almanın yolları", href: "/rehber/depozito-ne-kadar-alinir" },
  { emoji: "🚪", when: "Ev sahibi \"çık\" dediğinde", what: "Hangi durumda çıkmak zorundasınız?", href: "/blog/ev-sahibi-kiraciyi-cikarabilir-mi-2026" },
  { emoji: "💼", when: "İş teklifi aldığınızda", what: "Rekabet yasağı, mesai ve fesih maddeleri", href: "/is-sozlesmesi-analizi" },
  { emoji: "📉", when: "İşten çıkarıldığınızda", what: "Kıdem, ihbar, izin ve işsizlik maaşı", href: "/blog/isten-cikarilan-iscinin-haklari-2026" },
  { emoji: "🛒", when: "İade kabul edilmediğinde", what: "14 günlük cayma hakkı ve başvuru", href: "/rehber/sozlesme-iptal-cayma-farki" },
  { emoji: "📩", when: "Bir ihtarname geldiğinde", what: "Ne diyor, ne cevap vermelisiniz?", href: "/cevap-taslagi" },
] as const;

const TINTS = ["bg-amber-100", "bg-sky-100", "bg-emerald-100", "bg-rose-100", "bg-violet-100", "bg-orange-100", "bg-teal-100", "bg-indigo-100"];

export function LandingLifeMoments() {
  return (
    <section className="border-b border-slate-200/70 bg-[#FAFAF7] py-16 sm:py-20" aria-labelledby="anlar-baslik">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold text-[#005BEA]">Hayatın her anında</p>
          <h2 id="anlar-baslik" className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Hukuk, hayatınızın sıradan anlarında karşınıza çıkar
          </h2>
          <p className="mt-3 text-lg text-slate-600">Hangisini yaşıyorsunuz? Oradan başlayın.</p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MOMENTS.map((m, i) => (
            <li key={m.href}>
              <Reveal delay={0.03 * i} className="h-full">
                <Link
                  href={m.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#005BEA]/40 hover:shadow-md"
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${TINTS[i % TINTS.length]}`} aria-hidden>
                    {m.emoji}
                  </span>
                  <span className="mt-3 text-base font-bold text-slate-900">{m.when}</span>
                  <span className="mt-1 flex-1 text-[15px] leading-snug text-slate-600">{m.what}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#005BEA]">
                    Başla
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
