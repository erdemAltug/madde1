#!/usr/bin/env python3
"""
legal_knowledge tablosunda vektör benzerliği testi (cosine).

1) OPENAI_API_KEY + Postgres (.env.local — seed ile aynı)
2) Önce migration: supabase/migrations/003_match_legal_knowledge_rpc.sql
   → npm run db:migrate  veya  node scripts/db-migrate.mjs supabase/migrations/003_match_legal_knowledge_rpc.sql

Kullanım:
  python3 scripts/test_vector_search.py
  python3 scripts/test_vector_search.py --top-k 5 --raw-sql
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))

import os

from supabase_pg import connect_postgres, load_env_files, resolve_database_url

DEFAULT_QUERY = (
    "Kira sözleşmesinde haksız tahliye durumunda tazminat hakları nelerdir?"
)


def embedding_to_literal(vec: list[float]) -> str:
    return "[" + ",".join(str(x) for x in vec) + "]"


def fetch_via_rpc(cur, vec_lit: str, top_k: int) -> list[tuple]:
    cur.execute(
        "select id, content, category, similarity from match_legal_knowledge(%s::vector(1536), %s, null)",
        (vec_lit, top_k),
    )
    return cur.fetchall()


def fetch_via_raw_sql(cur, vec_lit: str, top_k: int) -> list[tuple]:
    cur.execute(
        """
        select id, content, category,
               (1 - (embedding <=> %s::vector(1536)))::double precision as similarity
        from public.legal_knowledge
        where embedding is not null
        order by embedding <=> %s::vector(1536) asc
        limit %s
        """,
        (vec_lit, vec_lit, top_k),
    )
    return cur.fetchall()


def main() -> None:
    load_env_files()
    parser = argparse.ArgumentParser(description="Test legal_knowledge vector search")
    parser.add_argument(
        "--query",
        "-q",
        default=DEFAULT_QUERY,
        help="Arama metni",
    )
    parser.add_argument("--top-k", type=int, default=3, help="Sonuç sayısı")
    parser.add_argument(
        "--raw-sql",
        action="store_true",
        help="RPC yerine doğrudan <=> sorgusu kullan",
    )
    parser.add_argument(
        "--model",
        default="text-embedding-3-small",
        help="OpenAI embedding modeli",
    )
    args = parser.parse_args()

    if not os.environ.get("OPENAI_API_KEY"):
        print("OPENAI_API_KEY tanımlı değil.", file=sys.stderr)
        sys.exit(1)

    from openai import OpenAI

    client = OpenAI()
    emb_resp = client.embeddings.create(model=args.model, input=[args.query])
    vec = emb_resp.data[0].embedding
    if len(vec) != 1536:
        print(f"Beklenen 1536 boyut, gelen: {len(vec)}", file=sys.stderr)
        sys.exit(1)
    vec_lit = embedding_to_literal(vec)

    db_url, try_fb = resolve_database_url()
    conn = connect_postgres(db_url, try_fb)

    import psycopg2

    try:
        with conn.cursor() as cur:
            if args.raw_sql:
                rows = fetch_via_raw_sql(cur, vec_lit, args.top_k)
                mode = "raw SQL (cosine distance <=>)"
            else:
                try:
                    rows = fetch_via_rpc(cur, vec_lit, args.top_k)
                    mode = "RPC match_legal_knowledge"
                except psycopg2.Error as e:
                    err = str(e).lower()
                    pgcode = getattr(e, "pgcode", None)
                    if (
                        "match_legal_knowledge" in err
                        or "does not exist" in err
                        or pgcode == "42883"
                    ):
                        print(
                            "RPC bulunamadı. Şunu uygulayın:\n"
                            "  node scripts/db-migrate.mjs supabase/migrations/003_match_legal_knowledge_rpc.sql\n"
                            "veya --raw-sql ile tekrar deneyin.\n",
                            file=sys.stderr,
                        )
                        print(f"Hata: {e}", file=sys.stderr)
                        sys.exit(1)
                    raise

        print(f"Mod: {mode}")
        print(f"Sorgu: {args.query!r}\n")
        print(f"{'#':<3} {'similarity':>12}  {'category':<6}  content (özet)")
        print("-" * 80)
        for i, row in enumerate(rows, 1):
            _id, content, category, sim = row
            excerpt = (content or "").replace("\n", " ").strip()
            if len(excerpt) > 200:
                excerpt = excerpt[:200] + "…"
            print(f"{i:<3} {float(sim):12.4f}  {str(category or ''):<6}  {excerpt}")
        if not rows:
            print("(Sonuç yok — legal_knowledge boş veya embedding null.)")
    finally:
        conn.close()


if __name__ == "__main__":
    main()
