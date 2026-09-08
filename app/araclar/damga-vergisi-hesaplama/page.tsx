import Link from "next/link";
import { ToolPageShell } from "@/components/seo/tool-page-shell";
import { StampTaxCalculator } from "@/components/growth/stamp-tax-calculator";
import { DamgaVergisiSeoArticle } from "@/components/seo/araclar/damga-vergisi-seo-article";
import { buildToolMetadata } from "@/lib/seo/tool-metadata";
import { DAMGA_VERGISI_TOOL_PATH } from "@/lib/seo/free-tools-routes";

const path = DAMGA_VERGISI_TOOL_PATH;

export const metadata = buildToolMetadata({
  toolName: "Damga Vergisi Hesaplama",
  topic: "damga vergisi",
  path,
  keywords: ["damga vergisi hesaplama", "kira sözleşmesi damga"],
});

const faqs = [
  {
    question: "Kira sözleşmesinde damga vergisi nasıl hesaplanır?",
    answer:
      "Kabaca aylık bedel × süre × binde oranı ile tahmin edilir. Muafiyetler, kağıt türü ve güncel tarife sonucu değiştirir. Bu araç bilgilendirme amaçlıdır.",
  },
  {
    question: "Damga vergisi ödemeden sözleşme geçerli midir?",
    answer:
      "Damga vergisi mali bir yükümlülüktür; sözleşmenin özel hukuk geçerliliği ile karıştırılmamalıdır. Somut durum için mali müşavir veya avukat görüşü alın.",
  },
];

export default function DamgaVergisiPage() {
  return (
    <ToolPageShell
      path={path}
      breadcrumbLabel="Damga vergisi"
      h1="Damga vergisi hesaplama"
      intro={
        <>
          Aylık bedel, süre ve binde oranı ile yaklaşık damga vergisi hesaplayın.{" "}
          <Link
            href="/sozlesme-analizi/kira-sozlesmesi-analizi"
            className="font-semibold text-[#005BEA] hover:underline"
          >
            Kira sözleşmesi AI taraması
          </Link>
          .
        </>
      }
      howTo={{
        name: "Damga vergisi hesaplama",
        description: "Matrah ve binde oranı ile damga vergisi tahmini.",
        steps: [
          "Aylık bedeli ve süreyi girin.",
          "Binde oranını kontrol edin.",
          "Yaklaşık damga tutarını görün.",
        ],
      }}
      softwareApp={{
        name: "Clause Damga Vergisi Hesaplama",
        description: "Kira ve sözleşme matrahı üzerinden damga vergisi tahmini.",
      }}
      faqs={faqs}
      article={<DamgaVergisiSeoArticle />}
    >
      <StampTaxCalculator
        analyticsToolId="stamp_tax_page"
        analyticsSurface="tool_page"
      />
    </ToolPageShell>
  );
}
