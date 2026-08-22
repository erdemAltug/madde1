import { FileSignature, Scale, Clock, Landmark } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

const reasons = [
  {
    icon: FileSignature,
    title: "Hukuk, günlük hayatın içine girdi",
    body: "Kira sözleşmesi, işe giriş evrakı, abonelik, tüketici iadesi, tahliye taahhüdü: çoğu kişi bunları avukata göstermeden imzalıyor. Metinler uzun, dil teknik; risk ancak uyuşmazlık çıktığında görünür hale geliyor.",
  },
  {
    icon: Clock,
    title: "Süreler ve belgeler unutuluyor",
    body: "İhtar, zam bildirimi, fesih ve başvuru süreleri dakikada değil, ayda işler. Bir asistan; taranmış metinleri, notları ve önceki kontrolleri tek yerde tutarak süreci takip edilebilir kılar.",
  },
  {
    icon: Landmark,
    title: "Bilgi asimetresi kurumların lehinedir",
    body: "Karşı taraf çoğu zaman hazır şablon ve hukuk desteğiyle gelir. Bireyin aynı anda her maddeyi okuması beklenemez. Erken, sade dilde uyarı; müzakere ve gerekirse avukata gitme kararını güçlendirir.",
  },
  {
    icon: Scale,
    title: "Avukatın yerini tutmaz; hazırlar",
    body: "Clause hukuki tavsiye veya vekalet değildir. Görevi, Türkiye mevzuatı bağlamında riskleri işaretlemek, dilekçe taslağı üretmek ve kayıtlı kullanıcının geçmiş taramalarını bir envanterde tutmaktır. Kesin sonuç ve dava stratejisi uzmana aittir.",
  },
] as const;

export function LandingWhyAssistant() {
  return (
    <section
      id="neden-hukuk-asistani"
      className="border-b border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
              Ücretsiz kişisel asistan
            </p>
            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Hukuki süreçlerinizde yalnız kalmak zorunda değilsiniz
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">
              Clause, ücretsiz kişisel hukuk asistanınızdır: sözleşme taraması,
              dilekçe taslağı ve risk uyarısı hesabınızda durur. Kurumların
              hukuku ölçekli; sizin de yanınızda duran bir kontrol katmanı olsun.
              Avukatın yerini tutmaz; bilinçli adım atmanızı sağlar.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {reasons.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-7"
            >
              <item.icon
                className="h-7 w-7 text-[#005BEA]"
                aria-hidden
              />
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
