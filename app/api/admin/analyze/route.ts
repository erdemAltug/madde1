import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    return NextResponse.json(
      { error: "API key bulunamadı." },
      { status: 500 }
    );
  }

  try {
    const { query, report, context, fileContent } = await request.json();

    if (!report) {
      return NextResponse.json(
        { error: "Analiz verisi gereklidir." },
        { status: 400 }
      );
    }

    // Prepare context from legal knowledge
    const contextText = context?.map((c: { type: string; category?: string; content: string; metadata?: { soru?: string; cevap?: string } }) => {
      const header = c.type === "kanun_maddesi"
        ? `[KANUN MADDESİ - ${c.category || 'hukuk'}]`
        : `[EMSAL KARAR - ${c.category || 'hukuk'}]`;
      
      const qa = c.metadata?.soru && c.metadata?.cevap
        ? `\nSoru: ${c.metadata.soru}\nCevap: ${c.metadata.cevap}`
        : '';
      
      return `${header}\n${c.content.substring(0, 2000)}${qa}`;
    }).join("\n\n---\n\n");

    const fileContext = fileContent ? `\n\nYüklenen Belge İçeriği:\n${fileContent.substring(0, 5000)}` : "";

    const systemPrompt = `Sen uzman bir Türk hukukçususun. Verilen analiz, kanun maddeleri ve (varsa) kullanıcının yüklediği belgeye dayanarak resmi, profesyonel bir dava dilekçesi veya ihtarname taslağı oluştur.`;

    const userPrompt = `Soru: ${query || "Dosya analizi"}${fileContext}\n\nAnaliz:\n${report}\n\nKanun Maddeleri:\n${contextText}\n\nYukarıdaki bilgileri kullanarak boşlukları doldurulmaya hazır bir dilekçe taslağı oluştur.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI GPT error: ${error}`);
    }

    const data = await response.json();
    const petitionText = data.choices?.[0]?.message?.content || "Dilekçe oluşturulamadı.";

    return NextResponse.json({
      petition: petitionText,
    });

  } catch (error) {
    console.error("Petition generation error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
