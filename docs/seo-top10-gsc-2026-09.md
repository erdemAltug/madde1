# Clause — SEO Top 10 Planı (GSC Eyl 2026)

**Tarih:** 19 Eylül 2026  
**Mülk:** https://tryclause.tech/  
**Hedef:** Ortalama konum ~30 → öncelikli kümelerde **ilk 10**  
**Kaynak:** GSC Performans · son 3 ay · Web  
**İlgili:** `docs/seo-product-review.md`, `docs/seo-roadmap.md`, `docs/wording-repositioning-plan.md`

---

## 1. Anlık tablo (doğrulandı)

| Metrik | Değer | Okuma |
|---|---|---|
| Toplam tıklama | **14** | Organik talep neredeyse yok |
| Toplam gösterim | **~1.090** | Keşif var; tıklama yok |
| Ortalama CTR | **%1,3** | Snippet ikna etmiyor + 3.–4. sayfa |
| Ortalama konum | **30,8** | “Görünüyoruz ama seçilmiyoruz” |

**Teşhis (tek cümle):** Google Clause’u endeksliyor; SERP’te 3.–4. sayfada kaldığı için CTR çöküyor. Hacim sorunu değil, **niyet–URL–snippet uyumu** ve **küme kazananı** sorunu.

Ağustos incelemesinde konum ~26 / 753 gösterim vardı. Eylülde gösterim arttı (~1,09B), konum **kötüleşti** (~30,8). Daha fazla URL keşfi = daha fazla düşük konum dilüsyonu. **Yeni sayfa açmak değil, kazananı güçlendirmek.**

---

## 2. Neden 30’dayız? (kök nedenler)

### 2.1 Cannibalization (aynı niyet, çok URL)

| Küme | Çakışan yüzeyler | Etki |
|---|---|---|
| Kira analizi | pillar `/kira-sozlesmesi-analizi`, `/sozlesme-analizi/...`, `/analiz/...`, `/araclar/kira-*`, onlarca rehber | Otorite bölünür |
| İş / tazminat | hub + kıdem + ihbar + işsizlik + rehber | Araç kazananı netleşmeli |
| Tahliye | 3+ araç slug (redirect’ler var ama GSC eski URL hatırlıyor) | Gösterim dağınık |
| “Yapay zeka hukuk” | `/yapay-zeka-hukuk/*` + home + blog | Marka/kategori karışık |

**Kural:** Her ana sorgu için **1 canonical kazanan**. Diğerleri 301 veya destek sayfa (iç link + canonical).

### 2.2 Snippet dili ≠ arama dili

Kullanıcı arar: “kira zammı yasal mı”, “kıdem hesaplama”, “tahliye taahhüdü geçerli mi”.  
Snippet’ler sık: “Legal AI / hukuk asistanı / TBK / Yargıtay”.

Sonuç: Gösterim alınır, tıklanmaz (CTR %1,3).

**Ek çelişki (doğrulandı — landing taraması):**  
Hero UI: *“Kişisel hukuk asistanınız…”* (geniş platform).  
`lib/seo/site.ts` home title hâlâ: *“Clause — Kira zammı yasal mı? Ücretsiz sözleşme analizi 2026”* (tek niyet).  
Bu bilinçli SEO darlığı olabilir; ama H1/meta uyumsuzluğu hem CTR hem marka algısını bozar. **Karar:** Home SERP’te birincil niyet seç (kira **veya** platform); hero H1 ile title aynı hikâyeyi anlatsın. Öneri: title’da platform + ücretsiz fayda; kira zammını araç kazananına bırak.

### 2.3 Thin / programmatic yoğunluk

Rehber + blog + kategori ağaçları crawl budget’ı yer. Thin sayfa konum ortalamasını **aşağı çeker**.

### 2.4 Yanlış niyet sızıntısı

Geçmişte Kıbrıs / “kira takip raporu” tipi sorgular gösterim yedi; ürün Türkiye TBK + sözleşme analizi. noindex doğru; GSC’de payı izlemeye devam.

### 2.5 Dönüşüm sinyali zayıf (ikincil SEO)

Araç → kayıt CTA’ları var ama SEO sayfalarında “ücretsiz + 2026 + somut fayda” tutarlı değil. Google engagement’ı dolaylı etkiler; asıl öncelik ranking + CTR.

---

## 3. Hedef mimari: 4 kapı (Top 10 odaklı)

Google’a net 4 kapı; diğer her URL bunlardan birine bağlanır.

| # | Kapı (kazanan URL) | Birincil sorgu örnekleri | Top 10 KPI (90 gün) |
|---|---|---|---|
| 1 | `/araclar/kira-sozlesmesi-artis-orani-hesaplama` (+ pillar kira) | kira zammı 2026, kira artış hesaplama | konum ≤10, CTR ≥4% |
| 2 | `/araclar/kidem-ihbar-tazminati-hesaplama` | kıdem tazminatı hesaplama, ihbar | konum ≤10 |
| 3 | `/araclar/tahliye-taahhudu-gecerlilik-kontrolu` | tahliye taahhüdü geçerli mi | konum ≤12 → 10 |
| 4 | `/` + `/araclar/sozlesme-tuzak-tarama` | sözleşme analizi ücretsiz, tuzak madde | marka + tool CTR |

Pillar’lar (`/kira-sozlesmesi-analizi`, `/is-sozlesmesi-analizi`, `/dilekce-hazirlama`) kapıları **besler**, onlarla yarışmaz.

---

## 4. Snippet formülü (zorunlu)

**Title (≤60 karakter hedef):**  
`[Soru / fayda] 2026 — [ücretsiz araç] | Clause`

