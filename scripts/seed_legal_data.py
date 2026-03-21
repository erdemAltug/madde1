#!/usr/bin/env python3
"""
Turkish-NLI/legal_nli_TR_V1 → Supabase public.legal_knowledge (pgvector).

Gerekli ortam:
  OPENAI_API_KEY
  DATABASE_URL  veya  (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_DB_PASSWORD | NEXT_PUBLIC_SUPABASE_PASSWORD)
    (+ isteğe bağlı pooler: SUPABASE_DB_HOST, SUPABASE_DB_PORT, SUPABASE_DB_USER)

Kullanım (proje kökünden; macOS’ta genelde pip yoktur):
  python3 -m pip install -r scripts/requirements-legal-seed.txt
  python3 scripts/seed_legal_data.py
  python3 scripts/seed_legal_data.py --limit 500 --batch-size 32
"""

from __future__ import annotations

import argparse
import json
import os
import random
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable, Iterator

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))

from supabase_pg import connect_postgres, load_env_files, resolve_database_url

# ~8k token için kaba üst sınır (Türkçe)
MAX_CHARS_EMBED = 5000

KEYWORD_CATEGORY: list[tuple[str, str]] = [
    ("maddi tazminat", "is"),
    ("iş sözleşmesi", "is"),
    ("tazminat", "is"),
    ("fesih", "is"),
    ("tahliye", "kira"),
    ("kira", "kira"),
]

ALL_KEYWORDS = [kw for kw, _ in KEYWORD_CATEGORY]


def normalize_for_match(text: str) -> str:
    return text.casefold()


def row_matches(row: dict[str, Any]) -> bool:
    blob = normalize_for_match(
        f"{row.get('premise', '')} {row.get('hypothesis', '')}"
    )
    return any(normalize_for_match(kw) in blob for kw in ALL_KEYWORDS)


def assign_category(premise: str, hypothesis: str) -> str:
    blob = normalize_for_match(f"{premise} {hypothesis}")
    for kw, cat in KEYWORD_CATEGORY:
        if normalize_for_match(kw) in blob:
            return cat
    return "is"


@dataclass
class LegalRow:
    content: str
    hypothesis: str
    label: str
    category: str


def stream_filtered_rows(limit: int) -> Iterator[LegalRow]:
    from datasets import load_dataset

    ds = load_dataset(
        "Turkish-NLI/legal_nli_TR_V1",
        split="train",
        streaming=True,
    )
    count = 0
    for row in ds:
        if not row_matches(row):
            continue
        premise = (row.get("premise") or "").strip()
        if not premise:
            continue
        hyp = (row.get("hypothesis") or "").strip()
        label = str(row.get("label", ""))
        cat = assign_category(premise, hyp)
        yield LegalRow(
            content=premise,
            hypothesis=hyp,
            label=label,
            category=cat,
        )
        count += 1
        if count >= limit:
            break


def backoff_call(fn: Callable[[], Any], *, label: str) -> Any:
    delay = 1.0
    max_delay = 120.0
    for attempt in range(10):
        try:
            return fn()
        except Exception as e:  # noqa: BLE001
            err = str(e).lower()
            retryable = (
                "rate" in err
                or "429" in err
                or "503" in err
                or "timeout" in err
                or "timed out" in err
                or "connection" in err
            )
            if not retryable or attempt == 9:
                print(f"[hata] {label}: {e}", file=sys.stderr)
                raise
            sleep_s = delay + random.uniform(0, 0.35)
            print(
                f"[bekleme] {label} deneme {attempt + 1}, {sleep_s:.1f}s sonra tekrar…",
                file=sys.stderr,
            )
            time.sleep(sleep_s)
            delay = min(delay * 2, max_delay)
    raise RuntimeError("unreachable")


def embed_batch(client: Any, texts: list[str], model: str) -> list[list[float]]:
    def _run() -> list[list[float]]:
        resp = client.embeddings.create(model=model, input=texts)
        return [d.embedding for d in resp.data]

    return backoff_call(_run, label="OpenAI embeddings")


def insert_batch_pg(
    conn: Any,
    rows: list[tuple[str, dict[str, Any], list[float], str]],
) -> None:
    from psycopg2.extras import execute_values

    sql = """
    INSERT INTO public.legal_knowledge (content, metadata, embedding, category)
    VALUES %s
    """
    template = "(%s, %s::jsonb, %s::vector, %s)"
    values = [
        (
            content,
            json.dumps(metadata, ensure_ascii=False),
            "[" + ",".join(str(x) for x in emb) + "]",
            category,
        )
        for content, metadata, emb, category in rows
    ]
    with conn.cursor() as cur:
        execute_values(cur, sql, values, template=template, page_size=len(values))
    conn.commit()


def content_for_store_and_embed(raw: str) -> tuple[str, bool]:
    if len(raw) <= MAX_CHARS_EMBED:
        return raw, False
    return raw[:MAX_CHARS_EMBED], True


def flush_batch(
    client: Any,
    conn: Any,
    buffer: list[LegalRow],
    model: str,
) -> int:
    texts_trunc: list[tuple[str, bool]] = [
        content_for_store_and_embed(r.content) for r in buffer
    ]
    texts = [t[0] for t in texts_trunc]
    embeddings = embed_batch(client, texts, model)

    payload: list[tuple[str, dict[str, Any], list[float], str]] = []
    for r, emb, (t_stored, truncated) in zip(buffer, embeddings, texts_trunc):
        meta = {
            "hypothesis": r.hypothesis,
            "label": r.label,
            "source": "Turkish-NLI/legal_nli_TR_V1",
            "premise_truncated": truncated,
        }
        payload.append((t_stored, meta, emb, r.category))

    backoff_call(
        lambda: insert_batch_pg(conn, payload),
        label="Postgres insert",
    )
    return len(buffer)


def main() -> None:
    load_env_files()
    parser = argparse.ArgumentParser(description="Seed legal_knowledge from HF NLI dataset")
    parser.add_argument("--limit", type=int, default=1000, help="Max rows to ingest")
    parser.add_argument("--batch-size", type=int, default=50, help="OpenAI + DB batch size")
    parser.add_argument(
        "--model",
        default="text-embedding-3-small",
        help="OpenAI embedding model (1536-d for -small)",
    )
    args = parser.parse_args()

    if not os.environ.get("OPENAI_API_KEY"):
        print("OPENAI_API_KEY tanımlı değil.", file=sys.stderr)
        sys.exit(1)

    db_url, try_pooler_fallback = resolve_database_url()
    from openai import OpenAI

    openai_client = OpenAI()
    conn = connect_postgres(db_url, try_pooler_fallback)

    buffer: list[LegalRow] = []
    total_inserted = 0

    try:
        for row in stream_filtered_rows(args.limit):
            buffer.append(row)
            if len(buffer) < args.batch_size:
                continue
            n = flush_batch(openai_client, conn, buffer, args.model)
            total_inserted += n
            print(f"İşlendi (eklenen): {total_inserted}/{args.limit} …")
            buffer.clear()

        if buffer:
            n = flush_batch(openai_client, conn, buffer, args.model)
            total_inserted += n
            print(f"İşlendi (eklenen): {total_inserted}/{args.limit} …")

    finally:
        conn.close()

    print(f"Bitti. Toplam eklenen satır: {total_inserted}.")


if __name__ == "__main__":
    main()
