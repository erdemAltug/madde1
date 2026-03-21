"""Paylaşılan Postgres (Supabase) bağlantı yardımcıları — seed / test script’leri."""

from __future__ import annotations

import os
import sys
from pathlib import Path
from urllib.parse import parse_qsl, quote_plus, urlencode, urlparse, urlunparse

ROOT = Path(__file__).resolve().parents[1]


def load_env_files() -> None:
    try:
        from dotenv import load_dotenv
    except ImportError:
        return
    load_dotenv(ROOT / ".env.local")
    load_dotenv(ROOT / ".env")


def _with_query_params(base_url: str, extra: dict[str, str]) -> str:
    p = urlparse(base_url)
    q = dict(parse_qsl(p.query, keep_blank_values=True))
    for k, v in extra.items():
        if k not in q:
            q[k] = v
    new_q = urlencode(q)
    return urlunparse(p._replace(query=new_q))


def resolve_database_url() -> tuple[str, bool]:
    """
    (connection_string, try_pooler_port_fallback)
    try_pooler_port_fallback: pooler host + SUPABASE_DB_PORT set edilmemişse 5432↔6543 dene.
    """
    explicit_dsn = (os.environ.get("DATABASE_URL") or "").strip()
    explicit_port_in_env = bool((os.environ.get("SUPABASE_DB_PORT") or "").strip())

    if explicit_dsn:
        url = _with_query_params(
            explicit_dsn,
            {"sslmode": "require", "gssencmode": "disable"},
        )
        pooler = "pooler.supabase.com" in (urlparse(url).hostname or "")
        return url, pooler and not explicit_port_in_env

    site = (os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or "").strip()
    password = (
        os.environ.get("SUPABASE_DB_PASSWORD")
        or os.environ.get("NEXT_PUBLIC_SUPABASE_PASSWORD")
        or ""
    ).strip()
    if not site or not password:
        print(
            "DATABASE_URL veya (NEXT_PUBLIC_SUPABASE_URL + şifre) tanımlı değil.",
            file=sys.stderr,
        )
        sys.exit(1)
    parsed = urlparse(site)
    host = parsed.hostname or ""
    if not host.endswith(".supabase.co"):
        print("NEXT_PUBLIC_SUPABASE_URL geçerli bir *.supabase.co adresi olmalı.", file=sys.stderr)
        sys.exit(1)
    ref = host.removesuffix(".supabase.co")
    if "." in ref:
        print("Beklenmeyen SUPABASE URL host.", file=sys.stderr)
        sys.exit(1)
    db_host = os.environ.get("SUPABASE_DB_HOST", "").strip() or f"db.{ref}.supabase.co"
    db_port = os.environ.get("SUPABASE_DB_PORT", "").strip() or "5432"
    pooler = "pooler.supabase.com" in db_host
    user = (
        os.environ.get("SUPABASE_DB_USER", "").strip()
        or (f"postgres.{ref}" if pooler else "postgres")
    )
    user_q = quote_plus(user)
    pass_q = quote_plus(password)
    base = f"postgresql://{user_q}:{pass_q}@{db_host}:{db_port}/postgres"
    url = _with_query_params(base, {"sslmode": "require", "gssencmode": "disable"})
    try_alt = pooler and not explicit_port_in_env
    return url, try_alt


def _pooler_alternate_port_url(db_url: str) -> str | None:
    p = urlparse(db_url)
    if not p.hostname or "pooler.supabase.com" not in p.hostname:
        return None
    port = p.port or 5432
    alt = 6543 if port == 5432 else 5432
    host = p.hostname
    netloc = f"{host}:{alt}"
    return urlunparse(p._replace(netloc=netloc))


def connect_postgres(db_url: str, try_pooler_port_fallback: bool):
    import psycopg2

    urls = [db_url]
    if try_pooler_port_fallback:
        alt = _pooler_alternate_port_url(db_url)
        if alt and alt not in urls:
            urls.append(alt)

    last: Exception | None = None
    for i, u in enumerate(urls):
        p = urlparse(u)
        safe = f"{p.scheme}://{p.username or '?'}:***@{p.hostname}:{p.port or 5432}{p.path or ''}"
        try:
            if i > 0:
                print(f"[db] Alternatif port deneniyor: {safe}", file=sys.stderr)
            return psycopg2.connect(u, connect_timeout=30)
        except psycopg2.OperationalError as e:
            last = e
            continue
    assert last is not None
    _print_pooler_connection_help(db_url, last)
    raise last


def _print_pooler_connection_help(db_url: str, err: Exception) -> None:
    p = urlparse(db_url)
    host = p.hostname or ""
    port = p.port or 5432
    user = p.username or ""
    print("\n--- Postgres bağlantısı başarısız ---", file=sys.stderr)
    print(f"Hata: {err}", file=sys.stderr)
    if "pooler.supabase.com" in host:
        print(
            "Pooler kullanıyorsunuz. Supabase Connect ekranındaki değerlerle .env.local’i eşleştirin:\n"
            "  • Session mode → genelde port 5432, kullanıcı postgres.<PROJE_REF>\n"
            "  • Transaction mode → genelde port 6543, kullanıcı postgres.<PROJE_REF>\n"
            f"Şu an denenen: host={host} port={port} user={user}\n"
            "SUPABASE_DB_PORT ve SUPABASE_DB_USER’ı paneldekiyle birebir yazın.\n"
            "Şifre: Database Settings → Database password (URL’de özel karakter varsa doğru escape edildiğinden emin olun).\n"
            "Ayrıca Database → Network’te IP’nizin izinli olduğundan emin olun.\n",
            file=sys.stderr,
        )
    else:
        print(
            "Doğrudan db.<ref>.supabase.co kullanıyorsanız IPv6 / DNS sorunları olabilir; "
            "pooler host + port deneyin veya SQL Editor ile seed çalıştırın.\n",
            file=sys.stderr,
        )
