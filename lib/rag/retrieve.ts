import { getSupabaseService } from "@/lib/supabase/service";
import type { PersonaId } from "@/lib/personas";
import { extractContractQueries } from "@/lib/rag/chunk-contract";
import { embedText } from "@/lib/rag/embed";
import {
  personaBoostQueries,
  personaCategoryFilter,
} from "@/lib/rag/persona-boost";
import { buildCiteLabel } from "@/lib/rag/cite";
import type { LegalGrounding, RagHit } from "@/lib/rag/types";

const MATCH_THRESHOLD = 0.42;
const LAW_PER_QUERY = 3;
const EMSAL_PER_QUERY = 2;
const MAX_TOTAL_HITS = 8;
const MAX_CONTENT_CHARS = 1800;

type MatchRow = {
  id: string;
  content?: string;
  full_content?: string;
  metadata?: Record<string, unknown> | null;
  category?: string | null;
  source?: string | null;
  similarity: number;
};

export type RetrieveOptions = {
  contractText: string;
  persona?: PersonaId;
  /** "full" = clause + boost; "light" = tek gömme (teaser) */
  mode?: "full" | "light";
};

/**
 * Hibrit Legal RAG: sözleşme parçaları + persona boost → law_articles + legal_knowledge.
 * Embedding veya Supabase yoksa boş döner (analiz prompt-only devam eder).
 */
export async function retrieveLegalGrounding(
  opts: RetrieveOptions,
): Promise<LegalGrounding> {
  const empty: LegalGrounding = {
    hits: [],
    groundingBlock: "",
    allowedCites: [],
    retrieved: false,
  };

  const supabase = getSupabaseService();
  if (!supabase) return empty;

  const persona = opts.persona ?? "general";
  const mode = opts.mode ?? "full";
  const filterCategory = personaCategoryFilter(persona);

  const queries =
    mode === "light"
      ? [opts.contractText.slice(0, 2500)]
      : [
          ...extractContractQueries(opts.contractText, { maxQueries: 3 }),
          ...personaBoostQueries(persona).slice(0, 2),
        ].slice(0, 5);

  if (queries.length === 0) return empty;

  const hitMap = new Map<string, RagHit>();

  await Promise.all(
    queries.map(async (q) => {
      const embedding = await embedText(q);
      if (!embedding) return;

      const [lawRes, emsalRes] = await Promise.all([
        supabase.rpc("match_law_articles", {
          query_embedding: embedding,
          match_threshold: MATCH_THRESHOLD,
          match_count: mode === "light" ? 3 : LAW_PER_QUERY,
          filter_category: filterCategory,
        }),
        supabase.rpc("match_legal_knowledge", {
          query_embedding: embedding,
          match_threshold: MATCH_THRESHOLD,
          match_count: mode === "light" ? 1 : EMSAL_PER_QUERY,
          filter_category: filterCategory,
        }),
      ]);

      if (lawRes.error) {
        console.error("[rag] match_law_articles", lawRes.error.message);
      }
      if (emsalRes.error) {
        console.error("[rag] match_legal_knowledge", emsalRes.error.message);
      }

      for (const row of (lawRes.data || []) as MatchRow[]) {
        mergeHit(hitMap, rowToHit(row, "kanun_maddesi"));
      }
      for (const row of (emsalRes.data || []) as MatchRow[]) {
        mergeHit(hitMap, rowToHit(row, "emsal_karar"));
      }
    }),
  );

  const hits = [...hitMap.values()]
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, MAX_TOTAL_HITS);

  if (hits.length === 0) return empty;

  const allowedCites = hits.map((h) => h.citeLabel);
  const groundingBlock = formatGroundingBlock(hits, allowedCites);

  return {
    hits,
    groundingBlock,
    allowedCites,
    retrieved: true,
  };
}

function rowToHit(
  row: MatchRow,
  type: RagHit["type"],
): RagHit {
  const content = (row.full_content || row.content || "").trim();
  return {
    id: row.id,
    type,
    content: content.slice(0, MAX_CONTENT_CHARS),
    category: row.category,
    source: row.source,
    similarity: Number(row.similarity) || 0,
    metadata: row.metadata ?? null,
    citeLabel: buildCiteLabel({
      type,
      content,
      category: row.category,
      source: row.source,
      metadata: row.metadata,
      id: row.id,
    }),
  };
}

function mergeHit(map: Map<string, RagHit>, hit: RagHit) {
  if (!hit.content) return;
  const prev = map.get(hit.id);
  if (!prev || hit.similarity > prev.similarity) map.set(hit.id, hit);
}

function formatGroundingBlock(hits: RagHit[], allowedCites: string[]): string {
  const lines = hits.map((h, i) => {
    const header =
      h.type === "kanun_maddesi"
        ? `### Kaynak ${i + 1} — KANUN [${h.citeLabel}] (benzerlik ${h.similarity.toFixed(2)})`
        : `### Kaynak ${i + 1} — EMSAL [${h.citeLabel}] (benzerlik ${h.similarity.toFixed(2)})`;
    const metaBits = [
      h.source ? `Kaynak: ${h.source}` : null,
      h.category ? `Kategori: ${h.category}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    return `${header}\n${metaBits ? metaBits + "\n" : ""}${h.content}`;
  });

  return `## DOĞRULANMIŞ HUKUKİ BAĞLAM (vektör DB — Clause Legal RAG)
Aşağıdaki metinler sistem tarafından getirildi. Analizde madde numarası veya emsal atıfı YALNIZCA bu listedeki etiketlerle yapılabilir.

İzinli atıf etiketleri: ${allowedCites.join(" | ")}

Kurallar:
1) Listede olmayan kanun madde numarası UYDURMA.
2) Bağlam yetersizse "bu noktada doğrulanmış madde atıfı yok; genel risk değerlendirmesi" yaz.
3) Her kritik riskte mümkünse ilgili [atıf etiketi] kullan.
4) Emsal kararları bağlayıcı kanun gibi sunma; "yargı pratiği / emsal eğilimi" diye nitelendir.

${lines.join("\n\n---\n\n")}`;
}
