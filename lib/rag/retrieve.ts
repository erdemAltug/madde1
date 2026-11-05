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
  type StatuteRef,
} from "@/lib/rag/query-signals";
import {
  blendRetrievalScore,
  dedupeKey,
  lexicalOverlap,
  reciprocalRankFusion,
} from "@/lib/rag/rerank";
import type { LegalGrounding, RagHit, RagHitType } from "@/lib/rag/types";

const MATCH_THRESHOLD = 0.42;
const LAW_PER_QUERY = 3;
const EMSAL_PER_QUERY = 2;
const MAX_TOTAL_HITS = 8;
const MAX_CONTENT_CHARS = 1800;
const FTS_COUNT = 6;
/** RRF katkısının ağırlığı: iki kanalda da üstte çıkan kaynak ~+0.5 alır */
const RRF_WEIGHT = 15;

type MatchRow = {
  id: string;
  content?: string;
  full_content?: string | null;
  metadata?: Record<string, unknown> | null;
  category?: string | null;
  source?: string | null;
  similarity: number;
};

type FtsRow = Omit<MatchRow, "similarity"> & {
  source_table: "law_articles" | "legal_knowledge";
  rank: number;
};

export type RetrieveOptions = {
  contractText: string;
  persona?: PersonaId;
  /**
   * "full" = clause + boost; "light" = tek gömme (teaser);
   * "chat" = sohbet: bağlamlı soru + genişletme + tam metin kanalı
   */
  mode?: "full" | "light" | "chat";
  /** chat modunda: önceki kullanıcı mesajlarıyla zenginleştirilmiş arama metni */
  retrievalQuery?: string;
  /** Planlayıcının önerdiği maddeler — resmi metinden birebir çekilir */
  extraRefs?: StatuteRef[];
};

/** Kanun no + madde no ile resmi metni birebir getirir (planlayıcı / atıf doğrulama). */
export async function lookupStatutes(refs: StatuteRef[]): Promise<RagHit[]> {
  const supabase = getSupabaseService();
  if (!supabase || refs.length === 0) return [];
  const out: RagHit[] = [];
  await Promise.all(
    refs.map(async (ref) => {
      const { data, error } = await supabase.rpc("lookup_law_articles_by_madde", {
        filter_kanun_no: ref.kanunNo,
        filter_madde_no: ref.maddeNo,
        match_count: 2,
      });
      if (error) {
        console.error("[rag] lookup", error.message);
        return;
      }
      const rows = (data || []) as MatchRow[];
      // Resmi kaynak (mevzuat.gov.tr) önce
      rows.sort((a, b) => Number(b.metadata?.origin === "mevzuat.gov.tr") - Number(a.metadata?.origin === "mevzuat.gov.tr"));
      const row = rows[0];
      if (row) out.push(rowToHit(row, "kanun_maddesi", true));
    }),
  );
  return out;
}

