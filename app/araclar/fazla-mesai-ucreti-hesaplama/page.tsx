import Link from "next/link";
import { ToolPageShell } from "@/components/seo/tool-page-shell";
import { FazlaMesaiCalculator } from "@/components/growth/labor-calculators";
import { StatuteCite } from "@/components/legal/statute-cite";
import { buildToolMetadata } from "@/lib/seo/tool-metadata";
import { FAZLA_MESAI_TOOL_PATH } from "@/lib/seo/free-tools-routes";

const path = FAZLA_MESAI_TOOL_PATH;

export const metadata = buildToolMetadata({
  toolName: "Fazla Mesai Ücreti Hesaplama",
  topic: "fazla mesai ücreti",
  path,
  keywords: [
    "fazla mesai ücreti hesaplama",
    "fazla mesai 1.5",
    "fazla mesai hesaplama 2026",
  ],
  titleOverride:
    "Fazla mesai ücreti hesaplama 2026 — ücretsiz + iş sözleşmesi taraması",
  descriptionOverride:
    "Brüt ücret ve fazla mesai saatiyle tahmini zamlı ücret. Ücretsiz hesap; sözleşme maddenizi AI ile tarayın — Clause.",
});

const faqs = [
  {
    question: "Fazla mesai saat ücreti nasıl hesaplanır?",
    answer:
      "Pratikte sık kullanılan yaklaşım; saatlik ücretin bir buçuk katı ile fazla mesai saatini çarpmaktır (İş Kanunu m. 41 bağlamı). Saatlik ücret için aylık brütün çalışma saatine bölünmesi yaygındır. Somut hesap bordro ve sözleşmeye göre değişir.",
  },
  {
    question: "Fazla mesai reddedilebilir mi?",
    answer:
      "Kanunda ve içtihatta belirli sınırlar ve istisnalar vardır. Yazılı onay, yıllık üst sınır ve işin niteliği önemlidir. Detay için fazla mesai rehberine bakın; bu araç tahmindir.",
  },
];

export default function FazlaMesaiHesaplamaPage() {
  return (
    <ToolPageShell
      path={path}
      breadcrumbLabel="Fazla mesai ücreti"
      h1="Fazla mesai ücreti hesaplama"
      bottomPad
      intro={
        <>
          Brüt ücret ve fazla mesai saati ile zamlı ücret tahmini alın.{" "}
          <Link
            href="/rehber/fazla-mesai-reddetme-ve-ucret"
            className="font-semibold text-[#005BEA] hover:underline"
          >
            Fazla mesai reddetme ve ücret rehberi
          </Link>
          .
        </>
      }
      howTo={{
        name: "Fazla mesai ücreti hesaplama",
        description: "Brüt aylık ücret ve fazla mesai saati ile tahmini zamlı ücret.",
        steps: [
          "Brüt aylık ücretinizi girin.",
          "Fazla mesai saatini yazın.",
          "Tahmini zamlı ücreti görün; iş sözleşmenizi AI ile kontrol edin.",
        ],
      }}
      softwareApp={{
        name: "Clause Fazla Mesai Ücreti Hesaplama",
        description: "İş Kanunu m. 41 bağlamında fazla mesai ücreti tahmini.",
      }}
      faqs={faqs}
      article={
        <>
          <h2>İş Kanunu m. 41</h2>
          <StatuteCite cite="İş Kanunu m. 41">
            Fazla çalışma, kanundaki sınırlar ve zamlı ücret esaslarıyla
            düzenlenir. Bu hesaplayıcı yaygın pratik çarpanlarla tahmin üretir;
            gece, tatil ve yazılı anlaşma sonucu değiştirir.
          </StatuteCite>
          <p>
            <Link href="/sozlesme-analizi/is-sozlesmesi-riskleri">
              İş sözleşmesi AI analizi
            </Link>
            .
          </p>
        </>
      }
    >
      <FazlaMesaiCalculator
        analyticsToolId="fazla_mesai_page"
        analyticsSurface="tool_page"
      />
    </ToolPageShell>
  );
}
