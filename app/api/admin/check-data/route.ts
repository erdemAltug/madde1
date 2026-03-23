import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const dbPassword = process.env.SUPABASE_DB_PASSWORD ||
    (process.env.DATABASE_URL ? process.env.DATABASE_URL.split(':')[2]?.split('@')[0] : null);

  if (!supabaseUrl || !supabaseAnonKey || !dbPassword) {
    return NextResponse.json(
      { error: "Supabase config eksik" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  });

  // Check table row count
  const { count, error: countError } = await supabase
    .from("legal_knowledge")
    .select("*", { count: "exact", head: true });

  // Get sample data with full content info
  const { data: sampleData, error: sampleError } = await supabase
    .from("legal_knowledge")
    .select("id, content, full_content, category, embedding")
    .limit(5);

  // Check if embeddings exist - use is.not parameter instead of not()
  const { data: embeddingsExist, error: embedError } = await supabase
    .from("legal_knowledge")
    .select("id, embedding")
    .is("embedding", null)
    .not("id", "is", "null")
    .limit(1);

  // Also count total embeddings with a different approach
  const { count: embeddingCount, error: embedCountError } = await supabase
    .from("legal_knowledge")
    .select("id", { count: "exact", head: true })
    .is("embedding", null)
    .not("id", "is", "null");
    
  // Check full_content column
  const { count: fullContentCount, error: fullContentError } = await supabase
    .from("legal_knowledge")
    .select("id", { count: "exact", head: true })
    .not("full_content", "is", "null");

  // Alternative check: just get any row with embedding not null using filter
  const { data: anyEmbedding, error: anyEmbedError } = await supabase
    .from("legal_knowledge")
    .select("id, embedding")
    .filter("embedding", "cs", "{}") // Attempt to filter for non-null array-like
    .limit(1);

  // Direct count approach
  const { data: embedCheckData, error: embedCheckError } = await supabase.rpc(
    "check_embeddings_exist",
    {}
  );

  console.log("Check-data debug:", {
    count: count,
    embeddingCount: embeddingCount,
    fullContentCount: fullContentCount,
    embeddingsExist: embeddingsExist,
    anyEmbedding: anyEmbedding,
    embedError: embedError,
    embedCountError: embedCountError,
    embedCheckError: embedCheckError
  });

  // Better approach - just query sample and check each row's embedding
  const { data: sampleWithEmbed, error: sampleEmbedError } = await supabase
    .from("legal_knowledge")
    .select("id, embedding")
    .limit(10);

  const hasAnyEmbedding = sampleWithEmbed?.some(row => row.embedding !== null && row.embedding !== undefined) || false;
  const embeddingArrayLength = sampleWithEmbed?.filter(row => row.embedding !== null).length || 0;

  return NextResponse.json({
    totalRows: count,
    embeddingCount: embeddingCount || embeddingArrayLength,
    fullContentCount: fullContentCount,
    sampleData: sampleData?.map(d => ({
      id: d.id,
      content: d.content?.substring(0, 100) + "...",
      full_content: d.full_content?.substring(0, 100) + "..." || null,
      category: d.category,
      hasEmbedding: d.embedding !== null && d.embedding !== undefined,
      embeddingLength: d.embedding?.length || 0
    })),
    // Fixed: check both the query result and the sample data
    embeddingsExist: hasAnyEmbedding || (embeddingsExist && embeddingsExist.length > 0),
    debug: {
      sampleWithEmbedCount: sampleWithEmbed?.length || 0,
      hasAnyEmbedding,
      embeddingArrayLength,
      anyEmbeddingCount: anyEmbedding?.length || 0
    },
    errors: {
      countError,
      sampleError,
      embedError,
      embedCountError,
      fullContentError,
      sampleEmbedError
    }
  });
}