**Description (≤155):**  
Somut çıktı + ücretsiz + CTA. Jargon yok.

### Örnek rewrite’lar

| Sayfa | Bugün (tipik) | Hedef |
|---|---|---|
| Home | Yapay zeka hukuk asistanı… | `Ücretsiz hukuk asistanı: sözleşme tara, dilekçe yaz, soru sor — Clause 2026` |
| Kira zam | …yasal hesaplama ve AI ön inceleme | `Kira zammı yasal mı? 2026 tavan hesap + ücretsiz sözleşme tarama` |
| Kıdem | … | `Kıdem ve ihbar tazminatı hesaplama 2026 — ücretsiz + iş sözleşmesi risk taraması` |
| Tahliye | … | `Tahliye taahhüdü geçerli mi? Ücretsiz kontrol listesi + AI ön inceleme` |

H1 = kullanıcı cümlesi; marka H1’i ezmesin ama brand SERP’te title sonunda dursun.

---

## 5. 90 günlük sprint (Top 10)

### P0 — Hafta 1–2 (CTR + kazanan netliği)

1. **GSC export:** Sorgular + Sayfalar (CSV). Top 50 sorguyu sınıflandır: kazanır / destekler / noindex / yoksay.  
2. **10 para sayfasında** title + description + H1 rewrite (formül §4).  
3. Cannibalization: kira / kıdem / tahliye / dilekçe için kazanan tablosu → canonical veya 301.  
4. Home meta + hero alt kopya: “sadece kira/dilekçe değil” ama SEO title’da hâlâ **somut fayda** (genel “tüm hukuk” title’da boğulmasın).  
5. GSC: URL denetimi kazanan URL’lere; sitemap teyidi.

### P1 — Hafta 3–6 (içerik derinliği + iç link)

6. Her kazanan araç sayfasına: HowTo + FAQ (zaten shell var) **görünür H2/FAQ metni** güçlendir.  
7. Rehber → kazanan araç sticky CTA (ücretsiz kayıt / tara).  
8. Thin rehber: birleştir veya noindex; yeni programmatic batch **yok**.  
9. Blog/cron: yalnız TR transactional sorular; Kıbrıs/niş yok.  
10. İç link hub: `/araclar` ve 4 kapıdan karşılıklı 2–3 bağ.

### P2 — Hafta 7–12 (otorite + ölçüm)

11. Marka aramaları: `clause` / `tryclause` CTR izle.  
12. 2–3 yüksek kalite “niyet makalesi” (600–1200 kelime), programmatic değil.  
13. Core Web Vitals mobil (10 para sayfası).  
14. Haftalık KPI panosu (aşağı).

---

## 6. Başarı ölçütleri

| KPI | Bugün | 30 gün | 90 gün |
|---|---|---|---|
| Ort. konum (tüm site) | 30,8 | ≤25 | ≤18 (site geneli); **kümelerde ≤10** |
| CTR (top 20 sorgu) | %1,3 | ≥2,5% | ≥4% |
| Haftalık organik tıklama | ~1 | ≥15 | ≥50 |
| 4 kapı: ortalama konum | — | ≤20 | **≤10** |
| Organik → kayıt | ölç | baseline | +%50 |

**Not:** Site geneli ortalama 10 olmayabilir (uzun kuyruk 40+ kalır). Başarı = **4 kapıda top 10**, site ortalaması ikincil.

---

## 7. Yapılmayacaklar

- Yeni URL ağacı / v2 path  
- “Legal AI / Yargıtay emsal” odaklı title  
- Rehber fabrikası yeni batch  
- Erken paywall SEO kopyasında  
- Kıbrıs / yurt dışı niş içerik  
- Tüm hukuku tek title’a sıkıştırmak (ürün wording ayrı plan: `wording-repositioning-plan.md`)

---

## 8. Persistent chat / hesabım (doğrulama)

`/hesabim` = kayıtlı **analiz arşivi** (`save-analysis`); kalıcı sohbet thread’i yok. Analyzer `useChat` ephemeral. Bu, `legal-chat-homepage-demo-plan.md` ihtiyacını doğrular.

---

## 9. Uygulama checklist (repo)

- [x] `lib/seo/tool-metadata.ts` + home `defaultHomeMetadata` rewrite (hero ile hizala) — 19 Eyl 2026
- [x] 10 araç/pillar sayfasında H1 + title/desc (kira, kıdem-ihbar, tahliye, tuzak, dilekçe pillar, hub…)
- [x] `next.config.mjs` — `/sozlesme-analizi/kira|is` → pillar 301
- [x] Rehber `SeoSignupCta` varsayılan kopyası
- [ ] GSC CSV → `docs/gsc-query-map-YYYY-MM.md` (manuel ekle)
- [ ] Haftalık: konum/CTR notu bu dosyaya append
- [ ] Deploy sonrası GSC URL denetimi (4 kapı + home)

---

## 10. Sıra (ürün ile ilişki)

1. **Önce SEO** (bu dosya) — trafik  
2. **Wording** (`docs/wording-repositioning-plan.md`) — “tüm hukuki işler” konumlandırma  
3. **Kalıcı mevzuat chat + homepage demo** (`docs/legal-chat-homepage-demo-plan.md`) — retention / kayıt nedeni  

SEO title’lar dar ve transactional kalır; ürün kimliği genişler. İkisi çelişmez: **SERP’te fayda, sitede platform.**

---

*Sonraki aksiyon:* GSC’den Sorgular + Sayfalar CSV paylaşırsan kazanan eşlemesini satır satır doldururuz. Aksi halde P0’ya 10 para sayfası meta rewrite ile kod tarafında başlanabilir.*
