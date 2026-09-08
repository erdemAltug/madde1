import Link from "next/link";
import { ToolPageShell } from "@/components/seo/tool-page-shell";
import { FreelanceChecklistWidget } from "@/components/growth/freelance-checklist";
import { StatuteCite } from "@/components/legal/statute-cite";
import { buildToolMetadata } from "@/lib/seo/tool-metadata";
import { FREELANCE_CHECKLIST_TOOL_PATH } from "@/lib/seo/free-tools-routes";

const path = FREELANCE_CHECKLIST_TOOL_PATH;

export const metadata = buildToolMetadata({
  toolName: "Freelance Sözleşme Kontrol Listesi",
  topic: "freelance sözleşme maddeleri (IP, revizyon, NDA)",
  path,
  keywords: [
    "freelance sözleşme kontrol listesi",
    "fikri mülkiyet sözleşme",
    "revizyon hakkı",
    "NDA SLA freelancer",
  ],
});

const faqs = [
  {
    question: "Freelance sözleşmede kaynak kodu kime ait olmalı?",
    answer:
      "Varsayılan olarak tarafların açıkça kararlaştırması gerekir. Ödeme tamamlanana kadar lisans, teslim sonrası devir veya işveren mülkiyeti gibi modeller yaygındır. Belirsiz IP maddesi en sık ihtilaf kaynağıdır.",
  },
  {
    question: "Sınırsız revizyon maddesi riskli midir?",
    answer:
      "Evet. Sayı ve süre sınırı olmayan revizyon, kapsam kaymasına ve ücretsiz emeğe dönüşebilir. Liste skoru düşüyorsa metni AI ile taratın.",
  },
  {
    question: "NDA ve SLA neden kontrol edilmeli?",
    answer:
      "Tek taraflı ağır NDA veya orantısız cezai şart, TBK genel işlem koşulları ve ceza indirimi bağlamında tartışılabilir. Orantılılık ve karşılıklılık önemlidir.",
  },
];

export default function FreelanceChecklistPage() {
  return (
    <ToolPageShell
      path={path}
      breadcrumbLabel="Freelance kontrol listesi"
      h1="Freelance sözleşme kontrol listesi"
      bottomPad
      intro={
        <>
          <span className="mb-2 inline-block rounded-full bg-[#005BEA]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#005BEA]">
            Serbest Çalışan &amp; Yazılımcı Paketi
          </span>
          <br />
          Yazılımcılar ve tasarımcılar için fikri mülkiyet, revizyon, ödeme ve
          NDA maddelerini işaretleyin; eksikleri özetleyin.{" "}
          <Link
            href="/rehber/freelance-sozlesme-rehberi"
            className="font-semibold text-[#005BEA] hover:underline"
          >
            Freelance sözleşme rehberi
          </Link>
          .
        </>
      }
      howTo={{
        name: "Freelance sözleşme kontrol listesi",
        description:
          "IP, revizyon, ödeme ve NDA maddelerini işaretleyerek ön kontrol.",
        steps: [
          "Sözleşmenizde bulunan maddeleri işaretleyin.",
          "Hazırlık skorunu ve eksik madde özetini inceleyin.",
          "Metni freelance AI taramasına yapıştırın.",
        ],
      }}
      softwareApp={{
        name: "Clause Freelance Sözleşme Kontrol Listesi",
        description:
          "Freelancer sözleşmelerinde IP, revizyon ve NDA ön kontrolü.",
      }}
      faqs={faqs}
      article={
        <>
          <h2>TBK ve eser / hizmet sözleşmesi bağlamı</h2>
          <StatuteCite cite="TBK — eser / hizmet ilişkisi">
            Freelance işler çoğu zaman eser veya hizmet sözleşmesi nitelikleri
            taşır. Fikri mülkiyet, teslim ve ücret hükümleri açık yazılmalıdır;
            genel işlem koşulu niteliğindeki ağır cezalar tartışılabilir.
          </StatuteCite>
          <p>
            <Link href="/sozlesme-analizi/freelance-yazilim-kontrati">
              Freelance yazılım kontrati AI analizi
            </Link>{" "}
            ile tam metin taraması yapın.
          </p>
        </>
      }
    >
      <FreelanceChecklistWidget />
    </ToolPageShell>
  );
}
