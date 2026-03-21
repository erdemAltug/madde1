import Link from "next/link";
import {
  EyeOff,
  FileKey,
  Lock,
  Server,
  ShieldCheck,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Reveal } from "@/components/landing/reveal";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: EyeOff,
    title: "Otomatik maskeleme",
    body:
      "Sistem, metindeki TC kimlik numarası, telefon, IBAN ve kart benzeri desenleri gönderimden önce [GİZLENMİŞ] ile değiştirir. İsim ve adres için de dikkatli biçimde genel öneriler sunarız; kritik belgelerde yine de manuel kontrol önerilir.",
  },
  {
    icon: Trash2,
    title: "Sıfır kalıcılık taahhüdü",
    body:
      "Sözleşme metniniz analiz akışı tamamlandıktan sonra sunucu tarafında kalıcı olarak saklanmaz. Üretilen özet ve rapor çıktıları yalnızca size gösterilir; üçüncü taraflarla pazarlama amaçlı paylaşım yapılmaz.",
  },
  {
    icon: Lock,
    title: "Uçtan uca şifreli iletim",
    body:
      "Tarayıcınız ile Clause arasındaki tüm istekler TLS (256-bit seviyesinde modern şifreleme süitleri) ile korunur. Kamusal ağlarda bile aktarım katmanı seviyesinde okunurluk engellenir.",
  },
  {
    icon: Server,
    title: "KVKK ve veri minimizasyonu",
    body:
      "6698 sayılı KVKK çerçevesinde veri işleme amacını sınırlı tutarız: sözleşme ön analizi. Açık rıza ve aydınlatma metinlerimiz zaman içinde güncellenebilir; şeffaflık ilkesinden ödün vermeyiz.",
  },
];

const flow = [
  { step: "1", label: "Metin girişi", detail: "Yerel olarak düzenlersiniz" },
  { step: "2", label: "Maskeleme", detail: "Hassas desenler temizlenir" },
  { step: "3", label: "Analiz", detail: "Model yanıt üretir" },
  { step: "4", label: "İmha", detail: "Ham metin tutulmaz" },
];

export function GuvenlikPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main>
        <section className="relative overflow-hidden bg-[#0a1628] px-4 pb-16 pt-12 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden
            style={{
              backgroundImage: `
                radial-gradient(ellipse 70% 50% at 20% 0%, rgba(52, 211, 153, 0.25), transparent 55%),
                radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.12), transparent 40%)
              `,
            }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30">
              <ShieldCheck className="h-9 w-9" aria-hidden />
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Verileriniz, sözleşmelerinizden daha güvende.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
              Clause&apos;u yalnızca bir “internet aracı” değil, veri disiplinine
              bağlı bir hukuk teknolojisi katmanı olarak tasarladık. Verileriniz
              bizimle değil, sizinle güvende kalır.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className="bg-emerald-500 font-bold text-[#0a1628] hover:bg-emerald-400"
              >
                <Link href="/#dene">Analize güvenle başla</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/30 bg-white/5 font-semibold text-white hover:bg-white/10"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Ana sayfa
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-[#0a1628] sm:text-3xl">
              Güven mimarisi
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              Dört temel sütun üzerinde bireysel ve kurumsal kullanıcılar için
              ortak bir güven standardı sunuyoruz.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
              <Reveal key={pillar.title} delay={0.05 * (i + 1)}>
                <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-900/[0.04]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a1628] text-emerald-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[#0a1628]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
              );
            })}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50/80 py-14 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-center text-2xl font-bold text-[#0a1628]">
                Veri akışı — şeffaf süreç
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
                Şirket içi ekipleriniz paylaştığı metinler dışarı sızmaz; günlük
                tutmuyoruz, pazarlama profili oluşturmuyoruz.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {flow.map((f, i) => (
                <Reveal key={f.step} delay={0.06 * i}>
                  <div className="relative rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-900">
                      {f.step}
                    </span>
                    <p className="mt-3 font-bold text-[#0a1628]">{f.label}</p>
                    <p className="mt-1 text-xs text-slate-600">{f.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <FileKey className="h-8 w-8 text-[#0f766e]" aria-hidden />
              <h2 className="text-2xl font-bold text-[#0a1628]">
                Maskelenmiş örnek metin
              </h2>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Aşağıdaki örnekte, taraflar ve adres satırları nasıl anonimleşir
              görebilirsiniz. Gerçek analizde de benzer koruma katmanları
              uygulanır.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <pre className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-[#0a1628] p-5 font-mono text-xs leading-relaxed text-emerald-100/95 sm:text-sm">
              {`Sayın [TARAF 1],\n\n[GİZLENMİŞ] adresindeki mülk için düzenlenen kira sözleşmesinde,\nkimlik numaranız [GİZLENMİŞ] olarak kayıt altına alınacaktır.\nİletişim: [GİZLENMİŞ]\n\nSaygılarımızla,\n[TARAF 2]`}
            </pre>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
