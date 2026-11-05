import Link from "next/link";
import { ArrowRight, BookOpenCheck, FileSearch, MessageSquareText, PenLine, ShieldCheck } from "lucide-react";

/** Gerçek cevap hattı (lib/asistan/answer.ts): plan → bul → yaz → doğrula */
const PIPELINE = [
  {
    icon: MessageSquareText,
    title: "Sorunuzu anlarız",
    body: "Durumunuzun hangi kanunlara dokunduğunu belirleriz: kira mı, iş mi, icra mı, tüketici mi.",
  },
  {
    icon: FileSearch,
    title: "İlgili maddeleri buluruz",
    body: "14 temel kanunun 4.800'ü aşkın maddesi içinden, sizin durumunuza uyanları resmi metinden çekeriz.",
  },
  {
    icon: PenLine,
    title: "Sade bir cevap yazarız",
    body: "Önce net sonuç, sonra adım adım ne yapacağınız. Hukuk dili değil, gündelik Türkçe.",
  },
  {
    icon: BookOpenCheck,
    title: "Alıntıyı kontrol ederiz",
    body: "Cevaptaki her kanun alıntısını resmi metinle karşılaştırırız; tutmayan alıntı düzeltilir.",
  },
];

export function LandingHowWeWork() {
  return (
    <section aria-labelledby="clause-hakkinda" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Biz kimiz */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#005BEA]/[0.07] px-3 py-1 text-xs font-semibold text-[#005BEA] ring-1 ring-[#005BEA]/15">
              <span className="h-1.5 w-1.5 rounded-full bg-[#005BEA]" aria-hidden />
              Clause hakkında
            </p>
            <h2
              id="clause-hakkinda"
              className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[2.6rem]"
            >
              Hukuku, ihtiyacı olan{" "}
              <span className="bg-gradient-to-r from-[#005BEA] via-indigo-500 to-sky-500 bg-clip-text text-transparent">
                herkesin anlayabileceği
              </span>{" "}
              hale getiriyoruz.
            </h2>
          </div>
          <div className="space-y-4 text-[17px] leading-relaxed text-slate-600 lg:pt-9">
            <p>
              Bir kira sözleşmesini imzalamadan önce, işten çıkarıldığınız akşam ya da kapınıza bir ödeme emri
              geldiğinde aklınıza gelen ilk soru aynıdır: <em className="text-slate-900">&ldquo;Şimdi ne yapmalıyım?&rdquo;</em>
            </p>
            <p>
              Clause bu soruya kanunun kendisiyle cevap veren bir hukuk asistanıdır. Haklarınızı öğrenmenize,
              sözleşmenizi anlamanıza ve doğru adımı atmanıza yardım eder. Gerektiğinde de sizi bir avukata hazırlıklı
              gönderir.
            </p>
          </div>
        </div>

        {/* Nasıl çalışıyoruz */}
        <div className="relative mt-16 overflow-hidden rounded-3xl bg-[#0B1B3A] text-white shadow-2xl shadow-[#0B1B3A]/25 ring-1 ring-white/5">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#005BEA]/40 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
          />
          <div className="relative flex flex-col gap-2 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-8">
            <div>
              <p className="text-sm font-semibold text-sky-300">Bir cevap nasıl hazırlanır</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Her soru dört adımdan geçer</h3>
            </div>
            <p className="flex w-fit items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-200 ring-1 ring-emerald-400/20">
              <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden />
              Kaynak: mevzuat.gov.tr resmi metinleri
            </p>
          </div>

          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map((s, i) => (
              <li
                key={s.title}
                className="group relative border-white/10 px-6 py-8 transition-colors duration-300 hover:bg-white/[0.04] sm:px-8 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:[&:not(:last-child)]:border-r"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#005BEA] to-indigo-500 text-white shadow-lg shadow-[#005BEA]/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <s.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-mono text-xs font-semibold tabular-nums text-slate-500">0{i + 1}</span>
                  {i < PIPELINE.length - 1 ? (
                    <span aria-hidden className="ml-auto hidden h-px flex-1 bg-gradient-to-r from-sky-400/50 to-transparent lg:block" />
                  ) : (
                    <span aria-hidden className="ml-auto hidden h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_2px] shadow-emerald-400/60 lg:block" />
                  )}
                </div>
                <p className="mt-5 text-lg font-semibold">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
            Kimlik, telefon, IBAN ve kart numaraları yapay zekâya gönderilmeden önce maskelenir. Verilerinizi satmaz,
            reklam için kullanmayız.
          </p>
          <Link
            href="/hakkimizda"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-[#005BEA]"
          >
            Bizi daha yakından tanıyın
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
