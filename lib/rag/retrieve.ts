import { getSupabaseService } from "@/lib/supabase/service";
import type { PersonaId } from "@/lib/personas";
import { extractContractQueries } from "@/lib/rag/chunk-contract";
import { embedText } from "@/lib/rag/embed";
import {
  personaBoostQueries,
  personaCategoryFilter,
} from "@/lib/rag/persona-boost";
import { buildCiteLabel } from "@/lib/rag/cite";
import {
  buildLightEmbedText,
  expandLegalQuery,
  parseStatuteRefs,
} from "@/lib/rag/query-signals";
import { blendRetrievalScore, lexicalOverlap } from "@/lib/rag/rerank";
import type { LegalGrounding, RagHit, RagHitType } from "@/lib/rag/types";

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

  const statuteRefs = parseStatuteRefs(opts.contractText).slice(0, 3);
  const expansion = expandLegalQuery(opts.contractText);
  const queries =
    mode === "light"
      ? [buildLightEmbedText(opts.contractText)]
      : [
          ...extractContractQueries(opts.contractText, { maxQueries: 3 }),
          ...personaBoostQueries(persona).slice(0, expansion ? 1 : 2),
          ...(expansion ? [expansion] : []),
        ]
          .filter((q) => q.trim().length > 0)
          .slice(0, 5);

  if (queries.length === 0 && statuteRefs.length === 0) return empty;

  const hitMap = new Map<string, RagHit>();

  await Promise.all(
    statuteRefs.map(async (ref) => {
      const { data, error } = await supabase.rpc("lookup_law_articles_by_madde", {
        filter_kanun_no: ref.kanunNo,
        filter_madde_no: ref.maddeNo,
        match_count: 2,
      });
      if (error) {
        console.error("[rag] lookup_law_articles_by_madde", error.message);
        return;
      }
      for (const row of (data || []) as MatchRow[]) {
        mergeHit(hitMap, rowToHit(row, "kanun_maddesi", true));
      }
    }),
  );

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
        mergeHit(hitMap, rowToHit(row, "kanun_maddesi", false));
      }
      for (const row of (emsalRes.data || []) as MatchRow[]) {
        mergeHit(hitMap, rowToHit(row, knowledgeHitType(row), false));
      }
    }),
  );

  const rankQuery = `${opts.contractText.slice(0, 500)}\n${expansion}`;
  const hits = [...hitMap.values()]
    .sort(
      (a, b) =>
        blendRetrievalScore(
          b.similarity,
          lexicalOverlap(rankQuery, b.content),
          Boolean(b.exact),
        ) -
        blendRetrievalScore(
          a.similarity,
          lexicalOverlap(rankQuery, a.content),
          Boolean(a.exact),
        ),
    )
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

function knowledgeHitType(row: MatchRow): RagHitType {
  const md = row.metadata ?? {};
  const esas = md.esas_no ?? md.esas ?? md.karar_no ?? md.kararNo;
  const source = (row.source || "").toLocaleLowerCase("tr-TR");
  if (
    (esas != null && String(esas).trim()) ||
    source.includes("yargıtay") ||
    source.includes("yargitay") ||
    source.includes("danıştay") ||
    source.includes("danistay")
  ) {
    return "emsal_karar";
  }
  return "hukuki_not";
}

function rowToHit(
  row: MatchRow,
  type: RagHit["type"],
  exact: boolean,
): RagHit {
  const content = (row.full_content || row.content || "").trim();
  return {
    id: row.id,
    type,
    exact,
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
    const kind =
      h.type === "kanun_maddesi"
        ? "KANUN"
        : h.type === "emsal_karar"
          ? "EMSAL"
          : "NOT";
    const header = `### Kaynak ${i + 1} — ${kind} [${h.citeLabel}] (benzerlik ${h.similarity.toFixed(2)})`;
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
4) EMSAL satırını bağlayıcı kanun gibi sunma; "yargı pratiği" diye nitelendir.
5) NOT satırı soru-cevap notudur; madde numarası gibi yazma.

${lines.join("\n\n---\n\n")}`;
}
