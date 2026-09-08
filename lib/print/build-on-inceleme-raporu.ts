import type { TeaserData } from "@/components/b2c/risk-teaser-dashboard";
import { buildRevisionDraft } from "@/lib/analysis/revision-draft";
import { SITE_HOST, SITE_NAME } from "@/lib/seo/site";

type Input = {
  teaser?: TeaserData | null;
  analysisMarkdown?: string;
  refactorMarkdown?: string;
  contractTitle?: string;
};

/** Yazdırılabilir / PDF “Clause Sözleşme Ön İnceleme Raporu” */
export function buildOnIncelemeRaporuMarkdown(input: Input): string {
  const teaser = input.teaser;
  const score =
    typeof teaser?.securityScore === "number"
      ? Math.min(100, Math.max(0, Math.round(100 - teaser.securityScore)))
      : teaser
        ? Math.min(
            95,
            Math.max(
              35,
              teaser.criticalRiskCount * 18 + teaser.missingClauseCount * 10,
            ),
          )
        : null;

  const risks =
    teaser?.categoryTitles?.length
      ? teaser.categoryTitles.map((t) => `- ${t}`).join("\n")
      : "- Ön incelemede kategori başlıkları sınırlı; detaylı analiz bölümüne bakın.";

  const revision = teaser ? buildRevisionDraft(teaser) : "";

  const lines = [
    `# ${SITE_NAME} — Sözleşme Ön İnceleme Raporu`,
    "",
    `Oluşturulma: ${new Date().toLocaleString("tr-TR")}`,
    input.contractTitle ? `Belge: ${input.contractTitle}` : "",
    "",
    "## 1. Risk özeti",
    "",
    score !== null
      ? `**Risk skoru:** ${score}/100 · Kritik: ${teaser?.criticalRiskCount ?? 0} · Eksik madde: ${teaser?.missingClauseCount ?? 0}`
      : "Risk skoru bu oturumda hesaplanamadı; aşağıdaki detaylı analizi kullanın.",
    "",
    "## 2. Kritik / dikkat edilen başlıklar",
    "",
    risks,
    "",
    "## 3. Önerilen revizyon taslağı",
    "",
    revision
      ? ["```", revision, "```"].join("\n")
      : "_Revizyon taslağı için önce ön inceleme tamamlanmalıdır._",
    "",
    "## 4. Detaylı analiz",
    "",
    input.analysisMarkdown?.trim() ||
      "_Detaylı analiz metni henüz üretilmedi._",
    "",
  ];

  if (input.refactorMarkdown?.trim()) {
    lines.push(
      "## 5. İyileştirilmiş metin / revizyon notları",
      "",
      input.refactorMarkdown.trim(),
      "",
    );
  }

  lines.push(
    "---",
    "",
    `*Bilgilendirme amaçlıdır; avukatlık veya resmi hukuki danışmanlık değildir. Mevzuat referansları: 6098 sayılı TBK ve 4857 sayılı İş Kanunu. Powered by ${SITE_HOST}*`,
  );

  return lines.filter((l) => l !== undefined).join("\n");
}
