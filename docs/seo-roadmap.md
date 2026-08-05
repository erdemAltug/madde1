# Clause SEO yol haritası

> **Hedef:** Türkçe “yapay zeka sözleşme analizi”, kira/iş hukuku uzun kuyruk aramalarında organik trafik.
> **Mülk:** [Google Search Console](https://search.google.com/search-console) → `https://tryclause.tech/`
> **Son güncelleme:** 5 Ağustos 2026

## Ağustos 2026 kapsamlı audit

- Sitemap: yaklaşık **196 URL** (12 yeni derin rehber ve 8 yeni derin blog dahil).
+- Sitemap: yaklaşık **208+ URL** (24 derin rehber + 8 derin blog + `/gunluk-hukuk` hub dahil).
+- Ana sorun URL hacmi değil: **ince içerik, düşük CTR ve zayıf konu bazlı iç linkleme**.
+- Mevcut kısa programmatic sayfalar topluca çoğaltılmayacak; GSC gösterimi alanlar önce 600–1.000+ kelimeye derinleştirilecek.
+- Yeni günlük hukuk kümesi: yıllık izin, maaş gecikmesi, kıdem/ihbar, iş arabuluculuğu, fazla mesai, kira kontrol listesi, tahliye, icra, e-Devlet/UYAP, ayıplı mal ve garanti.
+- Bloglar için ayrı related-link haritası eklendi; generic fallback bağımlılığı azaltıldı.
+- Hub metadata'larında `ücretsiz`, `2026` ve somut fayda dili öne çıkarıldı.

**90 günlük çalışma sırası:** P0 indeks + CTR → P1 içerik derinliği ve kümeler → P2 otorite/backlink. Yeni URL üretmek tek başına başarı metriği değildir.

---

## GSC anlık durum (Temmuz 2026)

| Metrik | Değer | Yorum |
|--------|-------|-------|
| Gösterim trendi | 0–2 → **15/gün** (Haziran sonu) | İndeks ve keşif çalışıyor |
| Tıklama | 0–1/gün | **CTR sorunu** — title/description optimizasyonu |
| Top sorgu (gösterim) | `kıbrıs eşya hasar depozitosu anlaşmazlıkları` (10) | Yeni rehber: `/rehber/kibris-kira-depozito-anlasmazligi` |
| Top sorgu (gösterim) | `kira takip raporu yapay zeka analizi` (8) | Yeni blog + yapay-zeka-kira meta güncellemesi |
| Top sorgu (gösterim) | `yapay zeka ile kira takibi` (5) | `/yapay-zeka-hukuk/yapay-zeka-kira-sozlesmesi` |
| Tek tıklama | `ücretsiz olan` (1) | Ücretsiz CTA'ları title'da öne çıkar |

**Hemen yapılacaklar (deploy sonrası):**
- [ ] GSC → URL denetimi → yeni 3 URL'yi dizine ekle
- [ ] Haftalık sorgu raporunu izle; 5+ gösterim alan sorgulara içerik ekle
- [ ] CTR < %3 olan sayfalarda meta title A/B (ücretsiz, 2026, soru formatı)

---

## Mevcut durum (kod tabanı)

| Alan | Durum |
|------|--------|
| Sitemap URL sayısı | ~**208+** (rehber **90**, blog **48**, sözleşme analizi ~22, yapay-zeka-hukuk 8, hukuki-analiz 9, araçlar vb.) |
| Programmatic SEO | `/rehber`, `/blog`, `/sozlesme-analizi`, `/yapay-zeka-hukuk`, `/hukuki-analiz`, `/analiz`, `/araclar` |
| Blog | **index açık**, 48 makale |
| Canonical | `NEXT_PUBLIC_SITE_URL` → `https://tryclause.tech` |
| robots.txt | `/api`, `/giris`, `/admin`, `/baski` kapalı |
| İç linkler | Footer, hub sayfaları, cluster map (`internal-links.ts`) |
| JSON-LD | Article (rehber/blog), FAQ, ana sayfa Organization |
| GSC (başlangıç) | ~2 indekslenen sayfa — **keşif/indeks sorunu**, içerik hacminden çok teknik + otorite |

**Gerçekçi beklenti:** 65–95 URL iyi bir temel; “günlük aramalarda yakalamak” için indeks + uzun kuyruk + zaman gerekir. Geniş kelimelerde (ör. “yapay zeka hukuk”) aylar içinde bile zor; hesaplayıcı ve “kira sözleşmesi analizi” gibi uzun kuyrukta 2–4 ayda ilk trafik mümkün.

---

## Faz 0 — Hemen (deploy sonrası 1 hafta)

Teknik temel; indeks olmadan içerik işe yaramaz.

### Ortam değişkenleri (Vercel + `.env.local`)

```env
NEXT_PUBLIC_SITE_URL=https://tryclause.tech
```

### Google Search Console

- [ ] **Sitemap gönder:** `https://tryclause.tech/sitemap.xml`
- [ ] **URL denetimi** → “Dizine eklenmesini iste” (öncelikli 10 URL aşağıda)
- [ ] **Sayfa dizine ekleme** raporunu haftalık izle (hedef: 2 → 30+)
- [ ] **Canonical** uyarısı var mı kontrol et (tryclause.ai vs .tech karışıklığı)

### Öncelikli indeks URL’leri

1. `https://tryclause.tech/`
2. `https://tryclause.tech/yapay-zeka-hukuk`
3. `https://tryclause.tech/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi`
4. `https://tryclause.tech/sozlesme-analizi/kira-sozlesmesi-analizi`
5. `https://tryclause.tech/araclar/kira-sozlesmesi-artis-orani-hesaplama`
6. `https://tryclause.tech/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol`
7. `https://tryclause.tech/rehber/kiraci-haklari`
8. `https://tryclause.tech/blog`
9. `https://tryclause.tech/blog/yapay-zeka-sozlesme-analizi-nasil-calisir`
10. `https://tryclause.tech/guvenlik`

### Doğrulama

- [ ] `curl -I https://tryclause.tech/robots.txt` → sitemap satırı
- [ ] Her önemli sayfada `<link rel="canonical">` → `tryclause.tech`
- [ ] Lighthouse / PageSpeed (mobil) — Core Web Vitals kırmızıysa düzelt

---

## Faz 1 — İçerik (0–30 gün)

Organik trafik = **arama niyetine uygun, benzersiz metin** + indeks.

### Rehber (hedef: 50+ sayfa)

Şu an **50** ✅. İleride eklenebilecek konu kümeleri:

| Küme | Örnek slug / konu |
|------|-------------------|
| Kira | `kira-sozlesmesi-fesih-bildirimi`, `aidat-kim-oder`, `kira-garanti-mektubu` |
| İş | `deneme-suresi-rehberi`, `is-kazasi-haklari`, `ucret-kesintisi` |
| Tüketici | `garanti-suresi`, `pazaryeri-satici-sorumlulugu` |
| Sözleşme genel | `otomatik-yenileme-maddesi`, `uyusmazlik-cozumu-tahkim` |
| AI + hukuk | `sozlesme-analizi-ucretsiz`, `hukuki-yapay-zeka-guvenli-mi` |

**Dosya:** `lib/seo/rehber-pages-extra-2.ts` (+18) — `rehber-pages.ts` ile birleşik.

### Blog (hedef: 2–4 yazı / ay)

Mevcut **27** yazı. Yeni yazılar:

- Gerçek kullanıcı soruları (Search Console “sorgular” geldikçe)
- “Nasıl yapılır” + CTA → `/analiz` veya ilgili araç
- Her yazı min. **800–1200 kelime**, 1 ana anahtar kelime + 3–5 uzun kuyruk

**Dosya:** `lib/seo/blog-posts.ts`, `lib/seo/blog-posts-extra.ts` + otomatik sitemap.

### Sözleşme analizi landing’leri

`lib/seo/sozlesme-analizi-pages.ts` — sektöre özel (e-ticaret, SaaS, danışmanlık, inşaat alt sözleşmeleri).

### İç link kuralları

- Her yeni rehber/blog → en az **3 iç link** (hub + araç + sözleşme analizi)
- `lib/seo/internal-links.ts` → `REHBER_CLUSTER_MAP` yeni slug’lar için genişlet
- Footer’da “Tüm rehberler” hub’a yönlendir (çok uzun footer listesi SEO’da zayıf; hub yeterli)

---

## Faz 2 — Otorite ve güven (30–90 gün)

Google Türkçe legal/AI alanında **E-E-A-T** (deneyim, uzmanlık, güvenilirlik) ister.

### Yapılacaklar

- [ ] **Güvenlik / gizlilik** sayfasını güncel tut (`/guvenlik`) — KVKK, veri saklama, AI sınırları
- [ ] **Hakkımızda / ekip** kısa sayfa (opsiyonel `/hakkimizda`) — gerçek isim, LinkedIn
- [ ] **Organization schema** `sameAs`: LinkedIn, X, Product Hunt vb. (`NEXT_PUBLIC_ORGANIZATION_SAME_AS`)
- [ ] **Dış linkler (backlink):**
  - LegalTech / startup dizinleri
  - Hukuk fakültesi kulüpleri, girişim blogları (konuk yazı)
  - Product Hunt / BetaList lansmanı
- [ ] **PR / topluluk:** Reddit, Ekşi, LinkedIn’de “ücretsiz sözleşme taraması” — doğal paylaşım, spam değil

### Kaçınılacaklar

- Satın alınmış düşük kalite backlink paketleri
- Aynı metni 50 sayfaya kopyalamak (thin content cezası)
- “Yapay zeka avukat” gibi yanıltıcı iddia (metadata’da zaten dengeli dil kullanın)

---

## Faz 3 — Ölçüm ve iterasyon (sürekli)

### Google Search Console (haftalık)

| Metrik | İlk hedef (90 gün) |
|--------|---------------------|
| İndekslenen sayfa | 50+ |
| Toplam gösterim | 1.000+ / ay |
| Ortalama konum (uzun kuyruk) | < 30 |
| Tıklama | 50+ / ay |

**Hangi sayfalar işe yarıyor?** → O kümede +5 sayfa ekle.

### PostHog (ürün + SEO funnel)

- Event’ler: `Analysis_Started`, `Contact_Form_Submitted`, `Hero_CTA_Clicked`
- **Not:** Brave / adblock PostHog’u keser (`ERR_BLOCKED_BY_CLIENT`) — normal; trafik tahmini için GSC kullanın
- Funnel: Organik landing → analiz başlat → iletişim

### Sentry

- İletişim formu: `📩 YENİ İLETİŞİM TALEBİ`
- Alert kuralı → e-posta / Slack

### Opsiyonel: GA4

- Reklam yoksa şart değil; GSC + PostHog yeterli başlangıç

---

## Teknik SEO kontrol listesi

- [ ] `NEXT_PUBLIC_SITE_URL` production’da doğru
- [ ] www ↔ non-www tek yönlendirme (Vercel / DNS)
- [ ] HTTPS zorunlu
- [ ] `hreflang` — şimdilik yalnızca `tr-TR` yeterli
- [ ] OG görselleri (`/opengraph-image`) tüm hub’larda
- [ ] 404 ve 301: eski URL’ler `next.config` redirect (`lib/seo/free-tools-routes.ts` legacy path’ler)
- [ ] Client-only sayfalar minimum; rehber/blog **SSG** (mevcut ✓)
- [ ] `/analiz` — metadata var; içerik crawler için yeterli metin (hero + açıklama) kontrol et

---

## Anahtar kelime öncelik matrisi

| Öncelik | Örnek aramalar | Hedef sayfa |
|---------|----------------|-------------|
| P0 | yapay zeka sözleşme analizi, ai sözleşme analizi | `/`, `/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi` |
| P0 | kira sözleşmesi analizi, kira sözleşmesi riskleri | `/sozlesme-analizi/kira-sozlesmesi-analizi` |
| P1 | kira artış oranı hesaplama, tahliye taahhütnamesi | `/araclar/*` |
| P1 | kiracı hakları, depozito iadesi, işten çıkarılınca | `/rehber/*` |
| P2 | legal ai türkiye, hukuki yapay zeka | `/yapay-zeka-hukuk/*`, blog |
| P3 | avukat, dava (geniş) | Uzun vadede; şimdilik odaklanma |

---

## 90 günlük özet takvim

| Hafta | Odak |
|-------|------|
| 1 | Deploy, GSC sitemap, 10 URL indeks isteği, canonical doğrula |
| 2–4 | +10 rehber, +5 blog, iç link cluster güncelle |
| 5–8 | İlk GSC sorgu raporu; kazanan sayfaları çoğalt |
| 9–12 | Backlink / lansman, rehber 50+, blog 25+, Core Web Vitals |

---

## Kodda nereye dokunulur?

| Görev | Dosya |
|-------|--------|
| Yeni rehber | `lib/seo/rehber-pages-extra-2.ts`, `lib/seo/rehber-factory.ts` |
| Yeni blog | `lib/seo/blog-posts-extra.ts`, `app/blog/[slug]/page.tsx` |
| Sitemap | `app/sitemap.ts` (slug listeleri otomatik) |
| Metadata / canonical | `lib/seo/site.ts`, sayfa `layout.tsx` / `generateMetadata` |
| İç linkler | `lib/seo/internal-links.ts` |
| Sözleşme landing | `lib/seo/sozlesme-analizi-pages.ts` |
| AI landing | `lib/seo/yapay-zeka-hukuk-pages.ts` |
| Footer / nav | `components/landing/site-footer.tsx`, `site-navbar.tsx` |

---

## Başarı kriterleri (6 ay)

- [ ] **100+** indekslenen sayfa
- [ ] **5.000+** organik gösterim / ay
- [ ] **200+** organik tıklama / ay
- [ ] En az **3** uzun kuyruk sorguda ilk sayfa (GSC konum ≤ 10)
- [ ] Organik kanaldan haftalık **analiz başlatma** (PostHog / Sentry ile ölç)

---

## Notlar

- Clause **hukuki danışmanlık değildir** — tüm içeriklerde disclaimer ve “avukata danışın” dili korunmalı (E-E-A-T + yasal risk).
- SEO sonuçları genelde **8–12 hafta** sonra anlamlı hale gelir; ilk 2 hafta indeks artışına odaklanın.
- Rakipler: genel AI chatbot’lar, hukuk büroları blogları, e-devlet / mevzuat siteleri — fark: **ücretsiz Türkçe sözleşme taraması + hesaplayıcılar**.

---

*Sorular veya yeni küme önerileri için bu dosyayı güncel tutun.*
