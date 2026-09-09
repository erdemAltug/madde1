#!/usr/bin/env python3
"""
Mevcut law_articles satırlarının metadata'sını içerikten zenginleştirir:
  kanun_no, kanun_adi, madde_no, madde_basligi (heuristic)

Kullanım:
  python scripts/normalize_law_metadata.py
  python scripts/normalize_law_metadata.py --limit 2000 --dry-run
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))

from supabase_pg import connect_postgres, load_env_files, resolve_database_url

LAW_PATTERNS = [
    (re.compile(r"6098|t[uü]rk\s+bor[cç]lar|\btbk\b", re.I), "6098", "Türk Borçlar Kanunu"),
    (re.compile(r"4857|i[sş]\s+kanunu|\bişk\b", re.I), "4857", "İş Kanunu"),
    (re.compile(r"6102|t[uü]rk\s+ticaret|\bttk\b", re.I), "6102", "Türk Ticaret Kanunu"),
    (re.compile(r"6698|kvkk|ki[sş]isel\s+verilerin", re.I), "6698", "KVKK"),
]

MADDE_RE = re.compile(
    r"(?:madde|m\.?)\s*[:\.]?\s*(\d{1,4})\b",
    re.I,
)


def enrich_metadata(content: str, existing: dict[str, Any]) -> dict[str, Any]:
    md = dict(existing or {})
    blob = f"{content}\n{json.dumps(existing, ensure_ascii=False)}"

    if not md.get("kanun_no"):
        for rx, no, adi in LAW_PATTERNS:
            if rx.search(blob):
                md["kanun_no"] = no
                md.setdefault("kanun_adi", adi)
                break

    if not md.get("madde_no"):
        m = MADDE_RE.search(content[:800])
        if m:
            md["madde_no"] = int(m.group(1))

    md.setdefault("yururluk_durumu", "Bilinmiyor")
    md.setdefault("kategori", md.get("veri_turu") or "genel")
    return md


def main() -> None:
    load_env_files()
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=50_000)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    db_url, try_pooler_fallback = resolve_database_url()
    if not db_url:
        print("DATABASE_URL / SUPABASE_DB_PASSWORD gerekli", file=sys.stderr)
        sys.exit(1)

    conn = connect_postgres(db_url, try_pooler_fallback)
    updated = 0
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                select id, content, coalesce(metadata, '{}'::jsonb)
                from public.law_articles
                order by created_at nulls last
                limit %s
                """,
                (args.limit,),
            )
            rows = cur.fetchall()

        for row_id, content, metadata in rows:
            if isinstance(metadata, str):
                metadata = json.loads(metadata)
            new_md = enrich_metadata(content or "", metadata or {})
            if new_md == metadata:
                continue
            updated += 1
            if args.dry_run:
                continue
            with conn.cursor() as cur:
                cur.execute(
                    "update public.law_articles set metadata = %s::jsonb where id = %s",
                    (json.dumps(new_md, ensure_ascii=False), row_id),
                )
        if not args.dry_run:
            conn.commit()
        print(f"normalize: {updated} satır {'(dry-run)' if args.dry_run else 'güncellendi'}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()
