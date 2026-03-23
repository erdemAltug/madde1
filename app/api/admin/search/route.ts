import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Sabit threshold - kullanıcı slider görmeyecek
const MATCH_THRESHOLD = 0.45;
const LAW_ARTICLE_COUNT = 3; // En alakalı 3 kanun maddesi
const LEGAL_KNOWLEDGE_COUNT = 2; // En alakalı 2 emsal kararı

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const dbPassword = process.env.SUPABASE_DB_PASSWORD ||
    (process.env.DATABASE_URL ? process.env.DATABASE_URL.split(':')[2]?.split('@')[0] : null);

  if (!supabaseUrl || !supabaseAnonKey || !dbPassword) {
    return NextResponse.json(
      { error: `Supabase config eksik: URL=${!!supabaseUrl}, ANON=${!!supabaseAnonKey}, PASS=${!!dbPassword}` },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  });

  try {
    const { query, fileContent, fileName } = await request.json();

    // Kullanıcı query veya dosya içeriği olmalı
    if (!query && !fileContent) {
      return NextResponse.json(
        { error: "Query veya dosya içeriği gereklidir." },
        { status: 400 }
      );
    }

    // Generate embedding using OpenAI
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: "OpenAI API key bulunamadı." },
        { status: 500 }
      );
    }

    // Determine search text - if file content exists, use it as primary
    const searchText = fileContent || query;

    const embeddingResponse = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: searchText,
      }),
    });

    if (!embeddingResponse.ok) {
      const error = await embeddingResponse.text();
      throw new Error(`OpenAI embedding error: ${error}`);
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data?.[0]?.embedding;

    if (!embedding) {
      return NextResponse.json(
        { error: "Embedding oluşturulamadı." },
        { status: 500 }
      );
    }

    console.log("=== Hybrid RAG Search ===");
    console.log("Query:", query);
    console.log("File:", fileName);
    console.log("Embedding dimension:", embedding.length);

    // Query law_articles table (kanun maddeleri)
    const { data: lawArticles, error: lawError } = await supabase.rpc("match_law_articles", {
      query_embedding: embedding,
      match_threshold: MATCH_THRESHOLD,
      match_count: LAW_ARTICLE_COUNT,
      filter_category: null,
    });

    if (lawError) {
      console.error("law_articles RPC Hata:", lawError);
    }

    // Query legal_knowledge table (emsal kararlar)
    const { data: legalKnowledge, error: legalError } = await supabase.rpc("match_legal_knowledge", {
      query_embedding: embedding,
      match_threshold: MATCH_THRESHOLD,
      match_count: LEGAL_KNOWLEDGE_COUNT,
      filter_category: null,
    });

    if (legalError) {
      console.error("legal_knowledge RPC Hata:", legalError);
    }

    console.log("law_articles sonuc:", lawArticles?.length || 0);
    console.log("legal_knowledge sonuc:", legalKnowledge?.length || 0);

    // Prepare context from results
    const lawArticlesContext = (lawArticles || []).map((item: any) => ({
      type: "kanun_maddesi",
      id: item.id,
      content: item.content,
      metadata: item.metadata,
      source: item.source,
      category: item.category,
      similarity: item.similarity,
    }));

    const legalKnowledgeContext = (legalKnowledge || []).map((item: any) => {
      const content = item.full_content || item.content || "";
      return {
        type: "emsal_karar",
        id: item.id,
        content: content,
        metadata: item.metadata,
        category: item.category,
        similarity: item.similarity,
      };
    });

    // Combine context
    const context = [...lawArticlesContext, ...legalKnowledgeContext];

    console.log("Toplam context:", context.length);

    // If no results, return empty
    if (context.length === 0) {
      return NextResponse.json({
        query,
        context: [],
        report: null,
        message: "Bu soru/içerik için uygun kanun maddesi veya emsal kararı bulunamadı."
      });
    }

    // Generate AI report using OpenAI
    const contextText = context.map((c: any) => {
      const header = c.type === "kanun_maddesi" 
        ? `[KANUN MADDESİ - ${c.category || 'hukuk'}]`
        : `[EMSAL KARAR - ${c.category || 'hukuk'}]`;
      
      const qa = c.metadata?.soru && c.metadata?.cevap
        ? `\nSoru: ${c.metadata.soru}\nCevap: ${c.metadata.cevap}`
        : '';
      
      return `${header}\n${c.content.substring(0, 2000)}${qa}`;
    }).join("\n\n---\n\n");

    // Build system and user prompts based on whether file was uploaded
    let systemPrompt: string;
    let userPrompt: string;

    if (fileContent && fileName) {
      // Document-focused analysis
      systemPrompt = `Sen uzman bir Türk hukukçususun. Sana yüklenen bir hukuk belgesi ve kullanıcının sorusu sağlandı. Görevin:

1. Belgenin özetini ve hukuki niteliğini belirle.
2. Belgedeki riskli maddeleri veya kullanıcı lehine/aleyhine olan durumları tespit et.
3. Bu durumu ilgili Kanun Maddeleri ve Yargıtay Kararları ile destekleyerek raporla.

Yanıtını Türkçe olarak, profesyonel bir hukuki danışmanlık formatında yaz.`;

      userPrompt = `Yüklenen Dosya: ${fileName}

Dosya İçeriği:
${fileContent.substring(0, 5000)}

Kullanıcı Sorusu: ${query || "Dosya hakkında genel analiz yapılması isteniyor"}

İlgili Kanun Maddeleri ve Emsal Kararlar:
${contextText}

Lütfen yukarıdaki belgeyi, soruyu ve mevzuatı analiz ederek profesyonel bir hukuki değerlendirme raporu oluştur.`;
    } else {
      // Regular query analysis
      systemPrompt = `Sen uzman bir Türk hukukçusun. Verilen Kanun Maddeleri ve Yargıtay Kararları ışığında soruyu analiz et. Yanıtında önce ilgili kanun maddesini, sonra yargı pratiğini (içtihat) belirt ve somut bir öneriyle bitir. Yanıtını Türkçe olarak, profesyonel bir hukuki danışmanlık formatında yaz.`;

      userPrompt = `Soru: ${query}

Bağlam:
${contextText}

Lütfen yukarıdaki kanun maddeleri ve emsal kararlar ışığında bu soruyu analiz et.`;
    }

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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

    if (!aiResponse.ok) {
      const error = await aiResponse.text();
      console.error("OpenAI GPT Hata:", error);
      throw new Error(`OpenAI GPT error: ${error}`);
    }

    const aiData = await aiResponse.json();
    const report = aiData.choices?.[0]?.message?.content || "Rapor oluşturulamadı.";

    return NextResponse.json({
      query,
      fileName,
      context,
      report,
      debug: {
        lawArticlesCount: lawArticles?.length || 0,
        legalKnowledgeCount: legalKnowledge?.length || 0,
        threshold: MATCH_THRESHOLD,
      }
    });

  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
