#!/usr/bin/env python3
"""
Turkish Law Dataset CSV → Supabase public.law_articles (pgvector).

Score >= 7 olan satırları filtrele.
context sütununu content olarak, soru/cevap ikilisini metadata (JSONB) olarak kaydet.
Her satırı text-embedding-3-small (1536-d) modeliyle vektörle.

Kullanım:
  python3 scripts/seed_law_articles.py
  python3 scripts/seed_law_articles.py --limit 5000 --batch-size 32
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import random
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable, Iterator

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))

from supabase_pg import connect_postgres, load_env_files, resolve_database_url

# Karakter limitleri
MAX_CHARS_STORE = 15000  # Veritabanında saklanacak max karakter
MAX_CHARS_EMBED = 3000   # Vektörlenecek max karakter


def backoff_call(fn: Callable[[], Any], *, label: str) -> Any:
    """Exponential backoff for API calls."""
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
    """OpenAI embedding batch."""
    def _run() -> list[list[float]]:
        resp = client.embeddings.create(model=model, input=texts)
        return [d.embedding for d in resp.data]

    return backoff_call(_run, label="OpenAI embeddings")


def insert_batch_pg(
    conn: Any,
    rows: list[tuple[str, dict[str, Any], list[float], str, str, int]],
) -> None:
    """Insert law_articles batch."""
    from psycopg2.extras import execute_values

    sql = """
    INSERT INTO public.law_articles (content, metadata, embedding, category, source, score)
    VALUES %s
    """
    template = "(%s, %s::jsonb, %s::vector, %s, %s, %s)"
    values = [
        (
            content,
            json.dumps(metadata, ensure_ascii=False),
            "[" + ",".join(str(x) for x in emb) + "]",
            category,
            source,
            score,
        )
        for content, metadata, emb, category, source, score in rows
    ]
    with conn.cursor() as cur:
        execute_values(cur, sql, values, template=template, page_size=len(values))
    conn.commit()


def truncate_text(text: str, max_chars: int) -> str:
    """Truncate text to max characters."""
    if len(text) <= max_chars:
        return text
    return text[:max_chars]


def process_row(row: dict[str, Any]) -> tuple[str, dict[str, Any], str, str, int] | None:
    """
    Process a CSV row and return (content_for_embed, metadata, category, source, score).
    Returns None if score < 7.
    """
    try:
        # Get fields
        soru = (row.get("soru") or "").strip()
        cevap = (row.get("cevap") or "").strip()
        veri_turu = (row.get("veri türü") or "").strip()
        kaynak = (row.get("kaynak") or "").strip()
        context = (row.get("context") or "").strip()
        
        # Parse score
        score_str = row.get("Score", "0")
        try:
            score = int(score_str)
        except (ValueError, TypeError):
            score = 0
        
        # Filter: only score >= 7
        if score < 7:
            return None
        
        # Prepare content for embedding (truncated context)
        content_for_embed = truncate_text(context, MAX_CHARS_EMBED)
        
        # Prepare metadata as JSON
        metadata = {
            "soru": soru,
            "cevap": cevap,
            "veri_turu": veri_turu,
        }
        
        # Category from veri_türü
        category = veri_turu if veri_turu else "hukuk"
        
        # Source from kaynak
        source = kaynak if kaynak else "Türk Hukuk Veriseti"
        
        return (content_for_embed, metadata, category, source, score)
        
    except Exception as e:
        print(f"[uyari] Satir islenirken hata: {e}", file=sys.stderr)
        return None


def stream_csv_rows(csv_path: Path, limit: int) -> Iterator[dict[str, Any]]:
    """Stream CSV rows."""
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        count = 0
        for row in reader:
            yield row
            count += 1
            if count >= limit:
                break


def flush_batch(
    client: Any,
    conn: Any,
    buffer: list[tuple[str, dict[str, Any], str, str, int]],
    model: str,
) -> int:
    """Process and insert a batch."""
    if not buffer:
        return 0
    
    # Extract texts for embedding
    texts_for_embed = [item[0] for item in buffer]
    
    print(f"   [EMBED] Islenen kayit: {len(texts_for_embed)}")
    
    # Get embeddings
    embeddings = embed_batch(client, texts_for_embed, model)
    
    # Prepare payload
    payload: list[tuple[str, dict[str, Any], list[float], str, str, int]] = []
    for (content, metadata, category, source, score), emb in zip(buffer, embeddings):
        # Truncate content for storage
        content_stored = truncate_text(content, MAX_CHARS_STORE)
        payload.append((content_stored, metadata, emb, category, source, score))
    
    backoff_call(
        lambda: insert_batch_pg(conn, payload),
        label="Postgres insert (law_articles)",
    )
    return len(buffer)


def main() -> None:
    load_env_files()
    
    # CSV path
    csv_path = _SCRIPT_DIR / "turkish_law_dataset.csv"
    if not csv_path.exists():
        print(f"Hata: CSV dosyasi bulunamadi: {csv_path}", file=sys.stderr)
        sys.exit(1)
    
    parser = argparse.ArgumentParser(description="Seed law_articles from Turkish Law CSV")
    parser.add_argument("--limit", type=int, default=100000, help="Max rows to ingest")
    parser.add_argument("--batch-size", type=int, default=50, help="OpenAI + DB batch size")
    parser.add_argument(
        "--model",
        default="text-embedding-3-small",
        help="OpenAI embedding model (1536-d for -small)",
    )
    args = parser.parse_args()

    if not os.environ.get("OPENAI_API_KEY"):
        print("OPENAI_API_KEY tanimli degil.", file=sys.stderr)
        sys.exit(1)

    db_url, try_pooler_fallback = resolve_database_url()
    from openai import OpenAI

    openai_client = OpenAI()
    conn = connect_postgres(db_url, try_pooler_fallback)

    buffer: list[tuple[str, dict[str, Any], str, str, int]] = []
    total_inserted = 0
    total_filtered = 0

    try:
        for row in stream_csv_rows(csv_path, args.limit):
            processed = process_row(row)
            if processed is None:
                total_filtered += 1
                continue
            
            buffer.append(processed)
            
            if len(buffer) < args.batch_size:
                continue
            
            n = flush_batch(openai_client, conn, buffer, args.model)
            total_inserted += n
            print(f"Islendi (eklenen): {total_inserted}/{args.limit} … (filtrelenen: {total_filtered})")
            buffer.clear()

        if buffer:
            n = flush_batch(openai_client, conn, buffer, args.model)
            total_inserted += n
            print(f"Islendi (eklenen): {total_inserted}/{args.limit} … (filtrelenen: {total_filtered})")

    finally:
        conn.close()

    print(f"Bitti. Toplam eklenen satir: {total_inserted}")
    print(f"Filtrelenen (score < 7): {total_filtered}")


if __name__ == "__main__":
    main()
