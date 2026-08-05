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

/** Daily deep SEO content — 8 strategic blog posts (Aug 5, 2026) */
export const BLOG_DAILY_DEEP_POSTS: BlogPostConfig[] = [
  blog({
    slug: "gunluk-hukuk-isleri-yapay-zeka-2026",
    h1: "Günlük hukuk işleri yapay zeka ile 2026 — Clause ile ön analiz",
    metaTitle: "Günlük hukuk işleri yapay zeka — pratik ön analiz 2026",
    metaDescription:
      "Kira, iş ve tüketici sözleşmelerinde yapay zeka destekli ön analiz nasıl kullanılır? Clause ile genel bilgilendirme ve dikkat edilmesi gereken noktalar.",
    keywords: [
      "günlük hukuk işleri yapay zeka",
      "günlük hukuki asistan AI",
      "clause günlük kullanım",
      "hukuki ihtiyaç asistan",
    ],
    excerpt: "Sıradan hukuk sorularında ilk filtreleme: yapay zeka ile ön analiz, sonrasında avukat.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    intro:
      "Her gün binlerce insan 'kira artış oranı ne olmalı?', 'kıdem tazminatı nasıl hesaplanır?', 'depozito ne zaman iade edilir?' gibi sorular soruyor. Bu sorular teknik bilgi gerektirir ve çoğu zaman ilk adımda genel bilgi edinmekle başlar. Clause gibi sözleşme odaklı yapay zeka araçları tam bu ön aşama için tasarlandı. Bu yazı genel bilgilendirme amaçlıdır; hukuki tavsiye niteliği taşımaz ve somut durumunuz için avukat görüşünün yerine geçmez.",
    sections: [
      {
        title: "Günlük hukuki ihtiyaçlar nedir?",
        paragraphs: [
          "Günlük hukuki ihtiyaçlar, genellikle dava veya icra aşamasına gelmemiş, bilgi ve ilk kontrol seviyesinde kalan sorulardır. Kira sözleşmesini anlamlandırma, iş sözleşmesindeki rekabet yasağı maddesine bakma, depozito iade süreci hakkında bilgi edinme, kıdem ve ihbar tazminatı kavramlarını karşılaştırma gibi konular bu gruba girer.",
          "Bu soruların ortak özelliği şudur: profesyonel bir hukuki görüş almadan önce konuyu anlamak, hem görüşme sürenizi verimli kullanmanızı sağlar hem de neyi soracağınızı netleştirir. Yanıltıcı forum yorumlarına veya güncelliğini yitirmiş kaynaklara dayanmak yerine, sözleşme metninizin kendisinden hareket eden bir ön analiz daha sağlıklı bir başlangıçtır.",
          "Clause bu alanda sözleşme metnine odaklanır: metni yüklediğinizde öne çıkan maddeleri, belirsiz ifadeleri ve dikkat edilmesi gereken noktaları özetler. Bu bir hukuki görüş değil, ön bilgilendirmedir; amacı riskleri kesinleştirmek değil, sizi doğru soruları sorabilecek hale getirmektir.",
        ],
      },
      {
        title: "Yapay zeka ile sözleşme ön analizi nasıl yapılır?",
        paragraphs: [
          "İlk adım sözleşme metnini Clause arayüzüne aktarmaktır. Sistem metni tarar, öne çıkan maddeleri işaretler ve dikkat edilmesi gereken noktaları özetler. Kira sözleşmelerinde artış, depozito ve fesih/tahliye maddeleri; iş sözleşmelerinde rekabet yasağı, gizlilik ve tazminat koşulları tipik olarak ilk bakılan başlıklardır.",
          "İkinci adım özeti okuyup belirsiz maddeleri anlamaktır. Clause yalnızca 'bu madde dikkat gerektiriyor' demez, hangi senaryolarda tartışma çıkarabileceğini de anlatmaya çalışır. Örneğin 'kira artışı serbestçe belirlenir' gibi bir ifade neden belirsizdir ve neden uyuşmazlığa açıktır? Bu tür noktalar somut örneklerle açıklanır.",
          "Son adımda, önemli veya karmaşık maddeler için avukat görüşü almanız gerekir. Clause avukatın yerine geçmez; aksine avukata gitmeden önce nelere dikkat etmeniz gerektiğine dair genel bir çerçeve sunar. Böylece görüşme daha odaklı geçer ve temel bilgileri anlatmakla vakit kaybetmezsiniz.",
        ],
      },
      {
        title: "Genel chatbot ile sözleşme odaklı araç farkı",
        paragraphs: [
          "Genel amaçlı yapay zeka sohbet botları hukuki sorulara cevap verebilir, ancak bu cevaplar her zaman doğru olmayabilir. Genel botlar kaynak göstermeden madde numarası üretebilir, güncelliğini yitirmiş bilgiyi tekrarlayabilir veya farklı ülkelerin hukuk sistemlerini karıştırabilir. Hukuki süreçlerde bu tür yanılgılar zaman ve hak kaybına yol açabilir.",
          "Clause gibi sözleşme odaklı araçlar ise cevabını genel bir bilgi havuzundan değil, sizin yüklediğiniz metinden üretmeye çalışır. Yani 'kira artışı ne olmalı?' sorusuna soyut bir cevap vermek yerine, sözleşmenizdeki ilgili maddeyi okur ve o madde üzerinden değerlendirme yapar. Yine de bu değerlendirme kesin bir hukuki sonuç değil, ön bilgilendirmedir.",
          "Veri tarafında da bir fark vardır: genel botlara yüklediğiniz metinlerin nasıl işlendiğini çoğu zaman kontrol edemezsiniz. Clause'un verileri nasıl işlediği, ne kadar sakladığı ve haklarınızı nasıl kullanabileceğiniz /gizlilik ve /guvenlik sayfalarında açıklanır; hassas belgeleri paylaşmadan önce bu sayfaları okumanızı öneririz.",
        ],
      },
      {
        title: "Hangi konularda günlük kullanım mümkün?",
        paragraphs: [
          "Kira hukuku alanında kira artışı, depozito iadesi süreci, tahliye ve fesih maddeleri ile yazılı bildirim konuları sık gündeme gelir. Kullanıcı kendi sözleşmesini yükler, belirsiz maddeleri görür ve yazılı bir talep hazırlamadan önce nelere dikkat etmesi gerektiğine dair genel bilgi edinir.",
          "İş hukuku tarafında kıdem tazminatı, ihbar tazminatı, fazla mesai, rekabet yasağının sınırları, fesih ve işe iade koşulları en çok sorulan başlıklardır. Clause bu alanda sözleşme ön analizi ve tahmini hesaplama araçları sunar; hesaplayıcıların sonucu bağlayıcı değildir, yaklaşık bir fikir vermek içindir.",
          "Tüketici hukuku ve e-ticaret tarafında cayma hakkı, abonelik iptali, ayıplı ürün ve ön bilgilendirme eksikliği öne çıkar. Clause bu metinlerde belirsiz veya tüketici aleyhine görünen maddeleri işaretler; bunların geçerli olup olmadığı ise somut olaya ve mevzuata göre değerlendirilmelidir.",
        ],
      },
      {
        title: "Ne zaman avukat desteği gerekir?",
        paragraphs: [
          "Yapay zeka destekli ön analiz bilgilendirme için yararlıdır, ancak bazı durumlarda mutlaka avukata başvurmalısınız. İcra takibi başlatıldıysa, dava açıldıysa veya mahkemeden bir tebligat aldıysanız süreç profesyonel hukuki temsil gerektirir. Bu tür durumlarda yapay zeka çıktısına dayanarak süre veya usul kararı vermeyin.",
          "Yüksek tutarlı ticari sözleşmeler, ortaklık anlaşmaları ve gayrimenkul işlemleri de profesyonel inceleme gerektirir. Ön analiz size genel bir çerçeve verebilir ama imza öncesi avukat değerlendirmesinin yerini tutmaz. Ceza hukuku konuları (soruşturma, iddianame, savunma) ise hiçbir şekilde yapay zeka ile yürütülmemelidir.",
          "Pratik sınır şudur: sorunuzun cevabı doğrudan bir hukuki sonuç doğuracak eylem gerektiriyorsa avukat devreye girmelidir. Sadece 'bu madde ne anlama geliyor?' veya 'nelere dikkat etmeliyim?' aşamasındaysanız ön analiz iyi bir başlangıç noktasıdır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Clause'u kullanmak ücretli mi?",
        answer:
          "Ücretsiz kullanılabilen bir ön analiz akışı vardır. Kullanım koşulları ve varsa ücretli seçenekler zaman içinde değişebilir; güncel bilgi için ürün ve fiyatlandırma sayfalarını kontrol edin.",
      },
      {
        question: "Yüklediğim sözleşmeye ne oluyor?",
        answer:
          "Verilerin nasıl işlendiği, saklama süreleri ve haklarınız /gizlilik ve /guvenlik sayfalarında açıklanır. Hassas belgeleri yüklemeden önce bu sayfaları okumanızı öneririz.",
      },
      {
        question: "Clause avukat yerine geçer mi?",
        answer:
          "Hayır. Clause ön bilgilendirme yapar; hukuki tavsiye vermez, hukuki temsil veya dava takibi yürütmez. Somut durumunuz için avukata danışın.",
      },
      {
        question: "Hangi sözleşme türlerinde kullanılabilir?",
        answer:
          "Kira, iş, tüketici, freelance ve genel ticari sözleşmeler gibi yaygın metinlerde ön analiz için kullanılabilir. Teknik veya sektöre özgü sözleşmelerde uzman görüşü gerekir.",
      },
      {
        question: "Yapay zeka yanılabilir mi?",
        answer:
          "Evet. Yapay zeka çıktıları eksik veya hatalı olabilir; bu nedenle kritik kararlar öncesinde avukat görüşü alınmalıdır. Clause genel bilgilendirme amaçlıdır, kesin hukuki görüş değildir.",
      },
    ],
    ctaHref: "/#dene",
  }),

  blog({
    slug: "kira-artisi-2026-hesaplama-rehberi-blog",
    h1: "Kira artışı 2026 hesaplama rehberi — adım adım yöntem",
    metaTitle: "Kira artışı 2026 hesaplama — TÜFE ve pratik örnek",
    metaDescription:
      "Kira artış oranı nasıl hesaplanır? TÜFE on iki aylık ortalama, artış matrahı ve bildirim. Ücretsiz kira artış hesaplayıcı ve örnek senaryolar.",
    keywords: [
      "kira artışı 2026 hesaplama",
      "kira artış oranı nasıl hesaplanır",
      "TÜFE kira artışı",
      "kira zammı hesaplama",
    ],
    excerpt: "Oranı bilmek yetmez — matrah, bildirim ve sözleşme metni de belirleyici.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    intro:
      "Her yıl kiracılar ve ev sahipleri aynı soruyu soruyor: bu yılki kira artışı ne olacak ve nasıl hesaplanır? Yasal üst sınırı görmek kolay, ancak bunu kendi sözleşmenize doğru uygulamak için artış maddesini, matrahı ve bildirim usulünü birlikte değerlendirmeniz gerekir. Bu yazı genel bilgilendirme amaçlıdır; somut uyuşmazlıklar için avukata danışın.",
    sections: [
      {
        title: "Kira artışında hangi oran esas alınır?",
        paragraphs: [
          "Türk Borçlar Kanunu, konut ve çatılı işyeri kiralarında yenilenen kira dönemlerinde uygulanacak artışı, bir önceki kira yılında tüketici fiyat endeksindeki (TÜFE) on iki aylık ortalamalara göre değişim oranı ile sınırlar. Yani kural olarak esas alınan gösterge TÜFE'nin on iki aylık ortalama değişimidir; üretici fiyat endeksi (ÜFE) bu hesabın ölçütü değildir.",
          "TÜİK verileri her ay yayımlanır ve kira yılına göre hangi ayın verisinin esas alınacağı değişir. Uygulamada, yenilenen kira döneminden bir önceki aya ait on iki aylık ortalama değişim oranı kullanılır. Güncel oranı TÜİK'in resmi yayınlarından teyit etmek, ikinci el kaynaklara güvenmekten daha güvenlidir.",
          "Sözleşmede 'serbest artış' veya 'piyasa koşullarına göre belirlenir' gibi ifadeler yer alsa bile bu ifadeler belirsizdir ve uyuşmazlık doğurabilir. Konut ve çatılı işyeri kiralarında yasal üst sınırı aşan artış kayıtlarının bu sınırla sınırlı olarak uygulanması gündeme gelir; sonucu somut olay ve sözleşme metni belirler. Clause ile sözleşmenizi yükleyip artış maddesinin nasıl kaleme alındığını ön analizle görebilirsiniz.",
        ],
      },
      {
        title: "Kira artış matrahı nasıl belirlenir?",
        paragraphs: [
          "Artış matrahı, kural olarak bir önceki kira döneminde geçerli olan kira bedelidir. Ancak dikkat: bazı sözleşmelerde aidat veya ortak giderler kira içinde gösterilir, bazılarında ayrı yazılır. Sözleşmede 'kira + aidat = toplam X TL' deniyorsa artışın hangi tutara uygulanacağı tartışma konusu olur. Bu nokta sözleşmede açıkça yazmalıdır.",
          "İllüstratif örnek: kira 10.000 TL, aidat 1.000 TL ve sözleşmede aidatın kira bedelinin parçası olduğu yazıyorsa matrah 11.000 TL olarak tartışılır. Aidat kira dışındaysa matrah 10.000 TL'dir ve aidat ayrıca ödenir. Rakamlar yalnızca yöntemi göstermek içindir; kendi sözleşmenizdeki tutarlar ve ifade farklı sonuç doğurabilir.",
          "Clause sözleşmenizi yüklediğinizde matrahın belirsiz kaldığı durumlarda ilgili maddeyi işaretler ve neyin tartışmalı olduğunu özetler. Bu bir hukuki görüş değildir; ev sahibiyle konuşmadan önce hangi noktanın netleştirilmesi gerektiğini görmenizi sağlar.",
        ],
      },
      {
        title: "Bildirim usulü ve zamanlama",
        paragraphs: [
          "Uygulamada kira artışı, kiraya verenin yazılı bildirimiyle talep edilir. Bildirimin şekli ve süresi öncelikle sözleşmede yazana göre belirlenir; sözleşmede bir usul öngörülmüşse ona uyulması gerekir. Yazılı ve kayıtlı bir kanal (iadeli taahhütlü posta, noter veya KEP) kullanmak, sonradan ispat açısından daha güvenlidir.",
          "Bildirimin geç yapılması artış hakkını kendiliğinden ortadan kaldırmaz; geçmiş döneme ilişkin farkın talep edilip edilemeyeceği somut olaya, sözleşmeye ve tarafların davranışlarına göre değerlendirilir. Bu nedenle 'geç bildirim yapıldı, artış geçersizdir' gibi kesin bir sonuç çıkarmak doğru değildir; tartışmalı durumlarda avukata danışın.",
          "Clause'un kira artışı hesaplayıcısı, girdiğiniz tutar ve orana göre tahmini bir sonuç üretir. Sonuç bilgilendirme amaçlıdır ve resmi bir hesap belgesi değildir; tarafların anlaşamaması hâlinde belirleyici olan mevzuat ve mahkeme değerlendirmesidir.",
        ],
      },
      {
        title: "Örnek hesaplama senaryosu (illüstratif)",
        paragraphs: [
          "Senaryo: kira 8.000 TL ve yenilenen dönemde uygulanacak yasal üst sınırın %45 olduğunu varsayalım. Bu varsayımla hesaplama şöyledir: 8.000 × 1,45 = 11.600 TL. Buradaki %45 tamamen örnek amaçlıdır; gerçek oran için TÜİK'in ilgili döneme ait TÜFE on iki aylık ortalama değişim verisine bakılmalıdır.",
          "Ev sahibi bu örnekte 12.500 TL talep ederse, talep edilen tutarın yasal üst sınırın üzerinde kaldığı yönünde bir itiraz gündeme gelebilir. Bu durumda yazılı itiraz yapmak ve hesabınızı göstermek makul bir ilk adımdır. Ancak tarafların anlaşamaması hâlinde sonucu mahkeme belirler; peşinen kesin bir sonuç öngörmek doğru olmaz.",
          "Hesaplayıcıya başlangıç kira tutarını ve oranı girdiğinizde tahmini yeni kira görüntülenir. Bu çıktı bir ön bilgidir; yazılı itirazınızda hangi ay ve hangi endeks verisine dayandığınızı açıkça belirtmeniz daha güçlü bir başlangıç sağlar.",
        ],
      },
      {
        title: "Sözleşmede farklı oran yazıyorsa ne olur?",
        paragraphs: [
          "Bazı sözleşmelerde 'her yıl %X artış yapılır' veya 'endeks + %5' gibi ifadeler bulunur. Konut ve çatılı işyeri kiralarında yasal üst sınırı aşan artış kayıtlarının bu sınırla sınırlı uygulanması tartışılır; yani sözleşmede daha yüksek bir oran yazması tek başına o oranın uygulanacağı anlamına gelmez.",
          "Konut ve çatılı işyeri kirası dışındaki kiralamalarda (örneğin bazı arazi veya özel nitelikli kiralamalarda) farklı kurallar uygulanabilir. Sözleşmenizin hangi rejime tabi olduğu, kiralananın niteliğine ve kullanım amacına göre belirlenir; bu ayrım tartışmalıysa avukat görüşü alın.",
          "Clause sözleşme metninizdeki artış maddesini ön analizden geçirir ve belirsiz ya da tartışmaya açık ifadeleri işaretler. Çıktı bir hukuki değerlendirme değildir; hangi noktaların netleştirilmesi gerektiğini görmenizi kolaylaştırır.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kira artışında hangi veri kullanılır?",
        answer:
          "Konut ve çatılı işyeri kiralarında ölçüt, TÜFE'nin on iki aylık ortalamalara göre değişim oranıdır. Güncel veriyi TÜİK'in resmi yayınlarından teyit edin.",
      },
      {
        question: "Ev sahibi yasal sınırın üzerinde artış talep ederse ne yapmalıyım?",
        answer:
          "Yazılı itiraz yapıp hesabınızı ve dayandığınız endeks verisini belirtmek makul bir ilk adımdır. Taraflar anlaşamazsa sonucu mahkeme değerlendirir; peşinen kesin sonuç öngörülemez.",
      },
      {
        question: "Aidat kira matrahına dahil mi?",
        answer:
          "Sözleşme metnine bağlıdır. Ön analiz bu belirsizliği işaretler, ancak nihai değerlendirme somut sözleşmeye ve olaya göre yapılır.",
      },
      {
        question: "Kira artışı kendiliğinden uygulanır mı?",
        answer:
          "Uygulamada kiraya veren yazılı bildirimde bulunur ve sözleşmedeki usule uyulması beklenir. Bildirimin geç yapılmasının sonucu somut olaya göre değerlendirilir.",
      },
    ],
    ctaHref: "/araclar/kira-sozlesmesi-artis-orani-hesaplama",
  }),

  blog({
    slug: "isten-cikarildim-ilk-7-gun",
    h1: "İşten çıkarıldım — ilk 7 günde yapılması gerekenler",
    metaTitle: "İşten çıkarıldım ilk 7 gün — adımlar ve haklar",
    metaDescription:
      "İşten çıkarıldınız mı? İlk hafta: yazılı fesih belgesi, kıdem-ihbar tazminatı, SGK ve İŞKUR, işe iade için arabuluculuk süreleri.",
    keywords: [
      "işten çıkarıldım ilk adımlar",
      "işten çıkarılma 7 gün",
      "fesih sonrası yapılacaklar",
      "işten atıldım ne yapmalıyım",
    ],
    excerpt: "Panik değil aksiyon — ilk hafta belge ve süre takibi için kritik.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    intro:
      "İşten çıkarma haberi çoğu zaman beklenmedik gelir. Oysa fesih sonrası ilk günler, belgeleri toplamak ve yasal süreleri kaçırmamak açısından kritiktir. Bu yazıda ilk hafta atılabilecek somut adımları, belge taleplerini ve dikkat edilmesi gereken süreleri anlatıyoruz. İçerik genel bilgilendirme amaçlıdır; somut durumunuz için iş hukuku alanında çalışan bir avukata danışın.",
    sections: [
      {
        title: "Fesih bildirimini yazılı olarak alın",
        paragraphs: [
          "Sözlü 'artık gelme' veya telefonda 'işine son verdik' ifadeleri belgelenmiş bir fesih sayılmaz. İş Kanunu, fesih bildiriminin yazılı yapılmasını ve sebebin açık ve kesin şekilde belirtilmesini öngörür. İşveren yazılı bildirim vermiyorsa, iş sözleşmenizin hangi gerekçeyle feshedildiğini yazılı olarak talep edin ve bu talebi kayıt altına alın.",
          "Yazılı fesih belgesi olmadan tazminat talepleri, işsizlik ödeneği başvurusu ve olası dava süreçleri zorlaşır. İdari ve yargısal süreçlerde bu belge istenir. Yazılı bildirim alamasanız bile talebinizi ispat edebilecek bir kayıt (e-posta, noter, KEP) bırakmanız yararınıza olur.",
          "Clause ile iş sözleşmenizi ve elinizdeki fesih belgesini yükleyip ön analiz alabilirsiniz. Ön analiz, sözleşmedeki ilgili maddeleri ve dikkat edilmesi gereken başlıkları özetler; feshin hukuka uygun olup olmadığına dair bağlayıcı bir sonuç vermez.",
        ],
      },
      {
        title: "Kıdem ve ihbar tazminatını tahmini olarak hesaplayın",
        paragraphs: [
          "Kıdem tazminatı, kanunda sayılan fesih hâllerinde ve kural olarak en az bir yıllık çalışma süresi bulunan işçilere ödenir. İhbar tazminatı ise bildirim süresine uyulmadan yapılan fesihlerde gündeme gelir. İlk iş, işe giriş tarihi, son ücret bilgileri ve ücret eklerini (ikramiye, düzenli ödemeler gibi) bir arada toplamaktır.",
          "Clause'un kıdem ve ihbar hesaplayıcıları, girdiğiniz bilgilere göre tahmini bir tutar üretir. Bu tutar bağlayıcı değildir: giydirilmiş ücretin nasıl hesaplandığı, yasal tavan uygulaması ve vergi kesintileri sonucu değiştirebilir. Kesin hesap için bordro ve sözleşme belgeleriyle birlikte uzman değerlendirmesi gerekir.",
          "Ücret alacağı, kullanılmayan yıllık izin karşılığı, prim ve fazla çalışma gibi kalemleri de listeleyin. İşveren bir ödeme protokolü öneriyorsa tüm kalemleri açıkça içeren yazılı bir metin isteyin ve imzalamadan önce içeriğini anladığınızdan emin olun; geniş kapsamlı ibra/feragat ifadeleri hak kaybına yol açabilir.",
        ],
      },
      {
        title: "İşe iade için süreleri kaçırmayın",
        paragraphs: [
          "İş güvencesi hükümlerinden yararlanabilmek için kural olarak otuz veya daha fazla işçi çalıştıran bir işyerinde en az altı aylık kıdem ve belirsiz süreli iş sözleşmesi gibi koşullar aranır. Bu koşulların somut olayda gerçekleşip gerçekleşmediği ayrıca değerlendirilmelidir.",
          "Süre bakımından kritik nokta şudur: fesih bildiriminin tebliğinden itibaren bir ay içinde arabulucuya başvurulması gerekir. Arabuluculuk faaliyeti anlaşmazlıkla sonuçlanırsa, son tutanağın düzenlendiği tarihten itibaren iki hafta içinde iş mahkemesinde dava açılması beklenir. Bu süreler hak düşürücü niteliktedir; gecikme telafisi güç sonuçlar doğurabilir.",
          "İlk günlerde bir avukatla görüşerek sürecin sizin için uygun olup olmadığını değerlendirin. Clause ön analizi, sözleşmenizdeki ilgili maddeleri ve genel çerçeveyi özetler; süre hesabı ve strateji kararı için avukat değerlendirmesi gereklidir.",
        ],
      },
      {
        title: "SGK ve işsizlik ödeneği başvurusu",
        paragraphs: [
          "İşten ayrıldıktan sonra SGK kayıtlarınızı ve işten ayrılış bildirgesinin yapılıp yapılmadığını e-Devlet üzerinden kontrol edin. Ayrılış kodu, işsizlik ödeneği hakkı bakımından önemlidir; kodun gerçeğe uymadığını düşünüyorsanız bunu yazılı olarak dile getirebilir ve gerekirse ilgili kuruma başvurabilirsiniz.",
          "İşsizlik ödeneği için aranan koşullar özetle şunlardır: hizmet akdinin ilgili mevzuatta sayılan hâllerden biriyle sona ermesi, son 120 gün hizmet akdine tabi olarak sürekli çalışmış olmak ve son üç yıl içinde belirli bir gün sayısı kadar işsizlik sigortası primi ödemiş olmak. Koşulların somut durumunuzda sağlanıp sağlanmadığını İŞKUR üzerinden teyit edin.",
          "Başvurunun, iş sözleşmesinin sona ermesinden itibaren otuz gün içinde İŞKUR'a yapılması beklenir. Mazeretsiz gecikmelerde geçen sürenin ödenek süresinden düşülmesi gündeme gelebilir; bu nedenle erken başvurmak önemlidir. Ödenek tutarı ve süresi prim gün sayısına ve kazanca göre değişir.",
        ],
      },
      {
        title: "İş sözleşmesini ve yan hakları gözden geçirin",
        paragraphs: [
          "İş sözleşmenizde veya varsa toplu iş sözleşmesinde ikramiye, prim, yol-yemek yardımı, fazla çalışma ücreti ve yıllık izin gibi başlıklar nasıl düzenlenmiş? Fesih sonrası bu kalemlerin de hesaba katılması gerekir. İşveren yalnızca kıdem ve ihbar üzerinden bir teklif sunuyorsa diğer kalemleri ayrıca değerlendirin.",
          "Örneğin düzenli olarak ödenen bir ikramiye varsa ve yıl ortasında ayrıldıysanız, orantılı ödeme talebi gündeme gelebilir; bunun mümkün olup olmadığı sözleşme ve işyeri uygulamasına bağlıdır. Kullanılmayan yıllık izin sürelerinin sözleşmenin sona ermesi hâlinde ücrete dönüşmesi de mevzuatta düzenlenmiştir.",
          "Clause iş sözleşmenizi ön analizden geçirir ve yan haklara ilişkin maddeleri özetler. Bu özet, işverenle görüşmeye hazırlanırken hangi başlıkları sormanız gerektiğini görmenizi sağlar; tutar ve hak kesinliği için uzman değerlendirmesi gerekir.",
        ],
      },
    ],
    faqs: [
      {
        question: "İşe iade için hangi süreler geçerli?",
        answer:
          "Kural olarak fesih bildiriminin tebliğinden itibaren bir ay içinde arabulucuya başvurulur; anlaşmazlıkla sonuçlanırsa son tutanaktan itibaren iki hafta içinde dava açılır. Somut durumunuz için avukata danışın.",
      },
      {
        question: "Sözlü fesih geçerli mi?",
        answer:
          "İş Kanunu fesih bildiriminin yazılı yapılmasını ve sebebin açıkça belirtilmesini öngörür. Sözlü fesih ispat sorunları yaratır; yazılı bildirim talep edin.",
      },
      {
        question: "İşçilik alacakları için doğrudan dava açılabilir mi?",
        answer:
          "İşçi-işveren uyuşmazlıklarının büyük bölümünde dava açmadan önce arabulucuya başvurmak dava şartıdır. Bu nedenle süreç genellikle arabuluculukla başlar.",
      },
      {
        question: "İşsizlik ödeneği başvuru süresi nedir?",
        answer:
          "Kural olarak iş sözleşmesinin sona ermesinden itibaren otuz gün içinde İŞKUR'a başvurulur. Mazeretsiz gecikmelerde geçen süre ödenek süresinden düşülebilir.",
      },
      {
        question: "Clause analizi avukat yerine geçer mi?",
        answer:
          "Hayır. Clause ön bilgilendirme sağlar; hukuki tavsiye vermez. Dava, arabuluculuk ve icra süreçleri için avukatla çalışın.",
      },
    ],
    ctaHref: "/araclar/kidem-tazminati-hesaplama",
  }),

  blog({
    slug: "depozito-iadesi-yazili-ihtar-ornek",
    h1: "Depozito iadesi yazılı ihtar örneği — pratik adımlar",
    metaTitle: "Depozito iadesi yazılı ihtar — örnek metin ve süreç",
    metaDescription:
      "Depozito iade edilmedi mi? Yazılı talep nasıl hazırlanır, hangi bilgiler olmalı, hangi kanal kullanılır? Örnek metin ve takip adımları.",
    keywords: [
      "depozito iadesi yazılı ihtar",
      "depozito ihtar örneği",
      "depozito ödenmezse ne yapılır",
      "kira depozito ihtarı",
    ],
    excerpt: "Sözlü talep yetmez — yazılı bildirim ve belge, sonraki adımların temeli.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    intro:
      "Kiracılar tahliye sonrası depozito için aylarca bekleyebiliyor. Telefon görüşmeleri veya mesajlaşmalar çoğu zaman süreç için yeterli bir temel oluşturmaz. Yazılı bir talep göndermek hem tarih ve tutarı kayıt altına alır hem de sonraki adımlarda dayanak olur. Bu yazı genel bilgilendirme amaçlıdır; somut uyuşmazlığınız için avukata danışın.",
    sections: [
      {
        title: "Yazılı talep neden önemlidir?",
        paragraphs: [
          "Yazılı bildirim, depozito talebinizi tarih ve tutar belirterek karşı tarafa ilettiğinizi gösteren bir kayıttır. Telefon görüşmesinin içeriğini sonradan ispat etmek zordur. Noter aracılığıyla veya iadeli taahhütlü posta ile gönderilen bildirimler ise içerik ve tarih bakımından daha güçlü bir kayıt sağlar.",
          "Yazılı bildirim aynı zamanda talebinizin ciddiyetini gösterir ve çoğu zaman tarafları çözüme yaklaştırır. Yine de bildirimin tek başına ödeme yükümlülüğü doğurduğu veya sonucu garanti ettiği söylenemez; ödeme yapılmazsa hukuki yollara başvurmak gerekebilir.",
          "Kira sözleşmelerinde güvence bedeline ilişkin özel kurallar da vardır. Konut ve çatılı işyeri kiralarında güvence bedelinin bankaya yatırılması ve bankadaki tutarın ancak tarafların rızası ya da icra takibi/dava sonucuna göre çözülmesi gibi düzenlemeler bulunur. Sözleşmenizin bu kapsamda olup olmadığını ve depozitonun nasıl verildiğini kontrol edin.",
        ],
      },
      {
        title: "Bildirim metninde neler yer almalı?",
        paragraphs: [
          "Metinde şu bilgiler bulunmalıdır: sözleşme tarihi, kiralananın adresi, depozito tutarı ve ödeme şekli, tahliye tarihi, talep tarihi ve ödeme için tanınan makul süre. Ayrıca ödeme yapılmaması hâlinde yasal yollara başvurulacağını belirten bir cümle eklemek yaygındır.",
          "Örnek cümle (illüstratif): 'Kira sözleşmemiz 01.09.2023 tarihinde imzalanmış, güvence bedeli olarak 10.000 TL verilmiştir. 01.07.2026 tarihinde tahliye gerçekleşmiş, ancak bugüne kadar iade yapılmamıştır. Bu bildirimin tarafınıza ulaşmasından itibaren 10 gün içinde ilgili tutarın hesabıma ödenmesini talep ediyorum. Aksi hâlde yasal haklarımı kullanacağımı bildiririm.' Metni kendi durumunuza göre uyarlayın.",
          "Metni resmi ve ölçülü tutun; hakaret veya tehdit içeren ifadelerden kaçının. Talebinizi net tutar ve tarihe bağlamak, sonraki aşamalarda işinizi kolaylaştırır. Karmaşık veya yüksek tutarlı uyuşmazlıklarda metni bir avukatla birlikte hazırlamak daha güvenlidir.",
        ],
      },
      {
        title: "Bildirim nasıl gönderilir? Noter mi e-posta mı?",
        paragraphs: [
          "Yaygın üç yol vardır: noter aracılığıyla ihtarname, iadeli taahhütlü posta ve elektronik posta. Noter ihtarnamesi içerik ve tarih bakımından güçlü bir kayıt sağlar; buna karşılık bir ücret ödenir ve hazırlığı biraz zaman alır. Güncel noter ücretleri için doğrudan noterden bilgi alın.",
          "İadeli taahhütlü posta genellikle daha düşük maliyetlidir ve teslim kaydı oluşturur. Adi e-posta en hızlı yol olsa da içerik ve tebliğ tartışmasına açıktır. KEP (kayıtlı elektronik posta) kullanımı, mevzuatta öngörülen koşullar çerçevesinde daha güçlü bir kayıt sunar; ancak her durumda noter ihtarnamesiyle aynı sonucu doğuracağını varsaymak doğru değildir.",
          "Pratik bir yaklaşım: önce yazılı ve kayıtlı bir kanaldan talebinizi iletin, makul bir süre tanıyın. Yanıt gelmezse noter ihtarnamesi veya doğrudan hukuki yollar gündeme gelir. Hangi kanalın sizin durumunuzda uygun olduğunu belirlerken tutar ve tarafların tutumunu birlikte değerlendirin.",
        ],
      },
      {
        title: "Bildirim sonrası ne yapmalısınız?",
        paragraphs: [
          "Tanıdığınız süre dolduğunda ödeme yapılmamışsa icra takibi veya dava yolu gündeme gelir. İlamsız icra takibi avukat olmadan da başlatılabilir; ancak borçlunun süresi içinde itiraz etmesi hâlinde takip durur ve itirazın iptali/kaldırılması için ayrı bir süreç gerekir. Bu nedenle yol seçimi öncesinde hukuki destek almak yararlıdır.",
          "Takip masrafları ve harçlar başlangıçta alacaklı tarafından karşılanır; takip lehe sonuçlanırsa bu giderlerin borçluya yükletilmesi talep edilebilir. Yani 'hiç masraf ödemezsiniz' demek doğru olmaz; sürecin sonucuna göre giderlerin akıbeti değişir.",
          "Uyuşmazlık karmaşıklaşıyorsa (örneğin karşı taraf hasar iddiasında bulunuyorsa) avukat desteği almanız önerilir. Clause ön analizi sözleşmenizdeki depozito, tahliye ve fesih maddelerini özetler; süreç kararı için bağlayıcı bir yönlendirme sunmaz.",
        ],
      },
      {
        title: "Kesinti iddialarına nasıl yaklaşılır?",
        paragraphs: [
          "Kiraya veren boya, tesisat veya temizlik gibi başlıklar üzerinden kesinti talep edebilir. Bu tür taleplerin kabul edilebilmesi için zararın ve tutarın somut şekilde ortaya konması beklenir. Olağan kullanımdan kaynaklanan yıpranmanın kiracıya yüklenmesi ise kural olarak tartışmalıdır.",
          "Kesinti listesi geliyorsa her kalem için belge (fatura, fotoğraf, keşif/tespit kaydı) talep edin. Belgesiz iddiaların ispatı güçtür; ancak belge yokluğu tek başına iddianın reddedileceği anlamına gelmez, değerlendirmeyi somut olayda hâkim yapar. Tahliye sırasında tutanak tutmak ve fotoğraf çekmek bu nedenle önemlidir.",
          "Clause, sözleşmenizdeki hasar ve iade maddelerini ön analizle özetler ve hangi noktaların belgelenmesi gerektiğini görmenizi kolaylaştırır. Tutar ve sonuç değerlendirmesi için avukat görüşü gerekir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Bildirim göndermeden icra takibi başlatılabilir mi?",
        answer:
          "Her durumda ön bildirim zorunlu değildir; ancak yazılı talep hem tarih ve tutarı kayda geçirir hem de sonraki aşamalarda dayanak oluşturur.",
      },
      {
        question: "E-posta ile gönderilen talep geçerli mi?",
        answer:
          "Adi e-posta içerik ve tebliğ tartışmasına açıktır. KEP veya noter/iadeli taahhütlü posta daha güçlü bir kayıt sağlar.",
      },
      {
        question: "Depozito alacağında zamanaşımı ne kadar?",
        answer:
          "Alacağın niteliğine göre değişir; kural olarak genel zamanaşımı süreleri gündeme gelir. Süre hesabı tartışmalı olabileceğinden erken hareket edin ve avukata danışın.",
      },
      {
        question: "Kesinti için belge şart mı?",
        answer:
          "Kesinti talep eden tarafın zararı ve tutarı somutlaştırması beklenir. Belge sunulmaması iddiayı zayıflatır, ancak sonucu somut olayda mahkeme değerlendirir.",
      },
      {
        question: "İcra masraflarını kim öder?",
        answer:
          "Masraf ve harçlar başlangıçta takibi başlatan tarafça karşılanır; takip lehe sonuçlanırsa bu giderlerin borçluya yükletilmesi talep edilebilir.",
      },
    ],
    ctaHref: "/rehber/depozito-iadesi",
  }),

  blog({
    slug: "sozlesme-okumadan-imzalamayin-kontrol",
    h1: "Sözleşme okumadan imzalamayın — pratik kontrol listesi",
    metaTitle: "Sözleşme imzalamadan önce kontrol listesi — 2026",
    metaDescription:
      "Kira, iş, freelance ve e-ticaret sözleşmesi imzalamadan önce nelere bakmalısınız? Maddeler halinde kontrol listesi ve AI destekli ön analiz.",
    keywords: [
      "sözleşme okumadan imzalamayın",
      "sözleşme kontrol listesi",
      "imza öncesi kontrol",
      "sözleşme tuzakları",
    ],
    excerpt: "İmzanız sizi bağlar — birkaç dakikalık kontrol, uzun vadeli sorunları azaltır.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    intro:
      "Her gün sayfalarca sözleşme okunmadan imzalanıyor: kira kontratı, iş sözleşmesi, freelance projesi, online üyelik. Sorun çıktığında 'bilmiyordum' demek çoğu zaman sonucu değiştirmez. Bu yazıda imza öncesinde bakmanız gereken kritik başlıkları ve Clause ile ön analizin nasıl kullanılabileceğini anlatıyoruz. İçerik genel bilgilendirme amaçlıdır, hukuki tavsiye değildir.",
    sections: [
      {
        title: "Taraflar ve imza yetkisi",
        paragraphs: [
          "Sözleşmenin başında taraflar açıkça yazmalıdır. Kira sözleşmesinde kiraya verenin kimlik bilgileri, iş sözleşmesinde işveren şirketin unvanı ve imzaya yetkili kişi tam olmalıdır. Karşı taraf bir şirketse imza yetkisinin kontrolü (imza sirküleri, ticaret sicil kayıtları) sonradan çıkacak tartışmaları azaltır.",
          "Bazı sözleşmelerde asıl taraf yerine vekil veya aracı imza atar. Bu durumda vekâletnamenin varlığı ve kapsamının bu işlemi içerip içermediği önemlidir. Yetkisiz temsil iddiaları, sözleşmenin akıbeti bakımından ciddi tartışmalar doğurabilir.",
          "Clause sözleşme metnini ön analizden geçirir ve taraf bilgilerinde eksik veya belirsiz görünen alanları işaretler. Bu bir yetki denetimi değildir; resmi kayıtlardan doğrulama yine sizin veya avukatınızın yapması gereken bir adımdır.",
        ],
      },
      {
        title: "Ücret ve ödeme koşulları",
        paragraphs: [
          "Sözleşmede bedel, para birimi, ödeme zamanı ve gecikme hâlinde uygulanacak kurallar açık olmalıdır. Kira sözleşmesinde kira, aidat, artış esası ve ödeme günü; iş sözleşmesinde ücret ve ekleri; freelance sözleşmesinde proje bedeli, avans ve teslim-ödeme takvimi net yazılmalıdır.",
          "Ödeme zamanı yazılmamışsa veya 'anlaşılan tarihte' gibi belirsiz bir ifade varsa bu, ileride uyuşmazlık kaynağı olur. 'Her ayın 5'i' veya 'teslimden itibaren 15 gün içinde' gibi somut ifadeler tercih edilmelidir.",
          "Clause ödeme maddesindeki belirsiz ifadeleri işaretler. Yüksek gecikme faizi oranlarının geçerliliği ise somut olaya ve ilgili mevzuata göre değerlendirilir; aşırı oranların uyarlanması veya indirilmesi tartışılabilir, ancak sonucu peşinen söylemek mümkün değildir.",
        ],
      },
      {
        title: "Fesih ve cayma koşulları",
        paragraphs: [
          "Her sözleşmede sona erme koşulları açık olmalıdır. Kira sözleşmesinde fesih hâlleri ve bildirim süreleri, iş sözleşmesinde bildirim süreleri ve haklı fesih sebepleri, freelance sözleşmesinde proje iptali hâlinde ödeme esasları yazılmalıdır.",
          "Bazı sözleşmelerde cayma imkânı çok dar tutulur veya yüksek cezai şart öngörülür. Aşırı cezai şartların indirilmesi mevzuatta tartışılan bir konudur; ancak indirimin yapılıp yapılmayacağını mahkeme değerlendirir. Bu nedenle imzadan önce oranı makul bir seviyeye çekmek en pratik yoldur.",
          "Mesafeli satış gibi tüketici işlemlerinde kural olarak on dört günlük cayma hakkı öngörülür; ancak mevzuatta belirtilen istisnalar vardır. Sözleşmede cayma hakkını tamamen kaldıran ifadeler tüketici mevzuatı bakımından tartışmalıdır; somut değerlendirme sözleşmenin türüne ve ürüne göre yapılır.",
        ],
      },
      {
        title: "Sorumluluk ve tazminat maddeleri",
        paragraphs: [
          "Sorumluluk sınırlaması maddeleri çoğu zaman en az okunan ama en çok etki doğuran kısımlardır. 'Hizmet sağlayıcı hiçbir zarardan sorumlu değildir' veya 'sorumluluk sözleşme bedeliyle sınırlıdır' gibi ifadeler, zarar hâlinde talep imkânınızı daraltabilir. Bu tür kayıtların geçerliliği ise her olayda ayrıca değerlendirilir.",
          "Kira sözleşmelerinde 'kiracı tüm hasarlardan sorumludur' gibi geniş ifadeler yer alabilir. Olağan kullanımdan kaynaklanan yıpranma ile kiracıya yüklenemeyecek dış etkenlerden doğan zararlar bakımından bu tür geniş kayıtlar tartışmaya açıktır.",
          "İş sözleşmelerinde 'çalışan tüm zararları tazmin eder' türünden kayıtlar da dikkat gerektirir. Sorumluluğun kapsamı, kusur derecesi ve işin niteliği gibi ölçütlerle birlikte değerlendirilir. Clause bu tür geniş kayıtları işaretler; nihai değerlendirme için avukata danışın.",
        ],
      },
      {
        title: "Gizlilik, telif ve rekabet yasağı",
        paragraphs: [
          "Freelance ve iş sözleşmelerinde gizlilik, telif devri ve rekabet yasağı maddeleri yaygındır ve sizi uzun süre bağlayabilir. 'Üretilen tüm içerik şirkete aittir' gibi bir kayıt portföy kullanımınızı etkileyebilir; rekabet yasağı ise sonraki iş seçeneklerinizi sınırlayabilir.",
          "Rekabet yasağının geçerliliği; yer, süre ve işin türü bakımından sınırlandırılmış olmasına bağlıdır ve Türk Borçlar Kanunu bu yasağın süresi bakımından üst sınır öngörür (özel durumlar hariç iki yıl). Aşırı geniş yasakların sınırlandırılması gündeme gelebilir; yine de imzadan önce kapsamı daraltmak en güvenli yoldur.",
          "Telif maddesi de açık olmalıdır: hangi hakların devredildiği, kullanım süresi ve referans/portföy hakkı yazılmalıdır. Belirsiz ifadeler sonradan tartışma yaratır. Clause bu maddeleri ön analizle özetler ve belirsiz kalan noktaları gösterir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözleşmeyi imzaladıktan sonra vazgeçebilir miyim?",
        answer:
          "Kural olarak imzaladığınız sözleşme sizi bağlar. Bazı tüketici işlemlerinde cayma hakkı öngörülmüştür. Diğer hâllerde karşı tarafın kabulü veya yargı kararı gerekebilir.",
      },
      {
        question: "Clause analizi hukuki görüş sayılır mı?",
        answer:
          "Hayır. Clause ön bilgilendirme yapar, hukuki tavsiye vermez. Önemli sözleşmeler için avukat değerlendirmesi alın.",
      },
      {
        question: "İmzadan önce değişiklik talep edebilir miyim?",
        answer:
          "Evet. Taslağı inceleyip değişiklik önerebilirsiniz; taraflar mutabık kalırsa revize metin imzalanır.",
      },
      {
        question: "Elektronik imza ile imzalanan sözleşme geçerli mi?",
        answer:
          "Nitelikli elektronik imza, mevzuatta öngörülen durumlarda el yazısıyla atılan imzayla aynı hukuki sonucu doğurur. Resmi şekle tabi işlemler ve basit onay yöntemleri bakımından farklı değerlendirmeler gerekir.",
      },
    ],
    ctaHref: "/#dene",
  }),

  blog({
    slug: "kidem-mi-ihbar-mi-fark-nedir",
    h1: "Kıdem mi ihbar mı fark nedir? — iş hukuku karşılaştırma",
    metaTitle: "Kıdem tazminatı ile ihbar tazminatı farkı — 2026",
    metaDescription:
      "Kıdem ve ihbar tazminatı arasındaki fark nedir? Koşullar, hesaplama mantığı ve dikkat edilecek noktalar. Tahmini hesaplama araçları.",
    keywords: [
      "kıdem tazminatı ihbar tazminatı farkı",
      "kıdem mi ihbar mı",
      "ihbar kıdem farkı",
      "tazminat karşılaştırma",
    ],
    excerpt: "İkisi de ödeme ama koşulları ve hesap mantığı farklı — karıştırmayın.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    intro:
      "İşten ayrılan veya çıkarılan çalışanlar 'kıdem mi ihbar mı alacağım?' diye sorar. Bazı durumlarda ikisi birlikte gündeme gelir, bazı durumlarda hiçbiri. Bu yazıda iki tazminatın koşullarını ve hesap mantığını karşılaştırıyoruz. İçerik genel bilgilendirme amaçlıdır; kesin hesap ve değerlendirme için avukata veya uzmana danışın.",
    sections: [
      {
        title: "Kıdem tazminatı nedir ve ne zaman gündeme gelir?",
        paragraphs: [
          "Kıdem tazminatı, mevzuatta sayılan fesih hâllerinde ve kural olarak aynı işverene bağlı en az bir yıllık çalışma süresi bulunan işçiler bakımından gündeme gelir. İşçinin haklı bir neden olmaksızın kendi isteğiyle ayrılması veya işverenin ahlak ve iyi niyet kurallarına aykırılık nedeniyle haklı feshi gibi hâllerde kıdem tazminatı talebi tartışmalı hâle gelir.",
          "Kıdem tazminatının gündeme geldiği tipik hâller: işverenin geçerli veya haklı bir nedene dayanmayan feshi, işçinin mevzuattaki haklı nedenlerle feshi, emeklilik, ölüm ve kanunda öngörülen özel hâller. Bu koşulların somut olayda gerçekleşip gerçekleşmediği ayrıca değerlendirilmelidir.",
          "Hesap mantığı özetle şudur: her tam çalışma yılı için otuz günlük giydirilmiş brüt ücret tutarında ödeme esas alınır, artan süreler için orantılı hesap yapılır. Ayrıca her bir hizmet yılı için ödenecek tutar bakımından yasal bir tavan uygulanır. Bu tavan yıl içinde güncellenir; güncel tutarı resmi kaynaklardan teyit edin.",
        ],
      },
      {
        title: "İhbar tazminatı nedir ve ne zaman gündeme gelir?",
        paragraphs: [
          "İhbar tazminatı, belirsiz süreli iş sözleşmesinin bildirim sürelerine uyulmadan feshedilmesi hâlinde gündeme gelir. Yani işveren süre tanımadan fesih yaptığında, bildirim süresine karşılık gelen ücret tutarında bir ödeme tartışılır.",
          "Bildirim süreleri kıdeme göre değişir: altı aydan az çalışmalarda iki hafta, altı ay ile bir buçuk yıl arasında dört hafta, bir buçuk yıl ile üç yıl arasında altı hafta, üç yıldan fazla çalışmalarda sekiz hafta. Sözleşmeyle bu sürelerin artırılması mümkündür.",
          "İhbar tazminatı yalnızca işveren bakımından söz konusu değildir: işçi de bildirim süresine uymadan ayrılırsa, işveren tarafından ihbar tazminatı talep edilebilir. Uygulamada bu talep her olayda ileri sürülmez, ancak hukuken mümkündür.",
        ],
      },
      {
        title: "Kıdem ve ihbar birlikte alınabilir mi?",
        paragraphs: [
          "Koşulları ayrı ayrı gerçekleşiyorsa iki tazminat birlikte gündeme gelebilir. Örneğin işveren, geçerli bir nedene dayanmaksızın ve bildirim süresi tanımadan fesih yaparsa hem kıdem hem ihbar tazminatı tartışılır. Bunlar farklı hukuki temellere dayandığı için ayrı ayrı hesaplanır.",
          "Buna karşılık işçi haklı bir neden olmadan kendi isteğiyle ayrılırsa kıdem tazminatı talebi kural olarak gündeme gelmez; hatta bildirim süresine uymadıysa kendisinden ihbar tazminatı talep edilebilir. İşveren bildirim süresine uyarak fesih yaparsa ihbar tazminatı doğmaz, kıdem tazminatı koşulları ayrıca değerlendirilir.",
          "Clause'un hesaplayıcıları iki tazminatı ayrı ayrı, girdiğiniz verilere göre tahmini olarak hesaplar. Sonuç bağlayıcı değildir; feshin niteliği, ücretin giydirilmiş hâli ve tavan uygulaması sonucu değiştirebilir.",
        ],
      },
      {
        title: "Hesaplama örnekleri (illüstratif)",
        paragraphs: [
          "Örnek 1: İşçi 3 yıl 7 ay çalışmış olsun ve giydirilmiş brüt aylık ücreti 30.000 TL kabul edilsin. Kıdem hesabında her tam yıl için otuz günlük ücret, artan aylar için orantılı tutar dikkate alınır: 3 × 30.000 + (7/12) × 30.000 ≈ 107.500 TL. Yasal tavan burada toplam tutara değil, her bir hizmet yılı için ödenecek tutara uygulanır; bu nedenle tavan, yıllık esas alınan ücretin tavanın üzerinde olduğu hâllerde devreye girer.",
          "Aynı örnekte bildirim süresi tanınmamışsa ihbar tazminatı altı haftalık ücrete karşılık gelir. Haftalık ücret, aylık brüt ücretten yaklaşık olarak türetilir (ör. günlük ücret üzerinden) ve bu örnekte kabaca 40.000 TL civarında bir tutar ortaya çıkar. Rakamlar yalnızca yöntemi göstermek içindir.",
          "Örnek 2: İşçi 11 ay çalışmış ve giydirilmiş brüt ücreti 20.000 TL olsun. Bir yıllık kıdem koşulu sağlanmadığından kıdem tazminatı gündeme gelmez. Bildirim süresine uyulmadıysa dört haftalık ücrete karşılık gelen ihbar tazminatı tartışılır. Her iki örnekte de vergi ve kesintiler sonucu değiştirir; net tutar için bordro esaslı hesap gerekir.",
        ],
      },
      {
        title: "Ödeme yapılmazsa ne yapılabilir?",
        paragraphs: [
          "İşveren tazminatı ödemez veya eksik öderse, işçilik alacakları için hukuki yollar gündeme gelir. Önemli bir usul kuralı şudur: işçi-işveren uyuşmazlıklarında, kanunda öngörülen hâllerde dava açmadan önce arabulucuya başvurmak dava şartıdır. Bu nedenle süreç genellikle arabuluculukla başlar.",
          "Zamanaşımı bakımından kıdem ve ihbar tazminatı gibi kalemler için mevzuatta belirli süreler öngörülmüştür; ücret alacakları bakımından farklı süreler gündeme gelebilir. Süre hesabı fesih tarihine ve alacağın niteliğine göre değiştiğinden, gecikmeden hukuki destek alın.",
          "Clause ön analizi sözleşmenizdeki ilgili maddeleri ve genel çerçeveyi özetler. Süreç seçimi, arabuluculuk başvurusu ve dava stratejisi için iş hukuku alanında çalışan bir avukatla ilerlemek gerekir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kıdem tazminatı vergilendirilir mi?",
        answer:
          "Kıdem tazminatı, mevzuatta öngörülen sınırlar çerçevesinde gelir vergisinden istisna tutulur; damga vergisi kesintisi gündeme gelir. İhbar tazminatı ise gelir vergisine tabidir.",
      },
      {
        question: "Bildirim süreleri ne kadar?",
        answer:
          "Kıdeme göre: altı aydan az iki hafta, altı ay–bir buçuk yıl dört hafta, bir buçuk–üç yıl altı hafta, üç yıldan fazla sekiz hafta. Sözleşmeyle artırılabilir.",
      },
      {
        question: "Kıdem tazminatı tavanı nedir?",
        answer:
          "Her bir hizmet yılı için ödenecek tutara uygulanan yasal bir üst sınırdır ve yıl içinde güncellenir. Güncel tutarı resmi kaynaklardan teyit edin.",
      },
      {
        question: "Tazminat taksitle ödenebilir mi?",
        answer:
          "Kural olarak ödemenin fesihle birlikte yapılması beklenir. Taraflar taksitlendirme konusunda anlaşabilir; bu tür protokolleri imzalamadan önce içeriğini dikkatle inceleyin.",
      },
    ],
    ctaHref: "/araclar/kidem-tazminati-hesaplama",
  }),

  blog({
    slug: "tuketici-sikayet-2026-adim-adim",
    h1: "Tüketici şikayet 2026 adım adım — resmi ve gayriresmi kanallar",
    metaTitle: "Tüketici şikayet başvurusu — 2026 pratik adımlar",
    metaDescription:
      "Online alışveriş, telekom ve banka şikayeti nasıl yapılır? Şikayet platformları, Tüketici Hakem Heyeti, ALO 175 ve dava süreci.",
    keywords: [
      "tüketici şikayet 2026",
      "tüketici hakem heyeti başvuru",
      "şikayetvar nasıl kullanılır",
      "ALO 175 şikayet",
    ],
    excerpt: "Şikayet platformları tek başına yetmez — resmi süreç ve belgeler şart.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    intro:
      "Tüketiciler ayıplı ürün, eksik hizmet veya cayma hakkı sorunlarıyla karşılaşınca genellikle önce şikayet platformlarına yazıyor. Ancak bu platformlar resmi başvuru mercii değildir. Tüketici Hakem Heyeti ve tüketici mahkemesi süreçleri ayrıdır. Bu yazıda kanalların farkını, belge hazırlığını ve adımları anlatıyoruz. İçerik genel bilgilendirme amaçlıdır.",
    sections: [
      {
        title: "Şikayet platformları ve sosyal medya — ilk adım",
        paragraphs: [
          "Şikayet platformları, tüketicilerin deneyimlerini paylaştığı ve şirketlerin çoğu zaman yanıt verdiği alanlardır. Marka itibarı nedeniyle birçok şirket bu kanalları takip eder ve sorun bu aşamada çözülebilir. Hızlı bir çözüm arıyorsanız ilk deneme olarak makuldür.",
          "Ancak bu platformlar resmi başvuru yeri değildir; oraya yazmanız yasal başvuru sürelerini işletmez veya haklarınızı kullanmış saymanızı sağlamaz. Sosyal medya paylaşımları da aynı şekilde informal iletişimdir. Ayrıca paylaşımlarınızın içeriğinde ölçülü olmak, ayrı hukuki tartışmalara girmemek açısından önemlidir.",
          "Pratik yaklaşım: önce satıcı veya sağlayıcıya yazılı olarak başvurun ve makul bir süre tanıyın. Çözüm gelmezse resmi kanallara (Tüketici Hakem Heyeti, ilgili kurum başvuruları) geçin. Yazılı başvurunuzun kaydını saklayın; sonraki aşamalarda işinize yarar.",
        ],
      },
      {
        title: "Tüketici Hakem Heyeti (THH) başvurusu",
        paragraphs: [
          "Tüketici Hakem Heyetleri, tüketici uyuşmazlıklarının çözümü için öngörülmüş, Ticaret Bakanlığı bünyesindeki yapılardır. Başvuru için avukat zorunluluğu yoktur ve başvuru e-Devlet üzerinden ya da ilgili il/ilçe hakem heyetine yapılabilir.",
          "THH'nin görev alanı parasal sınırlara bağlıdır ve bu sınırlar her yıl yeniden değerleme oranına göre güncellenir. Bu nedenle burada sabit bir rakam vermek yanıltıcı olur; başvurmadan önce güncel sınırları Ticaret Bakanlığı'nın resmi duyurularından kontrol edin. Sınırın üzerindeki uyuşmazlıklar tüketici mahkemesinin görev alanına girer.",
          "Başvuruya fatura veya ödeme belgesi, sözleşme, varsa cayma bildirimi ve yazışmalar eklenir. Karar süresi başvuru yoğunluğuna göre değişebilir. Karara karşı, tebliğden itibaren öngörülen süre içinde tüketici mahkemesine itiraz yolu bulunur. Süreler için güncel mevzuatı teyit edin.",
        ],
      },
      {
        title: "ALO 175 — Tüketici Danışma Hattı",
        paragraphs: [
          "ALO 175, Ticaret Bakanlığı'nın tüketicilere yönelik danışma hattıdır. Şikayetinizi anlatabilir, hangi kanala başvurmanız gerektiği hakkında bilgi alabilir ve süreç hakkında yönlendirilebilirsiniz.",
          "Hattın işlevi ağırlıklı olarak bilgilendirme ve yönlendirmedir; tek başına uyuşmazlığı çözen bir karar mercii değildir. Resmi sonuç almak için Tüketici Hakem Heyeti veya mahkeme yoluna başvurmanız gerekir. Görüşme sonrasında size iletilen yönlendirmeyi not almanız yararlı olur.",
          "Clause'un tüketici içerikleri, kanallar arasındaki farkı ve tipik adımları genel olarak açıklar. Somut uyuşmazlığınızda hangi yolun uygun olduğu, tutar ve uyuşmazlığın niteliğine göre değişir.",
        ],
      },
      {
        title: "Belge toplama ve ispat",
        paragraphs: [
          "Belge toplamak süreci hızlandırır. Tipik olarak gerekli olanlar: satış belgesi veya fatura, sözleşme (varsa), cayma bildiriminiz, ürün fotoğrafları ve yazışmalar. Online alışverişlerde ödeme dekontu, sipariş onayı ve kargo kayıtları da önem taşır.",
          "Ayıplı mal ve hizmetlerde ispat konusunda mevzuatta tüketici lehine bazı karineler öngörülmüştür; örneğin teslimden itibaren belirli bir süre içinde ortaya çıkan ayıpların teslim anında var olduğu yönünde bir kabul gündeme gelebilir. Bu karinenin somut olayda uygulanıp uygulanmayacağı ayrıca değerlendirilir.",
          "Belgelerinizi tarih sırasına göre düzenleyin ve her belgenin neyi gösterdiğini kısaca not edin. Örneğin cayma bildirimi tarihi süreye ilişkin tartışmada, fatura ise tutar ve taraf tespitinde işe yarar. Eksik belgeleri satıcıdan veya ilgili kurumdan talep edebilirsiniz.",
        ],
      },
      {
        title: "Mahkeme süreci ne zaman gündeme gelir?",
        paragraphs: [
          "Tüketici mahkemesi, hakem heyeti kararına itiraz hâlinde veya parasal sınırın üzerindeki uyuşmazlıklarda devreye girer. Ayrıca tüketici uyuşmazlıklarının bir kısmında dava açmadan önce arabulucuya başvurmak dava şartı olarak öngörülmüştür; bu nedenle süreç arabuluculukla başlayabilir.",
          "Yargılama giderleri, harçlar ve gider avansı bakımından mevzuatta çeşitli düzenlemeler ve muafiyetler bulunur; bunlar zaman içinde değişebilir. 'Hiçbir masraf ödenmez' gibi genel bir kabul doğru değildir. Başvurmadan önce güncel gider ve harç rejimini kontrol edin.",
          "Sürecin uzunluğu dosyanın niteliğine göre değişir. Avukatla çalışmak zorunlu olmasa da, karmaşık veya yüksek tutarlı uyuşmazlıklarda önerilir. Clause içerikleri süreci genel hatlarıyla anlatır; strateji ve süre kararları için hukuki destek alın.",
        ],
      },
    ],
    faqs: [
      {
        question: "Şikayet platformuna yazmak resmi başvuru mudur?",
        answer:
          "Hayır. Bu platformlar özel girişimlerdir. Resmi başvuru Tüketici Hakem Heyeti veya mahkeme yoluyla yapılır.",
      },
      {
        question: "Tüketici Hakem Heyeti kararı bağlayıcı mı?",
        answer:
          "Karara karşı öngörülen süre içinde tüketici mahkemesine itiraz edilebilir. İtiraz edilmez ve karar kesinleşirse icra yoluyla takip gündeme gelebilir.",
      },
      {
        question: "THH başvurusu ücretli mi?",
        answer:
          "Başvuru için avukat zorunluluğu yoktur ve süreç tüketici açısından basit tutulmuştur. Güncel usul ve varsa gider kalemleri için Ticaret Bakanlığı duyurularını kontrol edin.",
      },
      {
        question: "ALO 175 ne işe yarar?",
        answer:
          "Danışma ve yönlendirme sağlar. Uyuşmazlığı doğrudan karara bağlamaz; resmi başvuruyu ayrıca yapmanız gerekir.",
      },
      {
        question: "Cayma hakkı her üründe var mı?",
        answer:
          "Hayır. Mevzuatta kişiye özel üretilen ürünler, hijyen gerekçesiyle iadesi uygun olmayan ürünler ve çabuk bozulan mallar gibi istisnalar öngörülmüştür.",
      },
    ],
    ctaHref: "/rehber/tuketici-haklari",
  }),

  blog({
    slug: "neden-clause-ucretsiz-sozlesme-analizi",
    h1: "Neden Clause — sözleşme ön analizi ve LegalTech farkı",
    metaTitle: "Clause sözleşme ön analizi — LegalTech yaklaşımı",
    metaDescription:
      "Clause neden farklı? Sözleşme metnine odaklı yapay zeka, Türk hukuku bağlamı ve şeffaf sınırlar. Ücretsiz deneyin, farkı görün.",
    keywords: [
      "neden clause",
      "clause ücretsiz sözleşme analizi",
      "clause legaltech fark",
      "clause avantaj",
    ],
    excerpt: "Genel chatbot değil — sözleşme metnine odaklanır, sınırlarını açıkça söyler.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    intro:
      "Türkiye'de birçok yapay zeka sohbet botu hukuki sorulara cevap veriyor. Clause'un farkı, genel bir sohbet aracı değil sözleşme metnine odaklı bir ön analiz aracı olmasıdır. Metninizi tarar, dikkat edilmesi gereken noktaları özetler ve nerede profesyonel görüş gerektiğini söyler. Bu yazıda yaklaşımı, sınırları ve tipik kullanım senaryolarını anlatıyoruz. Clause hukuki tavsiye vermez.",
    sections: [
      {
        title: "Sözleşme odaklı yaklaşım — genel chatbot değil",
        paragraphs: [
          "Genel amaçlı botlar her konuda cevap üretir, ancak hukuk alanında kaynak göstermeden madde numarası uydurabilir, güncelliğini yitirmiş bilgiyi tekrarlayabilir veya farklı ülkelerin kurallarını karıştırabilir. Clause ise cevabını soyut bir bilgi havuzundan değil, sizin yüklediğiniz metinden üretmeye çalışır.",
          "Bu nedenle Clause 'kira artışı ne olmalı?' gibi soyut bir soruya genel geçer bir yanıt vermek yerine, sözleşmenizdeki ilgili maddeyi okur ve o maddenin nasıl kaleme alındığını, nerede belirsiz kaldığını özetler. Bu bir hukuki değerlendirme değil, metin üzerinden yapılan bir ön okumadır.",
          "Ön analiz çıktısı önceliklendirilmiş şekilde sunulur: hangi maddeler dikkat gerektiriyor, hangileri bilgi amaçlı. Böylece uzun bir metinde neye önce bakmanız gerektiğini görürsünüz. Yine de çıktının eksik veya hatalı olabileceğini varsayarak hareket etmelisiniz.",
        ],
      },
      {
        title: "Veri ve gizlilik konusunda şeffaflık",
        paragraphs: [
          "Genel sohbet botlarına belge yüklediğinizde verilerin nasıl işlendiğini çoğu zaman kontrol edemezsiniz. Bazı platformların koşullarında girdilerin ürün geliştirme amacıyla kullanılabileceği belirtilir. Bu, hassas iş veya ticari belgeler için önemli bir risktir.",
          "Clause'un verileri nasıl işlediği, hangi amaçlarla kullandığı, saklama süreleri ve KVKK kapsamındaki haklarınızı nasıl kullanabileceğiniz /gizlilik sayfasında açıklanır. Teknik ve organizasyonel güvenlik yaklaşımımız için ise /guvenlik sayfasına bakabilirsiniz.",
          "Bu sayfalarda yazan koşullar zaman içinde güncellenebilir. Özellikle hassas nitelikte belgeler yüklemeden önce güncel metinleri okumanızı ve gerekirse belgelerdeki kişisel verileri sadeleştirmenizi öneririz.",
        ],
      },
      {
        title: "Türk hukuku bağlamı",
        paragraphs: [
          "Türk hukuku, Anglo-Sakson hukuk sistemlerinden farklı bir yapıdadır. Türk Borçlar Kanunu, İş Kanunu ve tüketici mevzuatı emredici kurallar içerir; yani taraflar sözleşmede farklı bir şey yazsa bile bazı kurallar uygulanır. Genel botlar bu ayrımı gözden kaçırıp 'sözleşmede ne yazıyorsa odur' varsayımına düşebilir.",
          "Clause, sözleşme metnini Türk hukuku bağlamında okumaya odaklanır ve tartışmalı görünen kayıtları işaretler. Örneğin konut kiralarında artış sınırı, tüketici işlemlerinde cayma hakkı veya iş sözleşmelerinde geniş sorumluluk kayıtları bu başlıklardandır. Bu işaretlemeler bir geçersizlik tespiti değil, dikkat çağrısıdır.",
          "Bazı konularda kanun doğrudan sınır koyar: örneğin rekabet yasağının süresi bakımından Türk Borçlar Kanunu, özel durumlar dışında iki yılı aşmama kuralını öngörür. Clause bu tür somut kuralları hatırlatır; ancak somut sözleşmede sonucun ne olacağını mahkeme değerlendirir.",
        ],
      },
      {
        title: "Avukata gitmeden önce hazırlık",
        paragraphs: [
          "Clause avukatın yerine geçmez; amacı avukata gitmeden önce sizi hazırlamaktır. Ön analiz çıktısı, sözleşmede hangi başlıkların netleştirilmesi gerektiğini gösterir. Böylece görüşmede temel bilgileri anlatmak yerine doğrudan kritik sorulara odaklanabilirsiniz.",
          "Görüşme öncesi kendi notlarınızı çıkarmanız da faydalıdır: sözleşmenin imza tarihi, taraflar, tartışmalı madde numaraları, elinizdeki yazışmalar ve varsa ödeme kayıtları. Bu bilgiler avukatın durumu hızlıca kavramasını sağlar.",
          "Uyuşmazlık dava, icra veya arabuluculuk aşamasına geldiyse süreç tamamen profesyonel hukuki desteği gerektirir. Bu aşamalarda yapay zeka çıktısına dayanarak süre veya usul kararı vermeyin.",
        ],
      },
      {
        title: "Clause ne yapar, ne yapmaz?",
        paragraphs: [
          "Clause yapar: sözleşme metnini okur, öne çıkan ve belirsiz maddeleri özetler, ilgili konularda genel bilgilendirme sunar ve kira artışı, kıdem-ihbar gibi konularda tahmini hesaplama araçları sağlar. Bu araçların sonuçları yaklaşık değerlerdir.",
          "Clause yapmaz: hukuki tavsiye vermez, avukatlık hizmeti sunmaz, dava veya icra takibi yürütmez, sonuç garantisi vermez. Bir maddenin geçerli ya da geçersiz olduğunu kesin olarak tespit etmez; yalnızca tartışmalı görünen noktaları işaretler.",
          "Kullanım koşulları ve varsa ücretli seçenekler zaman içinde değişebilir; güncel bilgi için ürün ve fiyatlandırma sayfalarını kontrol edin. Sınırların açıkça belirtilmesi, aracın nasıl kullanılacağını doğru anlamanız açısından önemlidir.",
        ],
      },
    ],
    faqs: [
      {
        question: "Clause'u kullanmak ücretli mi?",
        answer:
          "Ücretsiz kullanılabilen bir ön analiz akışı vardır. Güncel kullanım koşulları ve varsa ücretli seçenekler için ürün ve fiyatlandırma sayfalarını kontrol edin.",
      },
      {
        question: "Clause avukat yerine geçer mi?",
        answer:
          "Hayır. Clause ön bilgilendirme yapar, hukuki tavsiye vermez. Dava, icra ve karmaşık durumlarda avukatla çalışın.",
      },
      {
        question: "Hangi sözleşme türleri için uygundur?",
        answer:
          "Kira, iş, tüketici, freelance ve genel ticari sözleşmeler gibi yaygın metinler için ön analiz sunar. Teknik veya sektöre özgü metinlerde uzman görüşü gerekir.",
      },
      {
        question: "Verilerim nasıl işleniyor?",
        answer:
          "Veri işleme amaçlarımız, saklama yaklaşımımız ve KVKK kapsamındaki haklarınız /gizlilik sayfasında, güvenlik yaklaşımımız ise /guvenlik sayfasında açıklanır.",
      },
      {
        question: "Clause ile genel sohbet botu farkı nedir?",
        answer:
          "Clause, yüklediğiniz sözleşme metnine odaklanır ve Türk hukuku bağlamında ön okuma yapar; genel botlar ise soyut ve kaynaksız yanıt üretebilir. Her iki durumda da çıktı hukuki tavsiye değildir.",
      },
    ],
    ctaHref: "/#dene",
  }),
];
