"use client";

import { Reveal } from "@/components/landing/reveal";

/**
 * Kimlere hitap ettiğimizi anlatan SEO dostu metinler (iç pazarlama jargonu yok).
 */
export function SeoPersonaSections() {
  return (
    <section
      id="kitleler"
      aria-labelledby="kitleler-baslik"
      className="border-t border-slate-200 bg-gradient-to-b from-slate-50/80 to-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="kitleler-baslik"
            className="text-center text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl"
          >
            Hem bireyler hem işletmeler için
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base font-medium text-slate-600">
            Aynı net arayüz: evdeki kira sözleşmesinden şirketinizin tedarik
            metnine kadar tek yerden ön kontrol.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.06}>
            <article className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-900/[0.04] sm:p-8">
              <h3 className="text-xl font-bold tracking-tight text-madde-ink">
                Bireyler ve haneler
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                Günlük hayatta{" "}
                <strong className="text-madde-ink">kira sözleşmesi kontrolü</strong>
                , yeni işe başlarken{" "}
                <strong className="text-madde-ink">
                  iş sözleşmesi fesih maddesi
                </strong>{" "}
                okumak veya tanımadığınız tarafla imza atmadan önce{" "}
                <strong className="text-madde-ink">
                  sözleşme risklerini görmek
                </strong>{" "}
                için Clause ücretsiz özet ve güven skoru sunar. Metin Türkçe;
                çıktılar anlaşılır başlıklarla gelir. Detaylı düzeltme önerileri
                ve iyileştirilmiş metin ile haklarınızı güçlendirmenize yardımcı
                olur — nihai hukuki görüş için yine de bir avukata danışmanız
                gerekir.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-madde-blue/20 bg-gradient-to-br from-madde-blue/[0.04] to-white p-6 shadow-md sm:p-8">
              <h3 className="text-xl font-bold tracking-tight text-madde-ink">
                Şirketler ve ekipler
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                <strong className="text-madde-ink">
                  Standart şablon ve tedarik sözleşmelerini hızlı ön tarama
                </strong>{" "}
                ile tek tip sürece oturtmak, hukuk ve satın alma ekiplerinin
                tekrarlayan inceleme yükünü azaltmak için uygundur.{" "}
                <strong className="text-madde-ink">
                  Küçük ve orta ölçekli işletmeler
                </strong>{" "}
                de aynı araçla maliyetleri öngörülebilir tutar. Kurumsal ölçek,
                çoklu kullanıcı veya API ihtiyacı için bizimle iletişime
                geçebilirsiniz.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
