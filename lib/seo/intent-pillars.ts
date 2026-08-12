import type { FaqItem } from "@/lib/seo/rehber-types";
import {
  DILEKCE_TOOL_PATH,
  KIRA_ANALIZI_TOOL_PATH,
  SOZLESME_TUZAK_TOOL_PATH,
  TAZMINAT_HUB_TOOL_PATH,
} from "@/lib/seo/free-tools-routes";

export type IntentPillarId =
  | "kira-sozlesmesi-analizi"
  | "is-sozlesmesi-analizi"
  | "dilekce-hazirlama";

export type IntentPillarConfig = {
  category: IntentPillarId;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  bullets: string[];
  sections: { title: string; body: string }[];
  faqs: FaqItem[];
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  relatedLinks: { href: string; label: string }[];
  updatedAt: string;
};

export const INTENT_PILLAR_CATEGORIES: IntentPillarId[] = [
  "kira-sozlesmesi-analizi",
  "is-sozlesmesi-analizi",
  "dilekce-hazirlama",
];

const PILLARS: Record<IntentPillarId, IntentPillarConfig> = {
  "kira-sozlesmesi-analizi": {
    category: "kira-sozlesmesi-analizi",
    h1: "Kira Sözleşmesi Risk Taraması & Yasal Zam Analizi",
    metaTitle:
      "Kira sözleşmesi analizi 2026 — risk tarama & yasal zam sınırı | Clause",
    metaDescription:
      "Kira sözleşmesi analizi ile tahliye maddesi, cezai şart ve kira zam sınırı 2026 risklerini saniyeler içinde görün. Ücretsiz AI ön tarama.",
    keywords: [
      "kira sözleşmesi analizi",
      "ev sahibi tahliye maddesi",
      "kira zam sınırı 2026",
      "kira sözleşmesi risk tarama",
      "yasal kira artışı",
      "tahliye taahhüdü kontrol",
    ],
    intro:
      "Ev sahibi yüksek zam mı istedi, sözleşmede tek taraflı tahliye veya cezai şart mı var? Clause, kira metninizi Türkiye odaklı sade dilde tarar; hangi maddelerin sizin aleyhinize işleyebileceğini özetler.",
    bullets: [
      "Kira zam sınırı ve artış formülü net mi?",
      "Depozito iadesi ve kesinti şartları dengeli mi?",
      "Tahliye / taahhütname riski var mı?",
      "Cezai şart kiracı aleyhine mi yazılmış?",
    ],
    sections: [
      {
        title: "Kira sözleşmesi analizinde neye bakılır?",
        body: "Artış oranı, bildirim usulü, depozito, bakım-onarım, tahliye ve cezai şart başlıkları çoğu uyuşmazlığın merkezindedir. Belirsiz ‘piyasa koşullarına göre’ ifadeleri veya boş bırakılmış tahliye taahhütleri ileride pahalı tartışmalara dönüşebilir. Ön tarama, bu başlıkları görünür kılar; kesin hukuki sonuç vaat etmez.",
      },
      {
        title: "Kira zam sınırı 2026 — pratik kontrol",
        body: "Yenileme dönemindeki yasal tavan ile ev sahibinin talep ettiği oranı yan yana koyun. Talep tavandan yüksekse yazılı itiraz ve sözleşme maddesi birlikte okunmalıdır. Clause kira analizi aracı, tavan karşılaştırması ve hazır cevap taslağı sunar; ardından sözleşmenin tamamını AI ile tarayabilirsiniz.",
      },
      {
        title: "Ev sahibi tahliye maddesi ve taahhütname",
        body: "Sözleşme içindeki tahliye hükümleri ile ayrı imzalanmış taahhütnameler farklı sonuç doğurabilir. Tarih, süre ve baskı unsuru belirsizse risk yükselir. Ücretsiz tahliye ön kontrolü ve sözleşme tuzak taraması ile ilk kontrol listesini çıkarın.",
      },
    ],
    faqs: [
      {
        question: "Kira sözleşmesi analizi ücretsiz mi?",
        answer:
          "Evet. Clause ile ücretsiz ön tarama ve risk özeti alabilirsiniz. Detaylı madde açıklamaları için günlük limit ve kayıt katmanı uygulanabilir.",
      },
      {
        question: "Kira zam sınırı 2026 nasıl kontrol edilir?",
        answer:
          "Yenileme dönemindeki yasal tavan ile talep edilen oranı karşılaştırın. Clause kira analizi aracı bu karşılaştırmaya yardımcı olur; kesin oran için güncel resmi veriyi de doğrulayın.",
      },
      {
        question: "Bu sayfa avukatlık hizmeti midir?",
        answer:
          "Hayır. Bilgilendirme ve ön tarama amaçlıdır. Kritik tahliye, icra veya yüksek tutarlı uyuşmazlıklarda avukata danışın.",
      },
    ],
    primaryCta: {
      href: "/analiz/kira-sozlesmesi",
      label: "Ücretsiz kira sözleşmesi taraması",
    },
    secondaryCta: {
      href: KIRA_ANALIZI_TOOL_PATH,
      label: "Kira zammı hesapla & cevap yaz",
    },
    relatedLinks: [
      {
        href: SOZLESME_TUZAK_TOOL_PATH,
        label: "Sözleşme tuzak tarama",
      },
      {
        href: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
        label: "Tahliye taahhütnamesi ön kontrol",
      },
      { href: "/rehber/kiraci-haklari", label: "Kiracı hakları rehberi" },
      { href: "/rehber/depozito-iadesi", label: "Depozito iadesi rehberi" },
    ],
    updatedAt: "2026-08-12",
  },

  "is-sozlesmesi-analizi": {
    category: "is-sozlesmesi-analizi",
    h1: "İş Sözleşmesi & Kıdem Tazminatı Risk Taraması",
    metaTitle:
      "İş sözleşmesi analizi — cezai şart, rekabet yasağı, haklı fesih | Clause",
    metaDescription:
      "İş sözleşmesi cezai şart, rekabet yasağı maddesi ve haklı fesih risklerini yapay zeka ile tarayın. Kıdem ve ihbar için pratik kontrol.",
    keywords: [
      "iş sözleşmesi cezai şart",
      "rekabet yasağı maddesi",
      "haklı fesih rehberi",
      "iş sözleşmesi analizi",
      "kıdem tazminatı risk",
      "ihbar tazminatı",
    ],
    intro:
      "İşe girişte imzaladığınız metin; ücret, fazla mesai, rekabet yasağı ve fesih sonrası haklarınızı şekillendirir. Clause, iş sözleşmesindeki dengesiz maddeleri sade dilde işaretler.",
    bullets: [
      "Cezai şart ve tek taraflı kesintiler",
      "Rekabet yasağı süresi ve coğrafyası",
      "Fesih / ihbar maddeleri",
      "Kıdem ve haklı fesih bağlantısı",
    ],
    sections: [
      {
        title: "İş sözleşmesi cezai şart ne zaman risklidir?",
        body: "Aşırı yüksek, tek taraflı veya belirsiz cezai şartlar müzakere ve uyuşmazlıkta sorun çıkarabilir. Metinde tutar, tetikleyici olay ve oran net değilse ön tarama bunu ‘dikkat’ olarak işaretler. Kesin geçerlilik somut olaya ve yargı uygulamasına bağlıdır.",
      },
      {
        title: "Rekabet yasağı maddesi kontrol listesi",
        body: "Süre, yer, faaliyet alanı ve karşılık (ücret/tazminat) yazılmadan bırakılan yasaklar çalışan aleyhine yorumlanabilir. İmza öncesi bu dört başlığı netleştirin; Clause risk özetinde bunları görünür kılar.",
      },
      {
        title: "Haklı fesih ve kıdem tazminatı bağlantısı",
        body: "Mobbing, ücret ödememe veya ağır çalışma koşulları gibi senaryolarda haklı fesih gündeme gelebilir. Kıdem/ihbar hesabı için tazminat araçlarını kullanın; strateji ve süre için iş hukuku uzmanına danışın.",
      },
    ],
    faqs: [
      {
        question: "İş sözleşmesi analizi ne kadar sürer?",
        answer:
          "Metni yapıştırdıktan sonra ön risk özeti genelde saniyeler içinde gelir. Avukat incelemesinin yerini tutmaz.",
      },
      {
        question: "Rekabet yasağı maddesi her zaman geçerli midir?",
        answer:
          "Hayır. Süre, yer, konu ve karşılık unsurları ile emredici kurallar birlikte değerlendirilir. Clause risk işaretler; kesin geçerlilik için uzman görüşü gerekir.",
      },
      {
        question: "Kıdem tazminatımı nasıl hesaplarım?",
        answer:
          "Ücretsiz kıdem ve ihbar araçlarımızla kabaca tutar görebilirsiniz. Bordro ve giydirilmiş ücret varsayımları sonucu değiştirir.",
      },
    ],
    primaryCta: {
      href: "/analiz/is-sozlesmesi",
      label: "Ücretsiz iş sözleşmesi taraması",
    },
    secondaryCta: {
      href: TAZMINAT_HUB_TOOL_PATH,
      label: "Kıdem & ihbar hesapla",
    },
    relatedLinks: [
      {
        href: "/rehber/iscinin-hakli-fesih-hakki",
        label: "Haklı fesih rehberi",
      },
      {
        href: "/rehber/kidem-ihbar-tazminati",
        label: "Kıdem ve ihbar tazminatı",
      },
      {
        href: "/araclar/kidem-tazminati-hesaplama",
        label: "Kıdem tazminatı hesaplama",
      },
      { href: SOZLESME_TUZAK_TOOL_PATH, label: "Sözleşme tuzak tarama" },
    ],
    updatedAt: "2026-08-12",
  },

  "dilekce-hazirlama": {
    category: "dilekce-hazirlama",
    h1: "AI İle Otomatik İhtarname ve Dilekçe Oluşturucu",
    metaTitle:
      "AI dilekçe ve ihtarname oluşturucu — ücretsiz taslak | Clause",
    metaDescription:
      "Kira itirazı, depozito iadesi veya tüketici başvurusu için AI ile otomatik ihtarname ve dilekçe taslağı. Ücretsiz, soru-cevapla hazırlanır.",
    keywords: [
      "dilekçe hazırlama",
      "ihtarname oluşturucu",
      "AI dilekçe",
      "kira itiraz dilekçesi",
      "depozito iadesi dilekçe",
      "tüketici hakem heyeti başvuru",
    ],
    intro:
      "Ne yazacağınızı bilmiyor musunuz? Clause dilekçe sihirbazı; sorularınızı yanıtlayarak kira, depozito ve tüketici konularında resmi üslupta taslak üretir.",
    bullets: [
      "Kira zammı itiraz metni",
      "Depozito iadesi ihtarnamesi",
      "Tüketici başvuru taslağı",
      "Kopyalanabilir, düzenlenebilir çıktı",
    ],
    sections: [
      {
        title: "Otomatik dilekçe nasıl çalışır?",
        body: "Konuyu seçin, birkaç soruyu yanıtlayın; sistem olayınızı yapılandırılmış bir taslağa döker. Çıktı avukat onayı olmadan resmi başvuru yerine geçmez — ama boş sayfadan başlamaktan iyidir.",
      },
      {
        title: "İhtarname ile dilekçe farkı",
        body: "İhtarname çoğu zaman karşı tarafa yazılı uyarı ve delil oluşturur; dilekçe ise kuruma veya mercie yapılan başvurudur. Clause her iki format için de bilgilendirici taslak sunabilir.",
      },
      {
        title: "Sözleşme taramasıyla birlikte kullanın",
        body: "Önce sözleşmedeki riskli maddeyi görün, sonra itiraz veya ihtar taslağını üretin. Böylece metin somut maddeye dayanır; genel şablonlardan daha güçlü bir başlangıç olur.",
      },
    ],
    faqs: [
      {
        question: "AI dilekçe hukuken geçerli midir?",
        answer:
          "Taslak bilgilendirme amaçlıdır. Resmi başvuru, noter ihtarı veya dava için metni uzmanla gözden geçirin.",
      },
      {
        question: "Ücretsiz mi?",
        answer:
          "Evet, dilekçe oluşturucu ücretsiz kullanılabilir. Günlük kullanım ve kayıt katmanları diğer ürün özelliklerinde geçerli olabilir.",
      },
      {
        question: "Hangi konular destekleniyor?",
        answer:
          "Başlangıçta kira itirazı, depozito iadesi ve tüketici başvurusu odaklı şablonlar sunulur. Yeni şablonlar zamanla eklenir.",
      },
    ],
    primaryCta: {
      href: DILEKCE_TOOL_PATH,
      label: "Dilekçe oluşturmaya başla",
    },
    secondaryCta: {
      href: "/kira-sozlesmesi-analizi",
      label: "Önce sözleşmeyi tara",
    },
    relatedLinks: [
      { href: DILEKCE_TOOL_PATH, label: "Dilekçe oluşturucu aracı" },
      {
        href: "/kira-sozlesmesi-analizi",
        label: "Kira sözleşmesi risk taraması",
      },
      { href: "/rehber/depozito-iadesi", label: "Depozito iadesi rehberi" },
      {
        href: "/blog/depozito-iadesi-yazili-ihtar-ornek",
        label: "Depozito ihtar örneği",
      },
    ],
    updatedAt: "2026-08-12",
  },
};

export function getIntentPillar(
  category: string,
): IntentPillarConfig | undefined {
  if ((INTENT_PILLAR_CATEGORIES as string[]).includes(category)) {
    return PILLARS[category as IntentPillarId];
  }
  return undefined;
}

export function isIntentPillarCategory(
  category: string,
): category is IntentPillarId {
  return (INTENT_PILLAR_CATEGORIES as string[]).includes(category);
}
