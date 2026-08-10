import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import type { PersonaId } from "@/lib/personas";
import { personaPromptFragment } from "@/lib/personas";
import { generateLegalText, resolveLegalModel } from "@/lib/ai/models";

export const maxDuration = 30;

function parseTeaserJson(raw: string): {
  criticalRiskCount: number;
  missingClauseCount: number;
  categoryTitles: string[];
  securityScore: number;
} {
  let t = raw.trim();
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start >= 0 && end > start) t = t.slice(start, end + 1);
  const parsed = JSON.parse(t) as Record<string, unknown>;
  const criticalRiskCount = Math.min(
    20,
    Math.max(0, Number(parsed.criticalRiskCount) || 0),
  );
  const missingClauseCount = Math.min(
    20,
    Math.max(0, Number(parsed.missingClauseCount) || 0),
  );
  const cats = Array.isArray(parsed.categoryTitles)
    ? parsed.categoryTitles
    : [];
  const categoryTitles = cats
    .map((x) => String(x).trim())
    .filter(Boolean)
    .slice(0, 6);
  const rawScore = Number(parsed.securityScore);
  const securityScore = Number.isFinite(rawScore)
    ? Math.min(100, Math.max(0, Math.round(rawScore)))
    : Math.max(
        5,
        Math.min(
          95,
          100 - criticalRiskCount * 12 - missingClauseCount * 8,
        ),
      );
  return { criticalRiskCount, missingClauseCount, categoryTitles, securityScore };
}

export async function POST(req: Request) {
  try {
    if (!resolveLegalModel()) {
      return NextResponse.json(
        { error: "Model yapılandırması eksik" },
        { status: 503 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const contractText = String(body.contractText || "").slice(0, 48_000);
    const persona = (body.persona as PersonaId) || "general";

    if (!contractText.trim()) {
      return NextResponse.json({ error: "Metin gerekli" }, { status: 400 });
    }

    const pFrag = personaPromptFragment(persona);

    const { text } = await generateLegalText({
      maxOutputTokens: 400,
      prompt: `Sen Türk hukuku asistanısın. ${pFrag}

Aşağıdaki sözleşme metnini HIZLICA tarayıp yalnızca TEK bir JSON satırı döndür. Başka metin yazma.

Metin:
"""
${contractText}
"""

JSON şeması (Türkçe başlıklar üret):
{
  "criticalRiskCount": <tam sayı, tahmini kritik risk madde sayısı>,
  "missingClauseCount": <tam sayı, tahmini eksik zorunlu/teamül madde sayısı>,
  "securityScore": <0-100 tam sayı; düşük = riskli, yüksek = daha güvenli>,
  "categoryTitles": ["kısa risk başlığı 1", "kısa risk başlığı 2", ... en fazla 5]
}

categoryTitles örnek stili: "Maaş kesintisi riski", "Tazminat maddesi eksikliği", "Tek taraflı fesih" gibi son kullanıcıya anlaşılır kısa etiketler.`,
    });

    try {
      const data = parseTeaserJson(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({
        criticalRiskCount: 3,
        missingClauseCount: 2,
        securityScore: 42,
        categoryTitles: [
          "Genel risk özeti",
          "Ödeme ve fesih",
          "Eksik maddeler",
        ],
        fallback: true,
      });
    }
  } catch (err) {
    Sentry.captureException(err);
    console.error("[analysis/teaser]", err);
    return NextResponse.json(
      {
        error:
          "Ön tarama şu an tamamlanamadı. Birkaç saniye sonra tekrar deneyin.",
      },
      { status: 500 },
    );
  }
}
