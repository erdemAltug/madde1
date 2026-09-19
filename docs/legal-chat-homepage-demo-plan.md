# Clause — Kalıcı Mevzuat Chat + Homepage Demo Planı

**Tarih:** 19 Eylül 2026  
**Önkoşul sırası:** (1) SEO top-10 planı → (2) wording → (3) **bu ürün**  
**Özet:** Kayıtlı kullanıcılara **session’a bağlı olmayan**, mevzuat-RAG destekli hukuk sohbeti; ana sayfada yüksek kaliteli **demo / görsel**.

---

## 1. Ürün kararı

| Madde | Karar |
|---|---|
| Kim kullanır? | Yalnızca **giriş yapmış** kullanıcı |
| Misafir? | Homepage’de **interaktif olmayan** demo + “Kayıt ol / Giriş yap” |
| Kalıcılık | `sessionStorage` **yasak**; DB’de thread + mesaj |
| Zeka | Mevcut Legal RAG (`lib/rag`) + sistem prompt; uydurma madde yasağı |
| Kapsam v1 | Metin soru-cevap + isteğe bağlı sözleşme parçası yapıştırma |
| Kapsam değil (v1) | Ses, dosya OCR, çoklu ajan, mahkeme takibi |

**Kuzey yıldızı:** “Clause benim avukatım değil; ama hukuki sorularımı unutmayan, dayanak gösteren asistanım.”

---

## 2. Kullanıcı akışı

```
Kayıt/Giriş → /hesabim veya /asistan
  → Thread listesi (sol)
  → Aktif sohbet (sağ)
  → Mesaj gönder → RAG retrieve → stream cevap + Dayanaklar
  → Thread otomatik başlık (ilk mesaj özeti)
  → Yeniden aç → geçmiş yüklenir (başka cihaz dahil)
```

Homepage:
```
Demo mock UI (scripted veya scrubber)
  → CTA: Ücretsiz hesap oluştur → kayıt sonrası /asistan
```

---

## 3. Veri modeli (Supabase)

### `legal_chat_threads`

| Kolon | Tip | Not |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK auth.users | RLS: own rows |
| title | text | max 80; auto |
| created_at | timestamptz | |
| updated_at | timestamptz | son mesaj |
| archived | boolean | default false |

### `legal_chat_messages`

| Kolon | Tip | Not |
|---|---|---|
| id | uuid PK | |
| thread_id | uuid FK | cascade |
| user_id | uuid | denormalize RLS |
| role | text | `user` \| `assistant` \| `system` |
| content | text | |
| citations | jsonb | optional: citeLabel[] |
| created_at | timestamptz | |

**RLS:** kullanıcı yalnız kendi `user_id` satırlarını okur/yazar.  
**Limitler (v1):** kullanıcı başı 20 aktif thread; mesaj 8k karakter; günde N mesaj (credits ile hizala).

Migration önerisi: `supabase/migrations/010_legal_chat.sql`.

---

## 4. API

| Endpoint | İş |
|---|---|
| `GET /api/asistan/threads` | Liste |
| `POST /api/asistan/threads` | Yeni thread |
| `GET /api/asistan/threads/[id]` | Mesajlar |
| `POST /api/asistan/chat` | Auth zorunlu; body: threadId, message; stream; persist user+assistant |
| `PATCH /api/asistan/threads/[id]` | title / archive |

Mevcut `/api/chat` sözleşme analizi (b2c/teaser) için kalsın. Asistan **ayrı route** — karışmasın.

**Server akış:**  
auth → rate limit → load last K messages → `retrieveLegalGrounding` → system = Clause core + RAG block → stream → save assistant message + citations.

---

## 5. UI

### 5.1 `/asistan` (veya `/hesabim/sohbet`)

- Desktop: 2 kolon (thread list + chat).  
- Mobil: thread list → chat full screen.  
- Empty: örnek sorular (kira zammı, kıdem, tahliye, tüketici iade, freelance IP).  
- Her assistant cevapta `# 📚 Dayanaklar` veya chip’ler.  
- Disclaimer sticky alt: avukat değildir.

### 5.2 Nav

- Girişliyken: `Asistan` birincil.  
- `/hesabim` arşiv ikincil.

### 5.3 Homepage demo

**Seçenek A (önerilen v1):** Scripted mock — 3–4 mesaj animasyonlu, tıklanınca kayıt.  
**Seçenek B:** Misafire 1 tur free chat (session) — ürün kararına aykırı (“session tutulmasın” üye için); misafir demoda session OK ama **kalıcı vaat etme**.

Demo görsel gereksinimler:
- Gerçek UI’ye yakın (aynı tipografi/renk)  
- Bir cevapta görünür **Dayanak: TBK m.…** chip  
- Motion: 2–3 intentional (typewriter / fade), gürültü yok  
- Hero’yu ezmesin: brand + 1 headline + 1 sub + CTA + **demo plane**

Wording: `docs/wording-repositioning-plan.md` §4.1.

---

## 6. Prompt / güvenlik

- System: Clause core + “kesin hukuki danışmanlık yok” + RAG grounding rules.  
- Persona opsiyonel (işçi/kiracı/freelancer) thread metadata’da.  
- Mask: gönderim öncesi `maskSensitiveText` (TC/IBAN).  
- Cite: yalnızca retrieved etiketler.  
- Abuse: auth + günlük kota.

---

## 7. Fazlar

### Phase 0 — Spec (bu dosya) ✅

### Phase 1 — Backend + UI iskelet ✅ (19 Eyl 2026)

- Migration `010_legal_chat.sql` + RLS  
- `POST /api/asistan/chat` stream + persist + RAG  
- `/asistan` UI (liste + sohbet)  
- Nav / hesabim / homepage demo  
- robots: `/asistan` noindex  

### Phase 2 — Ürün cilası (sonraki)

- Örnek sorular, citations UI, arşiv, mobil  
- Credits entegrasyonu  
- Hesabim nav birleşimi

### Phase 3 — Homepage demo (2–3 gün)

- `LandingAsistanDemo` komponenti  
- Scripted conversation  
- CTA → kayıt `next=/asistan`  
- Analytics: `home_demo_cta`, `asistan_message_sent`

### Phase 4 — İyileştirme

- Thread arama, PDF’e sohbet özeti, sözleşme analizinden “asistanına sor” deep link

---

## 8. Başarı metrikleri

| KPI | Hedef (lansman + 30g) |
|---|---|
| Kayıt → ilk asistan mesajı | ≥40% |
| Thread başına ort. mesaj | ≥4 |
| D7 asistan geri dönüş | ≥15% |
| Homepage demo → kayıt CTR | A/B ile ölç |

---

## 9. Bilinçli yapılmayacaklar

- Misafir sohbetini kalıcı göstermek  
- Sohbeti yalnız `sessionStorage` / localStorage’da tutmak  
- `/api/chat` ile asistanı birleştirip analiz formatını bozmak  
- “Halüsinasyonsuz avukat” pazarlaması  
- Demo’da sahte madde numarası (yalnızca bilinen örnek dayanak veya “örnek”)

---

## 10. Açık sorular (karar bekleyen)

1. URL: `/asistan` mi `/hesabim/sohbet` mi? (**Öneri:** `/asistan`)  
2. Ücretsiz kota: günde kaç mesaj? (credits ile mi?)  
3. Eski sözleşme analizini thread’e “bağlama” v1’de var mı? (**Öneri:** Phase 4)

---

*Uygulamaya SEO P0 meta rewrite’lardan sonra geçilmesi önerilir; paralel olarak Phase 1 migration açılabilir.*
