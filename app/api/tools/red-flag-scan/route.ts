import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { generateLegalText, resolveLegalModel } from "@/lib/ai/models";

export const maxDuration = 30;

type ScanResult = {
  red: string[];
  yellow: string[];
  green: string[];
};

function parseScan(raw: string): ScanResult {
  let t = raw.trim();
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start >= 0 && end > start) t = t.slice(start, end + 1);
  const parsed = JSON.parse(t) as Record<string, unknown>;
  const take = (key: string) =>
    (Array.isArray(parsed[key]) ? parsed[key] : [])
      .map((x) => String(x).trim())
      .filter(Boolean)
      .slice(0, 3);
  return {
    red: take("red"),
    yellow: take("yellow"),
    green: take("green"),
  };
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
    const contractText = String(body.contractText || "").slice(0, 36_000);
    if (contractText.trim().length < 80) {
      return NextResponse.json(
        { error: "En az birkaç paragraf sözleşme metni gerekli" },
        { status: 400 },
      );
    }

    const { text } = await generateLegalText({
      maxOutputTokens: 700,
      prompt: `Sen Türk hukuku ön tarama asistanısın. Avukat değilsin; kesin hukuki görüş verme.
Aşağıdaki sözleşme metnini tara ve YALNIZCA tek JSON satırı döndür.

Metin:
"""
${contractText}
"""

JSON:
{
  "red": ["en fazla 3 madde — yüksek risk / kullanıcı aleyhine tuzak; madde numarası varsa belirt"],
  "yellow": ["en fazla 3 madde — dikkat edilmesi gereken belirsizlikler"],
  "green": ["en fazla 3 madde — kullanıcı lehine veya dengeli görünen noktalar"]
}

Her madde kısa Türkçe cümle olsun. Uydurma madde numarası yazma. Metinde yoksa genel riski tarif et.`,
    });

    try {
      const result = parseScan(text);
      return NextResponse.json({ success: true, ...result });
    } catch {
      return NextResponse.json(
        { error: "Tarama sonucu işlenemedi" },
        { status: 502 },
      );
    }
  } catch (err) {
    Sentry.captureException(err);
    console.error("[red-flag-scan]", err);
    return NextResponse.json(
      {
        error:
          "Tarama şu an tamamlanamadı. Birkaç saniye sonra tekrar deneyin.",
      },
      { status: 500 },
    );
  }
}
