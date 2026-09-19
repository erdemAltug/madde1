import Link from "next/link";
import { ToolPageShell } from "@/components/seo/tool-page-shell";
import { KiraAnaliziCalculator } from "@/components/growth/kira-analizi-calculator";
import { StatuteCite } from "@/components/legal/statute-cite";
import { buildToolMetadata } from "@/lib/seo/tool-metadata";
import { KIRA_ANALIZI_TOOL_PATH } from "@/lib/seo/free-tools-routes";

const path = KIRA_ANALIZI_TOOL_PATH;

export const metadata = buildToolMetadata({
  toolName: "Kira Analizi",
  topic: "kira artışı yasal tavanı",
  path,
  keywords: [
    "ev sahibi yüzde kaç zam yapabilir",
    "kira artışı yasal tavan",
    "kira zammı yasal mı",
    "kira takip raporu",
  ],
  titleOverride: "Kira zammı yasal mı? 2026 tavan + ücretsiz cevap taslağı",
  descriptionOverride:
    "Ev sahibi fazla zam mı istedi? 2026 TÜFE tavanını hesaplayın, haklı/haksız uyarısı ve WhatsApp cevabı alın. Ücretsiz — Clause.",
});

const faqs = [
  {
    question: "Ev sahibi TÜFE üzerinde zam isteyebilir mi?",
    answer:
      "Konut ve çatılı işyeri kiralarında yenilenen dönem artışı kural olarak TÜFE’nin on iki aylık ortalamalarına göre değişim oranını aşamaz (TBK m. 344). Sözleşme daha düşük oran öngörmüşse o uygulanır. Bu araç bilgilendirme amaçlıdır.",
  },
  {
    question: "Ev sahibi kiraya %100 zam yaptı, ne yapmalıyım?",
    answer:
      "Önce yasal tavanı hesaplayın. Aşıyorsa yazılı itiraz edin, ödeme yapacaksanız çekince koyun, sözleşmeyi saklayın. Baskı veya tahliye tehdidi varsa avukata danışın.",
  },
  {
    question: "TÜFE mi ÜFE mi esas alınır?",
    answer:
      "Kanundaki ölçüt tüketici fiyat endeksinin (TÜFE) on iki aylık ortalamalara göre değişimidir. ÜFE bu hesabın yasal ölçütü değildir.",
  },
];

export default function KiraAnaliziPage() {
  return (
    <ToolPageShell
      path={path}
      breadcrumbLabel="Kira Analizi"
      h1="Kira zammı yasal mı? 2026 tavan + cevap taslağı"
      bottomPad
      intro={
        <>
          Mevcut kiranızı, istenen zammı ve TÜFE tavanını girin. Yasal üst
          sınırı, haklı/haksız uyarısını ve ev sahibine atılacak cevap metnini
          anında alın.{" "}
          <Link
            href="/rehber/kiraci-haklari"
            className="font-semibold text-[#005BEA] hover:underline"
          >
            Kiracı hakları rehberi
          </Link>
          {" · "}
          <Link
            href="/kira-sozlesmesi-analizi"
            className="font-semibold text-[#005BEA] hover:underline"
          >
            Kira sözleşmesi AI taraması
          </Link>
          {" · "}
          <Link
            href="/gunluk-hukuk"
            className="font-semibold text-[#005BEA] hover:underline"
          >
            Günlük hukuk
          </Link>
          .
        </>
      }
      howTo={{
        name: "Kira zammı yasal tavan analizi",
        description:
          "Mevcut kira, talep edilen kira ve TÜFE tavanı ile yasal üst sınırı hesaplama.",
        steps: [
          "Mevcut kiranızı ve ev sahibinin istediği tutarı girin.",
          "TÜİK’ten güncel TÜFE 12 aylık ortalama oranını yazın.",
          "Yasal tavan aşıldı mı rozetini ve hazır cevap metnini kullanın.",
        ],
      }}
      softwareApp={{
        name: "Clause Kira Analizi",
        description: "TBK m. 344 bağlamında kira artışı yasal tavan hesaplama.",
      }}
      faqs={faqs}
      article={
        <>
          <h2>TBK m. 344 ve kira artışı</h2>
          <StatuteCite
            cite="TBK m. 344"
            href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6098&MevzuatTur=1&MevzuatTertip=5"
          >
            Yenilenen kira dönemlerinde uygulanacak artış, bir önceki kira
            yılında tüketici fiyat endeksindeki on iki aylık ortalamalara göre
            değişim oranını geçemez. Bu araç tahmin üretir; resmi oran TÜİK’ten
            doğrulanmalıdır.
          </StatuteCite>
          <p>
            İlgili araçlar:{" "}
            <Link href="/araclar/kira-sozlesmesi-artis-orani-hesaplama">
              klasik kira artış oranı
            </Link>
            ,{" "}
            <Link href="/araclar/tahliye-taahhudu-gecerlilik-kontrolu">
              tahliye taahhüdü geçerlilik kontrolü
            </Link>
            .
          </p>
        </>
      }
    >
      <KiraAnaliziCalculator />
    </ToolPageShell>
  );
}
