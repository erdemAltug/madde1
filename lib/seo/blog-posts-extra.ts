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

/** +12 blog — SEO içerik genişletme */
export const BLOG_EXTRA_POSTS: BlogPostConfig[] = [
  blog({
    slug: "sozlesme-madde-madde-analiz",
    h1: "Sözleşmeyi madde madde analiz etmek — pratik yöntem",
    metaTitle: "Madde madde sözleşme analizi — AI ile hızlı okuma",
    metaDescription:
      "Uzun sözleşmeyi bölüm bölüm okuma, risk işaretleme ve TBK kontrolü. Clause ile ücretsiz ön tarama.",
    keywords: ["sözleşme madde analizi", "sözleşme okuma rehberi"],
    excerpt: "On sayfalık sözleşmeyi 15 dakikada anlamak için madde madde yaklaşım.",
    publishedAt: "2026-06-03",
    intro: "Tüm metni bir oturuşta okumak yanıltıcıdır. Yapılandırılmış okuma + AI özeti daha güvenlidir.",
    sections: [
      {
        title: "Üç geçiş yöntemi",
        paragraphs: [
          "İlk geçiş: taraflar, süre, bedel. İkinci: fesih, cezai şart, gizlilik. Üçüncü: özel ekler ve imza blokları.",
          "Her geçişte şüpheli cümleleri işaretleyin; sonra AI ile özet karşılaştırın.",
        ],
      },
    ],
    faqs: [
      {
        question: "AI hangi maddeleri vurgular?",
        answer: "Artış, tahliye, otomatik yenileme ve tek taraflı feragat gibi yüksek riskli başlıklar öne çıkar.",
      },
    ],
    ctaHref: "/#dene",
  }),
  blog({
    slug: "kira-sozlesmesi-ilk-kez-kiraci",
    h1: "İlk kez ev kiralayanlar için kira sözleşmesi rehberi",
    metaTitle: "İlk kira sözleşmesi — genç kiracı rehberi 2026",
    metaDescription:
      "Depozito, artış, tahliye taahhüdü ve aidat. İlk ev kiralama kontrol listesi ve ücretsiz analiz.",
    keywords: ["ilk kira sözleşmesi", "ilk kez ev kiralama", "genç kiracı"],
    excerpt: "Üniversite veya ilk iş sonrası kira — bilmeniz gereken 8 başlık.",
    publishedAt: "2026-06-02",
    intro: "Heyecanlı imza anında küçük puntolar gözden kaçar; bu liste temel tuzakları toplar.",
    sections: [
      {
        title: "İmzalamadan önce",
        paragraphs: [
          "Teslim tutanağı ve sayaç fotoğrafları çekin. Tahliye taahhütnamesini ayrı okuyun.",
          "Artış formülünü hesaplayıcı ile simüle edin.",
        ],
      },
    ],
    faqs: [
      {
        question: "Depozito nakit mi verilir?",
        answer: "Sözleşmede yazılı şekle uyun; makbuz veya banka transferi tercih edin.",
      },
    ],
    ctaHref: "/rehber/kiraci-haklari",
  }),
  blog({
    slug: "is-sozlesmesi-remote-calisan",
    h1: "Uzaktan çalışan iş sözleşmesi — 2026 notları",
    metaTitle: "Remote iş sözleşmesi — evden çalışma maddeleri",
    metaDescription:
      "Uzaktan çalışmada ekipman, mesai, veri güvenliği ve fesih. İş sözleşmesi AI kontrolü.",
    keywords: ["remote iş sözleşmesi", "evden çalışma sözleşmesi"],
    excerpt: "Hibrit ve tam remote için sözleşmede netleştirilmesi gerekenler.",
    publishedAt: "2026-05-30",
    intro: "Ofis adresi yerine ‘çalışma yeri: ikamet’ yazıldığında mesai ve iş kazası kuralları değişmez.",
    sections: [
      {
        title: "Ekipman ve internet",
        paragraphs: [
          "Laptop, yazılım lisansı ve internet desteği sözleşmede veya ek protokolde yazılmalıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Yurt dışından çalışmak farklı mı?",
        answer: "Vergi ve SGK açısından ayrı değerlendirme gerekir; sözleşmeye yansıtın.",
      },
    ],
    ctaHref: "/rehber/uzaktan-calisma-sozlesmesi",
  }),
  blog({
    slug: "depozito-kesinti-ornekleri",
    h1: "Depozito kesinti örnekleri — hangisi hukuki?",
    metaTitle: "Depozito kesintisi örnekleri — kiracı rehberi",
    metaDescription:
      "Boyama, küçük tamirat ve normal yıpranma ayrımı. Haksız depozito kesintisine itiraz.",
    keywords: ["depozito kesinti", "depozito kesinti örnekleri"],
    excerpt: "Mal sahibinin sık kestiği kalemler ve kiracı savunması.",
    publishedAt: "2026-05-28",
    intro: "‘Tüm daire yenilenmeli’ talebi çoğu zaman abartılıdır; normal kullanım yıpranması kiracıdan istenemez.",
    sections: [
      {
        title: "Normal yıpranma",
        paragraphs: [
          "Duvar rengi solması, hafif izler olağan kullanımdır; depozitodan kesilemez.",
          "Kasıtlı hasar veya eksik eşya ayrı değerlendirilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Fatura ile ispat şart mı?",
        answer: "Kesinti için makul gerekçe ve belge gösterilmelidir.",
      },
    ],
    ctaHref: "/rehber/depozito-iadesi",
  }),
  blog({
    slug: "tbk-609-kira-ozet-blog",
    h1: "TBK kira hükümleri — kısa özet (bilgilendirme)",
    metaTitle: "TBK 609 kira sözleşmesi özeti — blog",
    metaDescription:
      "Türk Borçlar Kanunu kira sözleşmesi başlıklarına giriş. Detay için rehber ve AI analiz.",
    keywords: ["TBK 609", "TBK kira", "kira sözleşmesi kanun"],
    excerpt: "TBK kira bölümüne giriş — avukat yerine geçmez.",
    publishedAt: "2026-05-26",
    intro: "TBK, kira ilişkisinin temel çerçevesini çizer; somut uyuşmazlıkta madde madde uzman yorumu gerekir.",
    sections: [
      {
        title: "Temel başlıklar",
        paragraphs: [
          "Kiraya verenin ve kiracının borçları, ayıp, temerrüt ve sözleşmenin sona ermesi ana konulardır.",
          "Özel kanunlar (konut kirası vb.) TBK ile birlikte uygulanır.",
        ],
      },
    ],
    faqs: [
      {
        question: "TBK özeti yeterli mi?",
        answer: "Hayır; sözleşmenizi özel olarak inceletin veya AI ön tarama yapın.",
      },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
  }),
  blog({
    slug: "ucretsiz-hukuki-danismanlik-ai",
    h1: "Ücretsiz hukuki danışmanlık arayanlar için AI rehberi",
    metaTitle: "Ücretsiz hukuki danışmanlık AI — sınırlar ve seçenekler",
    metaDescription:
      "Ücretsiz ön bilgi için yapay zeka hukuk asistanı. Ne yapar, ne yapmaz? Clause kullanımı.",
    keywords: ["ücretsiz hukuki danışmanlık", "ücretsiz hukuk ai"],
    excerpt: "Ücretsiz AI ile sözleşme ön kontrolü — avukatın yerini tutmaz.",
    publishedAt: "2026-05-24",
    intro: "‘Ücretsiz hukuki danışmanlık’ araması çok yüksek; AI bilgilendirme sunar, temsil etmez.",
    sections: [
      {
        title: "Beklenti yönetimi",
        paragraphs: [
          "AI risk özeti ve eksik madde uyarısı verir; dava stratejisi ve temsil avukat işidir.",
          "Kritik uyuşmazlıkta mutlaka yüz yüze hukuk desteği alın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Clause tamamen ücretsiz mi?",
        answer: "Beta döneminde günlük limit olabilir; güncel koşulları siteden kontrol edin.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/ucretsiz-yapay-zeka-hukuk",
  }),
  blog({
    slug: "sozlesme-imza-oncesi-checklist-blog",
    h1: "İmza öncesi sözleşme kontrol listesi (yazdırılabilir mantık)",
    metaTitle: "Sözleşme imza öncesi checklist — 12 madde",
    metaDescription:
      "Kira, iş ve ticari sözleşme için imza öncesi 12 kontrol. Ücretsiz AI ile destekleyin.",
    keywords: ["sözleşme kontrol listesi", "imza öncesi sözleşme"],
    excerpt: "Her sözleşme türü için ortak 12 soru.",
    publishedAt: "2026-05-22",
    intro: "Checklist imza disiplinini artırır; AI ise metinde gizli riskleri yakalar.",
    sections: [
      {
        title: "12 soru",
        paragraphs: [
          "Taraflar doğru mu? Süre ve fesih net mi? Otomatik yenileme var mı? Cezai şart oranı makul mü?",
          "Gizlilik ve veri maddeleri anlaşılır mı? Uyuşmazlık çözümü nereye bağlı?",
        ],
      },
    ],
    faqs: [
      {
        question: "Checklist hukuki bağlar mı?",
        answer: "Hayır; hatırlatıcıdır, sözleşme metni esas alınır.",
      },
    ],
    ctaHref: "/rehber/sozlesme-imzalamadan-once",
  }),
  blog({
    slug: "ticari-sozlesme-ai-tarama",
    h1: "Ticari sözleşmelerde AI tarama — KOBİ deneyimi",
    metaTitle: "Ticari sözleşme AI analizi — KOBİ blog",
    metaDescription:
      "Tedarik ve hizmet sözleşmelerinde yapay zeka ön taraması. Süre ve maliyet tasarrufu.",
    keywords: ["ticari sözleşme ai", "KOBİ sözleşme analizi"],
    excerpt: "KOBİ’lerin AI ile sözleşme inceleme süresini kısaltması.",
    publishedAt: "2026-05-20",
    intro: "Hukuk bütçesi sınırlı KOBİ’ler rutin sözleşmeleri AI ile ön süzer, kritik olanları avukata gönderir.",
    sections: [
      {
        title: "İş akışı",
        paragraphs: [
          "Standart tedarik sözleşmesi → AI özet → sapma varsa avukat. Bu hibrit model yaygınlaşıyor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Gizlilik endişesi?",
        answer: "Clause güvenlik sayfasını okuyun; hassas metinleri maskeleyerek gönderin.",
      },
    ],
    ctaHref: "/sozlesme-analizi/ticari-sozlesme",
  }),
  blog({
    slug: "tahliye-davasi-sure-rehber-blog",
    h1: "Tahliye davası süreci — kiracı perspektifi",
    metaTitle: "Tahliye davası ne kadar sürer? — bilgilendirme",
    metaDescription:
      "Tahliye davası aşamaları, taahhütname ve kira borcu farkı. Tahliye belgesi AI kontrolü.",
    keywords: ["tahliye davası süre", "tahliye davası kiracı"],
    excerpt: "Tahliye davası kabaca hangi aşamalardan geçer — genel bilgi.",
    publishedAt: "2026-05-18",
    intro: "Tahliye hem belge hem dava yoluyla gündeme gelir; karıştırmayın.",
    sections: [
      {
        title: "Belge vs dava",
        paragraphs: [
          "Geçerli tahliye taahhütnamesi icra yolunu hızlandırabilir; geçersiz belge dava gerektirir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Dava açılınca hemen çıkar mıyım?",
        answer: "Hukuki süreçler zaman alır; tebligat ve savunma hakları vardır.",
      },
    ],
    ctaHref: "/rehber/tahliye-sureci",
  }),
  blog({
    slug: "tuketici-hakem-heyeti-basvuru-blog",
    h1: "Tüketici hakem heyetine başvuru — adımlar",
    metaTitle: "Tüketici hakem heyeti başvurusu 2026",
    metaDescription:
      "Ücretsiz tüketici hakem heyeti başvurusu, belgeler ve süre. Ayıplı mal ve hizmet.",
    keywords: ["tüketici hakem heyeti", "tüketici hakem heyeti başvuru"],
    excerpt: "Hakem heyetine e-devlet ile başvuru özeti.",
    publishedAt: "2026-05-16",
    intro: "Belirli tutarın altındaki uyuşmazlıklarda hakem heyeti hızlı çözüm sunabilir.",
    sections: [
      {
        title: "Hazırlık",
        paragraphs: [
          "Fatura, sözleşme, yazışma ve fotoğraf delillerini PDF olarak hazırlayın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Avukat zorunlu mu?",
        answer: "Çoğu başvuru bireysel yapılır; yüksek bedelde destek düşünün.",
      },
    ],
    ctaHref: "/rehber/tuketici-arabuluculuk",
  }),
  blog({
    slug: "clause-vs-genel-ai-chat",
    h1: "Genel AI chat vs Clause — sözleşme için fark",
    metaTitle: "Clause vs ChatGPT hukuk — sözleşme analizi",
    metaDescription:
      "Genel sohbet botu ile Türkçe sözleşme analiz aracı farkı. Gizlilik ve TBK bağlamı.",
    keywords: ["clause ai", "chatgpt sözleşme", "hukuk ai karşılaştırma"],
    excerpt: "Neden genel AI yerine sözleşmeye özel araç kullanmalısınız?",
    publishedAt: "2026-05-14",
    intro: "ChatGPT güçlü bir sohbet aracıdır; Türk kira/iş sözleşmesi için özelleşmiş araç farklı hedefe hizmet eder.",
    sections: [
      {
        title: "Karşılaştırma",
        paragraphs: [
          "Clause: sözleşme yapısı, risk skoru, TBK odaklı özet. Genel AI: geniş ama bağlam kaybı ve gizlilik politikası farklı.",
        ],
      },
    ],
    faqs: [
      {
        question: "İkisini birlikte kullanabilir miyim?",
        answer: "Evet; Clause ile risk tespiti, kritik maddelerde avukat yorumu önerilir.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
  }),
  blog({
    slug: "kira-artisi-2026-ne-kadar",
    h1: "2026 kira artışı — kiracı ne yapmalı?",
    metaTitle: "2026 kira artış oranı — kiracı rehberi blog",
    metaDescription:
      "Kira artış bildirimi, itiraz ve hesaplama aracı. Yasal çerçeve bilgilendirme.",
    keywords: ["kira artışı 2026", "2026 kira zammı"],
    excerpt: "Yeni dönem kira artışında kontrol listesi.",
    publishedAt: "2026-05-12",
    intro: "Artış mektubu geldiğinde panik yerine sırayla kontrol edin.",
    sections: [
      {
        title: "Adımlar",
        paragraphs: [
          "Bildirimdeki oran ve matrahı hesaplayıcı ile doğrulayın. Sözleşme maddesini karşılaştırın.",
          "Hukuka aykırı olduğunu düşünüyorsanız yazılı itiraz kaydı tutun.",
        ],
      },
    ],
    faqs: [
      {
        question: "Artışı kabul etmezsem ne olur?",
        answer: "Uyuşmazlık müzakere veya hukuki yola gidebilir; uzman desteği alın.",
      },
    ],
    ctaHref: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  }),
  blog({
    slug: "kira-takip-raporu-yapay-zeka-analizi",
    h1: "Kira takip raporu ve yapay zeka analizi — kiracı ve mal sahibi için",
    metaTitle: "Kira takip raporu yapay zeka analizi — ücretsiz ön kontrol",
    metaDescription:
      "Kira borcu, artış ve depozito takibinde yapay zeka ile sözleşme raporu. Kira takip sürecinde riskli maddeleri yakalayın; ücretsiz AI analizi.",
    keywords: [
      "kira takip raporu yapay zeka analizi",
      "yapay zeka ile kira takibi",
      "kira takip AI",
      "kira sözleşmesi rapor analizi",
    ],
    excerpt:
      "Kira takibi sadece ödeme hatırlatması değil — sözleşme maddelerini izlemek de gerekir.",
    publishedAt: "2026-07-11",
    intro:
      "Kira takip araçları çoğunlukla ödeme ve vade hatırlatması sunar. Oysa asıl risk sözleşmedeki artış, fesih ve depozito maddelerinde gizlidir. Yapay zeka kira analizi, 'kira takip raporu' mantığıyla metni periyodik olarak tarayıp risk özetini günceller.",
    sections: [
      {
        title: "Kira takibi neden sözleşme analizi gerektirir?",
        paragraphs: [
          "Kira artış bildirimi geldiğinde sözleşmedeki formül ve tavan kontrol edilmelidir. Tahliye veya fesih sürecinde ihbar süreleri sözleşmeden okunur.",
          "Depozito iadesi veya kesinti anlaşmazlığında sözleşmedeki hasar ve teminat maddeleri belirleyicidir.",
        ],
      },
      {
        title: "Yapay zeka raporu ne sunar?",
        paragraphs: [
          "Clause, kira sözleşmesini madde madde tarar; artış, depozito, tahliye taahhüdü ve fesih başlıklarını özetler.",
          "Manuel takip yerine AI ön tarama ile 'rapor' niteliğinde risk çerçevesi alırsınız; nihai karar için avukata danışın.",
        ],
      },
      {
        title: "Pratik kullanım senaryoları",
        paragraphs: [
          "Yıllık artış öncesi: sözleşmeyi yeniden taratın, hesaplayıcı ile tutarı karşılaştırın.",
          "Tahliye öncesi: depozito ve teslim maddelerini kontrol edin; tutanak hazırlayın.",
          "Uzun süreli kira: otomatik yenileme ve bildirim sürelerini takip listesine alın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kira takip uygulaması ile Clause farkı nedir?",
        answer:
          "Ödeme takip uygulamaları borç vadesini izler; Clause sözleşme hukuk risklerini analiz eder. İkisi birbirini tamamlar.",
      },
      {
        question: "Rapor periyodik üretilir mi?",
        answer:
          "Sözleşme değiştiğinde veya yıllık artış döneminde yeniden tarama önerilir.",
      },
      {
        question: "Ücretsiz mi?",
        answer: "Günlük ücretsiz ön tarama hakkı mevcuttur.",
      },
    ],
    ctaHref: "/yapay-zeka-hukuk/yapay-zeka-kira-sozlesmesi",
  }),
];
