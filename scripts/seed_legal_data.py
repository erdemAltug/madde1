#!/usr/bin/env python3
"""
Turkish-NLI/legal_nli_TR_V1 → Supabase public.legal_knowledge (pgvector).
*** CANAVAR MODE v2.0 - Hukuk Veri Seed Script ***
"""

from __future__ import annotations
import argparse
import json
import os
import random
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable, Iterator

# Proje kökünden importları çözmek için
_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR.parent) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR.parent))

from scripts.supabase_pg import connect_postgres, load_env_files, resolve_database_url

# *** CANAVAR MODE - Limitler ***
MAX_CHARS_STORE = 15000  # Veritabanında saklanacak tam metin
MAX_CHARS_EMBED = 3000   # Vektörlenecek temizlenmiş özet (OpenAI maliyet dostu)

KEYWORD_CATEGORY: list[tuple[str, str]] = [
    ("maddi tazminat", "is"),
    ("iş sözleşmesi", "is"),
    ("tahliye", "kira"),
    ("kira artış", "kira"),
    ("iş kazası", "is"),
    ("kıdem tazminatı", "is"),
]

def clean_legal_boilerplate(text: str) -> str:
    """
    Mahkeme kararlarının başındaki gürültüleri (T.C., Esas, Karar No vb.) temizler.
    Vektör skorunu (similarity) artırmak için en kritik fonksiyondur.
    """
    # 1. Standart başlık bloklarını temizle
    patterns = [
        r"(?i)T\.C\..*?DAİRESİ",
        r"(?i)ESAS NO\s*:\s*\d+/\d+",
        r"(?i)KARAR NO\s*:\s*\d+/\d+",
        r"(?i)MAHKEMESİ\s*:\s*.*?\n",
        r"(?i)HAKİM\s*:\s*.*?\n",
        r"(?i)KATİP\s*:\s*.*?\n",
        r"(?i)DAVACI\s*:\s*.*?\n",
        r"(?i)VEKİLİ\s*:\s*.*?\n",
        r"(?i)DAVALI\s*:\s*.*?\n",
    ]
    
    cleaned = text
    for p in patterns:
        cleaned = re.sub(p, "", cleaned)
    
    # 2. "Gereği düşünüldü", "Özetle" gibi kısımları bul ve oradan başlat
    markers = ["ÖZETLE:", "ÖZET:", "GEREĞİ DÜŞÜNÜLDÜ:", "TÜRK MİLLETİ ADINA"]
    for marker in markers:
        idx = cleaned.upper().find(marker)
        if idx != -1:
            cleaned = cleaned[idx:]
            break
            
    return cleaned.strip()

def stream_filtered_rows(limit: int) -> Iterator[dict]:
    from datasets import load_dataset
    print(f"[*] HuggingFace'den veri seti yükleniyor (Limit: {limit})...")
    
    # Windows/Network hataları için retry mekanizmalı yükleme
    def load_with_retry():
        return load_dataset("Turkish-NLI/legal_nli_TR_V1", split="train", streaming=True)

    ds = backoff_call(load_with_retry, label="HuggingFace Dataset Load")
    
    count = 0
    for row in ds:
        premise = (row.get("premise") or "").strip()
        if not premise: continue
        
        # Sadece ilgili kategorileri al
        cat = "genel"
        blob = premise.lower()
        found = False
        for kw, c in KEYWORD_CATEGORY:
            if kw in blob:
                cat = c
                found = True
                break
        
        if not found and "is" not in blob and "kira" not in blob: continue

        yield {
            "raw_text": premise,
            "hypothesis": row.get("hypothesis", ""),
            "category": cat,
            "label": row.get("label", "")
        }
        count += 1
        if count >= limit: break

def insert_batch_pg(conn: Any, rows: list[tuple]) -> None:
    from psycopg2.extras import execute_values
    sql = """
    INSERT INTO public.legal_knowledge (content, full_content, metadata, embedding, category)
    VALUES %s
    """
    # full_content sütununu kesinlikle dolduruyoruz
    template = "(%s, %s, %s::jsonb, %s::vector, %s)"
    with conn.cursor() as cur:
        execute_values(cur, sql, rows, template=template, page_size=len(rows))
    conn.commit()

def backoff_call(fn: Callable, label: str):
    delay = 1.0
    for attempt in range(5):
        try: return fn()
        except Exception as e:
            print(f"[!] {label} Hatası: {e}. Tekrar deneniyor... ({attempt+1}/5)")
            time.sleep(delay)
            delay *= 2
    raise Exception(f"{label} 5 denemeden sonra başarısız oldu.")

def main():
    load_env_files()
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=1000)
    parser.add_argument("--batch-size", type=int, default=20)
    args = parser.parse_args()

    from openai import OpenAI
    client = OpenAI()
    
    db_url, use_fallback = resolve_database_url()
    conn = connect_postgres(db_url, use_fallback)
    
    print(f"[*] İşlem başlıyor. Hedef: {args.limit} satır.")
    
    buffer = []
    total = 0

    for row_data in stream_filtered_rows(args.limit):
        raw_text = row_data["raw_text"]
        
        # 1. Full Content (15k karakter)
        full_content = raw_text[:MAX_CHARS_STORE]
        
        # 2. Embedding Content (Temizlenmiş 3k karakter)
        embed_ready_text = clean_legal_boilerplate(raw_text)[:MAX_CHARS_EMBED]
        
        buffer.append({
            "embed_text": embed_ready_text,
            "full_text": full_content,
            "cat": row_data["category"],
            "meta": {"hypothesis": row_data["hypothesis"], "label": row_data["label"]}
        })

        if len(buffer) >= args.batch_size:
            # OpenAI Embeddings
            texts_to_embed = [b["embed_text"] for b in buffer]
            resp = client.embeddings.create(model="text-embedding-3-small", input=texts_to_embed)
            embeddings = [d.embedding for d in resp.data]
            
            # DB Payload
            payload = []
            for i, b in enumerate(buffer):
                payload.append((
                    b["embed_text"],
                    b["full_text"],
                    json.dumps(b["meta"]),
                    embeddings[i],
                    b["cat"]
                ))
            
            insert_batch_pg(conn, payload)
            total += len(buffer)
            print(f"[✓] Eklendi: {total}/{args.limit} (Örnek Boyut: {len(payload[0][1])} karakter)")
            buffer = []

    conn.close()
    print("--- BİTTİ ---")

if __name__ == "__main__":
    main()