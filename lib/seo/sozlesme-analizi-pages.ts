/**
 * Programmatic SEO: /sozlesme-analizi/[slug]
 * Her sayfa benzersiz giriş (hook) + ortak çerçeve paragrafları ile uzun kuyruk trafiği hedefler.
 */
export type SozlesmeAnaliziPageConfig = {
  slug: string;
  /** Navbar / Araçlar menüsü kısa etiket */
  navLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  bodyParagraphs: string[];
};

function buildBody(topicShort: string, hook: string): string[] {
  return [
    hook,
    `${topicShort} belgelerinde süre, bedel, teslim ve fesih hattı çoğu uyuşmazlığın merkezindedir. Tek taraflı değişiklik, serbest bırakılan oranlar veya muğlak iş tanımı maddeleri uygulamada yanlış beklenti ve nakit akışı riski doğurur. Tarafların rollerinin net yazılmaması, alt yüklenici, vekil veya tedarik zincirinde sorumluluk boşlukları yaratır.`,
    `İmza öncesi gizlilik ve kişisel veri hükümleri, fikri mülkiyet devri, sorumluluk sınırı, gecikme cezası ve yetkili mahkeme maddelerini birlikte okumak gerekir. Mevzuata aykırı veya işlem dışı bırakılmaya çalışılan haklar ihtilafa konu olabilir. Yapay zeka destekli ön tarama, hangi maddelerin müzakere ve avukat incelemesi gerektirdiğini görünür kılar; hukuki danışmanlığın yerini tutmaz.`,
    `Aşağıdaki alana metninizi yapıştırarak Clause ile ücretsiz güven özeti ve risk çerçevesi alabilir, ardından şeffaf fiyatlarla detaylı analiz ve iyileştirme metnine geçebilirsiniz. Sunulan içerikler bilgilendirme niteliğindedir; nihai imza ve dava riski için mutlaka bir avukata danışın.`,
  ];
}

