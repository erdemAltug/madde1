# Clause — Kayıt + Ziyaretçi Büyüme Planı

**Tarih:** 19 Eylül 2026  
**Odak:** Organik ziyaretçi ↑ · ücretsiz kayıt ↑ · lead (teklif) yan kanal  
**Önceki katman:** SEO top-10 (`docs/seo-top10-gsc-2026-09.md`) · Asistan (`/asistan`)

---

## 1. Kuzey yıldızı

| Metrik | Nasıl izlenir | 30 gün yön |
|---|---|---|
| Organik tıklama (GSC) | Haftalık | ↑ (4 kapı + home) |
| Ücretsiz kayıt | PostHog `Auth_Signup_Completed` | Net yeni hesap / hafta |
| Organik → kayıt | Landing/tool `SEO_TOOL_SIGNUP_CLICK` → signup | Funnel oranı |
| Aktif asistan | `/asistan` mesaj | Kayıt sonrası aktivasyon |
| Lead | `Contact_Form_Submitted` (`pricing_b2c` / `enterprise`) | Ayrı funnel |

**Kayıt vaadi (tek cümle):** Ücretsiz hesap = kalıcı hukuk asistanı + arşiv + rapor.

Lead (Teklif alın) satış/iletişim; **hacim büyümesi kayıt + SEO’dan** gelir.

---

## 2. Funnel (basit)

```
Google / paylaşım
  → Araç veya rehber veya home
    → Değer (hesap / tarama / checklist)
      → Ücretsiz kayıt (next=/asistan)
        → İlk asistan mesajı veya ilk kayıtlı tarama
```

Paralel: Fiyatlandırma → Teklif alın → mail/PostHog lead.

---

## 3. P0 — Bu hafta (yap / doğrula)

### Trafik
1. Deploy sonrası GSC: home + 4 kapı **URL denetimi**
2. Title/meta zaten yenilendi — 7–14 gün konum/CTR izle
3. Thin rehber birleştirme / noindex erteleme (önce CTR)

### Kayıt
4. Tüm birincil “kayıt” CTA’ları `next=/asistan` (aktivasyon)
5. Fiyatlandırmada lead yanında **metin link:** ücretsiz hesap
6. Araç sonucu + rehber `SeoSignupCta` kopyası: asistan vaadi
7. Limit dolunca / teaser kilidinde kayıt CTA net kalsın

### Ölçüm
8. PostHog dashboard: Signup, SEO_TOOL_SIGNUP_CLICK, asistan message proxy
9. Resend production’da (lead mail)

---

## 4. P1 — 2–4 hafta

- Haftalık 1–2 GSC sorgu içeriği (cron/blog, Kıbrıs yok)
- WhatsApp/paylaşım çıktısı araçlardan (kira cevabı vb.) → backlink/UGC
- Kayıt sonrası onboarding: ilk örnek soru `/asistan`
- E-posta: kayıt hoş geldin (Resend) — opsiyonel

---

## 5. Yapılmayacaklar

- Erken paywall / kayıt zorlaması SEO sayfalarında
- Yeni URL ağacı
- “Legal AI” title spam
- Fiyat kartını sadece lead’e kilitleyip home’dan kayıt yolunu silmek

---

## 6. Bu sprintte kodda yapılanlar

- Signup `next` varsayılanı → `/asistan` (navbar, companion, SEO CTA, tool bar, nudge, limit dialog, intent pillars, blog generator)
- Bireysel kart: Teklif alın + ücretsiz hesap metin linki
- Plan linki: `docs/seo-product-review.md`

---

## 7. Vizyon 2027 uygulaması (29 Ekim 2026)

**RAG / mimari**
- Hibrit arama: vektör + Postgres tam metin (`013_legal_fulltext_hybrid.sql`, `search_legal_fulltext`) + madde metadata eşleşmesi; Reciprocal Rank Fusion ile birleştirme, kopya madde ayıklama
- Gömme önbelleği (LRU, süreç içi)
- Asistan `chat` modu: kısa/takip sorular önceki mesajlarla bağlamlanır (`lib/rag/conversation.ts`)
- Kişisel bağlam: kullanıcının taranmış sözleşmeleri ve yaklaşan tarihleri asistan istemine eklenir (`lib/rag/personal-context.ts`, RLS içinde)
- Asistan yanıtı kaynak metinleriyle döner; mevzuat çipi tıklanınca metni açar

**Özellikler**
- Haklarım Kontrolü sihirbazı: `/haklarim/kontrol` (5 senaryo, hak / tahmini alacak / süre / avukata ne zaman)
- Fotoğraftan ve PDF'ten tarama: `/api/ocr` (OpenAI görsel), mobilde kamera butonu
- Sürüm karşılaştırma: `/karsilastir` (madde eşleme, kelime farkı, riskli değişiklik uyarısı; istemcide)
- Paylaşılabilir risk kartı: `/kart` + `/kart/og` (yalnız sayılar, kişisel veri yok, noindex)
- Sesli soru (Web Speech, tr-TR) asistanda
- PWA: service worker, çevrimdışı sayfa, manifest kısayolları, ana ekrana ekleme teklifi (yalnız panel/asistan)
- Push bildirimleri: `push_subscriptions` tablosu, panelde aç/kapat, cron e-postayla birlikte push gönderir
- Mevzuat değişikliği bildirimi: `lib/legal/regulation-updates.ts` → panelde "Sizi etkileyen değişiklikler" + kullanıcı başına bir kez e-posta/push
- Panel: sabit soru kutusu (asistana `?soru=` ile taşır), yeni hızlı eylemler

**Tasarım**
- Güven şeridi tüm sonuç ekranlarında; okuma animasyonu gerçek madde başlıklarıyla; `prefers-reduced-motion` saygısı
- Serif hukuki metin fontu (Source Serif 4); karanlık mod (panel + yeni ekranlar, Açık/Sistem/Koyu)
- Fiyat: Ücretsiz / Plus (199 ₺/ay, tek kaynak `lib/pricing.ts`) / Kurumsal; hatırlatıcılar ücretsiz planda

**Kayıt + SEO**
- Tüm kayıt CTA'ları `next=/asistan`; kayıt modunda varsayılan hedef `/asistan`, e-posta onayı geri dönüş adresiyle, onay kapalıysa anında yönlendirme
- Araç sayfalarında "arkadaşına gönder"; footer'a yeni sayfalar; sitemap'e `/haklarim/kontrol`, `/karsilastir`

**Kurulum gereken**
- Supabase: `013` ve `014` migration'ları
- Env: `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` (`npx web-push generate-vapid-keys`)

**Bilerek yapılmayanlar**
- Avukata aktar: Avukatlık Kanunu reklam/iş getirme yasağı incelemesi olmadan açılmadı
- İçerik budama ve uzman imzası: GSC verisi ve gerçek bir avukat incelemesi gerekiyor; noindex altyapısı (`lib/seo/niche-regional.ts`) hazır
- Plus ödeme altyapısı: şimdilik form ile başlatılıyor
