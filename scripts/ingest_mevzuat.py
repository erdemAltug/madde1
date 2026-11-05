#!/usr/bin/env python3
"""
Resmi mevzuat (mevzuat.gov.tr) → public.law_articles, madde madde.

Kanun metinleri FSEK m.31 gereği serbestçe kullanılabilir. Her madde:
  content  = "<no> sayılı <ad> — Madde <n> (<başlık>)\n<metin>"
  metadata = {kanun_no, kanun_adi, short, madde_no, baslik, source_url, origin, fetched_at}
Aynı kanun tekrar çalıştırılırsa önce origin=mevzuat.gov.tr satırları silinir (idempotent).

Kullanım:
  python -I scripts/ingest_mevzuat.py                 # tüm liste
  python -I scripts/ingest_mevzuat.py --only 6098 4857
  python -I scripts/ingest_mevzuat.py --dry-run       # sadece ayrıştır, say
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import time
import urllib.request
from datetime import date
from pathlib import Path

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))

from supabase_pg import connect_postgres, load_env_files, resolve_database_url  # noqa: E402

# (MevzuatNo, Tertip, kısa ad, tam ad, kategori)
LAWS: list[tuple[str, int, str, str, str]] = [
    ("6098", 5, "TBK", "Türk Borçlar Kanunu", "borclar"),
    ("4857", 5, "İşK", "İş Kanunu", "is"),
    ("6502", 5, "TKHK", "Tüketicinin Korunması Hakkında Kanun", "tuketici"),
    ("2004", 3, "İİK", "İcra ve İflas Kanunu", "icra"),
    ("6100", 5, "HMK", "Hukuk Muhakemeleri Kanunu", "usul"),
    ("4721", 5, "TMK", "Türk Medeni Kanunu", "medeni"),
    ("6698", 5, "KVKK", "Kişisel Verilerin Korunması Kanunu", "kvkk"),
    ("634", 5, "KMK", "Kat Mülkiyeti Kanunu", "kat"),
    ("7036", 5, "İMK", "İş Mahkemeleri Kanunu", "is"),
    ("6325", 5, "HUAK", "Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu", "usul"),
    ("1475", 5, "1475 s. İşK", "İş Kanunu (1475, yürürlükteki hükümler)", "is"),
    ("4447", 5, "İSK", "İşsizlik Sigortası Kanunu", "is"),
    ("5510", 5, "SGK", "Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu", "is"),
    ("6102", 5, "TTK", "Türk Ticaret Kanunu", "ticaret"),
]

ORIGIN = "mevzuat.gov.tr"
UA = "Mozilla/5.0 (compatible; ClauseLegalIndexer/1.0; +https://clause.com.tr)"
MAX_STORE = 15000
MAX_EMBED = 3000

MADDE_RE = re.compile(
    r"^\s*(?:(GEÇİCİ|Geçici|EK|Ek)\s+)?MADDE\s+(\d+)\s*(?:/\s*([A-Za-zçğıöşüÇĞİÖŞÜ]))?\s*[-–—]\s*",
    re.MULTILINE | re.IGNORECASE,
)


def fetch_text(no: str, tertip: int) -> tuple[str, str]:
    url = (
        "https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe"
        f"?MevzuatTur=1&MevzuatNo={no}&MevzuatTertip={tertip}"
    )
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as r:
        raw = r.read().decode("utf-8", errors="replace")
    t = re.sub(r"<(script|style)[\s\S]*?</\1>", "", raw, flags=re.I)
    t = re.sub(r"<br\s*/?>", "\n", t, flags=re.I)
    t = re.sub(r"</(p|div|tr|h\d)>", "\n", t, flags=re.I)
    t = re.sub(r"<[^>]+>", "", t)
    t = html.unescape(t).replace("\xa0", " ")
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n\s*\n+", "\n\n", t)
    public_url = f"https://www.mevzuat.gov.tr/mevzuat?MevzuatNo={no}&MevzuatTur=1&MevzuatTertip={tertip}"
    return t, public_url


def heading_before(text: str, pos: int) -> str | None:
    """MADDE satırından hemen önceki kısa başlık satırı (ör. 'b. Yeni malikin gereksinimi')."""
    before = text[max(0, pos - 400):pos].rstrip().split("\n")
    for line in reversed(before):
        s = line.strip()
        if not s:
            continue
        if len(s) > 120 or s.endswith((".", ";", ",")) and not re.match(r"^[a-zA-ZçğıöşüÇĞİÖŞÜ0-9IVX]{1,4}\.\s", s):
            return None
        s = re.sub(r"\[\d+\]", "", s).strip()
        s = re.sub(r"(?<=[a-zçğıöşü])\d+$", "", s).rstrip(":").strip()
        s = re.sub(r"^([IVX]+|\d+|[a-zçğıöşü]{1,2})\.\s*", "", s)
        return s or None
    return None


def parse_articles(text: str) -> list[dict]:
    ms = list(MADDE_RE.finditer(text))
    out: list[dict] = []
    seen: set[str] = set()
    for i, m in enumerate(ms):
        kind = (m.group(1) or "").lower().replace("geçici", "geçici")
        no = m.group(2) + (f"/{m.group(3).lower()}" if m.group(3) else "")
        madde_no = f"{'geçici ' if kind.startswith('ge') else 'ek ' if kind.startswith('ek') else ''}{no}"
        end = ms[i + 1].start() if i + 1 < len(ms) else len(text)
        body = text[m.end():end].strip()
        # Bir sonraki maddenin başlık satırlarını kes
        nxt_head = heading_before(text, end) if i + 1 < len(ms) else None
        if nxt_head and body.endswith(nxt_head):
            body = body[: -len(nxt_head)].rstrip()
        body = re.sub(r"\n{3,}", "\n\n", body)
        if len(body) < 15 or madde_no in seen or re.match(r"^\(\s*Mülga", body):
            continue
        seen.add(madde_no)
        out.append({"madde_no": madde_no, "baslik": heading_before(text, m.start()), "body": body})
    return out


def embed_batch(client, texts: list[str]) -> list[list[float]]:
    delay = 2.0
    for attempt in range(8):
        try:
            resp = client.embeddings.create(model="text-embedding-3-small", input=texts)
            return [d.embedding for d in resp.data]
        except Exception as e:  # noqa: BLE001
            if attempt == 7:
                raise
            print(f"  embed retry ({e.__class__.__name__}) {delay:.0f}s", file=sys.stderr)
            time.sleep(delay)
            delay = min(delay * 2, 60)
    return []


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", nargs="*", help="Sadece bu kanun numaraları")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--skip-existing", action="store_true", help="Zaten yüklenmiş kanunları atla (silme yapmaz)")
    ap.add_argument("--batch-size", type=int, default=64)
    ap.add_argument(
        "--drop-legacy-tmk",
        action="store_true",
        help="Eski veri setinden gelen 'Türk Medeni Kanunu' satırlarını sil (resmi metinle değiştir)",
    )
    args = ap.parse_args()

    load_env_files()
    laws = [l for l in LAWS if not args.only or l[0] in args.only]
    today = date.today().isoformat()

    conn = cur = client = None
    if not args.dry_run:
        import os

        from openai import OpenAI
        from psycopg2.extras import execute_values

        client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        conn = connect_postgres(*resolve_database_url())
        cur = conn.cursor()
        if args.drop_legacy_tmk:
            cur.execute(
                "delete from public.law_articles where source = 'Türk Medeni Kanunu' "
                "and coalesce(metadata->>'origin','') <> %s",
                (ORIGIN,),
            )
            print(f"legacy TMK rows deleted: {cur.rowcount}")
            conn.commit()

    total = 0
    for no, tertip, short, name, category in laws:
        try:
            text, url = fetch_text(no, tertip)
        except Exception as e:  # noqa: BLE001
            print(f"[{no}] fetch failed: {e}", file=sys.stderr)
            continue
        arts = parse_articles(text)
        print(f"[{no}] {short}: {len(arts)} madde")
        if not arts:
            continue
        if args.dry_run:
            for a in arts[:2]:
                print("   ", a["madde_no"], "|", a["baslik"], "|", a["body"][:90].replace("\n", " "))
            total += len(arts)
            continue

        if args.skip_existing:
            cur.execute("select count(*) from public.law_articles where metadata->>'kanun_no' = %s and metadata->>'origin' = %s", (no, ORIGIN))
            if cur.fetchone()[0] > 0:
                print("   already present, skipped")
                continue

        rows = []
        for a in arts:
            title = f"{no} sayılı {name} ({short}) — Madde {a['madde_no']}"
            if a["baslik"]:
                title += f" ({a['baslik']})"
            content = f"{title}\n{a['body']}"[:MAX_STORE]
            md = {
                "kanun_no": no,
                "kanun_adi": name,
                "short": short,
                "madde_no": a["madde_no"],
                "baslik": a["baslik"],
                "source_url": url,
                "origin": ORIGIN,
                "fetched_at": today,
            }
            rows.append((content, md))

        cur.execute(
            "delete from public.law_articles where metadata->>'kanun_no' = %s and metadata->>'origin' = %s",
            (no, ORIGIN),
        )
        for i in range(0, len(rows), args.batch_size):
            chunk = rows[i : i + args.batch_size]
            embs = embed_batch(client, [c[:MAX_EMBED] for c, _ in chunk])
            values = [
                (c, json.dumps(md, ensure_ascii=False), "[" + ",".join(f"{x:.7f}" for x in e) + "]", category, name, 10)
                for (c, md), e in zip(chunk, embs)
            ]
            execute_values(
                cur,
                "insert into public.law_articles (content, metadata, embedding, category, source, score) values %s",
                values,
                template="(%s, %s::jsonb, %s::vector, %s, %s, %s)",
            )
        conn.commit()
        total += len(rows)
        print(f"   inserted {len(rows)}")
        time.sleep(1.5)  # kaynağa nazik ol

    print(f"done: {total} madde")


if __name__ == "__main__":
    main()
