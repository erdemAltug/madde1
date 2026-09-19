import Link from "next/link";
import { ToolPageShell } from "@/components/seo/tool-page-shell";
import { TahliyeValidityChecklist } from "@/components/growth/tahliye-validity-checklist";
import { TahliyeCheckWidget } from "@/components/growth/tahliye-check-widget";
import { ToolContractScanCta } from "@/components/growth/tool-contract-scan-cta";
import { StatuteCite } from "@/components/legal/statute-cite";
import { buildToolMetadata } from "@/lib/seo/tool-metadata";
import { TAHLIYE_TOOL_PATH } from "@/lib/seo/free-tools-routes";

const path = TAHLIYE_TOOL_PATH;

export const metadata = buildToolMetadata({
  toolName: "Tahliye Taahhüdü Geçerlilik Kontrolü",
  topic: "tahliye taahhüdü geçerliliği",
  path,
  keywords: [
    "tahliye taahhüdü geçerli mi",
    "tahliye taahhütnamesi kontrol",
    "tarih imza çelişkisi",
    "boş tarihli tahliye",
  ],
  titleOverride:
    "Tahliye taahhüdü geçerli mi? Ücretsiz kontrol listesi + AI ön inceleme",
  descriptionOverride:
    "Tarih/imza çelişkisi ve baskı sinyallerini kontrol edin; taahhüt metnini ücretsiz AI ile tarayın. Kesin hüküm vermez — Clause ön kontrol.",
});

const faqs = [
  {
    question: "Tahliye taahhüdü ne zaman geçersiz sayılabilir?",
    answer:
      "Uygulamada sık görülen gerekçeler: boş tarihli imza, sözleşme ile aynı gün baskı altında imza, tarih çelişkisi, irade sakatlığı iddiası. Her somut olay mahkemece değerlendirilir; bu araç ön kontrol sağlar, kesin hüküm vermez.",
  },
  {
    question: "Kira sözleşmesiyle aynı gün imzalanan taahhüt geçerli midir?",
    answer:
      "Sıkça tartışılır. Kiracının gerçek iradesinin oluşmadığı iddiası gündeme gelebilir. Tarihleri ve koşulları kayıt altına alın; metni AI ile taratın ve gerekirse avukata danışın.",
  },
  {
    question: "Taahhüt metnini yapay zekaya vermek güvenli mi?",
    answer:
      "Clause, TC ve telefon gibi desenleri tarayıcıda maskeleyerek iletir. Yine de kritik belgelerde kişisel verileri silmeniz önerilir. Araç avukatlık hizmeti değildir.",
  },
];

export default function TahliyeGecerlilikPage() {
  return (
    <ToolPageShell
      path={path}
      breadcrumbLabel="Tahliye taahhüdü kontrolü"
      h1="Tahliye taahhüdü geçerli mi? Ücretsiz kontrol"
      intro={
        <>
          Tarih ve imza çelişkilerini tarayın, ardından taahhüt metnini AI ile
          ön kontrolden geçirin.{" "}
          <Link
            href="/rehber/tahliye-taahhutnamesi-rehberi"
            className="font-semibold text-[#005BEA] hover:underline"
          >
            Tahliye taahhütnamesi rehberi
          </Link>
          .
        </>
      }
      howTo={{
        name: "Tahliye taahhüdü geçerlilik kontrolü",
        description:
          "Tarih/imza ön kontrolü ve yapay zeka ile tahliye taahhüdü taraması.",
        steps: [
          "Kira sözleşmesi, taahhüt ve taşınma tarihlerini girin.",
          "Boş tarih / aynı gün imza kutularını işaretleyin.",
          "Taahhüt metnini yapıştırıp AI ön kontrolü başlatın.",
        ],
      }}
      softwareApp={{
        name: "Clause Tahliye Taahhüdü Geçerlilik Kontrolü",
        description:
          "Tarih çelişkisi ve AI ile tahliye taahhüdü ön incelemesi.",
      }}
      faqs={faqs}
      article={
        <>
          <h2>TBK ve tahliye taahhüdü</h2>
          <StatuteCite cite="TBK — kira / tahliye bağlamı">
            Tahliye taahhüdü, kira ilişkisinde sık kullanılan ancak usul ve irade
            sakatlığı yönünden tartışmalı bir belgedir. Tarih, imza ve metin
            tutarlılığı ön incelemenin ilk adımıdır; kesin geçerlilik yargı
            mercilerince belirlenir.
          </StatuteCite>
          <p>
            İlgili sayfalar:{" "}
            <Link href="/araclar/kira-analizi">kira analizi</Link>,{" "}
            <Link href="/sozlesme-analizi/kira-sozlesmesi-analizi">
              kira sözleşmesi AI taraması
            </Link>
            ,{" "}
            <Link href="/gunluk-hukuk">günlük hukuk</Link>.
          </p>
        </>
      }
    >
      <div className="space-y-6">
        <TahliyeValidityChecklist />
        <TahliyeCheckWidget />
        <ToolContractScanCta
          source={path}
          href="/sozlesme-analizi/kira-sozlesmesi-analizi"
          title="Taahhütle birlikte kira sözleşmesinde haksız madde var mı?"
          body="Kontratını yapıştır, 15 saniyede tarayalım."
        />
      </div>
    </ToolPageShell>
  );
}
