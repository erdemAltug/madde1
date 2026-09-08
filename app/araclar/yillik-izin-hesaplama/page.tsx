import Link from "next/link";
import { ToolPageShell } from "@/components/seo/tool-page-shell";
import { YillikIzinCalculator } from "@/components/growth/labor-calculators";
import { StatuteCite } from "@/components/legal/statute-cite";
import { buildToolMetadata } from "@/lib/seo/tool-metadata";
import { YILLIK_IZIN_TOOL_PATH } from "@/lib/seo/free-tools-routes";

const path = YILLIK_IZIN_TOOL_PATH;

export const metadata = buildToolMetadata({
  toolName: "Yıllık İzin Hesaplama",
  topic: "yıllık izin süresi ve ücreti",
  path,
  keywords: ["yıllık izin hesaplama", "yıllık izin kaç gün", "İş Kanunu izin"],
});

const faqs = [
  {
    question: "Yıllık izin kaç gündür?",
    answer:
      "İş Kanunu’nda kıdeme göre kademeli yıllık izin süreleri vardır. Bu araç kıdeme göre yaygın tablolarla tahmin üretir; sözleşmesel ekstra izinler sonucu artırabilir.",
  },
  {
    question: "Kullanılmayan izin ücreti nasıl hesaplanır?",
    answer:
      "İş sözleşmesi sona erdiğinde kullanılmayan izinlerin ücreti gündeme gelebilir. Günlük ücret ve kalan gün sayısı tahmine esas alınır; bordro ve içtihat somut sonucu belirler.",
  },
];

export default function YillikIzinHesaplamaPage() {
  return (
    <ToolPageShell
      path={path}
      breadcrumbLabel="Yıllık izin"
      h1="Yıllık izin hesaplama"
      intro={
        <>
          Kıdeme göre izin günü ve kullanılmayan izin ücreti tahmini.{" "}
          <Link
            href="/rehber/isci-haklari"
            className="font-semibold text-[#005BEA] hover:underline"
          >
            İşçi hakları rehberi
          </Link>
          .
        </>
      }
      howTo={{
        name: "Yıllık izin hesaplama",
        description: "Kıdeme göre yıllık izin günü ve ücret tahmini.",
        steps: [
          "Kıdeminizi (yıl) girin.",
          "Brüt ücretinizi yazın.",
          "İzin günü ve kullanılmayan gün ücreti tahminini görün.",
        ],
      }}
      softwareApp={{
        name: "Clause Yıllık İzin Hesaplama",
        description: "İş Kanunu bağlamında yıllık izin süresi ve ücret tahmini.",
      }}
      faqs={faqs}
      article={
        <>
          <h2>İş Kanunu — yıllık izin</h2>
          <StatuteCite cite="İş Kanunu — yıllık ücretli izin">
            Yıllık ücretli izin hakkı kıdeme göre artar. Bu araç bilgilendirme
            amaçlı tahmin üretir; resmi bordro ve avukat kontrolü önerilir.
          </StatuteCite>
        </>
      }
    >
      <YillikIzinCalculator
        analyticsToolId="yillik_izin_page"
        analyticsSurface="tool_page"
      />
    </ToolPageShell>
  );
}
