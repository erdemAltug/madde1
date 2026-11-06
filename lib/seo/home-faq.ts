import { PLUS_PRICE_LABEL } from "@/lib/pricing";

/** Ana sayfa SSS — hem sayfada görünür hem FAQPage şemasında (Google görünür içerik ister). */
export const HOME_FAQ = [
  {
    question: "Clause ücretsiz mi?",
    answer: `Sözleşme ön taraması, tüm hesaplama araçları, Haklarım Kontrolü, hukuki takvim ve hatırlatıcılar ücretsizdir; kredi kartı istemez. Sınırsız tarama, madde madde detaylı rapor ve resmi yazı taslakları için Bireysel paket ${PLUS_PRICE_LABEL}.`,
  },
  {
    question: "Sözleşmem ve kişisel verilerim ne oluyor?",
    answer:
      "Kimlik numarası, telefon, IBAN gibi bilgiler metin gönderilmeden önce maskelenir. Misafir taramaları saklanmaz. Hesabınıza kaydettiğiniz sözleşmeler sizde kalır ve istediğiniz an silebilirsiniz.",
  },
  {
    question: "Telefonla fotoğraf çekerek tarayabilir miyim?",
    answer:
      "Evet. Sözleşmenin fotoğrafını çekin ya da PDF yükleyin; metni okuyup aynı taramadan geçiririz. Daha net sonuç için düz ve aydınlık bir fotoğraf çekin.",
  },
  {
    question: "Hesap açınca ne kazanırım?",
    answer:
      "Sözleşmedeki kira artışı, yenileme ve bildirim gibi tarihleri takviminize ekler, 30, 7 ve 1 gün kala e-posta ve bildirimle hatırlatırız. Taramalarınız arşivde durur, hukuk asistanı sorularınızı kendi sözleşmeleriniz bağlamında cevaplar.",
  },
  {
    question: "Clause avukatın yerini tutar mı?",
    answer:
      "Hayır. Clause riskleri işaretleyen bir ön kontrol aracıdır; hukuki tavsiye ya da vekalet vermez. Dava, icra veya yüksek tutarlı uyuşmazlıklarda bir avukata danışın. Geliri düşük olanlar baroların adli yardım bürolarından ücretsiz destek alabilir.",
  },
  {
    question: "Hangi sözleşmeleri tarayabilirim?",
    answer:
      "Kira, iş, hizmet ve freelance sözleşmeleri başta olmak üzere abonelik, satış ve kredi sözleşmeleri. Analiz Türk Borçlar Kanunu, İş Kanunu ve Tüketici Kanunu çerçevesinde yapılır.",
  },
] as const;
