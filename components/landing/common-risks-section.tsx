import Link from "next/link";
import { Reveal } from "@/components/landing/reveal";

const blocks = [
  {
    title: "İşçiler için",
    items: [
      {
        q: "Rekabet yasağı maddesi nedir?",
        a: "İşten ayrıldıktan sonra belirli süre ve bölgede rakip işte çalışmamanı isteyen madde; süre ve coğrafya makul olmalı.",
      },
    ],
  },
  {
    title: "Kiracılar için",
    items: [
      {
        q: "Tahliye taahhütnamesi imzalanmalı mı?",
        a: "Genelde kiraya verenin lehine güçlü bir belgedir; imzalamadan önce metni ve sonuçlarını anlaman önemli.",
      },
    ],
  },
  {
    title: "Freelancerlar için",
    items: [
      {
        q: "Ödeme alamazsam ne yapmalıyım?",
        a: "Sözleşmedeki vade, gecikme faizi ve işi durdurma haklarını kontrol et; yazılı hatırlatma ve hukuki başvuru seçeneklerini değerlendir.",
      },
    ],
  },
];

export function CommonRisksSection() {
  return (
    <section
      id="sik-riskler"
      className="border-t border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Sık görülen riskler
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Kimsin? sorusuna göre analizde bu başlıklara daha çok odaklanıyoruz.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={0.06 * (i + 1)}>
              <div className="h-full rounded-xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-blue-900">{b.title}</h3>
                <ul className="mt-4 space-y-4">
                  {b.items.map((it) => (
                    <li key={it.q}>
                      <p className="font-semibold text-slate-900">{it.q}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {it.a}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate-600">
          Ücretsiz tarama ile kendi sözleşmende neler çıkıyor{" "}
          <Link href="/" className="font-semibold text-blue-800 underline">
            hemen dene
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
