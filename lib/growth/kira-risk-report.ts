import { SITE_HOST, SITE_NAME } from "@/lib/seo/site";

export type KiraRiskReportInput = {
  current: number;
  proposed: number;
  legalMax: number;
  tufePct: number;
  proposedPct: number;
  exceeded: boolean;
  earlyRenewal: boolean;
  months: number;
  whatsapp: string;
  email: string;
  summary: string[];
};

function formatTry(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPct(value: number): string {
  return `%${value.toLocaleString("tr-TR", {
    maximumFractionDigits: 2,
  })}`;
}

/** Kira analizi sonucundan yazdırılabilir / PDF risk raporu markdown’ı */
export function buildKiraRiskReportMarkdown(input: KiraRiskReportInput): string {
  const {
    current,
    proposed,
    legalMax,
    tufePct,
    proposedPct,
    exceeded,
    earlyRenewal,
    months,
    whatsapp,
    email,
    summary,
  } = input;

  const verdict = exceeded
    ? "Yasal tavan aşıldı — talep, girdiğiniz TÜFE oranına göre üst sınırın üzerinde."
    : "Tavan içinde görünüyor — yine de sözleşme maddelerini kontrol edin.";

  const lines = [
    `# ${SITE_NAME} — Kira Zammı Risk Raporu`,
    "",
    `Oluşturulma: ${new Date().toLocaleString("tr-TR")}`,
    "",
    "## Sonuç özeti",
    "",
    `**${verdict}**`,
    "",
    ...summary.map((s) => `- ${s}`),
    "",
    "## Hesaplama",
    "",
    `| Kalem | Değer |`,
    `| --- | --- |`,
    `| Mevcut aylık kira | ${formatTry(current)} |`,
    `| Ev sahibinin talebi | ${formatTry(proposed)} (${formatPct(proposedPct)}) |`,
    `| TÜFE tavanı (girdi) | ${formatPct(tufePct)} |`,
    `| Yasal üst sınır | ${formatTry(legalMax)} |`,
    `| Fark | ${formatTry(proposed - legalMax)} |`,
    months > 0
      ? `| Sözleşme / son artıştan geçen süre | ~${months} ay${earlyRenewal ? " (1 yıl dolmadan artış tartışmalı olabilir)" : ""} |`
      : "",
    "",
    "## Resmi yanıt taslakları",
    "",
    "### WhatsApp",
    "",
    "```",
    whatsapp,
    "```",
    "",
    "### E-posta / ihtar taslağı",
    "",
    "```",
    email,
    "```",
    "",
    "## Önerilen sonraki adım",
    "",
    "- Kira sözleşmesinde **tahliye taahhüdü**, haksız artış formülü veya tek taraflı fesih maddesi olup olmadığını Clause ile tarayın.",
    `- Analiz: https://${SITE_HOST}/sozlesme-analizi/kira-sozlesmesi-analizi`,
    "",
    "---",
    "",
    `*Bilgilendirme amaçlıdır; avukatlık hizmeti değildir. TBK m. 344 ve bireysel sözleşme şartları sonucu değiştirir. TÜFE oranını resmi kaynaktan doğrulayın. Powered by ${SITE_HOST}*`,
  ];

  return lines.filter((l) => l !== undefined).join("\n");
}
