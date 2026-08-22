# Clause.ai — SEO & Ürün Mimarisi İncelemesi

**Tarih:** 22 Ağustos 2026  
**Kapsam:** [tryclause.tech](https://tryclause.tech/) tüm public IA, GSC sinyali, kayıt hunisi  
**Rol:** Product Manager review  
**Hedef:** Türkiye’de 1 numaralı legal-tech olmak; şimdi **sıralama + fayda + kayıt**; abonelik sonra.

---

## 1. Yönetici özeti

Clause doğru üründe: Türkiye kira/iş sözleşmesi + ücretsiz araç + kayıtla tam rapor. GSC bunu henüz yansıtmıyor.

| Metrik (GSC, ~6 ay, Web) | Değer | Yorum |
|---|---|---|
| Tıklama | 11 | Neredeyse sıfır organik talep |
| Gösterim | 753 | Endeks büyüyor; tıklama yok |
| CTR | %1,5 | Snippet ikna etmiyor veya 2–3. sayfa |
| Ort. konum | 26,3 | Hedef: kümeler halinde top 10 |

Gösterimlerin en büyüğü **Kıbrıs depozito** sorguları (~62). Ürün Türkiye TBK. Bu sayfalar `noindex` + sitemap dışı — doğru. Google hâlâ eski URL’leri gösteriyor; CTR sıfır. Asıl büyüme **Türkiye yüksek niyet** sorgularında olmalı.

**Tek cümle:** Mimari geniş, niyet dağınık, snippet zayıf, kayıt hunisi SEO sayfalarında yeterince keskin değil.

---

## 2. Ürün–pazar uyumu (SEO lensi)

### Ne satıyoruz (beta)

- Misafir: anında teaser / ön tarama  
- Kayıt: detaylı risk + PDF (lansman ücretsiz)  
- Araçlar: kira zammı, kıdem, tahliye, dilekçe — **kayıtsız değer**

### Google’ın bizi nasıl gördüğü

Üst sorgular:

1. Kıbrıs eşya hasar depozitosu (ürün dışı)  
2. “kira takip raporu yapay zeka” / “yapay zekâ ile kira takibi” — **ürün adı uyumsuz** (biz sözleşme analizi + zam hesabı, “kira takip raporu” değil)  
3. `clause.ai` marka — 7 gösterim, 0 tıklama  
4. `işsizlik maaşı hesaplama` — araç sayfası fırsatı, 6 gösterim

**Boşluk:** İnsanlar “kira takibi / rapor” arıyor; title’lar “hukuk asistanı / legal AI / TBK”. Title, H1 ve araç kopyası **kullanıcı diline** çekilmeli.

---

## 3. Site mimarisi (IA)

```
/                          ← marka + CTA
/kira-sozlesmesi-analizi   ← pillar (intent)
/is-sozlesmesi-analizi
/dilekce-hazirlama
/araclar/*                 ← transaction (kayıt hunisi)
/rehber/*                  ← bilgi
/blog/*                    ← içerik motoru + statik
/hukuki-analiz/*           ← problem
/haklarim/*                ← senaryo
/sozlesme-analizi/*        ← sözleşme türü
/analiz/*                  ← analiz türü (çakışma)
/yapay-zeka-hukuk/*        ← kategori kelime
/gunluk-hukuk              ← hub
/dilekce-olusturucu
/giris  /kayit             ← noindex (giriş)
```

### Güçlü yan

- `lang=tr`, canonical, OG, FAQ JSON-LD, breadcrumbs  
- Pillar + araç + rehber ayrımı doğru fikir  
- Kıbrıs noindex kararı doğru  
- Cron MDX (soru-cevap niyeti) doğru yön  

### Zayıf yan: aynı niyet, çok URL

Aynı “kira sözleşmesi analizi” niyeti:

| URL | Rol |
|---|---|
| `/kira-sozlesmesi-analizi` | Pillar |
| `/sozlesme-analizi/kira-sozlesmesi-analizi` | Tür sayfası |
| `/analiz/kira-sozlesmesi` | Analiz workspace |
| `/araclar/kira-analizi` | Ücretsiz araç |
| `/araclar/kira-sozlesmesi-artis-orani-hesaplama` | Hesaplayıcı |
| `/rehber/kiraci-haklari` + onlarca varyasyon | Bilgi |

Google her kümeyi **tek kazanan URL** ister. Şu an crawl budget dağınık; konum 26’da kalır.

**Kural önerisi:** Her ana sorgu için 1 canonical.

| Küme | Kazanan | Diğerleri |
|---|---|---|
| Kira sözleşmesi analizi | `/kira-sozlesmesi-analizi` | 301 veya `rel=canonical` |
| Kira zammı hesap | `/araclar/kira-sozlesmesi-artis-orani-hesaplama` | Eski slug’lar zaten redirect |
| Kıdem tazminatı | `/araclar/kidem-tazminati-hesaplama` | Rehber destekler, yarışmaz |
| Tahliye taahhüt | `/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol` | Rehber “nasıl” |
| Dilekçe | `/dilekce-hazirlama` + `/dilekce-olusturucu` | İkisini birleştir veya net roller |

`/analiz` vs `/sozlesme-analizi` vs pillar — üç ağaç fazla. Yeni sayfa açmadan önce “bu slug hangi kazananı destekliyor?” zorunlu.

---

## 4. İçerik stoğu

- **Programatik rehber:** birden fazla batch (extended, extra, GSC, daily…) — yüzlerce benzer şablon sayfa riski  
- **Blog (kod):** eski config post’lar  
- **Blog (MDX cron):** 5 yazı (zam 2026, depozito, tahliye, mobbing, ayıplı mal)  
- **Araçlar:** ~15 hesap / tarama sayfası — **en yüksek dönüşüm potansiyeli**

Thin/duplicate programmatic sayfa Google’ı yorar. Öncelik: **daha az sayfa, daha iyi snippet, daha net CTA**.

Cron doğru: “Ev sahibi kiraya yüzde kaç zam 2026?” gibi GSC-benzeri sorular. Kıbrıs benzeri niş üretmesin.

---

## 5. Teknik SEO

| Madde | Durum | Aksiyon |
|---|---|---|
| `sitemap.xml` | Hub’lar + araçlar + rehber; Kıbrıs yok | OK |
| `robots.txt` | `/api`, `/giris`, `/admin`, `/baski` kapalı | `/kayit` da kapat |
| Canonical | `SITE_URL` / Vercel fallback | Prod’da `NEXT_PUBLIC_SITE_URL=https://tryclause.tech` sabit |
| noindex | Kıbrıs rehber/blog | Search Appearance’da drop izle |
| Home title | “Yapay Zeka Hukuk Asistanı — Ücretsiz Sözleşme Analizi AI” | İyi; CTR için fayda cümlesi ekle |
| Home description | Legal AI jargonu ağır | “Kira zammı yasal mı? Sözleşmeyi ücretsiz tara.” |
| Structured data | FAQ + breadcrumb (GSC’de var) | Araç sayfalarına `SoftwareApplication` / HowTo |
| Index bloat | Çok URL, benzer H1 | Kazanan dışı sayfaları birleştir |

---

## 6. Kayıt hunisi (SEO → signup)

Beta kuralı: değer ücretsiz, **tam rapor hesapta**.

| Yüzey | Bugün | Olması gereken |
|---|---|---|
| Ana sayfa | Güçlü CTA, AuthModal | Koru |
| Araçlar | Hesap sonucu → “sözleşmeyi tara / kayıt” | Her sonuç kartında tek birincil CTA |
| Rehber/blog | Link var, zayıf | Sticky: “Bu maddeleri sözleşmende tara — ücretsiz kayıt” |
| Pillar | CTA href araç/analiz | Analiz modal veya `/giris?kayit=1` |
| SERP | Düşük CTR | Title’da “ücretsiz” + yıl + somut fayda |

**Kuzey yıldızı (beta):** organik oturum → araç kullanımı **veya** teaser → kayıt.

Abonelik metrikleri şimdi ikincil. Fiyat bloğu landing’de “0₺ / günde 10” ile aboneliği erken anlatıyor; SEO sayfalarında **fiyat değil fayda**.

---

## 7. 90 günlük SEO önceliği

### P0 — Sıralama ve tıklama (hafta 1–4)

1. **Title/meta rewrite** kazanan URL’lerde: soru + 2026 + ücretsiz.  
   Örnek: `Kira zammı yasal mı? 2026 tavan hesap + ücretsiz sözleşme tarama`  
2. **SERP-ürün dil uyumu:** “kira takip raporu” aranan yerde H2/FAQ’da “kira artış raporu / zam kontrolü” eşle; ürün adını değiştirmeden.  
3. **Cannibalization haritası:** kira / kıdem / tahliye / dilekçe için 1 kazanan; diğerlerine canonical.  
4. **Kıbrıs:** noindex kalsın; GSC’de “Kıbrıs” gösterimi düşünce Türkiye kümelerine bak.

### P1 — Dönüşüm (hafta 3–8)

5. Rehber şablonuna **sabit kayıt CTA** (kopya: lansman ücretsiz PDF).  
6. Araç sonucu → `giris?kayit=1` + olay: `seo_tool_signup_click`.  
7. 10 “para sayfası” (kira zam, kıdem, işsizlik, tahliye, dilekçe, tuzak tarama, pillar kira/iş) Core Web Vitals + mobil snippet.

### P2 — Otorite (hafta 4–12)

8. Cron: yalnız Türkiye transactional sorular; Kıbrıs/niş yok.  
9. Yeni programmatic sayfa yok; mevcut thin sayfaları birleştir veya noindex.  
10. Marka: `clause.ai` / Clause Google’da tıklansın diye anasayfa title’da Clause net dursun.

---

## 8. Başarı ölçütleri (abonelik öncesi)

| KPI | 90 gün hedef (yön) |
|---|---|
| Organik tıklama | 11 → 150+ / 6 ay penceresi değil, **haftalık** izle |
| CTR (top 20 sorgu) | %1,5 → %4+ |
| Ort. konum (kira zam, kıdem, tahliye) | 26 → top 15, sonra top 10 |
| Organik → kayıt | Event hunisi (şimdi ölç) |
| Gösterimde Kıbrıs payı | Düşmeli; TR araç/rehber payı artmalı |

Abonelik: kayıtlı aktif kullanıcı + haftalık analiz eşiği netleşince aç; SEO copy’de paywall yok.

---

## 9. Bilinçli yapılmayacaklar

- Yeni URL ağacı (`/analiz-v2` vb.)  
- Kıbrıs / yurt dışı niş içerik  
- “Legal AI / Yargıtay / TBK” odaklı title (kullanıcı aramıyor)  
- Rehber fabrikasına yeni batch  
- Erken paywall (sıralama ve kayıt öldürür)

---

## 10. Mimari karar (tek cümle)

**Google’a 4 kapı göster:** (1) kira analizi, (2) iş/tazminat araçları, (3) dilekçe, (4) sözleşme tuzak taraması. Diğer her sayfa bu dördünden birine link ve canonical ile bağlansın. Kayıt, bu dört kapının çıktısında olsun.

---

*Kaynaklar: GSC Performans (6 ay), [tryclause.tech](https://tryclause.tech/) canlı kopya, repo `app/`, `lib/seo/`, `lib/launch.ts`, `app/sitemap.ts`, `app/robots.ts`.*
