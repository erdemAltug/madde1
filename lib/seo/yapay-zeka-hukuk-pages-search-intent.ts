import { createRehberPage } from "@/lib/seo/rehber-factory";

/** Yapay zeka + hukuk arama niyeti sayfaları (Aug 5, 2026) */
export const YAPAY_ZEKA_HUKUK_SEARCH_INTENT_PAGES = [
  createRehberPage({
    slug: "yapay-zekaya-hukuki-soru-nasil-sorulur",
    h1: "Yapay zekaya hukuki soru nasıl sorulur? — 2026 pratik rehberi",
    metaTitle: "Yapay zekaya hukuki soru nasıl sorulur? 2026 rehberi",
    metaDescription:
      "Yapay zekaya hukuki soru sorarken bağlam, tarih ve belge detayını nasıl vereceğinizi öğrenin. Daha isabetli yanıt almanın ve hatalı çıktıyı fark etmenin yolları.",
    keywords: [
      "yapay zekaya hukuki soru sorma",
      "yapay zeka hukuk sorusu",
      "ai hukuki soru nasıl sorulur",
      "yapay zeka prompt hukuk",
      "hukuki soru yapay zeka cevabı",
    ],
    intro:
      "Yapay zeka modellerinden alınan hukuki nitelikli yanıtların kalitesi, büyük ölçüde sorunun nasıl kurulduğuna bağlıdır. Eksik bağlamla sorulan bir soru genel geçer bir cevap üretir; tarih, taraf, belge türü ve somut talebin belirtildiği bir soru ise çok daha kullanışlı bir ön değerlendirme sağlar. Bu rehber, soruyu yapılandırmanın pratik yollarını ve çıktının nerede durdurulup profesyonele taşınması gerektiğini anlatır.",
    sections: [
      {
        title: "Önce sorunuzu somutlaştırın",
        paragraphs: [
          "\"Kiracı hakları nelerdir\" gibi geniş bir soru, herkes için geçerli olabilecek genel bir metin döndürür. Bunun yerine sözleşmenin türünü, imza tarihini, süresini, tarafların sıfatını ve sizi rahatsız eden maddenin tam metnini yazın. Somut veri arttıkça model, cevabı sizin durumunuza yaklaştırır ve hangi konunun tartışmalı olduğunu daha net işaretler.",
          "Sorunun sonunda ne istediğinizi de açıkça belirtin: özet mi, riskli maddelerin listesi mi, karşı tarafa iletilecek soruların taslağı mı? Beklenen çıktı biçimini yazmak, yanıtın dağılmasını engeller. Aynı konuda birden fazla sorunuz varsa bunları tek bir uzun paragrafa sıkıştırmak yerine maddeler halinde sıralamak daha okunaklı sonuç verir.",
        ],
      },
      {
        title: "Bağlamı verirken kişisel veriyi sınırlayın",
        paragraphs: [
          "Bağlam vermek ile gereksiz kişisel veri paylaşmak farklı şeylerdir. Sözleşmenin işleyişini anlamak için kimlik numarası, tam adres, banka bilgisi veya üçüncü kişilerin iletişim bilgileri çoğu zaman gerekli değildir. Bu alanları maskeleyip \"Kiracı\", \"İşveren\", \"A Şirketi\" gibi genel adlandırmalar kullanmak, cevabın kalitesini düşürmeden paylaşım yüzeyini daraltır.",
          "Hangi verinin nasıl işlendiği konusunda karar vermeden önce kullandığınız hizmetin politikalarını okumanız yerinde olur. Clause tarafında bu konudaki açıklamalara /gizlilik ve /guvenlik sayfalarından ulaşabilirsiniz. Kurumsal bir belge söz konusuysa, paylaşım öncesinde kendi şirketinizin gizlilik ve bilgi güvenliği kurallarını da gözden geçirmeniz gerekir.",
        ],
      },
      {
        title: "Cevabı sorgulayacak şekilde soru kurun",
        paragraphs: [
          "İyi bir soru, cevabın denetlenebilir olmasını sağlar. Modelden yalnızca sonuç değil, hangi maddeye veya hangi metin parçasına dayandığını da göstermesini isteyin. \"Bu değerlendirmeyi sözleşmenin hangi cümlesine dayandırıyorsun\" biçimindeki bir takip sorusu, dayanağı olmayan genellemeleri hızlıca ortaya çıkarır.",
          "Belirsizlik varsa bunu açıkça talep edin: \"Emin olmadığın noktaları ayrı bir başlıkta listele\" gibi bir yönlendirme, kendinden fazla emin görünen çıktıların önüne geçer. Yapay zeka, uydurma bir madde numarası veya var olmayan bir kural üretebilir; bu nedenle çıktıdaki her sayısal ve tarihsel bilgi, resmî kaynaktan ayrıca doğrulanmalıdır.",
        ],
      },
      {
        title: "Adım adım ilerleyin, tek soruda bitirmeyin",
        paragraphs: [
          "Uzun bir sözleşmeyi tek hamlede çözmeye çalışmak yerine katmanlı ilerleyin. Önce genel bir özet isteyin, ardından dikkatinizi çeken başlıkları tek tek derinleştirin. Bu yaklaşım hem cevabın odaklanmasını sağlar hem de sizin metni gerçekten okumanızı ve nerede tıkandığınızı fark etmenizi kolaylaştırır.",
          "İkinci turda önceki cevaba itiraz etmekten çekinmeyin. \"Bu maddeyi lehime yorumladın, karşı tarafın savunması ne olurdu\" gibi bir soru, tek yönlü değerlendirmeyi dengeler. Müzakereye hazırlanırken karşı argümanı görmek, imza masasında hazırlıksız yakalanmamak açısından en az risk listesi kadar değerlidir.",
        ],
      },
      {
        title: "Nerede durmalı ve avukata ne götürmeli?",
        paragraphs: [
          "Yapay zeka çıktısı bir başlangıç notudur; süre, hak düşürücü tarih, dava stratejisi ve temsil gerektiren konularda tek dayanak olamaz. Uyuşmazlık büyümüşse, karşı taraf ihtar göndermişse veya imzanın ciddi mali sonucu varsa süreci vakit kaybetmeden bir avukata taşımak gerekir. Clause bir ön analiz aracıdır; avukatlık hizmeti vermez ve hukuki görüş yerine geçmez.",
          "Avukata giderken hazırlığınızı yanınızda götürün: sözleşmenin tam metni, tarihli yazışmalar, ödeme kayıtları ve yapay zekadan aldığınız özetin çıktısı. Bu dosya, görüşmenin ilk yarısını olgu aktarımıyla harcamanızı önler. Sözleşme metninizi profesyonel görüşme öncesinde hızlıca gözden geçirmek için Clause'un ücretsiz ön taramasını kullanabilirsiniz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sorumu Türkçe mi yoksa İngilizce mi sormalıyım?",
        answer:
          "Türk hukukuna ilişkin bir sözleşmeyi değerlendiriyorsanız soruyu ve metni Türkçe yazmak genellikle daha tutarlı sonuç verir, çünkü terimlerin karşılığı çeviride kayabilir.",
      },
      {
        question: "Sözleşmenin tamamını mı yapıştırmalıyım?",
        answer:
          "Değerlendirilecek bölümün bağlamıyla birlikte yapıştırılması önemlidir. Tek bir cümleyi bağlamsız göndermek yanıltıcı yoruma yol açabilir; kişisel verileri ise maskeleyerek paylaşın.",
      },
      {
        question: "Yapay zekanın verdiği cevabı nasıl doğrularım?",
        answer:
          "Çıktıdaki madde numaralarını, süreleri ve oranları resmî mevzuat kaynağından kontrol edin. Mali veya süreli sonuç doğuracak konularda mutlaka bir hukuk profesyoneline danışın.",
      },
      {
        question: "Aynı soruyu tekrar sorduğumda neden farklı cevap alıyorum?",
        answer:
          "Dil modelleri olasılıksal çalışır ve ifade değişikliği farklı çıktı üretebilir. Bu nedenle tutarlılığı test etmek için soruyu farklı biçimlerde sormak faydalıdır.",
      },
      {
        question: "Yapay zekaya sorduğum soru avukata danışmanın yerine geçer mi?",
        answer:
          "Hayır. Ön hazırlık ve soru listesi oluşturmak için yararlıdır; hukuki görüş, temsil ve dava değerlendirmesi yalnızca yetkili bir avukat tarafından yapılabilir.",
      },
    ],
    ctaLabel: "Sözleşmenizi ücretsiz ön taramadan geçirin",
    ctaHref: "/#dene",
    updatedAt: "2026-08-05",
  }),

  createRehberPage({
    slug: "chatgpt-sozlesme-analizi-guvenli-mi",
    h1: "ChatGPT ile sözleşme analizi güvenli mi? — dikkat edilecekler",
    metaTitle: "ChatGPT sözleşme analizi güvenli mi? 2026 değerlendirmesi",
    metaDescription:
      "ChatGPT gibi genel amaçlı sohbet araçlarıyla sözleşme analizinin güçlü ve zayıf yönleri: halüsinasyon riski, veri paylaşımı ve profesyonel inceleme ihtiyacı.",
    keywords: [
      "chatgpt sözleşme analizi",
      "chatgpt hukuk güvenli mi",
      "yapay zeka sözleşme okuma",
      "chatgpt kira sözleşmesi",
      "ai sözleşme incelemesi",
    ],
    intro:
      "ChatGPT ve benzeri genel amaçlı sohbet araçları, uzun metinleri sadeleştirmekte hızlı ve erişilebilir. Buna karşılık sözleşme analizi, yalnızca metni anlamakla değil; eksik olanı, tek taraflı dengeyi ve sonradan doğacak yükümlülüğü fark etmekle ilgilidir. Bu sayfa, genel amaçlı araçların bu işte nerede işe yaradığını ve hangi noktalarda temkinli olunması gerektiğini tarafsız biçimde ele alır.",
    sections: [
      {
        title: "Genel amaçlı sohbet araçları ne işe yarar?",
        paragraphs: [
          "Bu araçlar, ağır hukuki dille yazılmış bir maddeyi gündelik Türkçeye çevirmekte, uzun bir metnin ana başlıklarını çıkarmakta ve size sorulacak soruların listesini hazırlamakta gerçekten faydalıdır. Bir sözleşmeyi ilk kez okuyan biri için, hangi bölümün ne anlama geldiğini kabaca kavramak bile önemli bir kazanımdır.",
          "Bunlar tasarım olarak genel sohbet asistanlarıdır; belirli bir sözleşme türü için yapılandırılmış çıktı üretmek onların birincil amacı değildir. Bu nedenle aynı belgeyi iki farklı oturumda sorduğunuzda vurguların değiştiğini görebilirsiniz. Sonuçları, kesin bir denetim raporu gibi değil, notlandırılmış bir ilk okuma gibi değerlendirmek daha doğrudur.",
        ],
      },
      {
        title: "Halüsinasyon riski nasıl ortaya çıkar?",
        paragraphs: [
          "Dil modelleri, akıcı ve ikna edici görünen ancak gerçekte var olmayan içerikler üretebilir. Hukuki bağlamda bu, uydurma bir madde numarası, yanlış hatırlanan bir süre veya sözleşmede hiç geçmeyen bir kuralın varmış gibi anlatılması şeklinde görünür. En tehlikeli yanı, hatanın dilinin doğru cevaplarla aynı kendinden emin tonda olmasıdır.",
          "Bu riski azaltmanın pratik yolu, her iddianın dayanağını metin içinde göstermesini istemek ve sayısal bilgileri resmî kaynaktan doğrulamaktır. Bir maddenin \"geçersiz\" olduğu söylendiğinde bunu bir sonuç olarak değil, kontrol edilmesi gereken bir hipotez olarak kaydedin ve profesyonel incelemeye taşıyın.",
        ],
      },
      {
        title: "Veri paylaşımında dikkat edilmesi gerekenler",
        paragraphs: [
          "Sözleşmeler çoğu zaman kişisel veri, ticari sır veya üçüncü kişilere ait bilgi içerir. Herhangi bir çevrimiçi araca metin girmeden önce, o hizmetin verilerle ne yaptığını politikalarından okumak gerekir. Kurumsal belgelerde ayrıca kendi şirketinizin bilgi paylaşım kuralları ve varsa sözleşmedeki gizlilik yükümlülüğü bağlayıcıdır.",
          "Pratik bir önlem, isim, kimlik numarası, adres ve hesap bilgilerini maskeleyerek yalnızca değerlendirilecek hükmü paylaşmaktır. Clause'un veri yaklaşımına ilişkin açıklamaları /gizlilik ve /guvenlik sayfalarında bulabilirsiniz; hangi aracı seçerseniz seçin, paylaşım kararını bu metinleri okuduktan sonra vermeniz önerilir.",
        ],
      },
      {
        title: "Odaklı bir ön analiz akışının farkı",
        paragraphs: [
          "Serbest bir sohbette çıktının kapsamı, sizin o an ne sorduğunuza bağlıdır; unuttuğunuz başlık gündeme gelmez. Sözleşme incelemesine odaklanmış bir akış ise fesih, süre, cezai şart, yenileme ve yetki gibi tekrar eden başlıkları düzenli olarak ele almayı kolaylaştırır. Bu yapı, kullanıcı hatasından kaynaklanan eksikleri azaltır.",
          "Clause bu ikinci yaklaşımı benimser: sözleşme metnini yapıştırdığınızda dikkat edilmesi gereken noktaları derli toplu bir ön değerlendirme olarak sunmayı hedefler. Yine de bu bir yapay zeka çıktısıdır ve hata payı taşır; kesinlik iddiası taşımaz, avukat incelemesinin yerini almaz.",
        ],
      },
      {
        title: "Sağlıklı bir kullanım düzeni",
        paragraphs: [
          "En verimli düzen, yapay zekayı okuma ve hazırlık aşamasında kullanmak, karar aşamasında insana geçmektir. Aracın çıktısını alın, işaretlenen başlıkları sözleşme metninde kendiniz bulun ve anlamadığınız yerleri not edin. Böylece hem çıktı denetlenmiş olur hem de metinle gerçek bir bağ kurarsınız.",
          "Ciddi mali sonuç doğuran, süreye bağlı veya uyuşmazlığa dönüşmüş konularda mutlaka avukata başvurun. Yapay zeka size hangi soruları soracağınızı gösterebilir; ancak cevabın hukuki sonucunu üstlenecek olan taraf yine bir profesyoneldir. Sözleşmenizi ilk turda hızlıca gözden geçirmek için ücretsiz ön taramayı deneyebilirsiniz.",
        ],
      },
    ],
    faqs: [
      {
        question: "ChatGPT bir sözleşmeyi avukat gibi inceleyebilir mi?",
        answer:
          "Hayır. Metni sadeleştirip dikkat çeken noktaları sıralayabilir, ancak hukuki görüş vermek, sonuçları üstlenmek ve temsil etmek yalnızca avukatın yapabileceği işlerdir.",
      },
      {
        question: "Yapay zeka sözleşmede eksik olan maddeyi fark eder mi?",
        answer:
          "Bazı tipik eksikleri işaret edebilir, fakat bu garanti değildir. Eksik hüküm tespiti bağlam bilgisi gerektirir ve mutlaka insan incelemesiyle desteklenmelidir.",
      },
      {
        question: "Şirket sözleşmemi yapay zekaya yapıştırmam sorun olur mu?",
        answer:
          "Şirket politikanıza ve sözleşmedeki gizlilik hükmüne bağlıdır. Paylaşım öncesinde iç kuralları ve kullandığınız hizmetin gizlilik metnini kontrol etmeniz gerekir.",
      },
      {
        question: "Clause ile genel sohbet araçları arasındaki temel fark ne?",
        answer:
          "Clause, sözleşme ön analizine odaklanmış bir akış sunar ve çıktıyı bu amaç etrafında düzenler. Her ikisi de yapay zeka tabanlıdır ve her ikisinde de hata payı bulunur.",
      },
      {
        question: "Yapay zeka çıktısına güvenip imza atabilir miyim?",
        answer:
          "Hayır. Çıktı bir ön değerlendirmedir; imza öncesinde metni kendiniz okumalı ve önemli sözleşmelerde profesyonel inceleme almalısınız.",
      },
    ],
    ctaLabel: "Clause ile ücretsiz ön analiz yapın",
    ctaHref: "/#dene",
    updatedAt: "2026-08-05",
  }),

  createRehberPage({
    slug: "yapay-zeka-sozlesme-ozetleme",
    h1: "Yapay zeka ile sözleşme özetleme — uzun metni okunur hale getirin",
    metaTitle: "Yapay zeka sözleşme özetleme 2026 — ücretsiz ön tarama",
    metaDescription:
      "Uzun sözleşmeleri yapay zeka ile özetlerken nelere dikkat edilmeli? İyi bir özetin içermesi gerekenler, kaybolan detaylar ve doğrulama adımları.",
    keywords: [
      "yapay zeka sözleşme özetleme",
      "sözleşme özeti çıkarma",
      "ai ile metin özetleme hukuk",
      "uzun sözleşme okuma",
      "sözleşme özet aracı",
    ],
    intro:
      "Onlarca sayfalık bir sözleşmeyi baştan sona okumak zaman alır ve dikkat son sayfalara doğru düşer. Yapay zeka destekli özetleme, metnin iskeletini hızla görmenizi ve hangi bölüme odaklanmanız gerektiğini anlamanızı sağlar. Ancak özet, metnin yerine geçmez: iyi bir özet sizi metne yaklaştırır, kötü bir özet ise metinden uzaklaştırır. Bu rehber ikisini ayırt etmenize yardımcı olur.",
    sections: [
      {
        title: "İyi bir sözleşme özetinde ne bulunmalı?",
        paragraphs: [
          "Kullanışlı bir özet, önce tarafları, sözleşmenin konusunu, süresini ve bedeli net biçimde ortaya koyar. Ardından yükümlülükleri kimin üstlendiğini, ödeme ve teslim koşullarını ve süreye bağlı bildirimleri sıralar. Bu çerçeve olmadan yapılan özet, metni okumuş gibi hissettirir ama karar vermenize yardımcı olmaz.",
          "İkinci katmanda fesih koşulları, otomatik yenileme, cezai şart, sorumluluk sınırlaması, gizlilik ve uyuşmazlık çözümü yer almalıdır. Bunlar günlük işleyişte görünmez, sorun çıktığında ise belirleyici olur. Özet bu başlıkları atlıyorsa eksiktir; aracı bu başlıkları açıkça ele almaya yönlendirmek gerekir.",
        ],
      },
      {
        title: "Özetlemede en sık kaybolan detaylar",
        paragraphs: [
          "Özetleme sırasında en çok kaybolan şey nüanstır. \"Taraf bildirimde bulunabilir\" ile \"taraf yazılı ve on beş gün önceden bildirimde bulunmak zorundadır\" arasındaki fark, özet dilinde silinebilir. Süre, biçim şartı ve \"yazılı olarak\" gibi ifadeler sonuç doğurduğu için bu ayrıntılar metinden birebir kontrol edilmelidir.",
          "Bir diğer kayıp noktası çapraz atıflardır. Sözleşmeler sık sık \"ekte belirtilen\" veya \"madde 7.3 hükümleri saklıdır\" gibi bağlantılar kurar; ekler paylaşılmadığında özet eksik bir tabloya dayanır. Özet almadan önce eklerin, protokollerin ve varsa önceki değişikliklerin de metne dahil olduğundan emin olun.",
        ],
      },
      {
        title: "Özeti doğrulamanın pratik yolu",
        paragraphs: [
          "Özeti aldıktan sonra, içindeki her önemli cümleyi sözleşmede bulup işaretleyin. Bu, on dakikalık bir iş olsa da özetin doğruluğunu test etmenin en hızlı yoludur. Karşılığını bulamadığınız bir ifade varsa, bu bir halüsinasyon işareti olabilir ve o maddeye dayanarak karar vermemelisiniz.",
          "Sayısal her veriyi ayrıca kontrol edin: tutarlar, oranlar, gün sayıları ve tarihler. Yapay zeka bunları yanlış aktarabilir ya da farklı maddelerdeki sayıları birbirine karıştırabilir. Doğrulama alışkanlığı, özetleme kazancını korurken hata riskini belirgin biçimde düşürür.",
        ],
      },
      {
        title: "Özetten müzakere notuna geçiş",
        paragraphs: [
          "Özet tek başına bir amaç değildir; asıl değeri, müzakerede kullanacağınız soru listesini üretmesindedir. Dengesiz bulduğunuz her başlık için karşı tarafa soracağınız somut bir soru yazın. \"Fesih bildirimi neden yalnızca sizin lehinize düzenlenmiş\" gibi net sorular, genel şikayetlerden çok daha etkili olur.",
          "Değişiklik talebi oluştururken hangi maddeyi neden değiştirmek istediğinizi kısa gerekçelerle yazın. Bu not, hem karşı tarafa iletirken hem de bir avukatla görüşürken zaman kazandırır. Kira ve iş sözleşmeleri için Clause'un konu odaklı analiz sayfaları başlangıç noktası olarak kullanılabilir.",
        ],
      },
      {
        title: "Özetin sınırı ve profesyonel inceleme",
        paragraphs: [
          "Yapay zeka özeti, bir belgenin hukuki geçerliliği veya uygulanabilirliği hakkında nihai bir yargı üretmez. Aynı cümle farklı olgular altında farklı sonuç doğurabilir; içtihat ve somut olay değerlendirmesi gerektiren konular özetin kapsamı dışındadır. Clause bir ön analiz aracıdır ve avukatlık hizmeti sunmaz.",
          "Yüksek tutarlı, uzun süreli veya karşı tarafın hazırladığı standart metinlerde profesyonel inceleme almak en güvenli yoldur. Özet, bu görüşmeye hazırlıklı gitmenizi sağlar. Sözleşmenizin ilk özetini ücretsiz olarak çıkarmak için ön tarama akışını kullanabilirsiniz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözleşme özetleme ücretsiz mi?",
        answer:
          "Clause'da ücretsiz ön tarama ile başlayabilirsiniz. Ücretsiz kullanım kapsamı zaman zaman güncellenebilir; güncel durumu uygulama içinde görebilirsiniz.",
      },
      {
        question: "Çok uzun sözleşmelerde özet kalitesi düşer mi?",
        answer:
          "Metin uzadıkça bazı bölümlerin ağırlığı azalabilir. Uzun belgelerde bölüm bölüm özet almak ve önemli başlıkları ayrıca sormak daha güvenilir sonuç verir.",
      },
      {
        question: "Özette görünmeyen bir madde önemsiz midir?",
        answer:
          "Hayır. Özette yer almaması o maddenin önemsiz olduğu anlamına gelmez; özetler seçicidir ve metnin tamamı yine de okunmalıdır.",
      },
      {
        question: "Özeti başka bir dile çevirtebilir miyim?",
        answer:
          "Çeviri mümkündür ancak hukuki terimler çeviride anlam kaybedebilir. Türk hukukuna tabi metinlerde Türkçe özet üzerinden ilerlemek daha güvenlidir.",
      },
      {
        question: "Özet çıktısını avukatıma gönderebilir miyim?",
        answer:
          "Gönderebilirsiniz, ancak özeti sözleşmenin kendisiyle birlikte iletin. Avukat değerlendirmesini özete değil, orijinal metne dayandıracaktır.",
      },
    ],
    ctaLabel: "Sözleşme özetinizi ücretsiz çıkarın",
    ctaHref: "/yapay-zeka-hukuk/yapay-zeka-sozlesme-analizi",
    updatedAt: "2026-08-05",
  }),

  createRehberPage({
    slug: "hukukcular-icin-yapay-zeka-araclari",
    h1: "Hukukçular için yapay zeka araçları — sorumlu kullanım rehberi",
    metaTitle: "Hukukçular için yapay zeka araçları 2026 rehberi",
    metaDescription:
      "Avukatlar ve hukuk öğrencileri için yapay zeka araçlarının doğru kullanımı: hangi işlerde hız kazandırır, hangi işlerde risk yaratır ve nasıl denetlenir?",
    keywords: [
      "hukukçular için yapay zeka",
      "avukatlar için ai araçları",
      "legaltech yapay zeka",
      "hukuk bürosu yapay zeka kullanımı",
      "yapay zeka hukuk iş akışı",
    ],
    intro:
      "Yapay zeka araçları hukuk pratiğinde giderek daha görünür hale geliyor; ancak asıl soru \"kullanılmalı mı\" değil, \"hangi işte ve hangi denetimle kullanılmalı\" sorusudur. Bu rehber, hukukçuların yapay zekayı sorumluluk sınırlarını zedelemeden iş akışına nasıl yerleştirebileceğine odaklanır. Amaç bir ürün tanıtımı değil, mesleki risk yönetimi açısından uygulanabilir bir çerçeve sunmaktır.",
    sections: [
      {
        title: "Hız kazandırdığı işler",
        paragraphs: [
          "Yapay zeka, uzun bir belgeden ilk okuma çıkarmak, tekrar eden sözleşme türlerinde standart başlıkların yerini bulmak, müvekkile gönderilecek açıklayıcı metnin taslağını hazırlamak ve karmaşık bir metni sadeleştirmek gibi işlerde belirgin zaman kazandırır. Bu işlerin ortak özelliği, çıktının kolayca denetlenebilir olmasıdır.",
          "Aynı şekilde, bir dosyaya başlarken kontrol listesi oluşturmak veya müvekkilden istenecek belgeleri sıralamak gibi hazırlık işleri de uygundur. Burada yapay zeka bir asistan rolündedir; ürettiği çıktının hiçbiri doğrudan dışarı çıkmadan önce hukukçunun elinden geçmelidir.",
        ],
      },
      {
        title: "Risk yaratan kullanım alanları",
        paragraphs: [
          "Kaynak gösterimi gerektiren araştırmalar en riskli alandır. Dil modelleri var olmayan karar veya madde üretebildiği için, doğrulanmadan dilekçeye aktarılan bir atıf hem dosyaya hem de mesleki itibara zarar verir. Bu nedenle her atıf, resmî kaynaktan tek tek teyit edilmelidir; aracın kaynak sunması doğruluğun garantisi değildir.",
          "İkinci riskli alan, somut olaya özgü strateji ve süre değerlendirmesidir. Hak düşürücü süre, zamanaşımı ve usul tercihleri bağlama son derece duyarlıdır ve genel bir modelin bunu eksiksiz kavraması beklenemez. Bu kararların yapay zeka çıktısına dayandırılması kabul edilemez bir risk oluşturur.",
        ],
      },
      {
        title: "Gizlilik ve müvekkil bilgisi",
        paragraphs: [
          "Mesleki sır yükümlülüğü, hangi aracın kullanıldığından bağımsız olarak geçerlidir. Müvekkile ait belgeleri herhangi bir çevrimiçi hizmete girmeden önce, o hizmetin gizlilik metnini okumak ve gerekli görülüyorsa müvekkilin bilgilendirilmiş onayını almak gerekir. Kimlik bilgileri ve dosya numaraları çoğu zaman maskelenebilir.",
          "Büro içinde yazılı bir kullanım politikası oluşturmak, kişisel tercihlere bırakmaktan daha güvenlidir. Hangi belge türlerinin paylaşılabileceği, hangilerinin paylaşılamayacağı ve çıktıların nasıl denetleneceği netleştirilmelidir. Clause'un veri yaklaşımına ilişkin açıklamalar /gizlilik ve /guvenlik sayfalarında yer alır.",
        ],
      },
      {
        title: "Denetlenebilir bir iş akışı kurmak",
        paragraphs: [
          "Sağlıklı bir akış üç adımdan oluşur: dar kapsamlı bir görev tanımı, çıktının kaynakla karşılaştırılması ve nihai metnin hukukçu tarafından yeniden yazılması. Yapay zeka çıktısının olduğu gibi kullanıldığı hiçbir aşama bırakılmamalıdır. Bu disiplin, kazanılan zamanın bir hata düzeltmeye harcanmasını engeller.",
          "Ekip çalışmasında, hangi metnin yapay zeka desteğiyle hazırlandığını iç kayıtta belirtmek denetimi kolaylaştırır. Böylece bir hata çıktığında kaynağı hızla tespit edilir ve politika buna göre güncellenir. Şeffaflık, aracın kullanımını yasaklamaktan daha sürdürülebilir bir yöntemdir.",
        ],
      },
      {
        title: "Clause'un bu tabloda yeri",
        paragraphs: [
          "Clause, sözleşme metinleri için yapay zeka destekli bir ön analiz aracıdır. Bir hukukçu için değeri, dosyaya başlamadan önce metnin hangi başlıklarda dikkat gerektirdiğine dair hızlı bir çerçeve sunmasıdır. Hukuki görüş üretmez, dosya yönetimi yapmaz ve avukatın değerlendirmesinin yerine geçmez.",
          "Aracın çıktısı, tıpkı diğer yapay zeka çıktıları gibi doğrulanmayı gerektirir. Bu sınırlar içinde kullanıldığında ilk okuma süresini kısaltmaya yardımcı olabilir. Kira ve iş sözleşmelerinde konu odaklı analiz sayfalarından başlayarak aracın çıktı biçimini kendi dosyanızla test edebilirsiniz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Yapay zeka çıktısını dilekçeye doğrudan aktarabilir miyim?",
        answer:
          "Aktarmamalısınız. Çıktı taslak niteliğindedir; her ifade ve atıf resmî kaynaktan doğrulanmalı ve nihai metin hukukçu tarafından yeniden yazılmalıdır.",
      },
      {
        question: "Müvekkil belgesini yapay zekaya yüklemek meslek sırrını ihlal eder mi?",
        answer:
          "Duruma göre değişir. Gizlilik yükümlülüğü sürdüğü için hizmetin politikaları incelenmeli, veriler maskelenmeli ve gerektiğinde müvekkilin bilgilendirilmiş onayı alınmalıdır.",
      },
      {
        question: "Clause hukuk büroları için özel bir modül sunuyor mu?",
        answer:
          "Clause genel bir sözleşme ön analiz aracıdır; büro yönetimi, dosya takibi veya baroya özel entegrasyon iddiasında bulunmaz.",
      },
      {
        question: "Hukuk öğrencileri bu araçları nasıl kullanmalı?",
        answer:
          "Kavramları anlamak ve metin okumayı hızlandırmak için yararlıdır. Ancak sınav ve ödevlerde kaynak doğrulaması yapılmadan kullanılması hatalı bilgiye yol açar.",
      },
      {
        question: "Yapay zeka avukatın işini ortadan kaldırır mı?",
        answer:
          "Yakın gelecekte beklenen etki, hazırlık ve okuma yükünün azalmasıdır. Değerlendirme, strateji, temsil ve sorumluluk taşıyan kararlar insana ait kalmaya devam eder.",
      },
    ],
    ctaLabel: "İş sözleşmesi risk başlıklarını inceleyin",
    ctaHref: "/sozlesme-analizi/is-sozlesmesi-riskleri",
    updatedAt: "2026-08-05",
  }),

  createRehberPage({
    slug: "yapay-zeka-hukuk-etik-kvkk",
    h1: "Yapay zeka, hukuk ve KVKK — etik kullanım ve veri sorumluluğu",
    metaTitle: "Yapay zeka hukuk etiği ve KVKK — 2026 kullanım rehberi",
    metaDescription:
      "Hukuki metinleri yapay zekaya verirken KVKK ve etik açısından nelere dikkat edilmeli? Veri minimizasyonu, şeffaflık ve insan denetimi üzerine pratik rehber.",
    keywords: [
      "yapay zeka kvkk",
      "yapay zeka hukuk etiği",
      "kişisel veri yapay zeka",
      "ai veri gizliliği hukuk",
      "yapay zeka sorumlu kullanım",
    ],
    intro:
      "Bir sözleşmeyi yapay zekaya vermek, çoğu zaman aynı anda kişisel veri işleme anlamına da gelir. Taraf isimleri, iletişim bilgileri, ücret verileri ve bazen sağlık ya da finansal detaylar bu metinlerin içinde bulunur. Bu sayfa, KVKK çerçevesinde akılda tutulması gereken temel ilkeleri ve yapay zeka kullanımında etik davranmanın pratik karşılığını sade bir dille ele alır.",
    sections: [
      {
        title: "Veri minimizasyonu: ne kadar az, o kadar iyi",
        paragraphs: [
          "Kişisel verilerin işlenmesinde temel ilkelerden biri, amaç için gerekli olanla sınırlı kalmaktır. Sözleşmenin fesih maddesini anlamak için tarafın kimlik numarasına veya ev adresine ihtiyaç yoktur. Paylaşımdan önce metni gözden geçirip gereksiz alanları çıkarmak, hem hukuki riski hem de olası bir sızıntının etkisini azaltır.",
          "Maskeleme basit bir alışkanlıkla yapılabilir: isimleri \"Kiracı\", \"İşveren\", \"Yüklenici\" gibi rollerle değiştirin, numaraları silin, banka ve iletişim bilgilerini çıkarın. Bu değişiklikler değerlendirmenin kalitesini düşürmez, çünkü hukuki analiz kişilerin kimliğine değil, hükmün içeriğine dayanır.",
        ],
      },
      {
        title: "Üçüncü kişilerin verisi ve rıza sorunu",
        paragraphs: [
          "Kendi verinizi paylaşma kararını siz verirsiniz; ancak sözleşmedeki karşı tarafın, çalışanların veya kefillerin verileri size ait değildir. Bu kişiler adına paylaşım yapılması ayrı bir sorumluluk doğurabilir. Özellikle çalışan özlük bilgileri, sağlık raporu ekleri ve müşteri listeleri içeren belgelerde bu konu ihmal edilmemelidir.",
          "Kurumsal bağlamda karar kişisel tercihe bırakılmamalı; hangi belge türlerinin dış araçlara girilebileceği yazılı olarak belirlenmelidir. Gizlilik hükmü içeren bir sözleşmenin kendisini paylaşmak, o hükmün ihlali anlamına gelebilir. Şüphe halinde önce veri sorumlusuna veya hukuk birimine danışmak gerekir.",
        ],
      },
      {
        title: "Şeffaflık ve doğru beklenti",
        paragraphs: [
          "Etik kullanımın en görünür yanı, çıktının ne olduğunu doğru anlatmaktır. Yapay zeka tabanlı bir değerlendirmeyi \"hukuki görüş\" veya \"kesin sonuç\" gibi sunmak, karşı tarafı yanıltır. Clause bir ön analiz aracıdır; avukatlık hizmeti vermez, dava sonucu öngörmez ve çıktısı kesinlik iddiası taşımaz.",
          "Aynı şeffaflık, çıktıyı başkasına ilettiğinizde de geçerlidir. Bir iş arkadaşınıza veya müvekkilinize yapay zeka özeti gönderiyorsanız, bunun doğrulanmamış bir ön değerlendirme olduğunu belirtin. Bu küçük not, yanlış bir kararın size veya karşı tarafa mal olmasını engelleyebilir.",
        ],
      },
      {
        title: "İnsan denetimi neden vazgeçilmez?",
        paragraphs: [
          "Otomatik sistemlerin ürettiği değerlendirmeler, önyargı taşıyabilir veya bağlamı kaçırabilir. Hukuki sonuç doğuran süreçlerde insan denetiminin bulunması hem etik hem de pratik bir zorunluluktur. Yapay zekanın işaretlediği bir riski önemsiz sayma ya da ciddiye alma kararı, olguları bilen kişide olmalıdır.",
          "Denetim yalnızca son aşamada değil, süreç boyunca işlemelidir. Çıktıyı okurken \"bu bilgi metinde gerçekten var mı\" sorusunu tekrarlamak, halüsinasyon kaynaklı hataları erken yakalar. Kritik kararlarda ise bağımsız bir hukuk profesyonelinin görüşü alınmadan ilerlenmemelidir.",
        ],
      },
      {
        title: "Kullanmadan önce kontrol listesi",
        paragraphs: [
          "Paylaşım öncesinde şu üç soruyu yanıtlayın: Bu belgede gerçekten gerekli olmayan kişisel veri var mı? Bu belgeyi paylaşmam bir gizlilik yükümlülüğünü ihlal eder mi? Çıktıyı kimlere, hangi uyarıyla ileteceğim? Bu üç sorunun cevabı netse kullanım büyük ölçüde sağlıklı bir zemine oturur.",
          "Kullandığınız hizmetin politikalarını okumayı da bu listeye ekleyin. Clause'un veri yaklaşımı ve güvenlik açıklamaları için /gizlilik ve /guvenlik sayfalarını inceleyebilirsiniz. Metninizi maskeledikten sonra ücretsiz ön taramayı deneyerek çıktının kapsamını kendiniz değerlendirebilirsiniz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Sözleşmeyi yapay zekaya vermek KVKK ihlali midir?",
        answer:
          "Otomatik olarak ihlal sayılmaz; belirleyici olan hangi verinin, hangi amaçla ve hangi hukuki dayanakla işlendiğidir. Gereksiz kişisel veriyi çıkarmak riski belirgin biçimde azaltır.",
      },
      {
        question: "Kişisel verileri maskelemek yeterli mi?",
        answer:
          "Maskeleme önemli bir önlemdir ancak tek başına her durumu karşılamaz. Belge hâlâ ticari sır veya gizlilik yükümlülüğüne tabi bilgi içeriyor olabilir.",
      },
      {
        question: "Clause verilerimi nasıl işliyor?",
        answer:
          "Veri işleme yaklaşımına ilişkin açıklamalar /gizlilik ve /guvenlik sayfalarında yer alır. Paylaşım kararınızı bu metinleri okuduktan sonra vermeniz önerilir.",
      },
      {
        question: "Çalışanıma ait bordroyu yapay zekaya yükleyebilir miyim?",
        answer:
          "Bu, üçüncü kişiye ait veri içerdiği için ek sorumluluk doğurabilir. Kurumsal politikanızı ve veri sorumlusunun onayını kontrol etmeden ilerlemeyin.",
      },
      {
        question: "Yapay zeka çıktısına dayanarak karar verirsem sorumluluk kimde?",
        answer:
          "Sorumluluk kararı veren kişidedir. Bu nedenle çıktı doğrulanmalı ve hukuki sonuç doğuran adımlar öncesinde profesyonel görüş alınmalıdır.",
      },
    ],
    ctaLabel: "Güvenlik yaklaşımımızı inceleyin",
    ctaHref: "/guvenlik",
    updatedAt: "2026-08-05",
  }),

  createRehberPage({
    slug: "ai-sozlesme-risk-puani-nedir",
    h1: "AI sözleşme risk puanı nedir? — nasıl okunur, nasıl yorumlanır",
    metaTitle: "AI sözleşme risk puanı nedir? 2026 açıklamalı rehber",
    metaDescription:
      "Yapay zeka destekli sözleşme analizlerinde risk puanı ne anlama gelir? Puanın neyi ölçtüğü, neyi ölçmediği ve düşük puanın neden garanti olmadığı.",
    keywords: [
      "ai sözleşme risk puanı",
      "sözleşme risk skoru",
      "yapay zeka risk analizi sözleşme",
      "risk puanı nasıl hesaplanır",
      "sözleşme güven skoru",
    ],
    intro:
      "Yapay zeka destekli sözleşme analizlerinde sıkça karşılaşılan risk puanı, uzun bir değerlendirmeyi tek bir sayıya indiren özet göstergedir. Doğru okunduğunda dikkati nereye vereceğinizi hızla gösterir; yanlış okunduğunda ise sahte bir güven duygusu yaratır. Bu sayfa, puanın neyi temsil ettiğini, hangi sınırları olduğunu ve karar alırken nasıl kullanılması gerektiğini açıklar.",
    sections: [
      {
        title: "Risk puanı neyi temsil eder?",
        paragraphs: [
          "Risk puanı, sözleşmede işaretlenen dikkat noktalarının sayısını ve ağırlığını bir araya getiren göreli bir göstergedir. Tek taraflı fesih hakkı, orantısız cezai şart, belirsiz süre veya karşı taraf lehine kurulmuş sorumluluk sınırlaması gibi başlıklar bu göstergeyi yukarı çeker. Amaç, metnin hangi yönde dengesiz göründüğünü hızlıca hissettirmektir.",
          "Bu bir hukuki hüküm değil, okuma önceliklendirme aracıdır. Puan size \"bu sözleşme geçersiz\" ya da \"bu sözleşme sorunsuz\" demez; yalnızca metnin taradığı başlıklar açısından nasıl konumlandığını gösterir. Bu nedenle puan her zaman altındaki gerekçe listesiyle birlikte okunmalıdır.",
        ],
      },
      {
        title: "Puanı yukarı çeken tipik maddeler",
        paragraphs: [
          "En sık öne çıkan başlıklar; yalnızca bir tarafa tanınmış fesih yetkisi, sessiz kalma halinde otomatik yenileme, yüksek veya belirsiz cezai şart, geniş kapsamlı gizlilik ve rekabet yasağı ile masrafların tek tarafa yıkılmasıdır. Bunlar tek başlarına hukuka aykırı olmayabilir ama pazarlık gerektiren noktalardır.",
          "İkinci grup, belirsizlikten kaynaklanan risklerdir: tanımsız kavramlar, birbiriyle çelişen maddeler, eksik tarih ve tutar bilgileri, atıf yapılan ama sunulmayan ekler. Belirsizlik ileride yorum farkı ve uyuşmazlık üretir; bu yüzden puanlamada gözden kaçırılmaması gereken bir kategoridir.",
        ],
      },
      {
        title: "Düşük puan neden garanti değildir?",
        paragraphs: [
          "Düşük bir risk puanı, yalnızca taranan başlıklarda belirgin bir işaret bulunmadığı anlamına gelir. Sözleşmede olması gerekip de hiç yer almayan bir hüküm, tanım gereği metinde görünmediği için işaretlenmeyebilir. Eksiklik çoğu zaman kötü yazılmış bir maddeden daha maliyetlidir.",
          "Ayrıca risk her zaman metinde değil, olgularda saklıdır. Tarafın mali durumu, sektörün teamülü, önceki yazışmalar ve fiili uygulama, kağıt üzerinde masum görünen bir maddeyi ciddi bir soruna dönüştürebilir. Bu nedenle düşük puan, metni okumaktan veya profesyonel görüş almaktan sizi muaf tutmaz.",
        ],
      },
      {
        title: "Puanı karar alırken nasıl kullanmalı?",
        paragraphs: [
          "Puanı bir sıralama aracı olarak kullanın: elinizde birden fazla belge varsa hangisine önce bakacağınızı belirler, tek belge varsa hangi bölümden başlayacağınızı gösterir. Yüksek puan panik değil, dikkatli okuma çağrısıdır; düşük puan ise rahatlama değil, kontrollü ilerleme işaretidir.",
          "Her zaman gerekçelere inin ve işaretlenen ifadeyi sözleşme metninde bulun. Bir maddeyi kendi bağlamında okuduğunuzda değerlendirmenin isabetli olup olmadığını çoğu zaman kendiniz görürsünüz. Kira sözleşmeleri için konu odaklı analiz sayfası, hangi başlıkların neden riskli sayıldığını anlamak açısından yararlı bir başlangıçtır.",
        ],
      },
      {
        title: "Puanın sınırları ve profesyonel inceleme",
        paragraphs: [
          "Risk puanı bir yapay zeka çıktısıdır ve hata payı taşır. Model bir maddeyi yanlış yorumlayabilir, bağlamı kaçırabilir veya metinde olmayan bir unsuru varmış gibi değerlendirebilir. Bu yüzden puan, kesin doğruluk iddiası taşımaz ve tek başına karar dayanağı yapılmamalıdır.",
          "Yüksek tutarlı, uzun süreli ya da uyuşmazlığa dönüşme ihtimali olan sözleşmelerde avukat incelemesi şarttır. Clause bir ön analiz aracıdır; avukatlık hizmeti vermez ve hukuki görüş sunmaz. Kendi sözleşmenizin risk çerçevesini görmek için ücretsiz ön taramayı kullanabilirsiniz.",
        ],
      },
    ],
    faqs: [
      {
        question: "Risk puanı yüksek çıkarsa sözleşmeyi imzalamamalı mıyım?",
        answer:
          "Yüksek puan imzalamayın demek değildir; müzakere edilmesi gereken başlıklar bulunduğunu gösterir. İşaretlenen maddeleri okuyup gerekiyorsa profesyonel görüş alın.",
      },
      {
        question: "Aynı sözleşmede puan neden değişebiliyor?",
        answer:
          "Dil modelleri olasılıksal çalıştığı için değerlendirmede küçük farklar oluşabilir. Bu nedenle puanı kesin bir ölçüm değil, göreli bir gösterge olarak yorumlayın.",
      },
      {
        question: "Risk puanı hukuken bağlayıcı mıdır?",
        answer:
          "Hayır. Puan bilgilendirme amaçlı bir ön değerlendirmedir; mahkeme, kurum veya karşı taraf açısından herhangi bir bağlayıcılığı yoktur.",
      },
      {
        question: "Puanın hangi maddeden kaynaklandığını görebilir miyim?",
        answer:
          "Analiz çıktısında işaretlenen başlıklar listelenir. Her başlığı sözleşme metninde bulup kendi bağlamında okumanız önerilir.",
      },
      {
        question: "Risk puanı sıfıra yakınsa metni yine de okumalı mıyım?",
        answer:
          "Evet. Eksik hükümler ve olgusal riskler puana yansımayabilir; metnin tamamını okumak her durumda gereklidir.",
      },
    ],
    ctaLabel: "Kira sözleşmenizin risklerini görün",
    ctaHref: "/sozlesme-analizi/kira-sozlesmesi-analizi",
    updatedAt: "2026-08-05",
  }),
];
