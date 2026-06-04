import { REHBER_EXTENDED_PAGES } from "@/lib/seo/rehber-pages-extended";
import { REHBER_EXTRA_2_PAGES } from "@/lib/seo/rehber-pages-extra-2";

export type {
  FaqItem,
  RehberSection,
  RehberPageConfig,
  BlogPostConfig,
} from "@/lib/seo/rehber-types";

import type { RehberPageConfig } from "@/lib/seo/rehber-types";

const BASE_PAGES: RehberPageConfig[] = [
  {
    slug: "kiraci-haklari",
    h1: "Kiracı hakları rehberi — ev ve iş yeri kiracısı için",
    metaTitle: "Kiracı hakları rehberi 2026 — kira, depozito, tahliye",
    metaDescription:
      "Kiracı olarak kira artışı, depozito iadesi, tahliye, bakım-onarım ve fesih haklarınızı sade dille öğrenin. Avukatsız önce bilgi, sonra ücretsiz sözleşme kontrolü.",
    keywords: [
      "kiracı hakları",
      "kiracı hakları 2026",
      "kira sözleşmesi hakları",
      "TBK kiracı",
      "ev kiracısı hakları",
    ],
    intro:
      "Kiracı olmak, sadece aylık kira ödemek değildir. Türk Borçlar Kanunu (TBK) kiracıyı koruyan kurallar içerir; ancak çoğu kişi sözleşmeyi imzalamadan okumadığı için haklarını bilmez. Bu rehber, avukat olmadan önce bilmeniz gereken temel kiracı haklarını günlük dille anlatır.",
    sections: [
      {
        title: "Kira bedeli ve artış hakkı",
        paragraphs: [
          "Kira artışı, sözleşmede yazılı formüle ve yasal sınırlara bağlıdır. Konut kiralarında uygulanan tavan oranlar ve bildirim süreleri her yıl güncellenebilir; sözleşmedeki serbest oran maddeleri tek taraflı lehine olmayabilir.",
          "Artış bildirimi yazılı yapılmalı, yeni tutar net hesaplanmalıdır. Oranın hukuka aykırı olduğunu düşünüyorsanız, önce sözleşmenizi ve güncel mevzuatı karşılaştırın; ardından müzakere veya hukuki yol seçeneklerini değerlendirin.",
        ],
      },
      {
        title: "Depozito ve iade",
        paragraphs: [
          "Depozito, kiracının borç ve hasar yükümlülüklerine karşılık alınan teminattır. Tahliye sonrası makul sürede iade edilmelidir; keyfi kesintiler uyuşmazlığa yol açar.",
          "Teslim tutanağı, fotoğraflar ve yazışmalar iade sürecinde kritiktir. Depozito iadesi hakkında ayrıntılı bilgi için depozito rehberimize bakın.",
        ],
      },
      {
        title: "Tahliye ve fesih",
        paragraphs: [
          "Kiracı, sözleşme süresi bitmeden veya keyfi biçimde evden çıkarılamaz. Tahliye taahhütnamesi, süre bitimi, kira borcu veya sözleşmede öngörülen haklı sebepler gibi yollar mevzuatta ayrı ayrı düzenlenmiştir.",
          "Ev sahibi baskısı, elektrik-su kesintisi veya kilit değiştirme gibi yöntemler hukuka aykırıdır. Bu durumda kiracı tazminat ve koruma talep edebilir.",
        ],
      },
      {
        title: "Bakım, onarım ve kullanım",
        paragraphs: [
          "Küçük bakım-onarımlar ile yapısal onarımların kime ait olduğu sözleşmede ve kanunda farklı düzenlenir. Kiralananın olağan kullanımından doğan yıpranma ile kiracı kusuru ayırt edilmelidir.",
          "Kiracı, kiralananı sözleşmeye uygun kullanmak ve komşulara zarar vermemekle yükümlüdür; buna karşılık huzurlu oturma hakkı korunur.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ev sahibi kirayı istediği kadar artırabilir mi?",
        answer:
          "Hayır. Artış, sözleşme hükmü ve konut kiralarına ilişkin yasal sınırlar çerçevesinde yapılır. Sözleşmede belirsiz veya aşırı artış maddesi varsa hukuka aykırılık iddia edilebilir.",
      },
      {
        question: "Kiracı evi boşaltmak zorunda mı?",
        answer:
          "Sadece yasal geçerli fesih, süre bitimi, geçerli tahliye taahhüdü veya mahkeme kararı gibi hallerde. Keyfi tahliye talepleri geçerli değildir.",
      },
      {
        question: "Depozito ne zaman iade edilir?",
        answer:
          "Tahliye ve teslim sonrası, borç ve hasar durumu netleştikten sonra makul sürede. Kesinti yapılacaksa gerekçe gösterilmelidir.",
      },
    ],
    ctaLabel: "Kira sözleşmenizi ücretsiz tarayın",
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    updatedAt: "2026-05-01",
  },
  {
    slug: "isci-haklari",
    h1: "İşçi hakları rehberi — çalışanlar için temel bilgiler",
    metaTitle: "İşçi hakları rehberi — fesih, ücret, izin, fazla mesai",
    metaDescription:
      "İş sözleşmesi imzalayan veya çalışan herkes için: ücret, izin, fazla mesai, fesih ve tazminat hakları. Ücretsiz iş sözleşmesi ön kontrolü ile devam edin.",
    keywords: [
      "işçi hakları",
      "çalışan hakları",
      "İş Kanunu hakları",
      "iş sözleşmesi hakları",
    ],
    intro:
      "İş ilişkisinde güç dengesi çoğu zaman işveren lehinedir; çünkü çalışan sözleşmeyi okumadan imzalar. İş Kanunu ve TBK, asgari hakları korur. Bu rehber, günlük çalışma hayatında karşılaşabileceğiniz başlıca işçi haklarını özetler.",
    sections: [
      {
        title: "Ücret ve yan haklar",
        paragraphs: [
          "Brüt ücret, prim, ikramiye ve yan haklar sözleşmede açık yazılmalıdır. Asgari ücretin altında ücret kararlaştırılamaz.",
          "Fazla mesai, gece ve hafta tatili çalışmaları ayrı ücret veya izin karşılığı gerektirir. Yazılı onay ve kayıt önemlidir.",
        ],
      },
      {
        title: "İzin hakları",
        paragraphs: [
          "Yıllık ücretli izin, kıdeme göre artar. Hastalık, evlilik, doğum gibi hallerde kanuni izinler vardır.",
          "İzin kullandırılmaması veya ücretinin ödenmemesi işçi lehine tazminat doğurabilir.",
        ],
      },
      {
        title: "Fesih ve bildirim",
        paragraphs: [
          "Belirsiz süreli sözleşmelerde taraflar ihbar sürelerine uymak zorundadır. Haksız veya usulsüz fesih, kıdem ve ihbar tazminatı talebini gündeme getirir.",
          "İşveren fesih gerekçesini açıklamak zorunda olabilir; yazılı bildirim almadan imza atmayın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Deneme süresinde her an çıkarılabilir miyim?",
        answer:
          "Deneme süresi kanuni sınırlar içinde kararlaştırılmışsa, taraflar bildirimsiz feshedebilir; ancak kötü niyet ve ayrımcılık yasaktır.",
      },
      {
        question: "İstifa edersem tazminat alır mıyım?",
        answer:
          "Genelde hayır. İşverenin ağır kusuru veya mobbing gibi haklı fesih hallerinde istifa dahi tazminat hakkı doğurabilir.",
      },
      {
        question: "Rekabet yasağı imzalamak zorunda mıyım?",
        answer:
          "Sözleşmede varsa imza öncesi süre, coğrafya ve kapsamı okuyun. Aşırı geniş rekabet yasakları geçersiz sayılabilir.",
      },
    ],
    ctaLabel: "İş sözleşmenizi ücretsiz analiz edin",
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    updatedAt: "2026-05-01",
  },
  {
    slug: "tuketici-haklari",
    h1: "Tüketici hakları — alışveriş ve hizmet alırken bilmeniz gerekenler",
    metaTitle: "Tüketici hakları rehberi — cayma, iade, ayıplı mal",
    metaDescription:
      "Online alışveriş, abonelik ve hizmet sözleşmelerinde tüketici hakları: cayma, iade, ayıplı mal ve şikayet yolları. Sade anlatım, ücretsiz sözleşme kontrolü.",
    keywords: [
      "tüketici hakları",
      "tüketici hakem heyeti",
      "ayıplı mal",
      "mesafeli satış",
    ],
    intro:
      "Tüketici, ticari amaç taşımayan alıcıdır ve Tüketicinin Korunması Hakkında Kanun kapsamında ek koruma görür. Özellikle internetten alışveriş, abonelik hizmetleri ve kredi sözleşmelerinde haklarınızı bilmek parasal kaybı önler.",
    sections: [
      {
        title: "Ön bilgilendirme ve sözleşme",
        paragraphs: [
          "Mesafeli satışlarda satıcı, sipariş öncesi fiyat, teslimat, cayma ve iade koşullarını açıkça sunmalıdır. Sözleşme ile ön bilgilendirme çelişmemelidir.",
        ],
      },
      {
        title: "Ayıplı mal ve hizmet",
        paragraphs: [
          "Teslim edilen ürün veya hizmet sözleşmeye uygun değilse seçimlik haklarınız vardır: onarım, değişim, bedel indirimi veya sözleşmeden dönme.",
          "Süreler ve ispat yükü taraflara göre değişir; fatura, ekran görüntüsü ve yazışmaları saklayın.",
        ],
      },
      {
        title: "Şikayet ve uyuşmazlık çözümü",
        paragraphs: [
          "Önce satıcıya yazılı başvuru yapın. Çözülmezse Tüketici Hakem Heyeti veya Tüketici Mahkemesi yolları değerlendirilebilir. Parasal sınır her yıl güncellenir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Her üründe 14 gün cayma hakkı var mı?",
        answer:
          "Mesafeli satışlarda genel kural 14 gündür; kişiye özel üretim, hijyenik ürün açılması gibi istisnalar vardır.",
      },
      {
        question: "İade kargo ücretini kim öder?",
        answer:
          "Mevzuatta belirli kurallar vardır; sözleşmede tüketicinin aleyhine tek taraflı yükümlülük geçersiz olabilir.",
      },
    ],
    ctaLabel: "Mesafeli satış sözleşmenizi kontrol edin",
    ctaHref: "/sozlesme-analizi/mesafeli-satis-sozlesmesi",
    updatedAt: "2026-05-01",
  },
  {
    slug: "sozlesme-imzalamadan-once",
    h1: "Sözleşme imzalamadan önce — herkes için kontrol listesi",
    metaTitle: "Sözleşme imzalamadan önce kontrol listesi — 10 madde",
    metaDescription:
      "Kira, iş, freelance veya online üyelik sözleşmesi imzalamadan önce bakmanız gereken 10 kritik nokta. Ücretsiz AI ön tarama ile metninizi tarayın.",
    keywords: [
      "sözleşme okuma",
      "sözleşme imzalamadan önce",
      "kontrat kontrol",
      "sözleşme riskleri",
    ],
    intro:
      "Çoğu uyuşmazlık, imzadan sonra ortaya çıkar. Profesyonel hukuk bürosu olmadan da sözleşmeyi temel düzeyde kontrol edebilirsiniz. Aşağıdaki liste, sıradan insanların en sık gözden kaçırdığı maddeleri toplar.",
    sections: [
      {
        title: "Kim, neyi, ne kadar süreyle?",
        paragraphs: [
          "Tarafların kimliği, konu, bedel ve süre net mi? Belirsiz iş tanımı veya süre, ileride 'kapsam dışı' tartışmalarına yol açar.",
        ],
      },
      {
        title: "Fesih ve ceza maddeleri",
        paragraphs: [
          "Tek taraflı fesih hakkı, ihbar süresi ve cezai şartları okuyun. Aşırı ceza maddeleri mahkemece indirilebilir veya geçersiz sayılabilir.",
        ],
      },
      {
        title: "Gizlilik, veri ve telif",
        paragraphs: [
          "Kişisel veriler, ticari sırlar ve fikri mülkiyet kime ait? Freelance ve dijital sözleşmelerde en çok sorun buradan çıkar.",
        ],
      },
      {
        title: "Uyuşmazlık çözümü",
        paragraphs: [
          "Yetkili mahkeme, tahkim veya arabuluculuk maddesi nerede? Size ulaşılması zor veya yurt dışı mahkeme seçilmiş olabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözlü anlaşma yeterli mi?",
        answer:
          "Bazı sözleşmeler yazılı şekil şartına tabidir. Yazılı metin ispatı kolaylaştırır; imzalamadan önce metin isteyin.",
      },
      {
        question: "AI sözleşme analizi avukat yerine geçer mi?",
        answer:
          "Hayır. Ön bilgi ve risk işaretleme sağlar; nihai karar için avukata danışın.",
      },
    ],
    ctaLabel: "Sözleşmenizi ücretsiz tarayın",
    ctaHref: "/",
    updatedAt: "2026-05-01",
  },
  {
    slug: "depozito-iadesi",
    h1: "Depozito iadesi — kiracı ve ev sahibi için rehber",
    metaTitle: "Depozito iadesi ne zaman yapılır? Kiracı rehberi",
    metaDescription:
      "Kira depozitosu ne zaman iade edilir, hangi kesintiler yapılabilir, anlaşmazlık olursa ne yapılır? Sade Türkçe rehber ve ücretsiz kira sözleşmesi kontrolü.",
    keywords: [
      "depozito iadesi",
      "kira depozitosu",
      "depozito ne zaman iade edilir",
      "depozito kesintisi",
    ],
    intro:
      "Depozito, kira ilişkisinin en tartışmalı konularından biridir. Kiracı 'paramı vermiyor', ev sahibi 'hasar var' der. Yasal çerçeveyi ve pratik adımları bilmek süreci hızlandırır.",
    sections: [
      {
        title: "Depozito ne işe yarar?",
        paragraphs: [
          "Ödenmemiş kira, faturalar, olağanüstü hasar veya sözleşme ihlali riskine karşı teminat niteliğindedir. Olağan yıpranma depozitodan kesilemez.",
        ],
      },
      {
        title: "Teslim ve tutanak",
        paragraphs: [
          "Giriş ve çıkışta fotoğraf, tutanak ve sayaç okumaları alın. Keyfi kesinti iddialarına karşı en güçlü deliller bunlardır.",
        ],
      },
      {
        title: "Anlaşmazlık olursa",
        paragraphs: [
          "Yazılı ihtar, arabuluculuk ve gerekirse kira uyuşmazlığı davaları gündeme gelebilir. Sözleşmedeki depozito maddesini önceden okumak kritiktir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Depozito faiz işler mi?",
        answer:
          "Tarafların anlaşmasına ve sözleşme hükmüne bağlıdır; ayrıca kanuni düzenlemeler dikkate alınmalıdır.",
      },
      {
        question: "Ev sahibi depozitoyu geciktirebilir mi?",
        answer:
          "Makul süre dışında geciktirme uyuşmazlık doğurur; borç ve hasar iddiası somut gerekçeye dayanmalıdır.",
      },
    ],
    ctaLabel: "Kira sözleşmesi depozito maddesini kontrol edin",
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    updatedAt: "2026-05-01",
  },
  {
    slug: "kira-artisi-haklari",
    h1: "Kira artışı hakları — oran, bildirim ve itiraz",
    metaTitle: "Kira artış oranı hakları — kiracı rehberi 2026",
    metaDescription:
      "Kira artış bildirimi nasıl yapılır, hangi oran uygulanır, itiraz hakkınız var mı? Ücretsiz kira artış hesaplayıcı ve sözleşme analizi.",
    keywords: [
      "kira artış oranı",
      "kira artış hakları",
      "kira zam oranı",
      "TBK kira artışı",
    ],
    intro:
      "Her yıl kiracılar 'Bu artış doğru mu?' diye sorar. Cevap, sözleşme metni ile güncel mevzuatın birlikte okunmasında gizlidir.",
    sections: [
      {
        title: "Sözleşmedeki artış maddesi",
        paragraphs: [
          "TÜFE, sabit yüzde veya karma formüller yaygındır. Belirsiz ifadeler uyuşmazlık yaratır. Artış dönemi ve bildirim şekli yazılı olmalıdır.",
        ],
      },
      {
        title: "Hesaplama ve kontrol",
        paragraphs: [
          "Mevcut kira, oran ve yeni tutarı hesaplayıp bildirimle karşılaştırın. Ücretsiz hesaplayıcımız tahmini tutarı verir; kesin sonuç için sözleşme metnini analiz edin.",
        ],
      },
    ],
    faqs: [
      {
        question: "Artış bildirimi gelmeden ödeyebilir miyim?",
        answer:
          "Yeni tutar geçerli bildirim ve sözleşme hükümlerine bağlıdır; bildirimsiz artış talebine dikkat edin.",
      },
    ],
    ctaLabel: "Kira artışını hesaplayın",
    ctaHref: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
    updatedAt: "2026-05-01",
  },
  {
    slug: "isten-cikarilinca-ne-yapilir",
    h1: "İşten çıkarılınca ne yapılır? — adım adım rehber",
    metaTitle: "İşten çıkarılınca ne yapmalıyım? İşçi rehberi",
    metaDescription:
      "Haksız fesih mi, haklı fesih mi? İşten çıkarılınca ilk 48 saatte yapılacaklar, tazminat ve evrak listesi. Ücretsiz iş sözleşmesi analizi.",
    keywords: [
      "işten çıkarılınca ne yapılır",
      "haksız işten çıkarma",
      "işten atılınca haklar",
      "fesih bildirimi",
    ],
    intro:
      "İşten çıkarılmak panik yaratır; panikte imzalanan belgeler hak kaybına yol açar. Sakin kalıp sırayla ilerleyin.",
    sections: [
      {
        title: "İlk adımlar",
        paragraphs: [
          "Fesih bildirimini yazılı alın. Gerekçeyi okuyun. İşyeri eşyalarınızı ve kişisel verilerinizi güvenle teslim alın.",
          "İş sözleşmesi, bordro, izin kayıtları ve yazışmaların kopyasını saklayın.",
        ],
      },
      {
        title: "Haklı mı, haksız mı?",
        paragraphs: [
          "İşverenin fesih gerekçesi İş Kanunu'ndaki geçerli sebeplere uyuyor mu? Uymuyorsa kıdem, ihbar ve diğer alacaklar gündeme gelir.",
        ],
      },
      {
        title: "Ne zaman avukata gidilir?",
        paragraphs: [
          "Tazminat tutarı yüksekse, sendika yoksa veya işveren baskı yapıyorsa uzman desteği alın. Önce ücretsiz sözleşme analizi ile risk çerçevesini görün.",
        ],
      },
    ],
    faqs: [
      {
        question: "İşsizlik maaşı alabilir miyim?",
        answer:
          "Prim gün sayısı ve fesih türüne bağlıdır; İŞKUR ve SGK kurallarına göre başvuru yapılır.",
      },
      {
        question: "Fesih bildirimine itiraz süresi var mı?",
        answer:
          "Fesih geçersizlik davası gibi yolların süreleri kısadır; gecikmeyin.",
      },
    ],
    ctaLabel: "İş sözleşmenizi analiz edin",
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    updatedAt: "2026-05-01",
  },
  {
    slug: "kidem-ihbar-tazminati",
    h1: "Kıdem ve ihbar tazminatı — kim ne kadar alır?",
    metaTitle: "Kıdem tazminatı ve ihbar tazminatı rehberi",
    metaDescription:
      "Kıdem tazminatı kimlere ödenir, nasıl hesaplanır? İhbar süresi ve tazminat farkı. Sade anlatım; iş sözleşmesi ücretsiz ön kontrol.",
    keywords: [
      "kıdem tazminatı",
      "ihbar tazminatı",
      "kıdem tazminatı hesaplama",
      "ihbar süresi",
    ],
    intro:
      "Kıdem ve ihbar, iş hukukunun en çok aranan konularıdır. İkisi farklı amaçlara hizmet eder; karıştırılmamalıdır.",
    sections: [
      {
        title: "Kıdem tazminatı",
        paragraphs: [
          "Belirli koşullarda, her tam hizmet yılı için 30 günlük brüt ücret üzerinden hesaplanır. Tavan uygulaması vardır.",
          "Hak kazanma şartları kanunda sayılır; istifa genelde hariçtir, istisnalar vardır.",
        ],
      },
      {
        title: "İhbar tazminatı",
        paragraphs: [
          "İhbar süresine uyulmadan fesih yapılırsa, karşı taraf ihbar tazminatı talep edebilir. Süre kıdeme göre artar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Part-time çalışan kıdem alır mı?",
        answer:
          "Sigortalı hizmet süresi ve diğer şartlar sağlanıyorsa, çalışma şekli tek başına engel olmayabilir.",
      },
    ],
    ctaLabel: "İş sözleşmesi fesih maddelerini okuyun",
    ctaHref: "/hukuki-analiz/is-cikarilma-tazminat",
    updatedAt: "2026-05-01",
  },
  {
    slug: "tahliye-sureci",
    h1: "Tahliye süreci rehberi — kiracı ve ev sahibi için",
    metaTitle: "Tahliye süreci nasıl işler? Kiracı ve ev sahibi rehberi",
    metaDescription:
      "Tahliye taahhütnamesi, süre bitimi, kira borcu ve icra: tahliye sürecini adım adım anlayın. Ücretsiz taahhütname kontrol aracı.",
    keywords: [
      "tahliye süreci",
      "kiracı tahliyesi",
      "tahliye davası",
      "tahliye taahhütnamesi",
    ],
    intro:
      "Tahliye, tek bir belgeyle veya tek gecede olmaz. Usul kuralları hem kiracıyı hem ev sahibini korur; usul dışı yöntemler cezai ve tazminat riski taşır.",
    sections: [
      {
        title: "Yasal tahliye yolları",
        paragraphs: [
          "Süre bitimi, geçerli tahliye taahhütnamesi, kira borcuna dayalı yollar ve sözleşmede öngörülen haller ayrı ayrı değerlendirilir.",
        ],
      },
      {
        title: "Tahliye taahhütnamesi",
        paragraphs: [
          "Yazılı, tarihli ve usule uygun olmalıdır. Baskı altında veya bilgilendirilmeden imzalanan belgeler tartışmalıdır.",
        ],
      },
      {
        title: "İcra aşaması",
        paragraphs: [
          "Mahkeme kararı veya icra edilebilir belge olmadan zorla tahliye yapılamaz. Kiracı bu aşamada da hak arayabilir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ev sahibi anahtarı değiştirebilir mi?",
        answer:
          "Hukuki tahliye olmadan genelde hayır; hukuka aykırı giriş ve tahliye tazminat doğurabilir.",
      },
    ],
    ctaLabel: "Tahliye taahhütnamesini kontrol edin",
    ctaHref: "/araclar/tahliye-taahhutnamesi-yapay-zeka-on-kontrol",
    updatedAt: "2026-05-01",
  },
  {
    slug: "mesafeli-satis-cayma",
    h1: "Cayma hakkı rehberi — 14 gün kuralı ve istisnalar",
    metaTitle: "Cayma hakkı nedir? Mesafeli satış rehberi",
    metaDescription:
      "Online alışverişte 14 gün cayma hakkı, iade koşulları ve istisnalar. Tüketici rehberi ve mesafeli satış sözleşmesi ücretsiz analizi.",
    keywords: [
      "cayma hakkı",
      "14 gün cayma",
      "mesafeli satış iade",
      "online alışveriş iade",
    ],
    intro:
      "Kapıda sözleşme imzalamadan alışveriş yapmak kolaydır; cayma hakkı bu kolaylığın güvencesidir. Ancak her üründe sınırsız değildir.",
    sections: [
      {
        title: "14 gün kuralı",
        paragraphs: [
          "Tüketici, mesafeli sözleşmelerde genel olarak 14 gün içinde sebep göstermeden cayabilir. Süre teslimden itibaren işlemeye başlar.",
        ],
      },
      {
        title: "İstisnalar",
        paragraphs: [
          "Kişiye özel üretim, çabuk bozulan mallar, hijyenik ürün ambalajının açılması gibi istisnalar vardır. Satıcı ön bilgilendirmede açıkça belirtmelidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Cayma hakkını kullanınca param ne zaman iade edilir?",
        answer:
          "Kanuni süreler vardır; satıcı gecikirse şikayet yolları değerlendirilebilir.",
      },
    ],
    ctaLabel: "Mesafeli satış sözleşmenizi okuyun",
    ctaHref: "/sozlesme-analizi/mesafeli-satis-sozlesmesi",
    updatedAt: "2026-05-01",
  },
];

const PAGES: RehberPageConfig[] = [
  ...BASE_PAGES,
  ...REHBER_EXTENDED_PAGES,
  ...REHBER_EXTRA_2_PAGES,
];

export const REHBER_PAGES: Record<string, RehberPageConfig> = Object.fromEntries(
  PAGES.map((p) => [p.slug, p]),
);

export const REHBER_SLUGS = PAGES.map((p) => p.slug);

export function getRehberConfig(slug: string): RehberPageConfig | undefined {
  return REHBER_PAGES[slug];
}
