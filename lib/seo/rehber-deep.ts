import type { RehberPageConfig } from "./rehber-types";

/**
 * Search Console'da gösterim alan ama sığ kalan rehberlerin derin sürümleri.
 * getRehberConfig bu alanları ilgili sayfanın üzerine yazar.
 */
export const REHBER_DEEP: Record<string, Partial<RehberPageConfig>> = {
  "sozlesme-iptal-cayma-farki": {
    h1: "Cayma hakkı, fesih ve iptal arasındaki fark",
    metaDescription:
      "Cayma hakkı, fesih ve iptal aynı şey değil. 14 günlük cayma süresi, istisnalar, abonelik ve hizmet sözleşmelerinde fesih, iade süresi ve örnek bildirim — tüketici ve satıcı için 2026 rehberi.",
    keywords: ["cayma hakkı ile iptal farkı", "cayma hakkı nedir", "14 gün cayma hakkı", "fesih ile iptal farkı", "cayma hakkı istisnaları", "abonelik iptali cayma"],
    intro:
      "Günlük dilde hepsine \"iptal\" deriz; ama hukuken cayma, fesih ve iptal farklı sonuçlar doğurur. Hangisini kullandığınız; para iadesinin süresini, cezai şart ödeyip ödemeyeceğinizi ve hangi belgeyi göndermeniz gerektiğini belirler.",
    sections: [
      {
        title: "Cayma hakkı nedir?",
        paragraphs: [
          "Cayma hakkı, tüketicinin internet, telefon veya katalog gibi mesafeli yollarla ya da işyeri dışında kurduğu sözleşmelerden hiçbir gerekçe göstermeden ve cezai şart ödemeden dönebilmesidir. Dayanağı 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği'dir.",
          "Süre 14 gündür. Mal satışlarında süre, malın tüketiciye veya gösterdiği kişiye teslim edildiği gün; hizmetlerde sözleşmenin kurulduğu gün başlar. Satıcı cayma hakkı konusunda sizi usulüne uygun bilgilendirmediyse süre uzayabilir.",
          "Cayma bildirimi yazılı olarak ya da kalıcı veri saklayıcısıyla (e-posta, satıcının paneli) yapılmalıdır. Bildirimin 14 gün içinde gönderilmesi yeterlidir; malı bildirimden itibaren 10 gün içinde geri göndermeniz gerekir.",
        ],
      },
      {
        title: "Cayma hakkının kullanılamadığı durumlar",
        paragraphs: [
          "Kanun bazı sözleşmeleri cayma hakkının dışında tutar: tüketicinin isteğine göre kişiselleştirilen ürünler, çabuk bozulan gıdalar, ambalajı açılmış hijyen ürünleri, ambalajı açılan yazılım ve dijital içerikler, belirli bir tarihte verilecek konaklama, ulaşım ve etkinlik hizmetleri ile cayma süresi bitmeden ifasına onay verdiğiniz hizmetler bunların başında gelir.",
          "Satıcı bu istisnaları sipariş öncesinde açıkça bildirmek zorundadır. Bildirmediyse istisnaya dayanması tartışmalı hâle gelir.",
        ],
      },
      {
        title: "Fesih nedir, caymadan farkı ne?",
        paragraphs: [
          "Fesih, geçerli olarak kurulmuş ve işlemekte olan bir sözleşmeyi ileriye dönük olarak sona erdirmektir. Abonelikler, kira, iş ve hizmet sözleşmeleri genellikle fesihle sona erer. Fesih için sözleşmedeki veya kanundaki bildirim sürelerine uymanız ve bazen haklı bir neden göstermeniz gerekir.",
          "Caymada sözleşme hiç kurulmamış gibi geri sarılır ve ödediğiniz tutarın tamamı iade edilir. Fesihte ise o güne kadar alınan hizmetin bedeli ödenir; sadece geleceğe yönelik borç ortadan kalkar. Bu yüzden 6 aylık bir spor salonu üyeliğini 3. ayda sonlandırmak çoğu zaman cayma değil fesihtir.",
        ],
      },
      {
        title: "\"İptal\" hukuken ne anlama gelir?",
        paragraphs: [
          "Günlük dildeki iptal çoğu zaman cayma veya fesih demektir. Hukuki anlamda ise iptal, hata, hile veya korkutma gibi irade sakatlıkları nedeniyle sözleşmenin baştan geçersiz sayılmasını istemektir (TBK m. 30–39). Bu durumda bir yıllık hak düşürücü süre vardır: hatanın veya hilenin öğrenildiği, korkutmanın etkisinin kalktığı tarihten itibaren.",
        ],
      },
      {
        title: "Para iadesi ne zaman yapılır?",
        paragraphs: [
          "Cayma bildirimi satıcıya ulaştığı tarihten itibaren satıcı, tahsil ettiği tüm ödemeleri — teslimat masrafı dahil — 14 gün içinde iade etmek zorundadır. Kredi kartıyla yapılan ödemeler aynı karta iade edilir; taksitli alışverişlerde iade, banka süreçlerine göre taksitler hâlinde yansıyabilir.",
          "Satıcı iade etmezse önce yazılı olarak hatırlatın; sonuç alamazsanız tutar parasal sınırın altındaysa tüketici hakem heyetine, üzerindeyse tüketici mahkemesine başvurabilirsiniz.",
        ],
      },
      {
        title: "Örnek cayma bildirimi",
        paragraphs: [
          "\"[Tarih] tarihinde [sipariş no] numaralı siparişle satın aldığım [ürün], [teslim tarihi] tarihinde teslim edilmiştir. 6502 sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca cayma hakkımı kullandığımı bildirir, ödediğim [tutar] TL'nin 14 gün içinde iadesini talep ederim.\"",
          "Bu metni e-postayla ya da satıcının panelindeki iade talebi üzerinden gönderin ve ekran görüntüsünü saklayın. Kendi durumunuza göre bir başvuru metni hazırlamak için dilekçe oluşturucuyu kullanabilirsiniz.",
        ],
      },
    ],
    faqs: [
      { question: "Cayma hakkı kaç gündür?", answer: "Mesafeli sözleşmelerde cayma süresi 14 gündür. Mallarda teslim tarihinden, hizmetlerde sözleşmenin kurulduğu tarihten itibaren başlar." },
      { question: "Aboneliği iptal etmek cayma mı fesih mi?", answer: "Abonelik başladıktan ve 14 gün geçtikten sonra yapılan sonlandırma genellikle fesihtir. İlk 14 gün içinde ve hizmetin ifasına onay vermediyseniz cayma hakkınızı kullanabilirsiniz." },
      { question: "Cayma hakkını kullanınca kargo ücretini kim öder?", answer: "Satıcı, ilk teslimat masrafı dahil ödenen tüm tutarı iade eder. Geri gönderme masrafı ise satıcının anlaşmalı kargosu kullanılırsa ve satıcı aksini taahhüt etmediyse genellikle tüketiciye ait değildir; sipariş öncesi bilgilendirmeye bakın." },
      { question: "Mağazadan aldığım üründe cayma hakkım var mı?", answer: "Kanuni cayma hakkı mesafeli ve işyeri dışında kurulan sözleşmeler içindir. Mağazadan alınan sağlam üründe iade, satıcının iade politikasına bağlıdır; ayıplı üründe ise ayıplı mal hükümleri uygulanır." },
    ],
    ctaLabel: "Cayma / iade dilekçesi hazırla",
    ctaHref: "/dilekce-olusturucu",
    updatedAt: "2026-11-04",
  },

  "depozito-ne-kadar-alinir": {
    h1: "Kira depozitosu ne kadar olabilir? 2026 sınırı ve iade",
    metaTitle: "Depozito ne kadar alınır 2026? 3 kira sınırı, banka şartı ve iade",
    metaDescription:
      "Kira depozitosu en fazla 3 aylık kira olabilir (TBK m. 342). Depozitonun bankaya yatırılması, hasar kesintisi, iade süresi ve iade edilmezse yapılacaklar — kiracı ve ev sahibi için 2026 rehberi.",
    keywords: ["depozito ne kadar alınır", "kira depozitosu kaç kira", "depozito sınırı 2026", "depozito bankaya yatırılır mı", "depozito iadesi süresi", "depozito kesintisi"],
    intro:
      "Depozito (güvence bedeli), kiracının borçlarını ödememesine veya eve zarar vermesine karşı ev sahibine verilen teminattır. Türk Borçlar Kanunu bu teminata bir üst sınır ve saklama şartı getirir; çoğu ev sahibi ve kiracı bunu bilmez.",
    sections: [
      {
        title: "Kanuni sınır: en fazla 3 aylık kira",
        paragraphs: [
          "Konut ve çatılı işyeri kiralarında güvence bedeli üç aylık kira bedelini aşamaz (TBK m. 342). Aylık kirası 20.000 TL olan bir evde en fazla 60.000 TL depozito istenebilir. Bunun üzerindeki talep kanuna aykırıdır ve aşan kısım geri istenebilir.",
          "Sınır yalnızca paraya değil, kıymetli evrak (senet, çek) şeklinde verilen güvencelere de uygulanır. Kefalet ise ayrıca değerlendirilir.",
        ],
      },
      {
        title: "Depozito bankaya yatırılmalı",
        paragraphs: [
          "Kanuna göre güvence olarak para veya kıymetli evrak verilmesi kararlaştırıldıysa, kiracı bunu iki tarafın onayı olmadan çekilemeyecek şekilde bir bankaya vadeli hesaba yatırır; kıymetli evrak ise bankaya depo edilir. Banka, depozitoyu yalnızca iki tarafın onayıyla veya kesinleşmiş icra takibi ya da mahkeme kararıyla geri verebilir.",
          "Uygulamada depozito çoğu zaman elden veya ev sahibinin hesabına ödenir. Bu durumda en azından ödemenin \"depozito\" açıklamasıyla banka havalesi olarak yapılmasını ve sözleşmeye tutarın yazılmasını sağlayın.",
        ],
      },
      {
        title: "Depozito ne zaman iade edilir?",
        paragraphs: [
          "Kiracı evi teslim ettikten sonra ev sahibi, kira borcu veya hasar talebi yoksa depozitoyu iade etmelidir. Bankaya yatırılan depozitoda, ev sahibi kira sözleşmesinin sona ermesinden itibaren üç ay içinde kiracıya karşı dava açtığını veya icra takibi başlattığını bankaya bildirmezse, banka kiracının talebi üzerine depozitoyu kiracıya geri vermek zorundadır (TBK m. 342).",
          "Elden veya ev sahibinin hesabına ödenen depozitoda kanunda ayrı bir iade süresi yoktur; ancak makul süre içinde iade edilmesi gerekir. Sözleşmeye bir iade süresi yazmanız uyuşmazlığı önler.",
        ],
      },
      {
        title: "Ev sahibi hangi kesintileri yapabilir?",
        paragraphs: [
          "Ödenmemiş kira, aidat, fatura borçları ve kiracının kusuruyla oluşan hasarlar depozitodan düşülebilir. Olağan kullanımdan kaynaklanan yıpranma — boyanın solması, kullanım izi, eskiyen conta — kesinti nedeni değildir (TBK m. 334).",
          "Kesinti yapılacaksa ev sahibi hasarı ve tutarını belgelemelidir. Bu yüzden giriş ve çıkışta tarihli fotoğraf, video ve teslim tutanağı her iki taraf için de en güçlü delildir.",
        ],
      },
      {
        title: "Depozito iade edilmezse ne yapmalı?",
        paragraphs: [
          "Önce yazılı olarak (e-posta, WhatsApp veya ihtarname) süre vererek iade isteyin. Sonuç alamazsanız kira uyuşmazlıklarında arabuluculuk zorunlu olduğundan adliyedeki arabuluculuk bürosuna başvurun. Anlaşma olmazsa sulh hukuk mahkemesinde dava açabilir veya icra takibi başlatabilirsiniz.",
          "Depozito iadesi için hazır ihtar metnini dilekçe oluşturucuda bulabilirsiniz.",
        ],
      },
    ],
    faqs: [
      { question: "Depozito 3 kiradan fazla istenebilir mi?", answer: "Hayır. Konut ve çatılı işyeri kiralarında güvence bedeli üç aylık kirayı aşamaz. Fazlası istenmişse aşan kısım geri istenebilir." },
      { question: "Depozitoya faiz işler mi?", answer: "Depozito kanuna uygun olarak bankada vadeli hesaba yatırıldıysa faiz ve getirisi kiracıya aittir. Elden ödenen depozitoda faiz konusu sözleşmeye bağlıdır." },
      { question: "Ev sahibi depozitoyu son kiraya sayabilir mi?", answer: "Taraflar anlaşırsa evet. Kiracının tek taraflı olarak son ayların kirasını ödemeyip depozitodan düşülmesini istemesi ise temerrüde yol açabilir; önce yazılı mutabakat sağlayın." },
      { question: "Kira artınca depozito da artar mı?", answer: "Kanunda otomatik artış yoktur. Sözleşmede kararlaştırılmışsa artış istenebilir; ancak toplam depozito yine üç aylık güncel kirayı aşamaz." },
    ],
    ctaLabel: "Depozito iade ihtarı hazırla",
    ctaHref: "/dilekce-olusturucu",
    updatedAt: "2026-11-04",
  },

  "tahliye-taahhutnamesi-rehberi": {
    metaDescription:
      "Tahliye taahhütnamesi ne zaman geçerli, ne zaman geçersiz? Teslimden sonra verilme şartı, boş tarih, bir aylık takip süresi, icra itirazı ve kiracı ile ev sahibi için yapılacaklar — 2026 rehberi.",
    keywords: ["tahliye taahhütnamesi geçerli mi", "tahliye taahhütnamesi şartları", "tahliye taahhüdü iptali", "boş tarihli tahliye taahhüdü", "tahliye taahhüdü icra", "tahliye taahhütnamesi 2026"],
    intro:
      "Tahliye taahhütnamesi, kiracının evi belirli bir tarihte boşaltacağını yazılı olarak üstlendiği belgedir. Geçerliyse ev sahibine dava açmadan, doğrudan icra yoluyla tahliye imkânı verir; bu yüzden hem kiracı hem ev sahibi için en kritik kira belgesidir.",
    sections: [
      {
        title: "Geçerlilik şartları",
        paragraphs: [
          "Yazılı olmalıdır (TBK m. 352/1). Boşaltma tarihi açıkça yazılmalıdır. Kiracının veya yetkili temsilcisinin imzası bulunmalıdır.",
          "En önemli şart: taahhüt kiralananın kiracıya tesliminden sonra verilmiş olmalıdır. Yargıtay, sözleşmeyle aynı gün veya teslimden önce alınan taahhütlerde kiracının serbest iradesiyle hareket etmediğini kabul eder; bu taahhütler kural olarak geçersizdir.",
        ],
      },
      {
        title: "Boş tarihli taahhütname",
        paragraphs: [
          "Ev sahiplerinin sık başvurduğu yöntem, sözleşmeyle birlikte tarihi boş bir taahhütname imzalatıp sonradan doldurmaktır. Bu durumda düzenleme tarihinin teslimden önce olduğunu ve tarihin sonradan doldurulduğunu ispat yükü kiracıdadır. İspat için sözleşmenin aynı gün imzalandığını gösteren mesajlar, tanıklar ve belgenin aynı kalemle yazılıp yazılmadığı önemlidir.",
        ],
      },
      {
        title: "Ev sahibi ne kadar sürede harekete geçmeli?",
        paragraphs: [
          "Ev sahibi, taahhüt edilen boşaltma tarihinden itibaren bir ay içinde icra takibi başlatmalı veya tahliye davası açmalıdır. Bu süre kaçarsa taahhüde dayanarak tahliye isteme hakkı o dönem için düşer ve sözleşme bir yıl daha uzar.",
          "Tahliye taahhüdüne dayalı icra takiplerinde kira uyuşmazlıkları için öngörülen arabuluculuk zorunluluğu aranmaz.",
        ],
      },
      {
        title: "Kiracıya tahliye emri gelirse",
        paragraphs: [
          "Tahliye taahhüdüne dayalı tahliye emri tebliğ edildiğinde itiraz ve şikâyet süreleri tebliğden itibaren günlerle sınırlıdır. İtirazda taahhüdün teslimden önce alındığı, imzanın size ait olmadığı veya tarihin sonradan doldurulduğu ileri sürülebilir. Süre çok kısa olduğu için emri aldığınız gün bir avukata danışmanız önerilir.",
        ],
      },
      {
        title: "Kiracı için: imzalamadan önce",
        paragraphs: [
          "Sözleşmeyle birlikte tahliye taahhüdü imzalamayın. İmzalamak zorunda kaldıysanız tarihin dolu olmasını, sözleşme tarihinden sonraya ait olmamasını ve bir kopyasının size verilmesini isteyin; imza gününü gösteren yazışmaları saklayın.",
        ],
      },
      {
        title: "Ev sahibi için: geçerli taahhüt almak",
        paragraphs: [
          "Taahhüdü evi teslim ettikten sonra, kiracının serbest iradesiyle ve tarihi dolu şekilde alın. Mümkünse noterde düzenletin; bu, ileride tarih ve imza tartışmasını büyük ölçüde ortadan kaldırır.",
        ],
      },
    ],
    faqs: [
      { question: "Sözleşmeyle birlikte imzalanan tahliye taahhüdü geçerli mi?", answer: "Yargıtay uygulamasına göre kiralananın tesliminden önce veya sözleşmeyle aynı anda alınan tahliye taahhüdü kural olarak geçersizdir. Ancak bunu ispat yükü kiracıdadır." },
      { question: "Tahliye taahhüdü noterden mi yapılmalı?", answer: "Hayır, adi yazılı şekil yeterlidir. Noter onayı zorunlu değildir; ancak tarih ve imza tartışmalarını önlediği için tavsiye edilir." },
      { question: "Tahliye emri gelirse ne yapmalıyım?", answer: "Süreler tebliğ tarihinden itibaren birkaç günle sınırlıdır. Tebliğ tarihini not edin, taahhüdün teslimden önce alınıp alınmadığını gösteren belgeleri toplayın ve aynı gün bir avukata veya baronun adli yardım bürosuna başvurun." },
      { question: "Ev sahibi bir ay içinde takip başlatmazsa ne olur?", answer: "Taahhüde dayanarak o dönem için tahliye isteme hakkı düşer ve sözleşme kendiliğinden bir yıl uzar." },
    ],
    updatedAt: "2026-11-04",
  },
};
