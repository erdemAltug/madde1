import Link from "next/link";
import { ToolPageShell } from "@/components/seo/tool-page-shell";
import { TazminatHub } from "@/components/growth/tazminat-hub";
import { StatuteCite } from "@/components/legal/statute-cite";
import { buildToolMetadata } from "@/lib/seo/tool-metadata";
import { KIDEM_IHBAR_TOOL_PATH } from "@/lib/seo/free-tools-routes";

const path = KIDEM_IHBAR_TOOL_PATH;

export const metadata = buildToolMetadata({
  toolName: "Kıdem ve İhbar Tazminatı Hesaplama",
  topic: "kıdem ve ihbar tazminatı",
  path,
  keywords: [
    "kıdem ihbar tazminatı hesaplama",
    "işten çıkarılma tazminat",
    "istifa kıdem",
    "kıdem tazminatı hesaplama 2026",
  ],
  titleOverride:
    "Kıdem ve ihbar tazminatı hesaplama 2026 — ücretsiz + iş sözleşmesi taraması",
  descriptionOverride:
    "Brüt ücret ve kıdeme göre kıdem/ihbar tahmini. İstifaya zorlama listesi ve ücretsiz iş sözleşmesi risk taraması — Clause.",
});

const faqs = [
  {
    question: "Kıdem ve ihbar tazminatı aynı şey midir?",
    answer:
      "Hayır. Kıdem, belirli koşullarda çalışma süresine bağlı bir alacaktır; ihbar ise bildirim süresine uyulmaması halinde doğan tazminattır. İş Kanunu m. 17 ihbar sürelerini düzenler. Somut hak, fesih türüne (işveren/işçi, haklı neden) göre değişir.",
  },
  {
    question: "İstifa edersem kıdem alır mıyım?",
    answer:
      "Kural olarak istifa kıdem hakkı doğurmaz. Haklı nedenle fesih (İş Kanunu m. 24) veya emeklilik gibi istisnalar söz konusu olabilir. Bu araç tahmini hesap üretir; hak doğumu için avukat değerlendirmesi gerekir.",
  },
  {
    question: "İşten çıkarılınca ne kadar ihbar tazminatı ödenir?",
    answer:
      "İhbar tazminatı, kanundaki bildirim sürelerine ve brüt ücrete göre tahmin edilir. Süre kıdeme göre artar (İş Kanunu m. 17). Yazılı sözleşme ve toplu iş sözleşmesi farklı hükümler içerebilir.",
  },
];

export default function KidemIhbarTazminatiPage() {
  return (
    <ToolPageShell
      path={path}
      breadcrumbLabel="Kıdem & ihbar tazminatı"
      h1="Kıdem ve ihbar tazminatı hesaplama 2026"
      bottomPad
      intro={
        <>
          İşten çıkarılma veya istifa senaryosunda kıdem ve ihbar tutarını
          tahmin edin; istifaya zorlama kontrol listesiyle haklı fesih
          sinyallerini tarayın.{" "}
          <Link
            href="/rehber/kidem-ihbar-tazminati"
            className="font-semibold text-[#005BEA] hover:underline"
          >
            Kıdem &amp; ihbar rehberi
          </Link>
          .
        </>
      }
      howTo={{
        name: "Kıdem ve ihbar tazminatı hesaplama",
        description:
          "Brüt ücret ve çalışma süresiyle kıdem/ihbar tahmini ve haklı fesih listesi.",
        steps: [
          "Brüt ücret ve çalışma sürenizi girin.",
          "Kıdem ve ihbar tahminlerini karşılaştırın.",
          "İstifaya zorlama maddelerini işaretleyip taslak notu alın.",
        ],
      }}
      softwareApp={{
        name: "Clause Kıdem & İhbar Tazminatı Hesaplama",
        description:
          "2026 İş Kanunu bağlamında kıdem ve ihbar tazminatı tahmini.",
      }}
      faqs={faqs}
      article={
        <>
          <h2>İş Kanunu çerçevesinde kıdem ve ihbar</h2>
          <StatuteCite cite="İş Kanunu m. 17">
            Bildirim süreleri kıdeme göre kademeli artar; süreye uyulmadan yapılan
            fesihlerde ihbar tazminatı gündeme gelebilir. Bu araç yaklaşık hesap
            üretir; bordro, AGİ ve ek ödemeler sonucu değiştirir.
          </StatuteCite>
          <p>
            Detaylı sözleşme riskleri için{" "}
            <Link href="/sozlesme-analizi/is-sozlesmesi-riskleri">
              iş sözleşmesi AI analizi
            </Link>{" "}
            ve{" "}
            <Link href="/gunluk-hukuk">günlük hukuk</Link> sayfalarına bakın.
          </p>
        </>
      }
    >
      <TazminatHub />
    </ToolPageShell>
  );
}
