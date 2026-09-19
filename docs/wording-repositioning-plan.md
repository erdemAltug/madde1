# Clause — Site İçi Wording & Konumlandırma Planı

**Tarih:** 19 Eylül 2026  
**Amaç:** Ürünü “sadece dilekçe / kira sözleşmesi hazırlayan araç” algısından çıkarıp **Türk hukuku için kişisel AI asistan** olarak konumlandırmak.  
**Bağımlı:** SEO planı `docs/seo-top10-gsc-2026-09.md` (SERP dili dar kalır; site dili genişler).  
**Ürün follow-up:** `docs/legal-chat-homepage-demo-plan.md`

---

## 1. Problem

| Yüzey | Bugünkü algı riski | İstenen algı |
|---|---|---|
| Hero / hakkimizda | Kira + iş sözleşmesi ağırlıklı | Tüm günlük hukuki süreçler |
| Araçlar hub | Hesap makinesi sitesi | Asistanın ücretsiz kapıları |
| SEO sayfaları | Dar (iyi) | Dar kalmalı — değiştirme |
| Kayıt sonrası | Analiz arşivi | **Kalıcı hukuk sohbeti + arşiv** |

Hero’da zaten genişleme var (“kira ve işle sınırlı değil”) ama alt bölümler, footer, hakkimizda ve CTA’lar hâlâ **sözleşme tarama** merkezli. Tutarsızlık güven ve SEO mesajını bulanıklaştırır.

---

## 2. Mesaj mimarisi (3 katman)

### Katman A — SERP (dar, transactional)

Örnek: “Kira zammı 2026 hesapla”, “Kıdem tazminatı hesapla”.  
**Burada “tüm hukuk” demeyin.**

### Katman B — Site (platform)

**Positioning cümlesi (tek):**  
> Clause, Türk hukukunda günlük işleriniz için yapay zeka asistanınızdır: sorun sorun, belge tarayın, taslak üretin, hesabınızda saklayın.

**Destek üçlüsü:**
1. **Anla** — soru / senaryo (chat, rehber)  
2. **Kontrol et** — sözleşme / taahhüt / tuzak tarama  
3. **Hareket et** — dilekçe / revizyon taslağı / hesaplayıcı çıktısı  

### Katman C — Kayıt değeri

Misafir: anlık ön tarama + araçlar.  
Üye: **kalıcı hukuk sohbeti**, arşiv, tam rapor, persona geçmişi.

---

## 3. Yasak / tercih kelime listesi

| Kullanma (veya seyrek) | Tercih et |
|---|---|
| Legal AI, Yargıtay ile eğitildi (kanıtsız) | Türk mevzuatı bağlamında ön inceleme |
| Avukatınız / kesin hak | Ön kontrol; avukat yerine geçmez |
| Sadece kira / sadece dilekçe | Günlük hukuki işler; sözleşme, dilekçe, soru-cevap |
| Kira takip raporu (ürün değilse) | Kira artış kontrolü / sözleşme tarama |
| Halüsinasyonsuz (mutlak) | Doğrulanmış madde atıfı / dayanaklı özet |

**Disclaimer (her ana CTA altında kısa):**  
Clause avukatlık hizmeti vermez; çıktılar bilgilendirme amaçlıdır.

---

## 4. Sayfa bazlı wording backlog

### 4.1 Ana sayfa (`landing-hero`, companion, why, bottom CTA)

| Blok | Aksiyon |
|---|---|
| **Home meta (`lib/seo/site.ts`)** | Title’ı hero ile hizala: kira-only title’ı kaldır veya ikincil yap; kira zammı SEO’sunu araç kazananına bırak (`seo-top10` §2.2) |
| Eyebrow | `clause.ai — Türk hukuku için kişisel asistan` |
| H1 | Koru veya: `Hukuki işlerinizde yanınızda — tarayın, sorun, taslaklayın` |
| Sub | Sözleşme + dilekçe + **mevzuat sorusu** üçlüsünü tek paragrafta |
| Primary CTA | `Ücretsiz dene` (analiz) |
| Secondary CTA | `Hesap oluştur — hukuk sohbetin kalsın` (chat planı gelince) |
| Trust row | KVKK; misafir silinir; üye arşivler |
| Demo alanı | Chat/analiz görsel demo (ayrı plan) |

### 4.2 `landing-why-assistant` / features / how-it-works

- “Nasıl çalışır” 3 adımı genişlet: **Sor → Tara → Sakla** veya 4. adım “Asistanına sor”.  
- Features: Risk analizi, Mevzuat dayanağı, Taslak/dilekçe, **Kalıcı sohbet (üyeler)**.

### 4.3 Hakkimizda / footer

- “kira ve iş” → “kira, iş, tüketici, freelance ve günlük hukuki metinler”.  
- Footer’da “Yapay zeka hukuk asistanı” kalsın; altına “Soru · Sözleşme · Dilekçe”.

### 4.4 `/hesabim`

- Başlık: `Sözleşme arşivi` → `Hukuk asistanım` (sekmeler: Sohbet | Arşiv | Araçlar).  
- Boş state: “İlk sorunuzu sorun veya sözleşme yapıştırın”.

### 4.5 Araç sayfaları

- Üstte 1 cümle: “Bu hesap, Clause asistanının ücretsiz kapılarından biri.”  
- Sonuç CTA: sözleşme tara **veya** (üyeysen) “Bu sonucu asistanına sor”.

### 4.6 Auth / kayıt

- “Tam rapor için kayıt” → “Asistanını kaybetmemek için kayıt: sohbet + rapor + arşiv”.

---

## 5. Uygulama sırası (kod)

1. **P0 copy-only:** hero sub, bottom CTA, hakkimizda, footer tagline (1 PR).  
2. **P1:** hesabim IA metinleri + araç sonuç köprü cümleleri.  
3. **P2:** homepage demo + chat UI kopyası (`legal-chat-homepage-demo-plan.md` ile).

SEO title/meta’ya “tüm hukuksal işler” doldurma — `seo-top10` formülüne uy.

---

## 6. Ölçüm

| Event / metrik | Ne gösterir |
|---|---|
| `hero_cta_clicked` kaynak ayrımı | Tara vs Kayıt |
| Kayıt sonrası `/hesabim` bounce | Wording vaadi tutuluyor mu |
| Chat açılış (sonra) | Platform algısı |

---

## 7. Örnek mikro kopyalar (hazır)

**Hero sub (aday):**  
Sözleşmenizi tarayın, dilekçe taslağı alın, hukuki sorunuzu sorun. Kira ve işle sınırlı değil — günlük hukuki işlerinizde Clause yanınızda. Ücretsiz kayıtla sohbetiniz ve taramalarınız hesabınızda kalır.

**Bottom CTA (aday):**  
Misafirken anında ön tarama. Üye olunca kişisel hukuk asistanınız: kalıcı sohbet, arşiv ve tam rapor.

**Disclaimer (aday):**  
Clause avukat yerine geçmez. Kritik kararlarda uzman görüşü alın.
