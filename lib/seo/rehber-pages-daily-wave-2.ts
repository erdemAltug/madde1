import { createRehberPage } from "@/lib/seo/rehber-factory";

type PageInput = Parameters<typeof createRehberPage>[0];
type DailyPageInput = Omit<PageInput, "sections" | "updatedAt"> & {
  sections: PageInput["sections"];
  finalChecks: [string, string];
};

const createDailyPage = (
  { finalChecks, ...input }: DailyPageInput,
) => createRehberPage({
    ...input,
    sections: [
      ...input.sections,
      {
        title: "İşlem öncesi son kontrol",
        paragraphs: finalChecks,
      },
    ],
    updatedAt: "2026-08-05",
  });

export const REHBER_DAILY_WAVE_2_PAGES = [
  createDailyPage({
    slug: "e-devlet-uyap-dava-dosyasi-sorgulama",
    h1: "e-Devlet ve UYAP’tan dava dosyası nasıl sorgulanır?",
    metaTitle: "UYAP dava dosyası sorgulama: e-Devlet adımları 2026",
    metaDescription:
      "Adınıza açılan dava var mı? e-Devlet ve UYAP Vatandaş Portal üzerinden dosya, duruşma ve evrak kontrolünü; hata halinde izlenecek adımları öğrenin.",
    keywords: ["UYAP dava dosyası sorgulama", "e-Devlet dava sorgulama", "adıma dava açılmış mı", "UYAP Vatandaş Portal"],
    intro:
      "Adınıza açılmış bir dava olup olmadığını veya mevcut dosyanızdaki son işlemleri e-Devlet bağlantılı UYAP Vatandaş Portal üzerinden kontrol edebilirsiniz. Ancak ekranda görülen kısa kayıt, dosyanın hukuki anlamını tek başına açıklamaz. Mahkeme adı, esas numarası, taraf sıfatı, evrak tarihi ve varsa tebligat birlikte incelenmelidir. Bu rehber, resmi kaydı doğru okumaya ve süre kaybı yaşamadan güvenli bir kontrol listesi oluşturmaya yardımcı olur.",
    finalChecks: [
      "Portaldan çıkmadan önce dosyanın mahkeme adı, esas numarası, taraf rolü, son evrakı ve duruşma bilgisini ayrı bir nota aktarın. İndirdiğiniz belgelerin açıldığını kontrol edin; yalnızca ekran başlığına dayanarak işlem yapmayın. Aynı dosyaya ait belgeleri tarih sırasıyla adlandırmak sonraki karşılaştırmayı kolaylaştırır.",
      "Son olarak tebligat kaydını portal hareketlerinden ayrı ele alın ve olası başvuru süresini doğrulayın. Kimlik veya ödeme isteyen mesajları resmi dosya iletişim bilgileriyle karşılaştırın. Belgenin anlamı, süre başlangıcı ya da taraf sıfatı belirsizse tahmin yürütmeden ilgili birimden veya yetkili hukukçudan dosyaya özgü bilgi alın.",
    ],
    sections: [
      {
        title: "e-Devlet üzerinden dosyaya ulaşma",
        paragraphs: [
          "e-Devlet’e kişisel doğrulama yönteminizle giriş yaptıktan sonra UYAP Vatandaş Portal hizmetini arayabilirsiniz. Dosya sorgulama ekranında tarafı olduğunuz yargı dosyaları listelenebilir. Benzer isimli hizmetler arasında resmi kurum başlığını ve internet adresini kontrol edin; şifrenizi arama sonucu açılan üçüncü taraf sayfalara girmeyin.",
          "Listeyi yalnızca dosya başlığına bakarak yorumlamayın. Yargı birimi, esas yılı ve numarası, dosya türü, açık veya kapalı görünümü ile taraf rolünüz önemlidir. Bir dosyanın listelenmesi, talebin kabul edildiği ya da aleyhinize kesin karar verildiği anlamına gelmez; kayıt çoğu zaman sadece sürecin varlığını gösterir.",
        ],
      },
      {
        title: "UYAP ekranındaki bilgiler nasıl okunur?",
        paragraphs: [
          "Dosya ayrıntısında tensip, duruşma günü, bilirkişi işlemi, karar veya tebligat gibi farklı kayıtlar bulunabilir. Her kayıt aynı hukuki sonucu doğurmaz. Örneğin duruşma günü ile cevap süresinin başlangıcı farklı konulardır; ekrandaki işlem tarihi de her zaman size yapılan usulüne uygun bildirimin tarihi değildir.",
          "Evrak içeriğine erişim, kullandığınız doğrulama yöntemi ve dosyadaki gizlilik kararı gibi nedenlerle sınırlı olabilir. Görüntülenemeyen belgeyi tahmin ederek hareket etmeyin. İlgili mahkeme kaleminden usulüne uygun bilgi alma, dosyayı inceleme veya yetkili bir hukukçudan yardım isteme seçenekleri somut dosyaya göre değerlendirilmelidir.",
        ],
      },
      {
        title: "Dosya görünmüyorsa veya bilgi hatalıysa",
        paragraphs: [
          "Yeni açılan dosyanın sisteme yansıması zaman alabilir; ayrıca yanlış yargı türünde arama yapılması da sonucu etkileyebilir. Elinizde mahkeme adı ya da dosya numarası bulunan resmi bir belge varsa bununla ekrandaki bilgiyi karşılaştırın. Telefonla arandığınız için dosya varmış gibi kabul etmeyin ve ödeme isteyen kişilere bilgi vermeyin.",
          "Kimlik bilgileriniz doğru olduğu hâlde tarafı olduğunuz dosya görünmüyorsa ilgili adli birimden resmi kanallarla teyit isteyebilirsiniz. Ekran görüntüsü, erişim tarihi ve hata mesajını saklamak yararlı olur. Teknik görünmeme durumu, tebligatla başlayan bir süreyi kendiliğinden durdurmayabileceğinden özellikle size belge ulaştıysa gecikmeden kontrol gerekir.",
        ],
      },
      {
        title: "Tebligat ve süreleri ayrıca kontrol edin",
        paragraphs: [
          "UYAP’ı düzenli kontrol etmek yararlıdır fakat her dosyada tebligatın yerine geçen genel bir yöntem değildir. Fiziki veya elektronik tebligatın hangi tarihte yapıldığı, bildirimin kime teslim edildiği ve belgenin içeriği süre hesabını etkileyebilir. Sadece portalda ilk gördüğünüz tarihi başlangıç kabul etmek hatalı sonuç doğurabilir.",
          "Cevap, itiraz, istinaf veya başka başvuruların süresi işlem türüne göre değişir. Bu nedenle ekrandaki evrakı indirip dosya adıyla saklayın; tebliğ zarfı ve bildirim kayıtlarını atmayın. Sürenin dolmasına az kaldığını düşünüyorsanız genel internet açıklamalarıyla yetinmeden dosyaya özgü profesyonel değerlendirme alın.",
        ],
      },
      {
        title: "Güvenli kayıt ve belge kontrolü",
        paragraphs: [
          "Dosya özeti, indirilen evraklar, tebligatlar ve yaptığınız başvurular için tarih sıralı bir klasör oluşturun. Belgenin tam adını, düzenleyen birimi ve sayfa sayısını not etmek eksik evrakı fark ettirir. Kişisel veriler içeren dosyaları herkese açık bağlantılarda paylaşmayın; yalnızca gerçekten yetkili kişilerle güvenli biçimde iletin.",
          "Ekrandaki taraf adı, kimlik bilgisi veya dosya türünde belirgin bir hata görürseniz bunu resmi başvuru kanalıyla bildirin ve başvurunun kaydını koruyun. Bu rehber bilgilendirme amaçlıdır; dosyanın sonucu hakkında garanti vermez. İddia, savunma ve süre stratejisi ancak tüm evrak ve somut olay birlikte değerlendirilerek kurulabilir.",
        ],
      },
    ],
    faqs: [
      { question: "Adıma açılan bütün davalar e-Devlet’te görünür mü?", answer: "Tarafı olduğunuz birçok dosya UYAP bağlantısıyla görülebilir; ancak sisteme işlenme zamanı, gizlilik veya erişim seviyesi sonucu etkileyebilir. Resmi tebligatınız ya da dosya numaranız varsa yalnızca listeye güvenmeden ilgili birimden teyit edin." },
      { question: "UYAP’ta dosyanın açık görünmesi davayı kaybettiğim anlamına mı gelir?", answer: "Hayır. Açık ibaresi çoğunlukla yargılama veya dosya işlemlerinin sürdüğünü gösterir. Sonucu anlamak için karar evrakı, kesinleşme durumu ve varsa kanun yolu kayıtları birlikte incelenmelidir." },
      { question: "Duruşma tarihini e-Devlet’ten öğrenebilir miyim?", answer: "Dosyaya işlenmiş duruşma günü portalda görülebilir. Yine de değişiklik, erteleme veya kayıt gecikmesi ihtimaline karşı dosya evrakını ve resmi bildirimleri kontrol etmek gerekir." },
      { question: "Evrakı açamıyorum; ne yapmalıyım?", answer: "Önce resmi portalda olduğunuzu ve doğrulama seviyenizi kontrol edin. Erişim sürmüyorsa hata kaydını saklayıp ilgili mahkeme kalemiyle resmi kanaldan görüşün; içeriği görmeden süre ve işlem konusunda varsayım yapmayın." },
      { question: "UYAP ekran görüntüsü resmi belge yerine geçer mi?", answer: "Ekran görüntüsü kontrol tarihini göstermeye yardımcı olabilir; fakat her durumda onaylı evrak veya usulüne uygun tebligatla aynı ispat gücüne sahip değildir. Gerektiğinde belgenin resmi örneğini temin edin." },
    ],
    ctaHref: "/rehber",
    ctaLabel: "Diğer hukuki rehberleri inceleyin",
  }),
  createDailyPage({
    slug: "icra-takibi-geldi-ne-yapmaliyim",
    h1: "İcra takibi geldiğinde ne yapmalıyım?",
    metaTitle: "İcra takibi geldi: İlk ne yapmalısınız? 2026 rehberi",
    metaDescription:
      "Ödeme emri aldıysanız borcu, tebligatı, dosyayı ve süreleri nasıl kontrol edeceğinizi öğrenin. İtiraz ve ödeme öncesi güvenli adımlar.",
    keywords: ["icra takibi geldi", "ödeme emri ne yapmalıyım", "icra dosyası kontrol", "icra takibine itiraz"],
    intro:
      "Ödeme emri veya icra bildirimi almak, borcun kesinleştiği ya da hemen haciz yapılacağı anlamına gelmeyebilir; fakat belgenin görmezden gelinmesi ciddi hak kaybı yaratabilir. İlk amaç panikle ödeme yapmak değil, belgenin gerçekliğini, dosya türünü, talep edilen borcu ve tebliğ tarihini doğrulamaktır. Süreler takip yoluna göre değişebildiği için belgeyi aynı gün düzenli biçimde kaydetmek ve dosyaya özgü değerlendirme yapmak önem taşır.",
    finalChecks: [
      "Karar vermeden önce ödeme emrindeki tarafları, takip türünü, dosya numarasını, talep kalemlerini ve tebliğ kaydını tek sayfalık bir özette birleştirin. Daha önce yaptığınız ödemeleri dekontlarla eşleştirin; aynı borç için farklı dosya veya hesap bilgisi bulunup bulunmadığını resmi kayıttan kontrol edin.",
      "İtiraz, ödeme veya anlaşma seçeneklerinden birine yönelirken son günü varsayımla hesaplamayın. Yapacağınız her bildirimin teslim kanıtını ve her ödemenin dosyayla bağlantısını koruyun. Borç size ait değilse, imzaya itiraz varsa veya süre çok yakınsa standart dilekçe kullanmadan hızlı ve dosyaya özel hukuki yardım değerlendirin.",
    ],
    sections: [
      {
        title: "Önce ödeme emrinin gerçekliğini doğrulayın",
        paragraphs: [
          "Belgede icra dairesi, dosya numarası, alacaklı, borçlu, talep kalemleri ve başvuru yolları bulunmalıdır. Bilgileri UYAP Vatandaş Portal gibi resmi kanallardan karşılaştırın. Mesaj veya telefonla gönderilen hesap numarasına, dosyayı doğrulamadan ödeme yapmayın; sahte icra bildirimleri kişisel veri ve para kaybına yol açabilir.",
          "Tebligat zarfını ve teslim bilgilerini atmayın. Belgenin size, aynı konutta yaşayan kişiye veya başka bir usulle bırakılmış olması süre tartışmasını etkileyebilir. Tebligatın hatalı olduğunu düşünseniz bile kendiliğinden geçersiz sayıp beklemek güvenli değildir; tarihleri not ederek hızla inceleme yapılmalıdır.",
        ],
      },
      {
        title: "Borç ve masraf kalemlerini tek tek karşılaştırın",
        paragraphs: [
          "Asıl alacak, faiz, takip gideri ve vekâlet ücreti gibi kalemler ayrı ayrı yazılabilir. Sözleşme, fatura, hesap özeti, önceki ödeme makbuzları ve yazışmalarla talebi karşılaştırın. Borcun bir kısmını ödemiş olmanız, yanlış kişiye yöneltilmesi veya aynı borcun tekrar istenmesi savunma bakımından önemli olabilir.",
          "Borcu kabul edip etmediğiniz konusunda aceleyle yazılı veya sözlü beyan vermeyin. Kısmi ödeme ya da yapılandırma mesajı bazı durumlarda hukuki değerlendirmeyi etkileyebilir. Ödeme düşünüyorsanız güncel dosya hesabını resmi kanaldan öğrenin; açıklamasız veya üçüncü kişinin hesabına yapılan transfer daha sonra ispat sorunu doğurabilir.",
        ],
      },
      {
        title: "İtiraz seçeneği dosya türüne göre değişir",
        paragraphs: [
          "İlamsız takip, kambiyo senedine dayalı takip ve ilamlı takip aynı kurallara tabi değildir. İtirazın nereye, hangi gerekçeyle ve hangi süre içinde yapılacağı belgenin niteliğine göre belirlenir. İnternette görülen tek bir dilekçe örneğini her ödeme emrine uygulamak eksik veya yanlış başvuruya yol açabilir.",
          "İmza, borç, yetki, faiz veya zamanaşımı gibi itirazlar farklı sonuçlar doğurabilir; bazı iddiaların ayrıca ve açıkça ileri sürülmesi gerekebilir. Elinizdeki tüm belgeleri kronolojik sıraya koyun. Süre kısa olabileceğinden özellikle senet, tahliye veya kesinleşmiş karara dayalı takiplerde gecikmeden hukuki yardım değerlendirin.",
        ],
      },
      {
        title: "Ödeme veya anlaşma yapılacaksa kayıtlı ilerleyin",
        paragraphs: [
          "Borç doğruysa dosya dışı ödeme yapmadan önce alacaklı veya yetkili vekille görüşmenin kimlik ve yetki doğrulamasını yapın. Ödemenin hangi dosyaya, hangi kaleme mahsup edileceğini açıklamada belirtin. Dosyanın kapanması, harç ve kalan bakiye konusunda yazılı teyit almadan yalnızca sözlü söze dayanmayın.",
          "Taksit veya sulh görüşmesi, takip işlemlerini otomatik olarak durdurmayabilir. Anlaşmada toplam borç, ödeme tarihleri, temerrüt sonucu, masraflar ve dosya işlemlerinin ne zaman sonlandırılacağı açık olmalıdır. Ödeyemeyeceğiniz planı kabul etmek yerine gelir durumunuza uygun, anlaşılır ve yazılı koşullar talep edin.",
        ],
      },
      {
        title: "Dosya kaydı ve kişisel veri güvenliği",
        paragraphs: [
          "Ödeme emri, zarf, UYAP ekranı, banka dekontları, sözleşmeler ve yazışmaları tek klasörde saklayın. Her telefon görüşmesinden sonra tarih, arayan numara ve konuşulan konuyu not edin. Borçla ilgisi olmayan kişilere kimlik, banka veya e-Devlet bilgisi vermeyin; resmi görevliler de sizden şifrenizi istememelidir.",
          "Bu adımlar genel bir kontrol çerçevesidir ve itiraz edilmesi ya da ödeme yapılması gerektiği yönünde kişisel hukuki tavsiye değildir. Takibin türü, tebliğ şekli ve belgeler sonucu değiştirebilir. Özellikle süre tartışması, haciz bildirimi veya yüksek etkili bir işlem varsa dosyayı yetkili bir hukukçuya inceletmek daha güvenlidir.",
        ],
      },
    ],
    faqs: [
      { question: "İcra mesajı geldi, bu resmi tebligat mıdır?", answer: "Her SMS resmi tebligat değildir. Mesajdaki bağlantıya tıklamadan dosyayı resmi UYAP kanalıyla doğrulayın. Ayrıca fiziki veya elektronik tebligat kaydını inceleyin; süre başlangıcı somut bildirim yöntemine göre değerlendirilir." },
      { question: "Borca itiraz edersem takip kesin olarak biter mi?", answer: "İtirazın etkisi takip türüne, süresine ve usulüne göre değişir. Alacaklı da itirazın kaldırılması veya iptali gibi yollara başvurabilir. Bu nedenle itiraz, borcun kesin olarak ortadan kalktığı anlamına gelmez." },
      { question: "Borcu doğrudan alacaklıya ödeyebilir miyim?", answer: "Mümkün olabilse de dosya bakiyesi, masraf ve kapanış işlemleri ayrıca kontrol edilmelidir. Yetkiyi doğrulayın, dosya numarasını dekonta yazın ve borcun hangi kapsamda sona erdiğini yazılı olarak belgeleyin." },
      { question: "Tebligatı geç gördüm; süre ne zaman başlar?", answer: "Teslim ve usul kayıtları incelenmeden kesin tarih söylenemez. Zarfı, muhtarlık bildirimini ve elektronik kayıtları koruyup gecikmeden dosyaya özgü değerlendirme alın." },
      { question: "İcra takibi yüzünden hemen eve haciz gelir mi?", answer: "Takip aşamaları ve uygulanabilecek işlemler dosyaya göre değişir. Ödeme emri alınması tek başına her durumda aynı gün haciz yapılacağı anlamına gelmez; ancak belgeyi görmezden gelmek risklidir." },
    ],
    ctaHref: "/araclar",
    ctaLabel: "Hukuki araçları inceleyin",
  }),
  createDailyPage({
    slug: "maas-haczi-ne-kadar-kesilir",
    h1: "Maaş haczinde ne kadar kesinti yapılır?",
    metaTitle: "Maaş haczi ne kadar kesilir? Kesinti ve sıra rehberi",
    metaDescription:
      "Maaş haczi yazısı, kesinti oranı, birden fazla dosyada sıra ve bordro kontrolü hakkında güncel, anlaşılır ve ihtiyatlı rehber.",
    keywords: ["maaş haczi ne kadar kesilir", "maaş haczi oranı", "birden fazla maaş haczi", "maaş kesintisi icra"],
    intro:
      "Maaş haczinde kesinti, ücretin niteliği, dosyanın türü, nafaka gibi öncelikli alacaklar ve çalışanın bordro kalemlerine göre değişebilir. Uygulamada genel kurallar bulunsa da tek bir oranı her çalışan ve her alacak için kesin sonuç gibi kullanmak doğru değildir. İşverenin aldığı haciz yazısı, icra dosyasındaki sıra ve kesintinin hangi kazanç kalemlerine uygulandığı birlikte kontrol edilmelidir.",
    finalChecks: [
      "Son üç bordroyu, banka ödemelerini ve işverenin bildirdiği icra dosyalarını yan yana koyun. Kesintinin hangi ücret kalemine, hangi ayda ve hangi dosya sırasıyla uygulandığını yazılı sorun. Dosya bakiyesini eski ödeme emrindeki rakamla değil, resmi güncel hesap ve gönderilen kesintilerle karşılaştırın.",
      "Birden fazla haciz, nafaka veya işten ayrılma ödemesi varsa genel oran bilgisine dayanarak sonuç çıkarmayın. İşverene verdiğiniz itirazın tarih ve teslim kaydını saklayın. Bordroda açıklanamayan fark, kapanmış dosyaya gönderim veya olağan dışı kesinti görürseniz icra ve iş hukuku yönlerini birlikte değerlendirebilecek destek alın.",
    ],
    sections: [
      {
        title: "Kesintiyi belirleyen temel unsurlar",
        paragraphs: [
          "Ücret haczinde kanuni sınırlamalar çalışanın geçimini korumayı amaçlar. Bununla birlikte nafaka alacakları, kamu alacakları veya özel kanuna tabi ödemeler farklı değerlendirmelere konu olabilir. Net ücret, ek ödeme, prim, ikramiye ve sosyal yardım niteliğindeki kalemlerin tamamının aynı biçimde haczedileceği varsayılmamalıdır.",
          "İcra dairesinin işverene gönderdiği yazıda dosya bilgisi, borçlu çalışan ve yapılması istenen işlem yer alır. Bordrodaki kesintinin bu yazıyla uyumlu olup olmadığı kontrol edilmelidir. Kesintinin oranı kadar başlangıç tarihi, aktarılan tutar ve kalan borç kaydı da önem taşır.",
        ],
      },
      {
        title: "Birden fazla haciz dosyasında sıra",
        paragraphs: [
          "Aynı çalışanın birden fazla maaş haczi bulunabilir. Genel uygulamada dosyalar belirli bir sıraya alınır ve önceki dosyanın kesintisi tamamlandığında sonraki dosyaya geçilebilir; ancak öncelikli alacaklar bu düzeni etkileyebilir. Çalışan, yalnızca işverenin sözlü açıklamasına değil resmi dosya ve sıra bilgisine bakmalıdır.",
          "Yeni haciz yazısı geldiğinde işverenin ilgili icra dairesine mevcut kesintileri bildirmesi gerekebilir. Çalışanın da UYAP kayıtları ve bordroları karşılaştırması yararlıdır. Aynı dönemde beklenmedik birden çok kesinti görülüyorsa insan kaynaklarından yazılı döküm ve dosya numarası istenmelidir.",
        ],
      },
      {
        title: "Bordro ve banka hareketlerini kontrol edin",
        paragraphs: [
          "Her ay brüt ve net ücret, yasal kesintiler, haciz kalemi ve elinize geçen tutarı karşılaştırın. Bordroda yalnızca genel bir kesinti adı bulunması denetimi zorlaştırır; mümkünse ilgili icra dosyasıyla eşleştirilen açıklama talep edin. Banka dekontu bordronun yerine geçmese de fiili ödeme miktarını göstermeye yardımcı olur.",
          "Prim, fazla çalışma, yıllık izin ücreti veya işten ayrılma ödemeleri farklı hukuki nitelik taşıyabilir. Bunlara uygulanacak işlem somut kalem ve güncel mevzuata göre ele alınmalıdır. Kesintinin yanlış olduğunu düşünüyorsanız bordroları imzalarken çekincenizi yazılı bildirmek ve kayıt tutmak önemlidir.",
        ],
      },
      {
        title: "Borç kapanınca kesinti nasıl durur?",
        paragraphs: [
          "Son ödeme yapılmış görünse bile işveren, icra dairesinden gelen güncel yazı veya dosya hesabına göre hareket edebilir. Faiz ve masraflar nedeniyle başlangıçta görülen tutarla kapanış bakiyesi farklılaşabilir. Dosya dışı ödeme yaptıysanız bunu belgeleyip dosyaya işlendiğini doğrulamadan kesintinin kendiliğinden biteceğini varsaymayın.",
          "Fazla kesinti iddiasında dosya hesabı, işverenin gönderdiği tutarlar ve alacaklı tahsilatları birlikte karşılaştırılmalıdır. İade veya mahsup yöntemi duruma göre değişebilir. İşveren, icra dairesi ve varsa alacaklı vekiliyle yapılan tüm yazışmaları tarihli ve yazılı saklayın.",
        ],
      },
      {
        title: "İşverenin ve çalışanın dikkat edeceği noktalar",
        paragraphs: [
          "İşveren, resmi haciz yazısını görmezden gelmemeli; çalışan verisini yalnızca görevli kişilerle paylaşmalıdır. Haciz bilgisi işyerinde gereksiz biçimde yayılmamalıdır. Çalışan da işverenden borcu hukuken değerlendirmesini değil, gelen yazı, kesinti ve gönderim kayıtlarını açıklamasını istemelidir.",
          "Bu rehber kesin bir kesinti hesabı veya kişisel hukuki görüş sunmaz. Ücret türü, öncelikli alacak, birden fazla dosya ve özel kanunlar sonucu değiştirebilir. Bordro ile resmi yazı arasında uyumsuzluk veya geçimi ciddi etkileyen olağan dışı kesinti varsa dosyaya özgü hukuki destek alın.",
        ],
      },
    ],
    faqs: [
      { question: "Maaşın tamamına haciz konabilir mi?", answer: "Ücretin korunmasına ilişkin sınırlamalar vardır; ancak alacağın ve ödemenin niteliği önemlidir. Bordro kalemleri ile haciz yazısı görülmeden her durumda geçerli tek bir oran veya sonuç söylenemez." },
      { question: "İki icra dosyası maaştan aynı anda kesilebilir mi?", answer: "Dosya sırası ve alacağın önceliği belirleyicidir. Bazı alacaklar farklı değerlendirilebilir. İşverenden aktif kesintilerin dosya numaralarını ve sıra bilgisini yazılı istemek yararlı olur." },
      { question: "Prim ve ikramiyeden de kesinti olur mu?", answer: "Ödemenin ücret, sosyal yardım veya başka bir hak niteliğinde olması sonucu etkiler. Bordro kalemi ve güncel haciz yazısı somut olarak incelenmelidir." },
      { question: "Borcu ödedim ama kesinti sürüyor; ne yapmalıyım?", answer: "Güncel dosya hesabını ve ödemenin dosyaya işlendiğini doğrulayın. İcra dairesinin kapanış veya kesintiyi durdurma kaydını işverenle karşılaştırın; dekontları saklayın." },
      { question: "Maaş haczi işten çıkarma nedeni midir?", answer: "Maaş haczinin varlığı tek başına otomatik bir fesih sonucu doğurmaz. İşverenin gerekçesi ve somut koşullar iş hukuku bakımından ayrıca değerlendirilmelidir." },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    ctaLabel: "İş sözleşmesi risklerini inceleyin",
  }),
  createDailyPage({
    slug: "istifa-dilekcesi-verirken-dikkat",
    h1: "İstifa dilekçesi verirken nelere dikkat edilmeli?",
    metaTitle: "İstifa dilekçesi vermeden önce 10 kritik kontrol",
    metaDescription:
      "İstifa tarihi, ihbar süresi, haklı neden, kullanılmamış izin ve teslim kaydı: Dilekçeyi vermeden önce hak kaybını azaltan kontroller.",
    keywords: ["istifa dilekçesi dikkat", "istifa ederken haklar", "istifa ihbar süresi", "istifa dilekçesi teslim"],
    intro:
      "İstifa, yalnızca kısa bir dilekçe yazıp işyerinden ayrılmak değildir. Dilekçedeki neden, bildirimin ulaştığı tarih, ihbar süresi, kullanılmamış izinler ve işverenden alınan belgeler sonraki uyuşmazlığı etkileyebilir. Özellikle baskıyla imza, geriye tarih atılması veya haklı neden iddiasının belirsiz bırakılması ciddi ispat sorunları yaratır. Dilekçe vermeden önce sözleşmeyi, bordroları ve ayrılış planını birlikte kontrol etmek daha güvenlidir.",
    finalChecks: [
      "Dilekçeyi teslim etmeden önce metindeki ayrılış nedeni, düzenleme tarihi ve son çalışma gününün gerçek iradenizle uyumlu olduğunu yeniden okuyun. İhbar planını, kullanılmamış izinleri, ücret ve prim alacaklarını ayrı listede kontrol edin. Boşluk bulunan, geriye tarihli veya tüm haklardan vazgeçtiğinizi söyleyen ek belgeyi incelemeden imzalamayın.",
      "Teslim yönteminin sonradan kanıtlanabildiğinden emin olun ve imzalı örneği saklayın. Zimmet iadesi ile işverenin vermesi gereken çalışma belgelerini yazılı tutanakla tamamlayın. Haklı neden, baskı, rekabet yasağı veya yüksek tutarlı alacak tartışması varsa istifa metnini geri dönüşü zor biçimde göndermeden önce kişisel değerlendirme alın.",
    ],
    sections: [
      {
        title: "İstifa iradesi açık ve özgür olmalı",
        paragraphs: [
          "Dilekçede işten ayrılma iradesi ve bildirimin tarihi anlaşılır olmalıdır. Boş kâğıt, tarihsiz metin veya içeriğini okumadığınız standart form imzalamayın. İşverenin hazırladığı metin gerçek iradenizi yansıtmıyorsa düzeltme isteyin; baskı altında imza attığınızı düşünüyorsanız durumu gecikmeden yazılı kayıt altına alın.",
          "İstifa ile işveren feshi farklı sonuçlara bağlanabilir. Size ‘prosedür gereği istifa yaz’ denmesi, olayın gerçek niteliğini tek başına değiştirmez; fakat sonradan ispatı zorlaştırabilir. Görüşme mesajlarını, performans yazılarını ve fesih yönündeki işveren açıklamalarını saklamak bu nedenle önemlidir.",
        ],
      },
      {
        title: "Neden yazmak her durumda aynı sonucu doğurmaz",
        paragraphs: [
          "Sıradan istifada gerekçe yazılması zorunlu olmayabilir; ancak ücretin ödenmemesi, sağlık, taciz veya çalışma koşullarındaki ağır ihlal gibi bir haklı neden ileri sürülecekse olayın somut ve tutarlı anlatılması önem taşır. Genel ifadeler, hangi ihlale dayanıldığının anlaşılmasını zorlaştırabilir.",
          "Haklı neden bulunduğu düşüncesi otomatik olarak kabul edileceğiniz veya tüm taleplerin ödeneceği garantisini vermez. İddianın zamanı, işverene yapılan önceki bildirimler ve belgeler değerlendirilir. Ciddi bir ihlal varsa dilekçeyi vermeden önce delillerin korunması ve hukuki nitelendirmenin kontrolü yararlıdır.",
        ],
      },
      {
        title: "İhbar süresi ve ayrılış tarihini planlayın",
        paragraphs: [
          "Belirsiz süreli iş ilişkisinde bildirim süresi gündeme gelebilir. Süre; çalışma kıdemi, sözleşme ve ayrılığın nedenine göre değerlendirilir. Dilekçede ‘bugün ayrılıyorum’ yazmak her durumda risksiz değildir; işverenin ihbar tazminatı iddiası veya devamsızlık kaydıyla karşılaşabilirsiniz.",
          "Son çalışma gününü, izin kullanımını ve devir teslimi yazılı netleştirin. İşverenin bildirimi kabul etmediğini söylemesi, istifa beyanının hiç sonuç doğurmadığı anlamına gelmeyebilir; önemli olan ulaştığını ispatlayabilmektir. Elden teslimde tarihli alındı, kurumsal e-posta veya uygun resmi bildirim yöntemi düşünülmelidir.",
        ],
      },
      {
        title: "Ücret, izin ve teslim belgelerini kontrol edin",
        paragraphs: [
          "Ayrılmadan önce son ücret, fazla çalışma, prim, masraf alacağı ve kullanılmamış yıllık izin kayıtlarını bordrolarla karşılaştırın. İstifa bazı hakların koşullarını etkileyebilir; fakat çalışılmış ücretin veya doğmuş izin ücretinin sırf istifa nedeniyle yok olduğu varsayılmamalıdır. Her kalemin dayanağı ayrı incelenmelidir.",
          "Zimmetli cihaz, anahtar, kart ve dosyaları listeyle teslim edin; kişisel verilerinizi iş cihazından kurallara uygun biçimde ayırın. İbraname veya ‘tüm haklarımı aldım’ metnini tutarları görmeden imzalamayın. Ödeme tarihi, banka kaydı ve belgenin düzenlenme koşulları sonradan önem kazanabilir.",
        ],
      },
      {
        title: "İspat için saklanması gereken kayıtlar",
        paragraphs: [
          "İmzalı iş sözleşmesi, ek protokoller, ücret bordroları, izin kayıtları, dilekçenin teslim kanıtı ve işten ayrılış bildirgesini saklayın. İşveren sistemine erişiminiz ayrılıkla kesilebileceğinden size ait belgeleri hukuka uygun şekilde önceden temin edin; ticari sır veya üçüncü kişilerin verilerini kopyalamayın.",
          "Bu rehber belirli bir olayda istifa etmeniz veya etmemeniz yönünde tavsiye değildir. Haklı fesih, kıdem tazminatı, rekabet yasağı veya baskı iddiası varsa sonuçlar belgeye ve olaya göre değişir. Geri dönüşü zor bir dilekçe vermeden önce kişisel hukuki değerlendirme almak hak kaybı riskini azaltabilir.",
        ],
      },
    ],
    faqs: [
      { question: "İstifa dilekçesine neden yazmak zorunda mıyım?", answer: "Her istifada aynı zorunluluk yoktur. Ancak özel bir haklı nedene dayanıyorsanız olayın açık ve delillerle uyumlu yazılması önemli olabilir; genel bir şablon somut durumu karşılamayabilir." },
      { question: "İşveren istifamı kabul etmezse ayrılamaz mıyım?", answer: "İstifa kural olarak karşı tarafa ulaşan tek taraflı bir beyandır; ancak ihbar süresi ve sözleşmesel sonuçlar ayrıca gündeme gelir. Teslim tarihini ispatlayacak kayıt oluşturun." },
      { question: "İstifa edersem kıdem tazminatı kesin yanar mı?", answer: "Her istifa aynı sonucu doğurmaz. Kanunda tanınan bazı özel hâller veya haklı fesih iddiası farklı değerlendirilebilir. Nedeni ve belgeleri görmeden kesin sonuç söylenemez." },
      { question: "Dilekçeyi e-postayla göndermek yeterli mi?", answer: "E-postanın ulaştığı ve içeriğinin değişmediği ispatlanabilmelidir; sözleşme veya özel durum daha güçlü bir bildirim yöntemi gerektirebilir. Kurumsal kaydı ve gönderim kanıtını saklayın." },
      { question: "İstifadan vazgeçebilir miyim?", answer: "Beyan işverene ulaştıktan sonra tek taraflı geri alma her durumda mümkün olmayabilir. İşverenle yazılı anlaşma veya somut olayın özellikleri belirleyicidir; hızlıca yazılı bildirim yapın." },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    ctaLabel: "İş sözleşmenizdeki riskleri kontrol edin",
  }),
  createDailyPage({
    slug: "isveren-maastan-kesinti-yapabilir-mi",
    h1: "İşveren maaştan kesinti yapabilir mi?",
    metaTitle: "İşveren maaştan kesinti yapabilir mi? Haklarınız 2026",
    metaDescription:
      "Eksik kasa, hasar, ceza veya devamsızlık gerekçesiyle ücret kesintisinin sınırlarını; bordro itirazı ve belge kontrolünü öğrenin.",
    keywords: ["işveren maaştan kesinti", "ücret kesintisi yasal mı", "bordroda kesinti", "işçi maaş kesintisi"],
    intro:
      "İşverenin ücret üzerinde sınırsız tasarruf yetkisi yoktur. Vergi ve sigorta gibi yasal kesintiler, disiplin cezası niteliğindeki kesintiler, avans mahsubu ve işçiye yüklenen zarar iddiası farklı kurallara tabidir. ‘Şirket kararı’ veya sözleşmedeki genel bir madde her kesintiyi kendiliğinden geçerli kılmaz. Kesintinin dayanağı, miktarı, bordro açıklaması ve işçinin önceden bilgilendirilip bilgilendirilmediği ayrı ayrı incelenmelidir.",
    finalChecks: [
      "Kesintiye itiraz etmeden önce sözleşme, ilgili ayın puantajı, bordro ve banka ödemesini eşleştirin. İşverenden kesintinin adı, hukuki veya sözleşmesel dayanağı, hesaplama yöntemi ve varsa olay tutanağını yazılı isteyin. Hasar iddiasında kusur ve gerçek zarar belgesi bulunup bulunmadığını ayrıca kontrol edin.",
      "Bordroya çekince koyacaksanız genel bir memnuniyetsizlik yerine itiraz ettiğiniz kalemi ve nedeni açıkça belirtin; teslim kaydını saklayın. Kesintinin devam etmesi, ücretin önemli bölümünü etkilemesi veya istifa baskısıyla birlikte uygulanması hâlinde yalnızca insan kaynakları açıklamasıyla yetinmeden iş hukukuna özgü başvuru seçeneklerini değerlendirin.",
    ],
    sections: [
      {
        title: "Kesintinin hukuki dayanağı açıklanmalı",
        paragraphs: [
          "Bordroda görülen her azalma hukuka aykırı değildir; yasal yükümlülükler ve çalışanın aldığı avans gibi açık mahsuplar bulunabilir. Buna karşılık belirsiz ‘ceza’, ‘zarar’ veya ‘performans’ başlığıyla tek taraflı kesinti yapılması tartışma yaratır. İşveren, hesaplamayı ve dayandığı sözleşme ya da mevzuat hükmünü gösterebilmelidir.",
          "İş sözleşmesinde kesinti maddesi bulunması da sınırsız yetki vermez. Maddenin açık, öngörülebilir ve emredici kurallarla uyumlu olması gerekir. İşçi aleyhine ağır veya ne zaman uygulanacağı belirsiz hükümler ayrıca değerlendirilebilir; imza bulunması her uygulamanın peşinen kabul edildiği anlamına gelmez.",
        ],
      },
      {
        title: "Hasar ve kasa açığı iddiaları",
        paragraphs: [
          "İşyerindeki zarar doğrudan çalışanın ücretinden kesilmeden önce olay, kusur, zarar miktarı ve illiyet bağı araştırılmalıdır. Bir ekipte çalışılması veya eşyanın zimmetli olması tek başına bütün zararı belirli çalışana yüklemeyebilir. Tutanak, kamera kaydı, teknik rapor ve savunma süreci somut olayda önem taşır.",
          "Kasa açığında vardiya teslim kayıtları, kasaya erişen kişiler ve sayım yöntemi incelenmelidir. İşçiden baskıyla borç ikrarı ya da boş senet alınması ayrı hukuki riskler yaratır. İtirazınız varsa tutanağa çekince koyun ve imzaladığınız belgenin bir örneğini aynı gün isteyin.",
        ],
      },
      {
        title: "Devamsızlık, geç kalma ve disiplin kesintisi",
        paragraphs: [
          "Çalışılmayan süreye ilişkin ücret hesabı ile disiplin cezası aynı şey değildir. Geç kalınan sürenin bordroya etkisi çalışma kayıtlarıyla ölçülmelidir; bunun üstüne keyfi bir ceza eklenmesi farklı kurallara tabi olabilir. İç yönetmelik ve toplu iş sözleşmesi varsa ilgili hükümler de kontrol edilmelidir.",
          "Ücret kesme cezasında nedenin ve uygulamanın yazılı olması, kanuni sınırlara uyulması gerekir. Aynı olay için orantısız veya tekrarlanan yaptırımlar uyuşmazlık doğurabilir. Puantaj, vardiya listesi ve savunma yazısını saklayarak bordrodaki rakamla karşılaştırın.",
        ],
      },
      {
        title: "Bordroya itiraz ve alacak kaydı",
        paragraphs: [
          "Bordroyu imzalamadan önce brüt ücret, ek ödemeler ve tüm kesintileri inceleyin. İtirazınız varsa ‘kesintiye itirazım vardır’ gibi açık bir çekinceyi tarih ve gerekçeyle yazılı bildirin. Elektronik bordroda da görüntüleme ve itiraz kaydını saklamak önemlidir; sessizlik her durumda kabul sayılmasa da ispatı zorlaştırabilir.",
          "İnsan kaynaklarından kesinti dökümü, dayanak belge ve hesaplama isteyin. Görüşmeyi mümkünse kurumsal e-postayla teyit edin. Ücret alacaklarında süre ve arabuluculuk gibi usul başlıkları gündeme gelebileceğinden uzun süre beklemek yerine belgeleri erken toplamak daha güvenlidir.",
        ],
      },
      {
        title: "Ücret gizliliği ve misilleme riski",
        paragraphs: [
          "Ücret itirazı nedeniyle çalışanın kişisel verileri işyerinde yayılmamalı veya baskı aracı yapılmamalıdır. İşçi de bordro gibi belgeleri korurken diğer çalışanların verilerini izinsiz paylaşmamalıdır. Baskı, tehdit ya da istifaya zorlama varsa tarihli mesajlar ve tanık olabilecek olaylar düzenli kaydedilmelidir.",
          "Bu rehber, belirli bir kesintinin kesin olarak hukuka aykırı olduğu sonucunu vermez. Kesintinin türü, sözleşme, toplu düzenleme ve olay belgeleri sonucu değiştirir. Düzenli veya yüksek etkili kesinti, işten çıkarma tehdidi ya da imza baskısı varsa kişisel hukuki destek alınması uygun olabilir.",
        ],
      },
    ],
    faqs: [
      { question: "İşveren kırılan ürünü maaşımdan kesebilir mi?", answer: "Zararın varlığı, miktarı, kusur ve sorumluluk incelenmeden otomatik kesinti yapılması tartışmalıdır. Olay tutanağını, zimmet kaydını ve kesinti hesabını isteyin; belgeyi çekincesiz imzalamayın." },
      { question: "Geç kaldığım için bir günlük ücret kesilebilir mi?", answer: "Çalışılmayan sürenin hesabı ile disiplin cezası ayrıdır. Puantaj ve işyeri düzenlemesi görülmeden orantılılık hakkında kesin sonuç verilemez; kesinti açıklamasını yazılı talep edin." },
      { question: "Bordroyu imzaladıysam itiraz hakkım biter mi?", answer: "İmzanın etkisi belgenin içeriğine, ödeme kaydına ve çekinceye göre değerlendirilir. Haklar otomatik olarak her durumda sona ermese de ispat zorlaşabilir; gecikmeden yazılı itiraz edin." },
      { question: "Prim kesintisi de maaş kesintisi sayılır mı?", answer: "Primin kazanılma koşulları sözleşme, işyeri uygulaması ve performans ölçütlerine bağlıdır. Kazanılmış bir primle henüz koşulu oluşmamış değişken ödeme aynı değerlendirilmez." },
      { question: "Kesilen ücreti nasıl talep edebilirim?", answer: "Önce bordro, banka kaydı ve kesinti dayanağını toplayıp işverene yazılı başvurabilirsiniz. Sonraki yol ve zorunlu usuller talebin niteliğine göre değişeceğinden güncel hukuki değerlendirme alın." },
    ],
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    ctaLabel: "İş sözleşmesi risklerini kontrol edin",
  }),
  createDailyPage({
    slug: "kira-depozitosu-bankaya-yatirma",
    h1: "Kira depozitosu bankaya nasıl yatırılır?",
    metaTitle: "Kira depozitosu bankaya yatırma: Güvenli yöntem 2026",
    metaDescription:
      "Konut ve çatılı işyeri depozitosunda banka hesabı, açıklama, iade, mahsup ve delil kontrolünü kiracı ve ev sahibi için öğrenin.",
    keywords: ["kira depozitosu bankaya yatırma", "depozito hesabı", "kira depozitosu iadesi", "depozito banka açıklaması"],
    intro:
      "Kira depozitosu, sözleşme sonunda ortaya çıkabilecek borçlar için güvence sağlar; son ay kirası veya ev sahibinin serbestçe kullanacağı bir ödeme değildir. Para olarak verilen güvencenin bankada tutulmasına ilişkin kurallar, tarafların tek başına çekim yapmasını sınırlamayı amaçlar. Uygulamada sıradan havale ile güvence hesabı birbirine karıştırılabildiğinden, ödeme öncesinde hesap türü, açıklama ve sözleşme maddesi birlikte netleştirilmelidir.",
    finalChecks: [
      "Ödeme yapmadan önce sözleşmedeki depozito tutarını, güvence amacını ve iade şartını banka belgesiyle karşılaştırın. Hesabın gerçekten taraflardan birinin tek başına çekemeyeceği yapıda olup olmadığını bankanın resmi açıklamasından doğrulayın. Dekont açıklamasında adres ve depozito niteliği görünürken kira ödemesiyle karışmamasını sağlayın.",
      "Kira sonunda giriş tutanağı, çıkış tutanağı, fotoğraflar ve anahtar teslim kaydı olmadan mahsup tartışmasına girmeyin. Ev sahibinden kesinti iddiasını kalem ve belge bazında istemek, kiracının da ödenmemiş borçlarını kontrol etmesi gerekir. Banka hesabının çözülme şartı belirsizse işlem öncesi bankadan ve gerekirse hukukçudan güncel bilgi alın.",
    ],
    sections: [
      {
        title: "Depozito tutarı ve sözleşme maddesi",
        paragraphs: [
          "Sözleşmede depozitonun tutarı, para veya kıymetli evrak olarak verildiği, hangi borçları güvence altına aldığı ve iade süreci açıkça yazılmalıdır. Kanuni sınırları aşan ya da her türlü belirsiz zararı kiracıya yükleyen hükümler ayrıca değerlendirilir. Ödeme, kira bedeli ve emlak hizmet bedelinden ayrı gösterilmelidir.",
          "Teslimden önce demirbaş listesi ve evin mevcut durumu fotoğraf, video ve tutanakla kaydedilirse depozito tartışması azalır. Mevcut çizik, arıza veya sayaç değerleri yazılmalıdır. Ev sahibinin ‘sonra düzeltiriz’ sözü yerine iki tarafın imzaladığı tarihli teslim belgesi daha güçlü bir kayıt sağlar.",
        ],
      },
      {
        title: "Bankadaki güvence hesabı nasıl kurulmalı?",
        paragraphs: [
          "Para olarak kararlaştırılan güvence için tarafların onayı olmadan çekime izin vermeyen uygun banka çözümü araştırılmalıdır. Bankaların ürün adı ve işlem süreci değişebileceğinden şubeden veya resmi kanaldan güncel koşulları sorun. Yalnızca ev sahibinin kişisel hesabına yapılan standart havale, korumalı güvence hesabıyla aynı sonucu vermeyebilir.",
          "Hesap açılışında kiracı, kiraya veren, kiralananın adresi ve kira sözleşmesiyle bağlantı doğru kurulmalıdır. Bankanın verdiği sözleşme ve dekontların birer örneğini iki taraf da saklamalıdır. Hesabın masrafı, faiz getirisi ve kapanış şartları anlaşılmadan imza atılmamalıdır.",
        ],
      },
      {
        title: "Havale açıklaması ve ödeme kanıtı",
        paragraphs: [
          "Ödeme açıklamasında ‘depozito’, kiralananın adresi ve sözleşme tarihi gibi ayırt edici bilgiler kullanılabilir. ‘Kira’ yazılması ödemenin niteliği konusunda karışıklık yaratabilir. Nakit ödeme zorunluysa tutar, amaç, tarih ve taraf bilgilerini içeren imzalı makbuz alın; fakat bankadaki güvence düzeninin ayrıca değerlendirilmesi gerekir.",
          "Dekont tek başına evin teslim durumunu veya depozitonun hangi zararlar için kullanılacağını göstermez. Bu nedenle kira sözleşmesi, teslim tutanağı ve banka belgesi bir arada saklanmalıdır. Başkasının hesabından ödeme yapılırsa kimin adına ve hangi kira ilişkisi için gönderildiği açıkça belirtilmelidir.",
        ],
      },
      {
        title: "Kira sonunda iade ve mahsup",
        paragraphs: [
          "Anahtar tesliminde yeni bir tutanak düzenleyin; sayaçlar, demirbaşlar ve görülen hasarlar yazılsın. Olağan kullanımdan kaynaklanan eskime ile kiracının sorumlu olabileceği zarar aynı değildir. Kiraya veren, soyut ‘boya masrafı’ ifadesi yerine iddiayı fotoğraf, fatura ve sözleşmeyle ilişkilendirmelidir.",
          "Bankadaki güvencenin çözülmesi tarafların anlaşması, kesinleşen takip veya karar gibi şartlara bağlı olabilir. Kira bittiği gün paranın otomatik serbest kalacağı varsayılmamalıdır. Bankanın resmi prosedürü ve kanundaki süreler güncel somut olaya göre kontrol edilmelidir.",
        ],
      },
      {
        title: "Uyuşmazlığı önleyen belge düzeni",
        paragraphs: [
          "Kira boyunca onarım taleplerini, aidat ve kira ödemelerini, ev sahibinin onaylarını yazılı saklayın. Depozitoyu son kira bedeline kendiliğinizden saymak taraflar arasında yeni borç tartışması doğurabilir. Böyle bir mahsup ancak hukuki durum ve tarafların açık anlaşması gözetilerek yapılmalıdır.",
          "Bu rehber belirli bir banka ürünü önermez ve depozitonun kesin iade edileceğini garanti etmez. Sözleşme tarihi, kiralananın türü ve teslimdeki durum sonucu etkiler. Yüksek zarar iddiası, imzasız teslim veya güvence hesabına erişim sorunu varsa belgelerle birlikte hukuki değerlendirme alın.",
        ],
      },
    ],
    faqs: [
      { question: "Depozito ev sahibinin normal hesabına gönderilebilir mi?", answer: "Fiilen gönderilebilir; ancak para güvencesi için öngörülen korumalı banka düzeniyle aynı hukuki güvenceyi sağlamayabilir. Ödeme öncesi hesap türünü ve çekim şartlarını bankadan yazılı doğrulayın." },
      { question: "Havale açıklamasına ne yazılmalı?", answer: "Ödemenin depozito olduğu, kiralananın adresi ve mümkünse sözleşme tarihi açıkça belirtilmelidir. Kişisel verileri gereksiz yaymadan işlemi diğer ödemelerden ayıracak bilgi kullanın." },
      { question: "Depozito son ay kirasına sayılır mı?", answer: "Depozito ile kira bedeli farklı amaç taşır. Tarafların açık anlaşması veya somut hukuki dayanak olmadan son ayı ödememek temerrüt tartışması yaratabilir." },
      { question: "Ev sahibi depozitodan boya bedeli kesebilir mi?", answer: "Olağan eskime ile kiracının verdiği zarar ayrılmalıdır. Teslim tutanakları, kullanım süresi, fotoğraflar ve gerçek masraf belgeleri görülmeden otomatik kesinti sonucu çıkarılamaz." },
      { question: "Depozito iade edilmezse hangi belgeler gerekir?", answer: "Kira sözleşmesi, ödeme dekontu, giriş ve çıkış tutanakları, fotoğraflar, anahtar teslim kaydı ve yazılı iade talebi temel belgelerdir. Başvuru yolu somut uyuşmazlığa göre belirlenir." },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    ctaLabel: "Kira sözleşmenizi analiz edin",
  }),
  createDailyPage({
    slug: "ev-sahibi-eve-izinsiz-girebilir-mi",
    h1: "Ev sahibi kiracının evine izinsiz girebilir mi?",
    metaTitle: "Ev sahibi eve izinsiz girebilir mi? Kiracı hakları",
    metaDescription:
      "Anahtarı bulunan ev sahibinin eve giriş sınırları, bakım ve gösterim randevusu, acil durum ve delil toplama adımlarını öğrenin.",
    keywords: ["ev sahibi eve izinsiz girebilir mi", "kiracının özel hayatı", "ev sahibi anahtarla girdi", "kiralık eve giriş"],
    intro:
      "Kira sözleşmesi devam ederken konutun kullanım hakkı kiracıdadır. Ev sahibinin tapu maliki olması, istediği zaman anahtarla içeri girebileceği anlamına gelmez. Bakım, kontrol veya yeni kiracıya gösterme ihtiyacı bulunsa bile zamanlama ve yöntem kiracının konut dokunulmazlığı ile özel hayatına saygılı olmalıdır. Acil tehlike hâlleri ise olağan randevulu girişten farklı değerlendirilir.",
    finalChecks: [
      "Eve erişim talebi geldiğinde amacı, gelecek kişileri, tarih ve tahmini süreyi yazılı netleştirin. Uygun değilseniz makul alternatif zaman önerin; talebi tamamen yanıtsız bırakmayın. Fotoğraf çekimi, anahtar kullanımı ve evde bulunma koşulları için açık sınırlar koyarak mesajların tamamını saklayın.",
      "Habersiz giriş yaşandıysa önce güvenliği sağlayıp kapı, kamera, mesaj ve tanık kayıtlarını hızla koruyun. Ev sahibine olayın tekrar edilmemesini sakin ve yazılı biçimde bildirin. Tehdit, eşya kaybı, gizli görüntüleme veya tekrarlanan giriş varsa olayı yalnızca kira tartışması saymadan uygun resmi ve hukuki desteği değerlendirin.",
    ],
    sections: [
      {
        title: "Mülkiyet hakkı sınırsız giriş yetkisi vermez",
        paragraphs: [
          "Kiracı, sözleşme süresince evi sözleşmeye uygun kullanma hakkına sahiptir. Ev sahibinin yedek anahtarı bulunması, önceden haber vermeden giriş izni sayılmaz. Sözleşmede genel bir ‘ev sahibi dilediğinde kontrol eder’ maddesi varsa bile bunun özel hayatı tamamen ortadan kaldıracak şekilde uygulanması hukuken tartışmalıdır.",
          "İzinsiz giriş yalnızca kira hukuku bakımından değil, olayın koşullarına göre başka hukuki sorumluluklar bakımından da önem taşıyabilir. Girişin amacı, kullanılan yöntem, evde birinin bulunup bulunmadığı ve herhangi bir eşyanın zarar görmesi değerlendirmeyi etkiler. Güvenliğiniz açısından doğrudan çatışmaya girmeden kayıtlı iletişim kurun.",
        ],
      },
      {
        title: "Onarım ve kontrol için randevu",
        paragraphs: [
          "Kiracı, gerekli onarım veya ayıbın incelenmesi için makul ölçüde erişim sağlamak durumunda kalabilir. Buna karşılık ev sahibi veya usta, uygun gün ve saat konusunda önceden haber vermelidir. Talebin amacı, gelecek kişiler ve tahmini süre yazılı olarak paylaşılırsa anlaşmazlık azalır.",
          "Kiracı her talebi süresiz biçimde engellememeli; ev sahibi de randevuyu baskı aracına dönüştürmemelidir. Çalışma saatleri, sağlık ve güvenlik ihtiyacı gözetilerek alternatif zaman önerilebilir. Eve girildiğinde yalnızca bildirilen onarım alanında işlem yapılması ve kişisel eşyalara müdahale edilmemesi beklenir.",
        ],
      },
      {
        title: "Evi alıcıya veya yeni kiracıya gösterme",
        paragraphs: [
          "Satış veya yeniden kiralama döneminde evin gösterilmesi gündeme gelebilir. Bu ihtiyaç, habersiz ve sık giriş hakkı oluşturmaz. Randevular makul sıklıkta, uygun saatlerde ve kiracıyla koordine edilmelidir. Gelen kişilerin kim olduğu ve emlak danışmanının yetkisi önceden açıklanmalıdır.",
          "Fotoğraf veya video çekimi ayrıca kişisel veri ve özel hayat sorunu doğurabilir. Kiracının eşyaları, aile fotoğrafları veya güvenlik düzeni izinsiz yayımlanmamalıdır. İlan çekimi yapılacaksa kapsamı ve görüntülerin nerede kullanılacağı konusunda açık mutabakat sağlamak daha güvenlidir.",
        ],
      },
      {
        title: "Acil durumlarda değerlendirme farklı olabilir",
        paragraphs: [
          "Yangın, yoğun su sızıntısı veya kişilerin güvenliğini tehdit eden gerçek ve yakın tehlikede zararı önlemek için hızlı müdahale gerekebilir. Bu durum, sıradan bakım talebiyle aynı değildir. Müdahale tehlikeyle orantılı olmalı ve mümkünse kiracı, apartman yönetimi veya acil birimler derhal bilgilendirilmelidir.",
          "‘Acil durum vardı’ iddiası sonradan sınırsız bir gerekçeye dönüştürülemez. Arıza kaydı, komşu bildirimi, usta raporu veya müdahale saati olayın niteliğini gösterebilir. Tehlike giderildikten sonra evin diğer bölümlerinde kontrol veya eşya incelemesi yapılması ayrıca değerlendirilir.",
        ],
      },
      {
        title: "İzinsiz girişte güvenli biçimde delil toplayın",
        paragraphs: [
          "Kapı veya kilitte iz, bina kamera kaydı, komşu gözlemi, mesajlar ve ev sahibinin kabul içeren açıklamalarını hukuka uygun biçimde saklayın. Olay tarihini ve eksilen ya da zarar gören eşyaları listeleyin. Acil güvenlik riski varsa ilgili resmi birimlerle iletişim kurun; tek başınıza fiziksel müdahaleye yönelmeyin.",
          "Kilidin değiştirilmesi, anahtar teslim yükümlülüğü ve apartman sistemi kira sözleşmesine ve somut güvenlik durumuna göre değerlendirilmelidir. Bu rehber kişisel hukuki tavsiye değildir. Tekrarlanan giriş, tehdit, eşya zararı veya gizli görüntüleme şüphesi varsa gecikmeden profesyonel destek almak uygun olabilir.",
        ],
      },
    ],
    faqs: [
      { question: "Ev sahibinde yedek anahtar bulunabilir mi?", answer: "Anahtarın bulunması tek başına giriş izni vermez. Teslim sırasında yedek anahtarın kimde kaldığını ve hangi acil durumda kullanılabileceğini yazılı netleştirmek uyuşmazlığı azaltır." },
      { question: "Ev sahibi haber verip istediği saatte gelebilir mi?", answer: "Sadece haber vermek her zamanı otomatik olarak uygun yapmaz. Amaç, sıklık ve kiracının koşulları gözetilerek makul bir randevu belirlenmelidir." },
      { question: "Evi göstermeyi tamamen reddedebilir miyim?", answer: "Kiracının kullanım ve özel hayat hakkı korunur; ancak makul gösterim talebinin sürekli engellenmesi de sorun yaratabilir. Uygun saat ve sınırlı randevu önererek yazılı uzlaşma aranmalıdır." },
      { question: "Ev sahibi izinsiz girdiyse ne yapmalıyım?", answer: "Önce güvenliğinizi sağlayın, tarihli delilleri koruyun ve girişin tekrar edilmemesini yazılı bildirin. Olayın ağırlığına göre resmi başvuru ve hukuki destek seçeneklerini değerlendirin." },
      { question: "Su kaçağında ev sahibi kapıyı açtırabilir mi?", answer: "Yakın ve ciddi zarar tehlikesinde orantılı acil müdahale gerekebilir. Mümkünse kiracı ve yetkili birimler bilgilendirilmeli; müdahale yalnızca tehlikeyi giderecek kapsamda tutulmalıdır." },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    ctaLabel: "Kira sözleşmenizi kontrol edin",
  }),
  createDailyPage({
    slug: "kiraci-kombi-bozulursa-kim-oder",
    h1: "Kiracı otururken kombi bozulursa masrafı kim öder?",
    metaTitle: "Kombi bozulursa kim öder? Kiracı–ev sahibi rehberi",
    metaDescription:
      "Kombi arızasında bakım, büyük onarım, kullanıcı hatası ve acil servis masrafının kime ait olacağını belgelerle değerlendirin.",
    keywords: ["kombi bozulursa kim öder", "kiracı kombi masrafı", "ev sahibi kombi tamiri", "kombi bakım sorumluluğu"],
    intro:
      "Kombi arızasında masrafın kime ait olduğu yalnızca ‘kiracı kullanıyor’ veya ‘cihaz ev sahibinin’ denilerek belirlenemez. Olağan kullanım gideri, periyodik bakım, cihazın yaşı, yapısal arıza ve kullanıcı kusuru ayrılmalıdır. Kiracı arızayı gecikmeden bildirmeli; ev sahibi de konutun kullanıma elverişli tutulmasına ilişkin sorumluluğunu değerlendirmelidir. Servis çağırmadan önce yazılı bildirim ve arıza tespiti yapılması masraf tartışmasını azaltır.",
    finalChecks: [
      "Servis çağırmadan önce hata kodunu, cihazın yaşını, önceki bakım kaydını ve arızanın başladığı zamanı belgeleyin. Ev sahibine güvenlik riski ve kullanım kaybını yazılı bildirerek servis seçimi ile ödeme onayı isteyin. Servis fişinde yalnızca değişen parçanın değil arıza nedeni ve olası kullanıcı etkisinin de yazmasını sağlayın.",
      "Onarım sonrası fatura, rapor, eski parça kaydı ve ödeme dekontunu sözleşmeyle birlikte saklayın. Masrafı kiradan düşme konusunda yazılı anlaşma yoksa tek taraflı eksik ödeme yapmayın. Isınma tamamen durmuşsa, gaz veya su tehlikesi varsa ya da taraflar pahalı değişimde anlaşamıyorsa hızlı ve somut olaya özgü destek alın.",
    ],
    sections: [
      {
        title: "Küçük bakım ile esaslı onarımı ayırın",
        paragraphs: [
          "Filtre temizliği, kullanım kaynaklı basit ayar veya olağan küçük bakım ile ana kart, eşanjör ya da tesisat gibi yüksek etkili arızalar aynı değildir. Giderin niteliği, kira sözleşmesi ve kanuni yükümlülükler birlikte incelenir. Sözleşmedeki ‘tüm tamirat kiracıya aittir’ ifadesi her arızayı otomatik olarak kiracıya yüklemeyebilir.",
          "Cihazın teslimde çalışır olup olmadığı ve bakım geçmişi önemlidir. Eski, sık arızalanan veya ekonomik ömrüne yaklaşmış bir kombide parça yıpranması kullanıcı hatasından farklıdır. Giriş tutanağı, önceki servis fişleri ve cihaz seri numarası bu ayrımı destekleyebilir.",
        ],
      },
      {
        title: "Arızayı hemen ve yazılı bildirin",
        paragraphs: [
          "Kiracı; hata kodunu, arızanın başladığı tarihi ve ısınma ya da sıcak su durumunu ev sahibine yazılı bildirmelidir. Geciken bildirim zararın büyümesine neden olursa sorumluluk tartışması değişebilir. Mesajda makul süre içinde yetkili servis yönlendirmesi ve ödeme konusunda onay istemek yararlı olur.",
          "Gaz kokusu, su sızıntısı veya güvenlik riski varsa cihazı bilinçsizce sökmeyin; ilgili acil hat ve yetkili servis talimatlarını izleyin. Can ve mal güvenliği önceliklidir. Acil müdahale yapılmışsa neden beklenemediğini, kimin çağrıldığını ve yapılan işlemi belgelerle kaydedin.",
        ],
      },
      {
        title: "Servis raporu masraf paylaşımını belirler",
        paragraphs: [
          "Servisten yalnızca ücret fişi değil, arızanın nedeni, değişen parça, cihaz durumu ve kullanıcı hatası bulunup bulunmadığını açıklayan rapor isteyin. ‘Parça değişti’ ibaresi tek başına sorumluluğu açıklamaz. Yetkisiz müdahale garanti veya güvenlik sorununa yol açabileceğinden servis seçimini ev sahibiyle koordine edin.",
          "Teklif ve onarım bedelini işlemden önce paylaşın. Ev sahibinin onayı olmadan pahalı parça değişimi yapılması, bedelin geri alınmasını zorlaştırabilir; buna karşılık acil ve zorunlu müdahalenin koşulları ayrıca değerlendirilir. Fatura, ödeme dekontu ve eski parçaya ilişkin kayıt saklanmalıdır.",
        ],
      },
      {
        title: "Kira bedelinden kendiliğinden kesinti yapmayın",
        paragraphs: [
          "Kiracının ödediği onarım bedelini sonraki kiradan tek taraflı düşmesi, kira borcu ve temerrüt tartışması doğurabilir. Masrafın kimin sorumluluğunda olduğu ve mahsup şartları netleşmeden ödeme planını değiştirmeyin. Ev sahibi kabul ediyorsa tutar, ay ve kalan kira yazılı olarak belirtilmelidir.",
          "Ev sahibi zorunlu onarımı yapmıyorsa kiracının kullanabileceği yollar arızanın ağırlığı, bildirim ve delillere göre değişebilir. Isınmanın tamamen kesilmesiyle küçük verim sorunu aynı değildir. İnternetteki genel ihtar şablonunu kullanmadan önce sözleşme ve olay tarihlerini doğrulayın.",
        ],
      },
      {
        title: "Teslim ve periyodik bakım kaydı",
        paragraphs: [
          "Kira başlangıcında kombinin marka, model, çalışma durumu ve son bakım tarihi tutanağa yazılmalıdır. Kullanım kılavuzu ve garanti belgesi kiracıya bırakılabilir. Kiracı da cihazı talimatlara uygun kullanmalı, basınç veya hata uyarısını görmezden gelmemeli ve izinsiz teknik değişiklik yaptırmamalıdır.",
          "Bu rehber her kombi masrafının kesin olarak bir tarafa ait olduğunu söylemez. Arıza nedeni, sözleşme, teslim durumu ve müdahalenin aciliyeti sonucu etkiler. Taraflar anlaşamıyorsa servis raporu ve tüm yazışmalarla birlikte hukuki değerlendirme alınması, soyut iddialardan daha sağlıklı olur.",
        ],
      },
    ],
    faqs: [
      { question: "Kombi yıllık bakımını kiracı mı öder?", answer: "Olağan kullanım ve periyodik bakım ile cihazın yenilenmesi veya esaslı arızası ayrılmalıdır. Sözleşme ve bakımın niteliği görülmeden her durumda geçerli kesin cevap verilemez." },
      { question: "Ana kart bozulursa masraf ev sahibine mi aittir?", answer: "Parçanın yıpranma, elektrik sorunu veya kullanıcı müdahalesi nedeniyle bozulduğu servis raporuyla araştırılmalıdır. Büyük parça olması tek başına yeterli değildir; arızanın kaynağı belirleyicidir." },
      { question: "Ev sahibine haber vermeden servis çağırabilir miyim?", answer: "Güvenlik acili yoksa önce yazılı bildirim ve onay almak daha güvenlidir. Acil müdahalede ise tehlikeyi, servis raporunu ve ödemeyi ayrıntılı biçimde belgeleyin." },
      { question: "Tamir ücretini kiradan düşebilir miyim?", answer: "Tek taraflı mahsup kira borcu tartışması yaratabilir. Sorumluluk ve tutar netleştirilip mümkünse ev sahibinin yazılı kabulü alınmadan kirayı eksik yatırmayın." },
      { question: "Ev sahibi kombiyi hiç tamir ettirmezse ne olur?", answer: "Arızanın konut kullanımına etkisi, bildirimler ve geçen süre önemlidir. Uygun başvuru yolu somut olaya göre değişir; yazılı kayıtlarla hukuki destek değerlendirin." },
    ],
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    ctaLabel: "Kira sözleşmenizi analiz edin",
  }),
  createDailyPage({
    slug: "internetten-alinan-urun-iade-edilmezse",
    h1: "İnternetten alınan ürünün iadesi kabul edilmezse ne yapılır?",
    metaTitle: "Online ürün iadesi reddedildi: Adım adım hak arama",
    metaDescription:
      "Cayma bildirimi, iade kargosu, istisnalar, para iadesi ve satıcı reddinde saklanacak belgeler için güncel tüketici rehberi.",
    keywords: ["internetten alınan ürün iade edilmezse", "online alışveriş iade reddi", "cayma hakkı", "para iadesi yapılmadı"],
    intro:
      "İnternet alışverişlerinde tüketici çoğu durumda belirli koşullarla cayma hakkına sahiptir; ancak ürün ve hizmet türüne göre istisnalar bulunabilir. Satıcının yalnızca ‘kutusu açıldı’ ya da ‘şirket politikamız’ demesi her ret kararını haklı yapmaz. Buna karşılık kişiye özel, hızlı bozulan veya niteliği gereği iadesi sınırlı bazı ürünlerde farklı kurallar uygulanabilir. Sonuç için sipariş tarihi, teslim, cayma bildirimi ve ürünün durumu birlikte incelenmelidir.",
    finalChecks: [
      "Başvurudan önce satıcı unvanı, ürün türü, teslim tarihi, cayma bildirimi ve iade kargosunun teslim kaydını tek kronolojide toplayın. Ürünün olası istisna kapsamını sözleşme ve resmi düzenlemeyle karşılaştırın; yalnızca platformdaki kısa ret koduna dayanmayın. İstediğiniz sonucun bedel iadesi mi başka bir çözüm mü olduğunu açık yazın.",
      "Satıcıya son yazılı talebi gönderirken sipariş numarasını, bildirim tarihlerini ve eklediğiniz kanıtları listeleyin. Platform konuşmalarını dışarı aktarın ve banka hareketini kontrol edin. Görevli merci ile güncel parasal sınırı resmi kaynaktan doğrulamadan başvuru formunu tamamlamayın; dijital içerik veya özel üretim üründe kişisel değerlendirme alın.",
    ],
    sections: [
      {
        title: "Önce cayma hakkının uygulanıp uygulanmadığını kontrol edin",
        paragraphs: [
          "Alışverişin gerçekten mesafeli sözleşme olup olmadığı, satıcının ticari amaçla hareket edip etmediği ve satın alınan şeyin ürün mü hizmet mi olduğu belirlenmelidir. Sosyal medya üzerinden verilen siparişler de koşullarına göre mesafeli satış sayılabilir; ancak bireysel ikinci el satış aynı tüketici korumasına tabi olmayabilir.",
          "Cayma hakkının istisnaları ürünün niteliğine göre değerlendirilir. Kişisel talebe göre üretilen, çabuk bozulabilen veya koruyucu unsuru açıldığında sağlık ve hijyen açısından iadesi uygun olmayan bazı ürünler farklı olabilir. Satıcı, genel bir kategori adıyla yetinmek yerine reddin somut dayanağını açıklamalıdır.",
        ],
      },
      {
        title: "Cayma bildirimini ispatlanabilir yapın",
        paragraphs: [
          "İade ekranından başvuru yaptıysanız başvuru numarası ve ekran görüntüsünü saklayın. Ayrıca satıcının kayıtlı iletişim kanalına sipariş numarası, ürün ve cayma iradesini açıkça bildirin. Yalnızca kargoyu geri göndermek bazı durumlarda bildirimin içeriğini ispatlamaya yetmeyebilir.",
          "Teslim ve bildirim tarihleri süre bakımından önemlidir. Hafta sonu, ön bilgilendirme eksikliği veya hizmetin başlaması gibi ayrıntılar değerlendirmeyi etkileyebilir. Kesin süre hesabı yapmadan ‘nasıl olsa iade hakkım var’ diyerek ürünü uzun süre kullanmaya devam etmek uyuşmazlığı büyütebilir.",
        ],
      },
      {
        title: "İade kargosunu doğru belgeleyin",
        paragraphs: [
          "Satıcının bildirdiği iade yöntemi ve taşıyıcıyı kontrol edin. Ürünü aksesuarları, faturası ve size teslim edilen parçalarla güvenli paketleyin; paketleme öncesi çalışır durum ve içerik videosu çekmek yararlı olabilir. Kargo teslim fişinde takip numarası ve paket ağırlığının görünmesini sağlayın.",
          "Kargonun satıcıya ulaştığını takip kaydıyla doğrulayın. ‘Boş kutu geldi’, ‘ürün kullanılmış’ veya ‘parça eksik’ iddiasında çıkış fotoğrafları ve kargo kayıtları önem kazanır. Taşıma sırasında hasar varsa taşıyıcı tutanağı da ayrıca istenebilir.",
        ],
      },
      {
        title: "Para iadesi gecikirse yazılı talep gönderin",
        paragraphs: [
          "Satıcı ürünü aldıktan sonra iadenin hangi ödeme aracına ve ne zaman yapıldığını yazılı açıklamalıdır. Banka işlemi ile satıcının iade talimatı arasında süre farkı olabilir; bu nedenle provizyon veya referans numarası isteyin. Hediye çeki dayatılması, ilk ödeme yöntemi ve açık onayınıza göre ayrıca değerlendirilir.",
          "Pazaryeri ile satıcının sorumlulukları aynı olmayabilir. Önce sipariş ekranındaki satıcı unvanını, faturayı ve mesafeli sözleşmeyi bulun. Platform destek kaydı açarken yalnızca sohbet mesajına güvenmeyin; kayıt numarası, ret gerekçesi ve eklediğiniz belgeleri dışarı aktararak saklayın.",
        ],
      },
      {
        title: "Başvuru dosyanızı hazırlayın",
        paragraphs: [
          "Sipariş özeti, ön bilgilendirme formu, fatura, teslim kaydı, cayma bildirimi, iade kargo fişi, satıcının ret mesajı ve banka ekstresini tarih sırasıyla toplayın. Talebinizi ürün bedeli, teslimat gideri veya başka kalemler bakımından açıklaştırın; doğrulayamadığınız zararları kesin tutar gibi ileri sürmeyin.",
          "Uyuşmazlığın değeri ve niteliğine göre tüketici başvuru yolları değişebilir; parasal görev sınırları zamanla güncellendiği için başvuru tarihindeki resmi bilgiyi kontrol edin. Bu rehber sonuç garantisi vermez. Özellikle istisna ürün, dijital içerik veya kullanılmış ürün iddiasında sözleşmeye özgü değerlendirme alın.",
        ],
      },
    ],
    faqs: [
      { question: "Kutuyu açtığım için iade reddedilebilir mi?", answer: "Kutunun açılması tek başına her üründe cayma hakkını kaldırmaz. Ürünün niteliği, koruyucu unsur, hijyen istisnası ve kullanım düzeyi birlikte değerlendirilmelidir." },
      { question: "İade için sebep göstermek zorunda mıyım?", answer: "Cayma hakkının uygulanabildiği durumda kural olarak ayıp veya özel gerekçe göstermek gerekmez. Ancak süre, bildirim ve istisna koşulları sağlanmalıdır." },
      { question: "Satıcı sadece hediye çeki verebilir mi?", answer: "Ödemenin iade yöntemi, tüketicinin açık tercihi ve sözleşme kurallarına göre değerlendirilir. Tek taraflı şirket politikası kanuni hakkı ortadan kaldıramaz." },
      { question: "İade kargo ücretini kim öder?", answer: "Ön bilgilendirme, bildirilen taşıyıcı ve güncel mesafeli satış kuralları önemlidir. Satıcının hiç bilgi vermemesi veya farklı taşıyıcı kullanılması sonucu etkileyebilir." },
      { question: "Pazaryeri talebimi kapattı; hakkım bitti mi?", answer: "Platform içi sürecin kapanması, kanuni başvuru yollarının otomatik olarak sona erdiği anlamına gelmez. Tüm kayıtları indirip satıcı bilgisiyle uygun tüketici yolunu değerlendirin." },
    ],
    ctaHref: "/sozlesme-analizi/mesafeli-satis-sozlesmesi",
    ctaLabel: "Mesafeli satış sözleşmenizi inceleyin",
  }),
  createDailyPage({
    slug: "ayipli-mal-para-iadesi-hakki",
    h1: "Ayıplı malda para iadesi hakkı nasıl kullanılır?",
    metaTitle: "Ayıplı mal para iadesi: Seçimlik haklar ve başvuru",
    metaDescription:
      "Bozuk, eksik veya vaat edilenden farklı üründe para iadesi, değişim, onarım ve indirim haklarını belgeleyerek kullanma rehberi.",
    keywords: ["ayıplı mal para iadesi", "bozuk ürün iade", "seçimlik haklar", "ayıplı ürün tüketici hakkı"],
    intro:
      "Teslim edilen ürünün sözleşmede vaat edilen özellikleri taşımaması, olağan kullanım amacını karşılamaması veya reklam ve etikette bildirilen niteliklerden farklı olması ayıplı mal tartışması doğurabilir. Tüketicinin onarım, değişim, bedel indirimi veya sözleşmeden dönme gibi seçimlik hakları bulunabilir; fakat hangi hakkın uygulanacağı olayın koşulları ve kanuni sınırlarla birlikte değerlendirilir. Arızayı erken belgelemek ve talebi açık seçmek süreci güçlendirir.",
    finalChecks: [
      "Satıcıya başvurmadan önce ürünün vaat edilen özelliğini ilan, sözleşme ve faturadan; fiili sorunu ise fotoğraf, video veya teknik rapordan gösterin. Ayıbın ne zaman ortaya çıktığını ve ürünü nasıl kullandığınızı tarihli not edin. Seçimlik haklardan hangisini istediğinizi açıkça belirleyip çelişkili taleplerden kaçının.",
      "Ürünü teslim edecekseniz seri numarası, aksesuarlar, dış görünüm ve talebiniz fişte yer alsın. Satıcının veya servisin ret gerekçesini sözlü değil yazılı alın. Yüksek değerli, teknik inceleme gerektiren veya tüketici işlemi olup olmadığı tartışmalı alışverişte görev ve süre hesabını resmi kaynak ve kişisel hukuki destekle doğrulayın.",
    ],
    sections: [
      {
        title: "Ayıp ile beklenti farkını ayırın",
        paragraphs: [
          "Ürünün çalışmaması, eksik parça içermesi, ilan edilen modelden farklı gelmesi veya vaat edilen temel özelliği taşımaması ayıp göstergesi olabilir. Buna karşılık yalnızca kişisel beğeni değişikliği her zaman ayıplı mal sayılmaz; mesafeli satışta varsa cayma hakkı ayrı bir hukuki temeldir.",
          "İlan ekranı, ürün açıklaması, reklam, teknik özellik tablosu ve satıcının yazılı vaatlerini satın alma tarihinde kaydedin. Sonradan değiştirilen internet sayfası ispatı zorlaştırabilir. Seri numarası ve ambalaj etiketini faturayla eşleştirerek teslim edilen ürünün gerçekten sipariş edilen ürün olup olmadığını kontrol edin.",
        ],
      },
      {
        title: "Seçimlik hakkınızı açıkça belirtin",
        paragraphs: [
          "Tüketici şartları oluştuğunda ücretsiz onarım, ayıpsız misliyle değişim, bedel indirimi veya sözleşmeden dönme seçeneklerinden birini gündeme getirebilir. Satıcının tüketiciyi otomatik olarak yalnızca servise yönlendirmesi her durumda yeterli olmayabilir. Talebinizi ‘incelensin’ gibi belirsiz değil, istediğiniz sonuçla birlikte yazın.",
          "Seçilen hakkın yerine getirilmesinde imkânsızlık veya orantısızlık gibi kanuni değerlendirmeler bulunabilir. Ürünün niteliği, ayıbın önemi ve alternatif çözümün tüketiciye yükü dikkate alınır. Bu nedenle para iadesinin her küçük sorun için koşulsuz garanti olduğunu söylemek doğru değildir.",
        ],
      },
      {
        title: "Satıcı, üretici ve servis rolleri",
        paragraphs: [
          "Satıcı, ayıplı mal talebinin temel muhataplarından biridir; ‘biz yalnızca sattık, servisle görüşün’ diyerek her sorumluluğu ortadan kaldıramaz. Üretici veya ithalatçının sorumluluğu ise seçilen hak ve kanuni düzenlemeye göre değişebilir. Fatura üzerindeki ticari unvanı ve iletişim bilgilerini doğrulayın.",
          "Servis raporu arızanın varlığını ve nedenini gösterebilir, fakat tüketici talebinin tamamı hakkında son sözü tek başına servis söylemez. Raporda ‘kullanıcı hatası’ yazıyorsa teknik gerekçeyi, ölçümü ve hasarlı parçayı sorun. Soyut ibareye karşı bağımsız inceleme veya diğer deliller gündeme gelebilir.",
        ],
      },
      {
        title: "İhbarı ve ürünü teslimi belgeleyin",
        paragraphs: [
          "Ayıbı fotoğraf ve video ile kaydedin; hata kodu, ortaya çıkış tarihi ve kullanım koşullarını not edin. Satıcıya sipariş veya fatura numarasıyla yazılı bildirim gönderin. Telefon görüşmesi yaptıysanız sonrasında konuşulanları e-postayla özetleyerek kayıt oluşturun.",
          "Ürünü incelemeye verirken teslim fişine görünür hasarlar, aksesuarlar, seri numarası ve talebiniz yazılmalıdır. ‘Sağlam teslim edildi’ gibi gerçeğe aykırı standart metinleri düzeltmeden imzalamayın. Kargo kullanılıyorsa paketleme görüntüsü, takip kaydı ve teslim kanıtını saklayın.",
        ],
      },
      {
        title: "Ret halinde tüketici dosyası oluşturun",
        paragraphs: [
          "Fatura, sipariş sayfası, ilan vaadi, yazışma, servis raporu, fotoğraf ve ret cevabını kronolojik dosyalayın. Başvuruda olayları kısa, tarihli ve doğrulanabilir anlatın; seçtiğiniz hakkı ve talep ettiğiniz tutarı açık yazın. Aynı anda çelişen talepler ileri sürmek dosyayı anlaşılmaz hâle getirebilir.",
          "Görevli tüketici yolu ve parasal sınırlar her yıl değişebildiğinden başvuru günündeki resmi kaynağı kontrol edin. Ticari amaçla alınan ürün veya bireysel satıcıdan alışveriş tüketici işlemi sayılmayabilir. Bu rehber hukuki görüş ve olumlu karar garantisi değildir; yüksek değerli veya teknik uyuşmazlıkta uzman destek gerekebilir.",
        ],
      },
    ],
    faqs: [
      { question: "Ayıplı üründe doğrudan para iadesi isteyebilir miyim?", answer: "Sözleşmeden dönme seçimlik haklardan biri olabilir; ancak ayıbın niteliği ve kanuni sınırlamalar değerlendirilir. Talebinizi satıcıya açık ve yazılı iletin." },
      { question: "Satıcı beni servise gönderebilir mi?", answer: "Teknik inceleme için servis süreci gerekebilir; fakat satıcı sırf servis yönlendirmesiyle her sorumluluktan kurtulmaz. Teslim fişine arızayı ve seçtiğiniz hakkı yazdırın." },
      { question: "Kullanıcı hatası raporuna nasıl itiraz edilir?", answer: "Rapordaki teknik gerekçeyi ve ölçümleri isteyin; ürün fotoğrafları ve kullanım kayıtlarını koruyun. Uyuşmazlıkta bağımsız teknik değerlendirme ve uygun tüketici başvurusu gündeme gelebilir." },
      { question: "Faturayı kaybettim, hakkım biter mi?", answer: "Fatura önemli delildir ancak sipariş kaydı, banka ödemesi, garanti belgesi ve seri numarası da işlemi göstermeye yardımcı olabilir. Satıcıdan belge örneği talep edin." },
      { question: "İndirimli ürün ayıplı çıkarsa iade olmaz mı?", answer: "İndirim, tüketici haklarını kendiliğinden kaldırmaz. Satın alırken açıkça bildirilen belirli kusur ile sonradan ortaya çıkan başka bir ayıp ayrı değerlendirilir." },
    ],
    ctaHref: "/araclar",
    ctaLabel: "Tüketici araçlarını inceleyin",
  }),
  createDailyPage({
    slug: "telefon-garanti-servis-suresi",
    h1: "Telefon garanti servis süresi ve onarım hakları",
    metaTitle: "Telefon serviste ne kadar kalabilir? Garanti rehberi",
    metaDescription:
      "Telefonun garanti servisinde kalma süresi, tekrar arıza, yedek cihaz, değişim ve belge kontrolü hakkında güncel tüketici rehberi.",
    keywords: ["telefon garanti servis süresi", "telefon serviste kaldı", "garanti onarım süresi", "telefon değişim hakkı"],
    intro:
      "Garanti kapsamındaki telefonun serviste uzun süre kalması, aynı arızayı tekrarlaması veya ‘kullanıcı hatası’ gerekçesiyle geri çevrilmesi sık yaşanan tüketici sorunlarıdır. Onarım süresi ve tüketicinin diğer hakları güncel mevzuat, ürünün teslim tarihi ve servis kayıtlarına göre değerlendirilir. Değişebilen süreleri ezberlemek yerine teslim fişindeki tarihleri, arıza tanımını ve yapılan işlemleri eksiksiz belgelemek daha güvenlidir.",
    finalChecks: [
      "Telefonu teslim etmeden önce satın alma belgesi, IMEI veya seri numarası, dış görünüm fotoğrafları ve veri yedeğini kontrol edin. Teslim fişine ayrıntılı arıza tanımıyla tüm aksesuarları yazdırın. Servis portalındaki kabul, parça bekleme, hazır bildirimi ve fiili teslim tarihlerini ayrı ayrı kaydederek toplam süreci izleyin.",
      "Cihaz geri geldiğinde aynı şikâyeti hemen test edin ve yapılan işlemi raporla karşılaştırın. Kullanıcı hatası veya ücret talebi varsa teknik bulguyu ve onay kaydını isteyin. Süre aşımı, tekrar arıza ya da veri kaybı iddiasında eski iş emirlerini de ekleyerek talebinizi satıcıya açıkça yöneltin; güncel süreyi resmi kaynaktan doğrulayın.",
    ],
    sections: [
      {
        title: "Servise teslim fişi neden kritik?",
        paragraphs: [
          "Teslim fişinde cihazın marka, model, seri veya IMEI bilgisi, fiziksel durumu, aksesuarları, şikâyet ve teslim tarihi yer almalıdır. ‘Açılmıyor’ yerine ne zaman ve hangi koşulda sorun çıktığını yazdırın. Çizik veya darbe yoksa standart darbe kaydına itiraz edin ve cihazın fotoğraflarını çekin.",
          "Kargo ile gönderimde paketleme videosu, takip numarası ve teslim kaydını saklayın. Servisin sisteme kabul tarihi ile kargoya verdiğiniz tarih farklı olabilir; süre hesabında hangi tarihin esas alınacağı somut düzenlemeye göre incelenir. Bu nedenle tüm aşamaları tek zaman çizelgesinde tutun.",
        ],
      },
      {
        title: "Onarım süresi nasıl takip edilir?",
        paragraphs: [
          "Azami onarım süreleri ürün grubuna ve güncel düzenlemeye göre belirlenir; mevzuat değişebileceğinden başvuru günündeki resmi kaynağı kontrol edin. Servisin parça beklemesi veya yoğunluğu her durumda belirsiz süre uzatma hakkı vermez. Yazılı durum güncellemesi ve tahmini teslim tarihi isteyin.",
          "Cihazın teslim alınmaya hazır olduğuna dair bildirimin tarihi de kaydedilmelidir. Servis portalı ekranı değişebileceği için aşamaların ekran görüntüsünü alın. Telefonun geçici olarak çalışır hâlde iade edilip hemen yeniden servise verilmesi, ayrı kayıtlar üzerinden takip edilmelidir.",
        ],
      },
      {
        title: "Tekrarlayan arıza ve seçimlik haklar",
        paragraphs: [
          "Aynı veya farklı arızaların tekrarı, onarımın sonuç vermemesi ya da sürenin aşılması hâlinde tüketicinin onarım dışındaki seçimlik hakları gündeme gelebilir. Değişim veya bedel iadesi talebinin koşulları servis fişleri ve arızanın niteliğiyle değerlendirilir; her servis ziyareti otomatik değişim garantisi oluşturmaz.",
          "Önceki servis raporlarını kaybetmeyin ve her yeni kayıtta eski iş emri numaralarını belirtin. Cihaz değiştirildiyse yeni seri numarası, garanti durumu ve teslim tarihi yazılı olmalıdır. Yenilenmiş cihaz öneriliyorsa ürünün statüsü ve onayınız açıkça netleştirilmelidir.",
        ],
      },
      {
        title: "Kullanıcı hatası ve garanti dışı ücret",
        paragraphs: [
          "Sıvı teması, darbe veya yetkisiz müdahale iddiaları teknik bulguyla açıklanmalıdır. Servisten arızalı parça, fotoğraf, test sonucu ve ücret teklifini isteyin. Sadece ‘kullanıcı hatası’ seçeneğinin işaretlenmesi uyuşmazlığı tek başına çözmez; tüketici karşı delil sunabilir.",
          "Ücretli onarıma onay vermeden toplam bedel, değişecek parça ve işlem sonrası garanti koşullarını öğrenin. İnceleme ücreti veya kargo bedeli talep ediliyorsa bunun önceden bildirilip bildirilmediğini kontrol edin. Onaylamadığınız işlemin yapılmasına karşı yazılı itiraz kaydı oluşturun.",
        ],
      },
      {
        title: "Veri güvenliği ve başvuru dosyası",
        paragraphs: [
          "Servis öncesi mümkünse yedek alın, hesaplardan çıkış yapın ve cihaz bulma kilidi konusunda resmi servis talimatını izleyin. Yedekleme mümkün değilse veri kaybı riskini teslim fişine yazdırın. Servis personeliyle ekran kilidi veya hesap şifresi paylaşmanın gerekliliğini sorgulayın; gereksiz kimlik bilgisi vermeyin.",
          "Fatura, garanti belgesi, tüm servis fişleri, yazışmalar ve ödeme kayıtlarıyla dosya hazırlayın. Başvuru makamı ve parasal sınırlar güncellenebileceğinden resmi kaynakları esas alın. Bu rehber cihazın değiştirileceğini veya verilerin kurtarılacağını garanti etmez; teknik ve yüksek değerli uyuşmazlıkta uzman incelemesi gerekebilir.",
        ],
      },
    ],
    faqs: [
      { question: "Telefon serviste yasal süreden fazla kalırsa ne olur?", answer: "Güncel azami süre ve başlangıç kaydı kontrol edilir. Koşullar oluştuğunda onarım dışındaki seçimlik haklar gündeme gelebilir; teslim ve bildirim belgeleriyle satıcıya yazılı talep iletin." },
      { question: "Servis süresince yedek telefon vermek zorunda mı?", answer: "Yedek cihaz yükümlülüğü garanti belgesi, üretici taahhüdü ve güncel düzenlemeye göre değişebilir. Verilmediğinde otomatik olarak belirli bir tazminat doğduğunu varsaymayın." },
      { question: "Aynı arıza tekrarlarsa değişim isteyebilir miyim?", answer: "Tekrarlayan ve giderilemeyen arıza değişim veya diğer seçimlik hakları destekleyebilir. Önceki iş emirleri, arıza tanımı ve teknik sonuç birlikte incelenmelidir." },
      { question: "Kullanıcı hatası denirse rapor almak zorunda mıyım?", answer: "Yazılı ve gerekçeli teknik rapor istemek uyuşmazlığı somutlaştırır. Fotoğraf, test sonucu ve hasarlı parçaya ilişkin açıklamayı talep ederek kayıtları saklayın." },
      { question: "Fatura olmadan garantiye başvurabilir miyim?", answer: "Satın alma tarihi ve işlemi başka kayıtlarla doğrulanabilir olabilir. Sipariş özeti, banka kaydı, e-fatura ve cihaz seri numarasını toplayıp satıcı veya yetkili servisle paylaşın." },
    ],
    ctaHref: "/araclar",
    ctaLabel: "Tüketici araçlarını keşfedin",
  }),
  createDailyPage({
    slug: "kargo-kayip-hasar-tuketici-haklari",
    h1: "Kargo kaybolur veya hasarlı gelirse tüketici hakları",
    metaTitle: "Kargo kayıp ya da hasarlı: Para iadesi ve tutanak",
    metaDescription:
      "Kayıp kargo, kırık paket, eksik ürün ve teslim edildi kaydında satıcı, taşıyıcı ve tüketicinin izleyeceği belge odaklı adımlar.",
    keywords: ["kargo kayıp tüketici hakları", "hasarlı kargo tutanak", "kargo teslim edilmedi", "kırık ürün iade"],
    intro:
      "İnternet alışverişinde kargonun kaybolması, boş paket gelmesi veya ürünün taşıma sırasında zarar görmesi hâlinde tüketici çoğu zaman satıcı ile taşıyıcı arasında bırakılır. Oysa kiminle sözleşme kurulduğu, taşıyıcıyı kimin seçtiği ve teslimin nasıl gerçekleştiği sorumluluk değerlendirmesinde önemlidir. Paketi teslim alırken oluşturulan kayıtlar güçlü delil sağlar; ancak tutanak tutulmamış olması da her durumda tüketicinin bütün haklarını otomatik olarak ortadan kaldırmaz.",
    finalChecks: [
      "Talep göndermeden önce sipariş, ödeme, takip, teslim doğrulaması ve hasar kayıtlarını tek zaman çizelgesinde birleştirin. Paket kayıpsa kime teslim edildiğini; hasarlıysa dış ambalaj, ürün ve seri numarasını ayrı delillerle gösterin. Satıcı ile taşıyıcıya açılan kayıtların numarasını ve verdikleri farklı cevapları saklayın.",
      "İstediğiniz çözümü yeniden teslim, değişim veya bedel iadesi olarak açıklaştırın ve aynı zarar için çifte tahsil talebi oluşturmayın. Platform süreci kapansa bile belgeleri silmeyin. Değerli eşya, ticari gönderi, tehlikeli ürün veya teslim yetkisi tartışmasında standart tüketici formuna güvenmeden sözleşmeye ve taşıma koşullarına özgü destek alın.",
    ],
    sections: [
      {
        title: "Teslim anında paketi kontrol edin",
        paragraphs: [
          "Ezilme, ıslanma, yırtık bant veya ağırlık uyumsuzluğu görürseniz durumu teslim görevlisi yanındayken fotoğraflayın ve hasar tespit kaydı isteyin. Tutanakta yalnızca ‘hasarlı’ değil, kutunun hangi bölümünde ne görüldüğü yazmalıdır. Okumadan imza atmayın ve belgenin bir örneğini alın.",
          "Paket dışarıdan sağlam görünse de iç ürün hasarlı olabilir. Kutuyu açma videosu; kargo etiketi, kapalı bantlar ve ürün seri numarası görünür biçimde kesintisiz çekilirse ispatı destekleyebilir. Bununla birlikte video zorunlu tek delil değildir; fatura, servis raporu ve fotoğraflar da değerlendirilir.",
        ],
      },
      {
        title: "Teslim edildi görünüyor ama paket yoksa",
        paragraphs: [
          "Takip ekranında teslim kaydı varsa kime, hangi saatte ve hangi doğrulamayla teslim edildiğini taşıyıcıdan yazılı isteyin. Komşu, güvenlik veya bina görevlisine bırakma konusunda açık talimatınız bulunup bulunmadığını kontrol edin. Kurye ile yalnızca telefonda görüşmek yerine kayıt numaralı kayıp araştırması açın.",
          "Satıcıya da aynı gün sipariş numarasıyla bildirim yapın. Tüketicinin ürünü fiilen almaması ile taşıyıcının sistemde teslim işareti oluşturması aynı şey değildir. Bina kamera kayıtları kısa sürede silinebileceğinden hukuka uygun şekilde korunmasını hızla talep etmek yararlı olabilir.",
        ],
      },
      {
        title: "Satıcı ve kargo şirketinin sorumluluğu",
        paragraphs: [
          "Tüketicinin satıcıyla kurduğu satış sözleşmesi ile satıcının taşıyıcıyla ilişkisi ayrıdır. Satıcı, ‘kargoya verdim’ diyerek teslim borcunun her durumda tamamlandığını ileri süremeyebilir. Riskin ne zaman geçtiği, taşıyıcının tüketici tarafından bağımsız seçilip seçilmediği ve teslim kaydı birlikte değerlendirilir.",
          "Taşıyıcıya karşı tazmin veya hasar başvurusu da taşıma sözleşmesi ve olay belgelerine bağlıdır. Satıcı ve taşıyıcı birbirine yönlendirdiğinde her ikisine de aynı kronoloji ve belgelerle yazılı başvuru yapın. Çifte ödeme talep etmeyin; amaç ürünün teslimi, yenilenmesi veya bedel kaybının giderilmesidir.",
        ],
      },
      {
        title: "Kayıp veya hasarda talebinizi netleştirin",
        paragraphs: [
          "Ürün hiç ulaşmadıysa teslim, yeniden gönderim veya sözleşmenin sona erdirilmesi seçenekleri koşullara göre gündeme gelebilir. Hasarlı üründe ise ayıplı mala ilişkin onarım, değişim, indirim veya dönme hakları değerlendirilebilir. Talebinizi yazarken ürün, sipariş, olay tarihi ve istediğiniz sonucu açıkça belirtin.",
          "Satıcı inceleme için ürünü geri istiyorsa iade kodu ve taşıma sorumluluğunu yazılı sorun. Hasarlı ürünü güvenli biçimde paketleyip seri numarası ve aksesuarları teslim fişine yazdırın. Tehlikeli, şişmiş batarya veya kırık cam gibi riskli ürünü normal paketle göndermeden resmi taşıma talimatı alın.",
        ],
      },
      {
        title: "Delil dosyası ve resmi başvuru",
        paragraphs: [
          "Sipariş ve ödeme kaydı, ürün ilanı, kargo takip ekranı, teslim kodu mesajları, tutanak, fotoğraf, video, servis raporu ve tüm destek yazışmalarını saklayın. Görüşme kayıt numaralarını kronolojik listeleyin. Zarar tutarını fatura ve gerçek masrafla ilişkilendirin; varsayımsal kayıpları kesin alacak gibi göstermeyin.",
          "Uygun tüketici başvuru yolu, uyuşmazlığın taraflarına ve başvuru tarihindeki güncel parasal sınırlara göre değişebilir. Resmi kaynaklardan görev bilgisini teyit edin. Bu rehber olumlu karar veya teslim garantisi vermez; ticari gönderi, değerli eşya ya da özel taşıma koşulunda farklı hükümler uygulanabilir.",
        ],
      },
    ],
    faqs: [
      { question: "Hasar tutanağı yoksa hakkımı kaybeder miyim?", answer: "Tutanak güçlü delildir fakat yokluğu her durumda tüm hakları ortadan kaldırmaz. Hasarı teslimden sonra hemen fotoğraf, açılış videosu, servis raporu ve yazılı bildirimle belgeleyin." },
      { question: "Kargo komşuya bırakılmışsa teslim sayılır mı?", answer: "Açık teslim talimatı, doğrulama yöntemi ve somut koşullar incelenir. Kime teslim edildiğini taşıyıcıdan yazılı isteyin ve satıcıya paketi almadığınızı gecikmeden bildirin." },
      { question: "Kayıp üründe satıcı mı kargo şirketi mi ödeme yapar?", answer: "Satış ve taşıma ilişkileri ayrı değerlendirilir. Tüketici bakımından satıcının teslim borcu önemlidir; taşıyıcının sorumluluğu da seçim ve teslim koşullarına göre ayrıca gündeme gelebilir." },
      { question: "Hasarlı paketi teslim almamalı mıyım?", answer: "Belirgin hasarda çekince ve ayrıntılı tutanakla teslim veya ret seçenekleri olayın niteliğine göre değerlendirilir. Ürünün aciliyeti ve iade talimatını gözeterek kayıtlı hareket edin." },
      { question: "Kargo araştırması sürerken para iadesi isteyebilir miyim?", answer: "Makul araştırma süreci olabilir; ancak belirsiz biçimde uzatılamaz. Satıcıya teslim edilmediğini ve seçtiğiniz talebi yazılı iletin, verilen cevap süresini ve kayıt numarasını saklayın." },
    ],
    ctaHref: "/rehber",
    ctaLabel: "Tüketici hukuku rehberlerini inceleyin",
  }),
] as const;
