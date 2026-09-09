import { NextRequest, NextResponse } from "next/server";
import { generateLegalText, resolveLegalModel } from "@/lib/ai/models";
import { retrieveLegalGrounding } from "@/lib/rag";
import type { PersonaId } from "@/lib/personas";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    if (!resolveLegalModel()) {
      return NextResponse.json(
        { error: "Model yapılandırması eksik (GROQ veya OPENAI)." },
        { status: 503 },
      );
    }

    const body = await request.json();
    const query = typeof body.query === "string" ? body.query : "";
    const fileContent =
      typeof body.fileContent === "string" ? body.fileContent : "";
    const fileName =
      typeof body.fileName === "string" ? body.fileName : undefined;
    const persona = (body.persona as PersonaId) || "general";

    if (!query && !fileContent) {
      return NextResponse.json(
        { error: "Query veya dosya içeriği gereklidir." },
        { status: 400 },
      );
    }

    const searchText = (fileContent || query).slice(0, 48_000);
    const grounding = await retrieveLegalGrounding({
      contractText: searchText,
      persona,
      mode: fileContent ? "full" : "light",
    });

    if (!grounding.retrieved || grounding.hits.length === 0) {
      return NextResponse.json({
        query,
        context: [],
        report: null,
        message:
          "Bu soru/içerik için uygun kanun maddesi veya emsal kararı bulunamadı.",
      });
    }

    const context = grounding.hits.map((h) => ({
      type: h.type,
      id: h.id,
      content: h.content,
      metadata: h.metadata,
      source: h.source,
      category: h.category,
      similarity: h.similarity,
      citeLabel: h.citeLabel,
    }));

    const systemPrompt = fileContent
      ? `Sen uzman bir Türk hukukçusun. Yalnızca verilen doğrulanmış kanun/emsal bağlamına dayan.
Uydurma madde numarası yazma. Atıfları izinli etiketlerle yap. Kesin dava sonucu vaat etme.`
      : `Sen uzman bir Türk hukukçusun. Verilen Kanun Maddeleri ve emsal bağlamı ışığında soruyu analiz et.
Önce ilgili kanun dayanağı, sonra yargı pratiği, sonra somut öneri. Uydurma madde numarası yasak.`;

    const userPrompt = fileContent
      ? `Yüklenen Dosya: ${fileName || "belge"}

Dosya İçeriği:
${fileContent.slice(0, 8000)}

Kullanıcı Sorusu: ${query || "Dosya hakkında genel analiz yapılması isteniyor"}

${grounding.groundingBlock}

Profesyonel Türkçe hukuki değerlendirme raporu yaz. Sonunda # 📚 Dayanaklar ekle.`
      : `Soru: ${query}

${grounding.groundingBlock}

Bu bağlamla soruyu analiz et. Sonunda # 📚 Dayanaklar ekle.`;

    const { text: report } = await generateLegalText({
      system: systemPrompt,
      prompt: userPrompt,
      maxOutputTokens: 2000,
      temperature: 0.2,
    });

    return NextResponse.json({
      query,
      fileName: fileName || null,
      context,
      allowedCites: grounding.allowedCites,
      report,
      message: "Analiz tamamlandı",
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