const PAGES: SozlesmeAnaliziPageConfig[] = [
  {
    slug: "kira-sozlesmesi-analizi",
    navLabel: "Kira sözleşmesi",
    h1: "Kira sözleşmesi analizi ve risk tespiti",
    metaTitle: "Kira sözleşmesi analizi ve risk tespiti — Clause AI",
    metaDescription:
      "Kira bedeli artışı, depozito, tahliye ve fesih maddelerini TBK çerçevesinde yapay zeka ile tarayın. Riskleri erken görün, metninizi iyileştirin.",
    keywords: [
      "kira sözleşmesi analizi",
      "kira sözleşmesi risk",
      "TBK kira",
      "kira sözleşmesi kontrol",
    ],
    bodyParagraphs: buildBody(
      "Kira sözleşmesi",
      `Konut ve iş yeri kira sözleşmelerinde artış formülü, depozito iadesi, bakım-onarım paylaşımı ve tahliye süreçleri sık biçimde tek taraflı veya belirsiz yazılır. Kira bedelinin nasıl ve ne zaman güncelleneceği, fesih bildiriminin usulü ve süreleri ile birlikte okunmadığında taraflar farklı beklentilere girer. Tahliye taahhüdü, kefil ve depozito şartlarında görülen tipik hatalar, uyuşmazlıkta masraf ve zaman kaybını büyütür; metni imzalamadan önce bu başlıkların netleştirilmesi kritiktir.`,
    ),
  },
  {
    slug: "is-sozlesmesi-riskleri",
    navLabel: "İş sözleşmesi",
    h1: "İş sözleşmesi analizi ve risk tespiti",
    metaTitle: "İş sözleşmesi riskleri analizi — Clause",
    metaDescription:
      "Fesih, ihbar, ücret, fazla mesai ve rekabet yasağı maddelerindeki dengesizlikleri İş Kanunu perspektifiyle ön taramadan geçirin.",
    keywords: [
      "iş sözleşmesi riskleri",
      "iş sözleşmesi analizi",
      "İş Kanunu sözleşme",
      "fesih maddesi",
    ],
    bodyParagraphs: buildBody(
      "İş sözleşmesi",
      `İş sözleşmelerinde ücret, yan haklar, deneme süresi, fesih gerekçesi ve ihbar süreleri çoğu ihtilafın kaynağıdır. Rekabet yasağı ve işyeri dışında faaliyet yasağının süre ve coğrafi kapsamı belirsizse işçi lehine veya işveren lehine aşırı sonuçlar doğabilir. Özellikle performans hedefleri, disiplin ve kesinti maddeleri İş Kanunu sınırlarıyla çeliştiğinde geçersizlik ve tazminat riski artar; metnin iş hukuku pratiğiyle uyumlu gözden geçirilmesi gerekir.`,
    ),
  },
  {
    slug: "freelance-yazilim-kontrati",
    navLabel: "Freelance yazılım",
    h1: "Freelance yazılım kontratı analizi ve risk tespiti",
    metaTitle: "Freelance yazılım kontratı analizi — telif ve teslim",
    metaDescription:
      "Yazılım teslimi, kaynak kodu, SLA, ödeme ve fikri mülkiyet devri maddelerini freelance sözleşmenizde AI ile kontrol edin.",
    keywords: [
      "freelance yazılım sözleşmesi",
      "yazılım kontratı",
      "telif devri",
      "SLA sözleşme",
    ],
    bodyParagraphs: buildBody(
      "Freelance yazılım sözleşmesi",
      `Yazılım ve geliştirme sözleşmelerinde teslim tanımı, kabul kriterleri, kaynak kodunun devri, bakım ve destek kapsamı ile ödeme takvimi birbirine bağlıdır. Fikri mülkiyetin kime geçtiği, açık kaynak bileşenlerin lisansları ve gizlilik yükümlülükleri net değilse müşteri ve geliştirici arasında sürtüşme kaçınılmaz olur. Revizyon hakkı sınırsız yazıldığında kapsam şişer; ücret ve süre baskısı doğar. Bu maddelerin sınırları netleştirilmeden imza, operasyonel ve hukuki risk taşır.`,
    ),
  },
  {
    slug: "ev-satis-sozlesmesi",
    navLabel: "Ev satışı",
    h1: "Ev satış sözleşmesi analizi ve risk tespiti",
    metaTitle: "Ev satış sözleşmesi ön analizi — Clause",
    metaDescription:
      "Ön sözleşme, kapora, tapu teslimi ve ayıplı mal başlıklarında konut alım-satım metninizi risk açısından tarayın.",
    keywords: [
      "ev satış sözleşmesi",
      "konut ön sözleşmesi",
      "gayrimenkul sözleşme analizi",
    ],
    bodyParagraphs: buildBody(
      "Ev satış sözleşmesi",
      `Konut alım satımında ön sözleşme, kapora, kesin sözleşme ve tapu teslimi aşamalarında süre ve şartlar net olmalıdır. Ayıp, sınır ihlali, ipotek veya haciz gibi durumlarda tarafların yükümlülükleri belirsizse alıcı ve satıcı mağduriyet yaşar. Ödeme planı, feragat ve cezai şart maddeleri tek taraflı keskinleştirildiğinde denge bozulur. Profesyonel hukuki inceleme şart olmakla birlikte, metnin ön analizi erken uyarı sağlar.`,
    ),
  },
  {
    slug: "gizlilik-sozlesmesi-nda",
    navLabel: "Gizlilik / NDA",
    h1: "Gizlilik sözleşmesi (NDA) analizi ve risk tespiti",
    metaTitle: "Gizlilik sözleşmesi ve NDA analizi — Clause",
    metaDescription:
      "Tanım, istisna, süre ve ihlal sonuçları NDA metninizde dengeli mi? Yapay zeka ile ön kontrol.",
    keywords: [
      "NDA analizi",
      "gizlilik sözleşmesi",
      "ticari sır koruma",
    ],
    bodyParagraphs: buildBody(
      "Gizlilik (NDA) sözleşmesi",
      `Gizlilik sözleşmelerinde gizli bilginin tanımı çok geniş veya tek taraflı yazıldığında günlük operasyonu kilitleyebilir. İstisnalar, zorunlu açıklamalar ve yasal zorunluluklar net değilse ihlal iddiası kolaylaşır. Süre ve coğrafi kapsamın makul olmaması rekabet ve iş geliştirme özgürlüğünü kısar. İhlalde tazminat ve ihtiyati tedbir dili belirsizse uygulanabilirlik zayıflar; metnin sınırları dikkatle çizilmelidir.`,
    ),
  },
  {
    slug: "hizmet-alim-sozlesmesi",
    navLabel: "Hizmet alımı",
    h1: "Hizmet alım sözleşmesi analizi ve risk tespiti",
    metaTitle: "Hizmet alım sözleşmesi risk analizi — TBK",
    metaDescription:
      "Kapsam, kabul, bedel, gecikme ve fesih maddelerinde hizmet alım sözleşmenizi AI ile ön taramadan geçirin.",
    keywords: [
      "hizmet alım sözleşmesi",
      "TBK hizmet",
      "danışmanlık sözleşmesi",
    ],
    bodyParagraphs: buildBody(
      "Hizmet alım sözleşmesi",
      `Hizmet alımında işin kapsamı, teslimat ve kabul kriterleri, değişiklik talepleri ve ek işler net tanımlanmazsa süre ve ücret anlaşmazlığı çıkar. Performans garantileri, cezai şart ve fesih hakları dengesiz yazıldığında tedarikçi veya alıcı aşırı risk üstlenir. Alt yüklenici kullanımı ve sorumluluk zinciri belirsizse kalite ve uyumluluk riski büyür. Sözleşmenin ticari gerçekliğe uygun gözden geçirilmesi gerekir.`,
    ),
  },
  {
    slug: "tedarik-sozlesmesi-risk-analizi",
    navLabel: "Tedarik",
    h1: "Tedarik sözleşmesi analizi ve risk tespiti",
    metaTitle: "Tedarik sözleşmesi risk analizi — Clause",
    metaDescription:
      "Teslim süreleri, kalite, garanti ve mücbir sebep maddelerinde tedarik sözleşmenizi kontrol edin.",
    keywords: [
      "tedarik sözleşmesi",
      "tedarik risk analizi",
      "satın alma sözleşmesi",
    ],
    bodyParagraphs: buildBody(
      "Tedarik sözleşmesi",
      `Tedarik sözleşmelerinde teslim süreleri, miktar toleransı, kalite standartları ve garanti süreleri uyuşmazlıkta merkeze oturur. Mücbir sebep ve force majeure tanımı dar veya tek taraflı yazıldığında tedarik kesintilerinde sorumluluk belirsizleşir. Fiyat revizyonu, döviz ve enflasyon düzenlemeleri net değilse marj baskısı doğar. Lojistik ve sigorta yükümlülükleri ayrıntılandırılmadan imza, operasyonel risk taşır.`,
    ),
  },
  {
    slug: "distribitorluk-sozlesmesi",
    navLabel: "Distribütörlük",
    h1: "Distribütörlük sözleşmesi analizi ve risk tespiti",
    metaTitle: "Distribütörlük sözleşmesi analizi — bölge ve kota",
    metaDescription:
      "Bölge, kota, fiyatlandırma ve fesih maddelerinde distribütörlük sözleşmenizi ön analizden geçirin.",
    keywords: [
      "distribütörlük sözleşmesi",
      "bölge hakları",
      "tedarikçi sözleşmesi",
    ],
    bodyParagraphs: buildBody(
      "Distribütörlük sözleşmesi",
      `Distribütörlükte münhasır bölge, minimum satış kotası, fiyat listesi bağlayıcılığı ve pazarlama desteği maddeleri dengesiz olabilir. Fesih için kısa ihbar veya tek taraflı fesih, distribütörün yatırımını riske atar. Rekabet ve marka kullanımı kuralları belirsizse ihlal iddiaları artar. Sözleşme süresi, yenileme ve devir şartları ticari süreklilik için kritik başlıklardır.`,
    ),
  },
  {
    slug: "franchise-sozlesmesi-kontrol",
    navLabel: "Franchise",
    h1: "Franchise sözleşmesi analizi ve risk tespiti",
    metaTitle: "Franchise sözleşmesi kontrolü — Clause",
    metaDescription:
      "Royalti, işletme standardı, eğitim ve fesih maddelerinde franchise metninizi tarayın.",
    keywords: [
      "franchise sözleşmesi",
      "franchise risk",
      "royalti sözleşmesi",
    ],
    bodyParagraphs: buildBody(
      "Franchise sözleşmesi",
      `Franchise ilişkisinde marka kullanımı, işletme standardı, royalti ve reklam katkı payı uzun vadeli nakit akışını belirler. Bölge koruması, yenileme ve sözleşme sonu stok-devir maddeleri franchisee lehine veya aleyhine aşırı keskinleşebilir. Rekabet yasağı ve gizlilik hükümleri işletme satışını ve çıkışı kısıtlayabilir. Metnin ticari ve hukuki açıdan denge kontrolü önemlidir.`,
    ),
  },
  {
    slug: "kvkk-aydinlatma-metni-analizi",
    navLabel: "KVKK aydınlatma",
    h1: "KVKK aydınlatma metni analizi ve risk tespiti",
    metaTitle: "KVKK aydınlatma metni analizi — Clause",
    metaDescription:
      "Veri kategorileri, hukuki sebep, saklama süresi ve başvuru hakları aydınlatma metninizde eksik mi?",
    keywords: [
      "KVKK aydınlatma metni",
      "kişisel veri bilgilendirme",
      "aydınlatma analizi",
    ],
    bodyParagraphs: buildBody(
      "KVKK aydınlatma metni",
      `Aydınlatma yükümlülüğünde veri sorumlusunun kimliği, işlenen veri kategorileri, işleme amaçları ve hukuki sebepler açıkça yazılmalıdır. Saklama süreleri ve alıcı grupları belirsizse şeffaflık zedelenir; başvuru kanalları eksikse başvuru hakkı fiilen kullanılamaz. Yurt dışı aktarım varsa ek bilgilendirme gerekir. Metin güncel mevzuat ve iç süreçlerle uyumlu tutulmalıdır.`,
    ),
  },
  {
    slug: "calisan-adi-sozlesmesi",
    navLabel: "Çalışan adı",
    h1: "Çalışan adı sözleşmesi analizi ve risk tespiti",
    metaTitle: "Çalışan adı sözleşmesi analizi — Clause",
    metaDescription:
      "Hedefler, prim, gizlilik ve fesih maddelerinde çalışan adı sözleşmenizi risk açısından inceleyin.",
    keywords: [
      "çalışan adı sözleşmesi",
      "satış temsilcisi sözleşmesi",
      "prim sözleşmesi",
    ],
    bodyParagraphs: buildBody(
      "Çalışan adı sözleşmesi",
      `Çalışan adı ve saha temsilciliği sözleşmelerinde hedefler, prim hesabı, masraf iadesi ve müşteri portföyünün mülkiyeti sık anlaşmazlık konusudur. Rekabet ve müşteri çalma yasağı aşırı geniş yazılabilir. İş ilişkisinin gerçekte hizmet sözleşmesi mi yoksa işçilik mi olduğu belirsizse İş Kanunu sonuçları doğabilir. Metnin iş modeline uygun ve denge gözetilerek yazılması gerekir.`,
    ),
  },
  {
    slug: "stajyer-sozlesmesi",
    navLabel: "Stajyer",
    h1: "Stajyer sözleşmesi analizi ve risk tespiti",
    metaTitle: "Stajyer sözleşmesi analizi — Clause",
    metaDescription:
      "Eğitim kapsamı, sigorta, gizlilik ve ücret başlıklarında stajyer sözleşmenizi kontrol edin.",
    keywords: [
      "stajyer sözleşmesi",
      "staj sözleşmesi analizi",
    ],
    bodyParagraphs: buildBody(
      "Stajyer sözleşmesi",
      `Stajyer ilişkisinde eğitim amacı, süre, denetim ve değerlendirme net olmalıdır. Fiilen tam zamanlı çekirdek iş üretimi bekleniyorsa sözleşme etiketi ile fiili durum çelişebilir. Gizlilik ve fikri mülkiyet devri maddeleri genç çalışan lehine aşırı yük oluşturabilir. Ücret, harcırah ve sigorta konuları mevzuata uygun biçimde ele alınmalıdır.`,
    ),
  },
  {
    slug: "lojistik-hizmet-sozlesmesi",
    navLabel: "Lojistik",
    h1: "Lojistik hizmet sözleşmesi analizi ve risk tespiti",
    metaTitle: "Lojistik hizmet sözleşmesi analizi — Clause",
    metaDescription:
      "Teslimat süreleri, hasar, sigorta ve sorumluluk sınırı maddelerinde lojistik sözleşmenizi tarayın.",
    keywords: [
      "lojistik sözleşmesi",
      "taşıma sözleşmesi",
      "teslimat risk",
    ],
    bodyParagraphs: buildBody(
      "Lojistik hizmet sözleşmesi",
      `Lojistikte teslim süreleri, hasar ve ziya sorumluluğu, sigorta ve bildirim yükümlülükleri operasyonel riskleri belirler. Force majeure ve gecikme cezası dengesiz yazıldığında müşteri veya taşıyıcı aşırı yük altında kalır. Yükleme-boşaltma süreleri ve demuraj gibi lojistik jargonu net tanımlanmazsa ücret anlaşmazlığı çıkar. Sözleşme operasyon gerçekliğiyle uyumlu olmalıdır.`,
    ),
  },
  {
    slug: "yazilim-lisans-sozlesmesi",
    navLabel: "Yazılım lisansı",
    h1: "Yazılım lisans sözleşmesi analizi ve risk tespiti",
    metaTitle: "Yazılım lisans sözleşmesi analizi — SaaS ve on-prem",
    metaDescription:
      "Kullanım kapsamı, güncelleme, veri ve fesih maddelerinde yazılım lisansınızı ön analizden geçirin.",
    keywords: [
      "yazılım lisans sözleşmesi",
      "SaaS sözleşmesi",
      "EULA analizi",
    ],
    bodyParagraphs: buildBody(
      "Yazılım lisans sözleşmesi",
      `Lisans sözleşmelerinde kullanıcı sayısı, ortam (bulut / kurulum), alt lisans ve yedekleme hakları net olmalıdır. Hizmet düzeyi (SLA), veri yerelleştirme ve yedekleme yükümlülükleri belirsizse iş sürekliliği riski doğar. Fesih ve veri iadesi maddeleri tek taraflı keskinleşebilir. Açık kaynak bileşenlerin lisans uyumu ayrı bir risk alanıdır.`,
    ),
  },
  {
    slug: "ortaklik-sozlesmesi-taslak",
    navLabel: "Ortaklık",
    h1: "Ortaklık sözleşmesi taslağı analizi ve risk tespiti",
    metaTitle: "Ortaklık sözleşmesi taslağı analizi — Clause",
    metaDescription:
      "Sermaye, kar payı, yönetim ve çıkış maddelerinde ortaklık taslağınızı risk açısından tarayın.",
    keywords: [
      "ortaklık sözleşmesi",
      "ortaklık taslağı",
      "çıkış maddesi",
    ],
    bodyParagraphs: buildBody(
      "Ortaklık sözleşmesi",
      `Ortaklıkta sermaye katkısı, kar-zarar paylaşımı, yönetim hakları ve veto alanları net tanımlanmalıdır. Ortak çıkışı, değerleme, önalım ve drag-along/tag-along maddeleri belirsizse şirket kontrolü ve likidite krizleri doğabilir. Rekabet ve sadakat yükümlülükleri aşırı geniş yazılabilir. Taslak aşamasında hukuki ve mali danışmanlık şarttır; ön analiz erken uyarı sağlar.`,
    ),
  },
  {
    slug: "reklam-hizmet-sozlesmesi",
    navLabel: "Reklam hizmeti",
    h1: "Reklam hizmet sözleşmesi analizi ve risk tespiti",
    metaTitle: "Reklam hizmet sözleşmesi analizi — ajans sözleşmesi",
    metaDescription:
      "KPI, medya bütçesi, telif ve fikri mülkiyet maddelerinde reklam sözleşmenizi kontrol edin.",
    keywords: [
      "reklam sözleşmesi",
      "ajans sözleşmesi",
      "KPI sözleşmesi",
    ],
    bodyParagraphs: buildBody(
      "Reklam hizmet sözleşmesi",
      `Reklam ve pazarlama sözleşmelerinde kampanya kapsamı, KPI tanımları, medya bütçesi ve ajans ücreti net olmalıdır. Kreatif çalışmaların mülkiyeti, revizyon hakkı ve marka kullanımı belirsizse telif anlaşmazlığı çıkar. Influencer ve üçüncü taraflarla uyum için şeffaflık maddeleri önemlidir. Performans taahhütleri ölçülebilir dil ile yazılmalıdır.`,
    ),
  },
  {
    slug: "kredi-sozlesmesi-on-analiz",
    navLabel: "Kredi sözleşmesi",
    h1: "Kredi sözleşmesi analizi ve risk tespiti",
    metaTitle: "Kredi sözleşmesi ön analiz — faiz ve temerrüt",
    metaDescription:
      "Faiz, masraf, erken ödeme ve temerrüt maddelerinde kredi sözleşmenizi yapay zeka ile ön taramadan geçirin.",
    keywords: [
      "kredi sözleşmesi analizi",
      "tüketici kredisi sözleşmesi",
      "faiz maddesi",
    ],
    bodyParagraphs: buildBody(
      "Kredi sözleşmesi",
      `Kredi sözleşmelerinde faiz türü ve hesaplama, masraf ve komisyon kalemleri, erken ödeme ve temerrüt sonuçları tüketici veya ticari taraflar için kritiktir. Teminat ve rehin hükümleri, temerrüt faizi ve tek taraflı hızlandırılmış ifa talepleri dengesiz olabilir. Cayma ve bilgilendirme yükümlülükleri mevzuata aykırı bırakılırsa geçersizlik riski doğar. Metnin sade bir ön analizi yükümlülükleri görünür kılar.`,
    ),
  },
  {
    slug: "arac-kira-sozlesmesi-risk",
    navLabel: "Araç kiralama",
    h1: "Araç kira sözleşmesi analizi ve risk tespiti",
    metaTitle: "Araç kira sözleşmesi risk analizi — Clause",
    metaDescription:
      "Hasar, km limiti, sigorta ve depozito maddelerinde araç kiralama sözleşmenizi tarayın.",
    keywords: [
      "araç kiralama sözleşmesi",
      "filo sözleşmesi",
      "hasar sorumluluğu",
    ],
    bodyParagraphs: buildBody(
      "Araç kira sözleşmesi",
      `Araç kiralamada km limiti, yakıt ve temizlik, hasar ve muafiyet bedelleri, sigorta kapsamı ve depozito iadesi sık ihtilaf konusudur. Tek taraflı cezai şart ve gecikme faizi oranları tüketici açısından sert olabilir. Araç değişimi ve arıza süreçleri net değilse operasyonel mağduriyet doğar. Metnin kira süresi ve teslim şartlarıyla birlikte okunması gerekir.`,
    ),
  },
  {
    slug: "isyeri-devri-sozlesmesi",
    navLabel: "İşyeri devri",
    h1: "İşyeri devri sözleşmesi analizi ve risk tespiti",
    metaTitle: "İşyeri devri sözleşmesi analizi — İş Kanunu riskleri",
    metaDescription:
      "İşçilik devri, borçlar, ruhsat ve fesih maddelerinde işyeri devri sözleşmenizi ön analizden geçirin.",
    keywords: [
      "işyeri devri",
      "işçilik devri",
      "devir sözleşmesi",
    ],
    bodyParagraphs: buildBody(
      "İşyeri devri sözleşmesi",
      `İşyeri devrinde işçiliklerin devri, alacakların devri, ruhsat ve izinlerin devredilebilirliği ve çalışan bilgilendirmesi kritik başlıklardır. Devralan ve devreden arasındaki sorumluluk paylaşımı belirsizse sonradan çifte talep riski doğar. Rekabet ve müşteri ilişkileri devri maddeleri ticari süreklilik için önemlidir. İş hukuku ve ticaret hukuku birlikte değerlendirilmelidir.`,
    ),
  },
  {
    slug: "mesafeli-satis-sozlesmesi",
    navLabel: "Mesafeli satış",
    h1: "Mesafeli satış sözleşmesi analizi ve risk tespiti",
    metaTitle: "Mesafeli satış sözleşmesi analizi — cayma ve iade",
    metaDescription:
      "Cayma, iade, teslimat ve ön bilgilendirme maddelerinde mesafeli satış metninizi kontrol edin.",
    keywords: [
      "mesafeli satış sözleşmesi",
      "cayma hakkı",
      "e-ticaret sözleşmesi",
    ],
    bodyParagraphs: buildBody(
      "Mesafeli satış sözleşmesi",
      `Mesafeli satışta ön bilgilendirme, cayma süresi, iade masrafı ve ücret iadesi süreleri mevzuata uygun yazılmalıdır. Teslimat süresi ve ayıp halleri belirsizse tüketici şikayetleri artar. Dijital içerik ve kişiye özel ürün istisnaları yanlış kullanılırsa hukuki risk doğar. Sözleşme ile ön bilgilendirme metni çelişmemelidir.`,
    ),
  },
  {
    slug: "uyelik-sozlesmesi-dijital",
    navLabel: "Dijital üyelik",
    h1: "Dijital üyelik sözleşmesi analizi ve risk tespiti",
    metaTitle: "Dijital üyelik sözleşmesi analizi — abonelik ve KVKK",
    metaDescription:
      "Abonelik yenileme, ücret artışı, içerik lisansı ve veri işleme maddelerinde üyelik sözleşmenizi tarayın.",
    keywords: [
      "üyelik sözleşmesi",
      "abonelik sözleşmesi",
      "dijital platform sözleşmesi",
    ],
    bodyParagraphs: buildBody(
      "Dijital üyelik sözleşmesi",
      `Dijital platformlarda otomatik yenileme, ücret artışı bildirimi, hizmet seviyesi değişikliği ve hesap kapatma kuralları kullanıcı güvenini doğrudan etkiler. İçerik lisansı ve kullanıcı üretimi içerik hakları belirsizse fikri mülkiyet anlaşmazlığı çıkar. KVKK ve çerez politikaları ile çelişen hükümler uyum riski yaratır. Metnin şeffaf ve ölçülü olması gerekir.`,
    ),
  },
  {
    slug: "yapim-isi-sozlesmesi",
    navLabel: "Yapım işi",
    h1: "Yapım işi sözleşmesi analizi ve risk tespiti",
    metaTitle: "Yapım işi sözleşmesi analizi — süre, keşif, ödeme",
    metaDescription:
      "Keşif, süre, ödeme takvimi, iş artışı ve teminat maddelerinde yapım sözleşmenizi ön analizden geçirin.",
    keywords: [
      "yapım işi sözleşmesi",
      "müteahhit sözleşmesi",
      "iş artışı",
    ],
    bodyParagraphs: buildBody(
      "Yapım işi sözleşmesi",
      `Yapım işlerinde keşif ve teknik şartname, süre ve gecikme cezası, iş artışı ve fiyat farkı mekanizmaları uyuşmazlığın merkezindedir. Teminat mektupları, avans ve hakediş ödeme takvimi nakit akışını belirler. Kabul, ayıp ve garanti süreleri net değilse teslim sonrası anlaşmazlık büyür. Sözleşme mühendislik ve hukuk birlikte okunmalıdır.`,
    ),
  },
];

export const SOZLESME_ANALIZI_PAGES: Record<string, SozlesmeAnaliziPageConfig> =
  Object.fromEntries(PAGES.map((p) => [p.slug, p]));

export const SOZLESME_ANALIZI_SLUGS = PAGES.map((p) => p.slug);

export function getSozlesmeAnaliziConfig(
  slug: string,
): SozlesmeAnaliziPageConfig | undefined {
  return SOZLESME_ANALIZI_PAGES[slug];
}

export function getSozlesmeAnaliziNavLinks(): { href: string; label: string }[] {
  return PAGES.map((p) => ({
    href: `/sozlesme-analizi/${p.slug}`,
    label: p.navLabel,
  }));
}
