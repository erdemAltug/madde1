# Supabase SQL migrasyonları

Dosyalar sırayla uygulanır: `migrations/001_*.sql`, `002_*.sql`, …

## Projeyi bağlama (şifreyi repoya koymayın)

1. **Dashboard:** [Supabase](https://supabase.com) → proje → **SQL Editor** → migration dosyasının içeriğini yapıştırıp çalıştırın.
2. **Proje script’i:** `.env.local` içinde ya `DATABASE_URL` ya da şu ikili:

   - `NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co`
   - `SUPABASE_DB_PASSWORD=` (tercih) veya `NEXT_PUBLIC_SUPABASE_PASSWORD=` (geçici; bundle riski)

   Ardından:

   ```bash
   npm run db:migrate
   ```

   Script `postgresql://postgres:…@db.<ref>.supabase.co:5432/postgres` üretir. IPv4 / pooler için panelden host ve kullanıcıyı kopyalayıp `SUPABASE_DB_HOST`, `SUPABASE_DB_PORT`, gerekirse `SUPABASE_DB_USER` verin (bkz. aşağı “IPv4”).

   Varsayılan SQL dosyası `002_pgvector_profiles_legal_rag.sql`; başka dosya:
   `node scripts/db-migrate.mjs supabase/migrations/001_user_credits.sql`

3. **psql:** İsteğe bağlı:

   ```bash
   export DATABASE_URL='postgresql://postgres:ŞİFRENİZ@db.<ref>.supabase.co:5432/postgres'
   psql "$DATABASE_URL" -f supabase/migrations/002_pgvector_profiles_legal_rag.sql
   ```

Next.js uygulaması doğrudan bu URL’i kullanmıyor; API tarafı için `NEXT_PUBLIC_SUPABASE_URL` ve `SUPABASE_SERVICE_ROLE_KEY` yeterli (bkz. `.env.example`).

## IPv4 ağı ve “Direct connection”

Paneldeki **Direct** URI (`db.<ref>.supabase.co:5432`) bazı projelerde **yalnızca IPv6** ile çalışır. Ev/ofis ağı IPv4 ise bağlantı kurulmayabilir veya DNS hatası görebilirsiniz.

**Çözüm:** Connect modalında **Session pooler** seçin; host’u `SUPABASE_DB_HOST`, port’u `SUPABASE_DB_PORT`, kullanıcıyı (çoğunlukla `postgres.<ref>`) `SUPABASE_DB_USER` olarak `.env.local`’e yazın; şifre aynı (`SUPABASE_DB_PASSWORD`). İsterseniz tam pooler URI’yi `DATABASE_URL` olarak da verebilirsiniz.

## “Address not in tenant allow_list”

Proje **Database → Network** (veya **Allowed IPs**) ile kısıtlıysa, yerel `npm run db:migrate` bağlantısı reddedilir. Panelden **kendi genel IP’nizi** ekleyin veya geliştirme için geçici **0.0.0.0/0** (üretimde kapatın). Ya da migration’ı **SQL Editor**’da çalıştırın.

## Hukuk verisi (HF → `legal_knowledge`)

```bash
python3 -m pip install -r scripts/requirements-legal-seed.txt
export OPENAI_API_KEY=sk-...   # veya .env.local
python3 scripts/seed_legal_data.py
```

`scripts/seed_legal_data.py`: Hugging Face `Turkish-NLI/legal_nli_TR_V1` (streaming), anahtar kelime filtresi, OpenAI `text-embedding-3-small`, toplu ekleme. Bağlantı: `DATABASE_URL` veya `NEXT_PUBLIC_SUPABASE_URL` + şifre (pooler için `SUPABASE_DB_*`).

### Vektör arama testi

Önce RPC migrasyonu:

```bash
node scripts/db-migrate.mjs supabase/migrations/003_match_legal_knowledge_rpc.sql
```

Ardından:

```bash
python3 scripts/test_vector_search.py
python3 scripts/test_vector_search.py --raw-sql   # RPC yoksa doğrudan <=> sorgusu
```

`match_legal_knowledge(query_embedding, match_count, filter_category)` cosine distance (`<=>`) ile sıralar; `similarity ≈ 1 - distance`.

## pgvector

`002` dosyası `vector` eklentisini açar. Hosted Supabase’te genelde hazırdır; hata alırsanız Dashboard → **Database** → **Extensions** üzerinden **vector**’ü etkinleştirin.
