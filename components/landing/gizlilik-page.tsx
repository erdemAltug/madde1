import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteNavbar } from "@/components/landing/site-navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Veri işleme amacı",
    body: "Clause yalnızca sözleşme ön analizi için metin işler. Pazarlama amaçlı üçüncü taraf satışı yapılmaz. 6698 sayılı KVKK kapsamında veri minimizasyonu ilkesi uygulanır.",
  },
  {
    title: "Saklama süresi",
    body: "Ham sözleşme metni analiz tamamlandıktan sonra kalıcı olarak saklanmaz. Hesap ve ödeme kayıtları yasal yükümlülükler çerçevesinde tutulabilir.",
  },
  {
    title: "Hassas veriler",
    body: "TC kimlik, IBAN ve telefon gibi desenler otomatik maskeleme ile işlenir. Kritik belgelerde manuel kontrol önerilir.",
  },
  {
    id: "cerezler",
    title: "Çerezler ve analitik",
    body: "Zorunlu çerezler ve tarayıcı kayıtları (oturum, güvenlik, ücretsiz kullanım hakkı ve çerez tercihiniz) sitenin çalışması için kullanılır ve izne bağlı değildir. Analitik ölçüm (PostHog: sayfa görüntüleme, tıklama ve form alanları maskelenmiş oturum kaydı) yalnızca çerez bildiriminde açık rızanızla başlar; rıza vermezseniz hiçbir analitik veri gönderilmez. Analitik veriler PostHog’un yurt dışındaki sunucularında işlenir ve reklam amacıyla kullanılmaz. Tercihinizi sayfanın altındaki “Çerez tercihleri” bağlantısından istediğiniz zaman değiştirebilir veya geri alabilirsiniz.",
  },
  {
    title: "Haklarınız",
    body: "KVKK kapsamında bilgi talep etme, düzeltme ve silme haklarınız vardır. Talepler için güvenlik sayfamızdaki iletişim kanallarını kullanın.",
  },
];

export function GizlilikPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
          <Link href="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Ana sayfa
          </Link>
        </Button>

        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#005BEA]">
            Gizlilik politikası
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-madde-ink sm:text-4xl">
            Gizlilik ve kişisel veriler
          </h1>
          <p className="mt-4 text-sm text-slate-500">Son güncelleme: Temmuz 2026</p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Bu sayfa Clause&apos;un kişisel verileri nasıl işlediğini özetler. Teknik güvenlik
            detayları için{" "}
            <Link href="/guvenlik" className="font-semibold text-[#005BEA] hover:underline">
              güvenlik sayfamıza
            </Link>{" "}
            bakın.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title} id={"id" in s ? s.id : undefined} className="scroll-mt-24">
              <h2 className="text-lg font-bold text-madde-ink">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 rounded-lg border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-xs text-amber-950">
          Clause hukuki danışmanlık hizmeti sunmaz. Bu metin bilgilendirme amaçlıdır; kesin hukuki
          görüş için avukata danışın.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
