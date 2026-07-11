import { createRehberPage } from "@/lib/seo/rehber-factory";
import type { BlogPostConfig } from "@/lib/seo/rehber-types";

function blog(
  input: Parameters<typeof createRehberPage>[0] & {
    excerpt: string;
    publishedAt: string;
  },
): BlogPostConfig {
  return { ...createRehberPage(input), excerpt: input.excerpt, publishedAt: input.publishedAt };
}

/** SEO Faz 2 — blog genişletme (+12 yazı) */
export const BLOG_BATCH_3_POSTS: BlogPostConfig[] = [
  blog({
    slug: "kira-borcu-ne-zaman-tahliye",
    h1: "Kira borcu ne zaman tahliyeye gider? — kiracı rehberi",
    metaTitle: "Kira borcu tahliye — kaç ay ödenmezse? 2026",
    metaDescription:
      "Kira borcu birikince tahliye süreci nasıl işler? İhtar, icra ve dava. Kiracı hakları ve ücretsiz kira sözleşmesi analizi.",
    keywords: ["kira borcu tahliye", "kira ödenmezse", "kiracı tahliye süreci"],
    excerpt: "Ay sayısı tek başına yeterli değil — usul şartları kritik.",
    publishedAt: "2026-07-11",
    intro:
      "Ev sahibi 'üç ay ödemedi, çık' dediğinde çoğu kiracı panikler. Oysa tahliye, kira borcu takibinden ayrı ve usule bağlı bir süreçtir.",
    sections: [
      {
        title: "Borç takibi ≠ tahliye",
        paragraphs: [
          "Kira alacağı icra veya dava ile tahsil edilir. Tahliye için ayrıca kanuni sebep ve usul gerekir.",
          "Zorla çıkarma yasaktır; ihtiyati tedbir ve mahkeme kararı olmadan kapı değiştirilmez.",
        ],
      },
      {
        title: "Kiracı ne yapmalı?",
        paragraphs: [
          "Borcu kabul ediyorsanız yazılı ödeme planı önerin. İtirazınız varsa sürelere dikkat ederek cevap verin.",
          "Sözleşmedeki fesih ve depozito maddelerini Clause ile kontrol edin.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kısmi ödeme tahliyeyi durdurur mu?",
        answer: "Somut olayda müzakere ve usul farklı sonuç doğurur; yazılı kayıt tutun.",
      },
    ],
    ctaHref: "/rehber/kira-borcu-takibi-icra",
  }),
  blog({
    slug: "kira-artisi-itiraz-nasil-yapilir",
    h1: "Kira artışına itiraz nasıl yapılır? — 2026 pratik rehber",
    metaTitle: "Kira artışına itiraz — yazılı süreç ve haklar",
    metaDescription:
      "Kira artış bildirimi geldi, oran yüksek mi? İtiraz adımları, hesaplama ve sözleşme kontrolü. Ücretsiz kira artış hesaplayıcı.",
    keywords: ["kira artışına itiraz", "kira zammı itiraz", "kira artışı hukuka aykırı"],
    excerpt: "Panik yerine sırayla: oran, matrah, sözleşme, yazılı itiraz.",
    publishedAt: "2026-07-10",
    intro:
      "Yıllık kira artış mektubu geldiğinde ilk iş hesaplayıcı ile oranı doğrulamak, ikinci iş sözleşmedeki maddeyi okumaktır.",
    sections: [
      {
        title: "Kontrol listesi",
        paragraphs: [
          "Yasal tavan ve bildirim süresi uygun mu? Artış matrahı doğru mu (aidat dahil mi)?",
          "Sözleşmede 'serbest artış' gibi belirsiz ifade var mı?",
        ],
      },
      {
        title: "Yazılı itiraz",
        paragraphs: [
          "İtirazınızı tarih ve tutarla yazılı iletin. Ödeme yapıyorsanız 'ihtirazi kayıt' düşünün; uzman görüşü alın.",
        ],
      },
    ],
    faqs: [
      {
        question: "İtiraz edersem kira ödemem gerekir mi?",
        answer: "Uyuşmazlık sürerken ödeme yükümlülüğü ayrı tartışılır; hukuki danışmanlık önerilir.",
      },
    ],
    ctaHref: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  }),
  blog({
    slug: "depozito-iade-suresi-ne-kadar",
    h1: "Depozito iade süresi ne kadar? — kiracı beklentisi ve gerçek",
    metaTitle: "Depozito iade süresi — kaç günde ödenir? 2026",
    metaDescription:
      "Tahliye sonrası depozito ne zaman iade edilir? Makul süre, kesinti ve yazılı ihtar. Ücretsiz depozito rehberi.",
    keywords: ["depozito iade süresi", "depozito ne zaman iade", "kira depozitosu süre"],
    excerpt: "Sözleşmede yazmasa bile makul süre beklenir — keyfi gecikme uyuşmazlık doğurur.",
    publishedAt: "2026-07-09",
    intro:
      "Tahliye ettikten haftalar sonra depozito gelmeyince kiracılar 'hakkım ne?' diye sorar. Süre sözleşme ve teamül ile belirlenir.",
    sections: [
      {
        title: "Makul süre",
        paragraphs: [
          "Hasar incelemesi ve sayaç okuması için kısa bir süre normaldir; aylarca bekletme keyfi sayılabilir.",
        ],
      },
      {
        title: "Kesinti listesi isteyin",
        paragraphs: [
          "Ev sahibi kesinti yapacaksa kalemleri ve faturaları göstermelidir. Olağan yıpranma kesilemez.",
        ],
      },
    ],
    faqs: [
      {
        question: "Depozito faizi işler mi?",
        answer: "Sözleşme ve talep şekline bağlıdır; yazılı ihtarda faiz talebi düşünülebilir.",
      },
    ],
    ctaHref: "/rehber/depozito-iadesi",
  }),
  blog({
    slug: "gunluk-hukuk-sorulari-yapay-zeka",
    h1: "Günlük hukuk sorularına yapay zeka ile cevap — sınırlar ve fırsatlar",
    metaTitle: "Günlük hukuk soruları — yapay zeka ile hızlı bilgi 2026",
    metaDescription:
      "Kira, iş ve tüketici sorularında AI hukuk asistanı kullanımı. Günlük hukuk ihtiyaçları için ücretsiz ön tarama.",
    keywords: [
      "günlük hukuk soruları",
      "yapay zeka hukuk soru",
      "günlük hukuki sorular",
      "hukuk AI cevap",
    ],
    excerpt: "ChatGPT değil, sözleşme odaklı Legal AI — fark burada.",
    publishedAt: "2026-07-08",
    intro:
      "İnsanlar her gün 'kira artışı legal mi', 'işten attılar tazminat var mı' diye arar. Genel sohbet botları uydurma madde üretebilir; sözleşme odaklı araçlar daha güvenlidir.",
    sections: [
      {
        title: "Doğru araç seçimi",
        paragraphs: [
          "Clause gibi LegalTech ürünleri metninizi tarar; genel chat ise kaynak göstermeden cevap verebilir.",
        ],
      },
      {
        title: "Ne zaman avukat?",
        paragraphs: [
          "İcra, dava, yüksek tutar ve ceza riski varsa AI yeterli değildir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ücretsiz günlük kullanım var mı?",
        answer: "Clause'da günlük ücretsiz ön tarama hakkı sunulur.",
      },
    ],
    ctaHref: "/rehber/gunluk-hukuk-ihtiyaclari",
  }),
  blog({
    slug: "kibris-kira-sozlesmesi-7-tuzak",
    h1: "Kıbrıs kira sözleşmesinde 7 tuzak — Türk kiracılar için",
    metaTitle: "Kıbrıs kira sözleşmesi tuzakları — depozito ve hasar",
    metaDescription:
      "KKTC kira kontratında eşya hasar depozitosu, döviz şartı ve tahliye. İmza öncesi kontrol listesi ve AI analiz.",
    keywords: [
      "kıbrıs kira sözleşmesi",
      "kktc kira kontratı",
      "kıbrıs kira tuzakları",
      "kıbrıs depozito",
    ],
    excerpt: "Türkiye alışkanlığıyla imzalamayın — yerel madde farkı büyük.",
    publishedAt: "2026-07-07",
    intro:
      "Kıbrıs'a taşınan öğrenci ve çalışanlar çoğu zaman İngilizce veya karma sözleşmeyi okumadan imzalar. En sık sorun depozito ve eşya hasarıdır.",
    sections: [
      {
        title: "Depozito ve döviz",
        paragraphs: [
          "Sterlin veya euro depozito, kur riski ve iade hesabı tartışmalıdır. TL mi döviz mi net yazılmalı.",
        ],
      },
      {
        title: "Eşya listesi",
        paragraphs: [
          "Mobilya envanteri ve fotoğraf olmadan hasar iddiasına karşı savunma zayıftır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Türkçe sözleşme şart mı?",
        answer: "Hayır ama anlamadığınız dilde imza risklidir; çeviri ve AI özet kullanın.",
      },
    ],
    ctaHref: "/rehber/kibris-kira-depozito-anlasmazligi",
  }),
  blog({
    slug: "online-abonelik-iptal-hakki-2026",
    h1: "Online abonelik iptal hakkı 2026 — uygulama ve platform rehberi",
    metaTitle: "Abonelik iptal hakkı 2026 — dijital üyelik rehberi",
    metaDescription:
      "Otomatik yenileme, gizli iptal ve tüketici hakları. Üyelik sözleşmesi ücretsiz AI kontrolü.",
    keywords: ["abonelik iptal hakkı", "üyelik iptali", "otomatik yenileme iptal 2026"],
    excerpt: "İptal butonu yoksa bile yazılı talep ve şikayet yolları var.",
    publishedAt: "2026-07-06",
    intro:
      "Yıllık plan otomatik yenilendi, iptal sayfası yok — tanıdık senaryo. Tüketici mevzuatı ve sözleşme metni birlikte okunmalı.",
    sections: [
      {
        title: "Yazılı iptal",
        paragraphs: [
          "E-posta, destek kaydı veya noter ile iptal talebinizi tarihli gönderin. Ekran görüntüsü alın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Cayma ile iptal aynı mı?",
        answer: "Hayır; 14 gün cayma ile dönem içi iptal farklı kurallara tabidir.",
      },
    ],
    ctaHref: "/rehber/abonelik-iptal-dijital-hizmet",
  }),
  blog({
    slug: "is-sozlesmesi-rekabet-yasagi-tuzaklari",
    h1: "İş sözleşmesinde rekabet yasağı tuzakları — çalışan rehberi",
    metaTitle: "Rekabet yasağı iş sözleşmesi — geçerli mi? 2026",
    metaDescription:
      "Geniş coğrafi ve süreli rekabet yasağı, tazminat ve geçersizlik. İş sözleşmesi ücretsiz AI analizi.",
    keywords: ["rekabet yasağı", "iş sözleşmesi rekabet", "rekabet yasağı geçersiz"],
    excerpt: "Her iş sözleşmesindeki rekabet maddesi bağlayıcı değildir.",
    publishedAt: "2026-07-05",
    intro:
      "İşten ayrılırken '2 yıl rakip firmada çalışamazsın' maddesi panik yaratır. Süre, coğrafya ve tazminat birlikte değerlendirilir.",
    sections: [
      {
        title: "Geçerlilik şartları",
        paragraphs: [
          "Aşırı geniş yasaklar geçersiz sayılabilir. Karşılık tazminat veya ödeme yazılmamışsa madde zayıflar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Rekabet yasağı ihlalinde ne olur?",
        answer: "Tazminat ve ihtiyati tedbir talepleri gündeme gelebilir; avukat desteği şarttır.",
      },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
  }),
  blog({
    slug: "kira-sozlesmesi-ev-sahibi-kontrol-listesi",
    h1: "Ev sahibi için kira sözleşmesi kontrol listesi — 2026",
    metaTitle: "Ev sahibi kira sözleşmesi — kontrol listesi ve riskler",
    metaDescription:
      "Mal sahibi için kira kontratı: artış, depozito, kefil, tahliye. Ücretsiz AI kira sözleşmesi analizi.",
    keywords: ["ev sahibi kira sözleşmesi", "kira kontratı mal sahibi", "kira sözleşmesi hazırlama"],
    excerpt: "Kiracı kadar mal sahibi de usulsüz madde yüzünden dava yer.",
    publishedAt: "2026-07-04",
    intro:
      "Ev sahipleri çoğu zaman hazır şablon kullanır; tahliye taahhüdü ve depozito maddesi eksik kalır.",
    sections: [
      {
        title: "Şablonda olması gerekenler",
        paragraphs: [
          "Artış formülü, depozito iade süreci, bakım-onarım paylaşımı, kefil ve bildirim adresleri.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözlü anlaşma yeterli mi?",
        answer: "Hayır; yazılı sözleşme ve teslim tutanağı şarttır.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
  }),
  blog({
    slug: "ucretsiz-hukuk-asistani-2026-karsilastirma",
    h1: "Ücretsiz hukuk asistanı 2026 — Clause ve alternatifler",
    metaTitle: "Ücretsiz hukuk asistanı karşılaştırma 2026",
    metaDescription:
      "Türkiye'de ücretsiz legal AI ve sözleşme analizi araçları. Günlük hukuk ihtiyaçları için karşılaştırma.",
    keywords: [
      "ücretsiz hukuk asistanı",
      "ücretsiz legal AI",
      "hukuk asistanı karşılaştırma",
    ],
    excerpt: "Genel chat bot ≠ sözleşme analizi ürünü.",
    publishedAt: "2026-07-03",
    intro:
      "Ücretsiz hukuk asistanı arayanlar ChatGPT, Clause ve çeşitli LegalTech araçlarını karşılaştırır. Kriter: metin tarama, Türkçe TBK bağlamı, veri güvenliği.",
    sections: [
      {
        title: "Karşılaştırma kriterleri",
        paragraphs: [
          "Sözleşme yükleme, risk özeti, KVKK politikası ve avukat yönlendirmesi.",
        ],
      },
    ],
    faqs: [
      {
        question: "Clause tamamen ücretsiz mi?",
        answer: "Günlük ücretsiz ön tarama vardır; detay katmanlar farklı olabilir.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk",
  }),
  blog({
    slug: "tuketici-cayma-hakki-istisnalar",
    h1: "Cayma hakkı istisnaları — hangi ürünlerde 14 gün yok?",
    metaTitle: "Cayma hakkı istisnaları — mesafeli satış 2026",
    metaDescription:
      "14 gün cayma hakkı olmayan ürünler: kişiye özel, hijyen, çabuk bozulan. Tüketici rehberi.",
    keywords: ["cayma hakkı istisnaları", "14 gün cayma yok", "iade hakkı istisna"],
    excerpt: "Her online alışverişte cayma yok — satıcı ön bilgilendirme yapmalı.",
    publishedAt: "2026-07-02",
    intro:
      "Tüketici 'her şeyi iade ederim' sanır; oysa kanun belirli malları istisna tutar.",
    sections: [
      {
        title: "Sık istisnalar",
        paragraphs: [
          "Kişiye özel üretim, hijyenik ürün ambalajının açılması, çabuk bozulan gıda.",
        ],
      },
    ],
    faqs: [
      {
        question: "İndirimli ürün istisna mı?",
        answer: "Hayır; indirim tek başına istisna değildir.",
      },
    ],
    ctaHref: "/rehber/online-alisveris-14-gun-cayma",
  }),
  blog({
    slug: "freelance-sozlesme-fatura-rehberi",
    h1: "Freelance sözleşme ve fatura — serbest çalışan rehberi 2026",
    metaTitle: "Freelance sözleşme fatura — ödeme ve telif maddeleri",
    metaDescription:
      "Serbest çalışan sözleşmesi, fatura kesimi ve ödeme vadesi. Ücretsiz freelance kontrat AI analizi.",
    keywords: ["freelance sözleşme", "serbest çalışan fatura", "freelance kontrat türkiye"],
    excerpt: "Sözlü anlaşma + geç ödeme = en sık freelance davası.",
    publishedAt: "2026-07-01",
    intro:
      "Freelancer'lar çoğu zaman sözleşme imzalamadan işe başlar. Ödeme vadesi ve telif devri yazılmazsa alacak tahsil zorlaşır.",
    sections: [
      {
        title: "Sözleşmede minimum maddeler",
        paragraphs: [
          "İş tanımı, teslim tarihi, ücret, ödeme vadesi, revizyon hakkı, telif ve gizlilik.",
        ],
      },
    ],
    faqs: [
      {
        question: "Fatura kesmeden dava açılır mı?",
        answer: "Alacak ispatı başka delillerle de mümkün olabilir; yazılı sözleşme en güçlüsüdür.",
      },
    ],
    ctaHref: "/sozlesme-analizi/freelance-yazilim-kontrati",
  }),
  blog({
    slug: "yapay-zeka-sozlesme-analizi-ucretsiz-rehber",
    h1: "Yapay zeka sözleşme analizi ücretsiz — başlangıç rehberi",
    metaTitle: "Yapay zeka sözleşme analizi ücretsiz — 2026 adımlar",
    metaDescription:
      "Ücretsiz AI sözleşme taraması nasıl yapılır? Kira, iş ve ticari kontrat için Clause rehberi.",
    keywords: [
      "yapay zeka sözleşme analizi ücretsiz",
      "ücretsiz AI kontrat analizi",
      "sözleşme tarama ücretsiz",
    ],
    excerpt: "Metni yapıştır, risk özetini al, avukata git.",
    publishedAt: "2026-06-30",
    intro:
      "Yapay zeka sözleşme analizi ücretsiz katmanda ön risk haritası sunar. Bu rehber ilk kullanım adımlarını özetler.",
    sections: [
      {
        title: "3 adım",
        paragraphs: [
          "Metni yapıştırın veya yükleyin. Risk özetini okuyun. Şüpheli maddeleri avukatınızla paylaşın.",
        ],
      },
    ],
    faqs: [
      {
        question: "PDF yüklenir mi?",
        answer: "Desteklenen formatlar ürün arayüzünde belirtilir; metin kopyalama her zaman çalışır.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
  }),
];
