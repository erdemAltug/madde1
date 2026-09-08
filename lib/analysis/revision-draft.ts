import type { TeaserData } from "@/components/b2c/risk-teaser-dashboard";

export function buildRevisionDraft(teaser: TeaserData): string {
  const risks =
    teaser.categoryTitles.length > 0
      ? teaser.categoryTitles
          .slice(0, 3)
          .map((t, i) => `${i + 1}. ${t}`)
          .join("\n")
      : "1. Sözleşmede aleyhe olabilecek maddeler ön incelemede işaretlendi.";

  return `Merhaba,

Sözleşme taslağını inceledim. Ön incelemede şu başlıklar dikkatimi çekti:

${risks}

Bu maddelerin yeniden düzenlenmesini veya yazılı açıklama talep ediyorum. Uygun bir metin öneriniz varsa görüşmeye açığım.

Not: Bu mesaj bilgilendirme amaçlı bir taslaktır; avukatlık hizmeti yerine geçmez.

Saygılarımla`;
}

export const MISSING_CLAUSE_FALLBACKS = [
  "Erken fesih halinde tazminat üst sınırı belirtilmemiş.",
  "Bildirim / ihtar süreleri net tanımlanmamış.",
  "Depozito iade koşulları ve süre eksik veya belirsiz.",
] as const;