/**
 * Hibrit Legal RAG: vektör (law_articles + legal_knowledge) + tam metin (tsvector)
 * + kanun/madde metadata eşleşmesi; Reciprocal Rank Fusion ile birleştirilir.
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

  const searchText = opts.retrievalQuery?.trim() || opts.contractText;
  const statuteRefs = dedupeRefs([...parseStatuteRefs(searchText).slice(0, 3), ...(opts.extraRefs ?? [])]).slice(0, 8);
  const expansion = expandLegalQuery(searchText);
  const queries = (
    mode === "light"
      ? [buildLightEmbedText(opts.contractText)]
      : mode === "chat"
        ? [buildLightEmbedText(searchText), expansion]
        : [
            ...extractContractQueries(opts.contractText, { maxQueries: 3 }),
            ...personaBoostQueries(persona).slice(0, expansion ? 1 : 2),
            expansion,
          ]
  )
    .filter((q) => q.trim().length > 0)
    .slice(0, 5);

  if (queries.length === 0 && statuteRefs.length === 0) return empty;

  const hitMap = new Map<string, RagHit>();
  /** Kanal sıralamaları (en iyiden kötüye id listeleri) — RRF girdisi */
  const rankings: string[][] = [];

  const exactChannel = lookupStatutes(statuteRefs).then((hits) => {
    for (const h of hits) mergeHit(hitMap, h);
  });

  const vectorChannel = Promise.all(
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

      const lawRows = (lawRes.data || []) as MatchRow[];
      const emsalRows = (emsalRes.data || []) as MatchRow[];
      for (const row of lawRows) {
        mergeHit(hitMap, rowToHit(row, "kanun_maddesi", false));
      }
      for (const row of emsalRows) {
        mergeHit(hitMap, rowToHit(row, knowledgeHitType(row), false));
      }
      rankings.push(
        lawRows.map((r) => r.id),
        emsalRows.map((r) => r.id),
      );
    }),
  );

  const fullTextChannel = async () => {
    if (mode === "light") return;
    const ftsQuery = buildFtsQuery(searchText, expansion);
    if (!ftsQuery) return;
    const { data, error } = await supabase.rpc("search_legal_fulltext", {
      query_text: ftsQuery,
      match_count: FTS_COUNT,
      filter_category: filterCategory,
    });
    if (error) {
      // 013 migration uygulanmadıysa sessizce vektör-only devam
      if (!/does not exist|could not find/i.test(error.message)) {
        console.error("[rag] search_legal_fulltext", error.message);
      }
      return;
    }
    const rows = (data || []) as FtsRow[];
    for (const row of rows) {
      const asMatch: MatchRow = { ...row, similarity: MATCH_THRESHOLD };
      const type: RagHitType =
        row.source_table === "law_articles"
          ? "kanun_maddesi"
          : knowledgeHitType(asMatch);
      // Tam metin skoru kosinüs ölçeğinde değil; benzerliğe taban değer verilir,
      // sıralamaya katkısı RRF üzerinden gelir.
      mergeHit(hitMap, rowToHit(asMatch, type, false));
    }
    rankings.push(rows.map((r) => r.id));
  };

  await Promise.all([exactChannel, vectorChannel, fullTextChannel()]);

  const rankQuery = `${searchText.slice(0, 500)}\n${expansion}`;
  const fused = reciprocalRankFusion(rankings);
  const score = (h: RagHit) =>
    blendRetrievalScore(
      h.similarity,
      lexicalOverlap(rankQuery, h.content),
      Boolean(h.exact),
    ) +
    (fused.get(h.id) ?? 0) * RRF_WEIGHT +
    // Resmi güncel metin, eski soru-cevap veri setinden önce gelir
    (h.metadata?.origin === "mevzuat.gov.tr" ? 0.15 : 0);

  const seen = new Set<string>();
  const hits = [...hitMap.values()]
    .sort((a, b) => score(b) - score(a))
    .filter((h) => {
      const key = dedupeKey(h.citeLabel, h.content);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
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

function dedupeRefs(refs: StatuteRef[]): StatuteRef[] {
  const seen = new Set<string>();
  return refs.filter((r) => {
    const k = `${r.kanunNo}:${r.maddeNo}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** websearch_to_tsquery için: anlamlı kelimeler "or" ile; kısa ve dolgu kelimeler atılır. */
const FTS_STOP = new Set([
  "için", "icin", "olan", "olarak", "gibi", "daha", "kadar", "veya", "ancak",
  "benim", "bana", "nasıl", "nasil", "neden", "midir", "mıdır", "mudur", "müdür",
  "şimdi", "simdi", "acaba", "lütfen", "lutfen", "hakkım", "hakkim", "yani",
]);

function buildFtsQuery(text: string, expansion: string): string {
  const words = `${text.slice(0, 600)} ${expansion}`
    .toLocaleLowerCase("tr-TR")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length >= 4 && !FTS_STOP.has(w));
  return [...new Set(words)].slice(0, 12).join(" or ");
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
  if (!prev || hit.similarity > prev.similarity || (hit.exact && !prev.exact)) {
    map.set(hit.id, hit);
  }
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
