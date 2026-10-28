/**
 * Karşı tarafa cevap taslakları. Deterministik şablonlar: aynı girdi her zaman aynı metni üretir,
 * mevzuat atıfları sabittir ve elle kontrol edilmiştir. Kullanıcı metni göndermeden önce düzenler.
 */

export type ReplyTone = "kibar" | "kararli";
export type ReplyChannel = "mesaj" | "resmi";

export type ReplyField = {
  id: string;
  label: string;
  placeholder: string;
  /** Sayı alanı ise TL / % biçimlendirmesi için */
  type?: "text" | "number" | "date";
  suffix?: string;
  optional?: boolean;
};

export type ReplyScenario = {
  id: string;
  title: string;
  recipient: string;
  summary: string;
  fields: ReplyField[];
  legalNote: string;
  build: (v: Record<string, string>, tone: ReplyTone, channel: ReplyChannel) => string;
};

function money(raw: string | undefined): string {
  const n = Number(String(raw ?? "").replace(/\./g, "").replace(",", "."));
  if (!raw || Number.isNaN(n)) return raw?.trim() || "[tutar]";
  return `${new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(n)} TL`;
}

function dateTr(raw: string | undefined): string {
  if (!raw) return "[tarih]";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (!m) return raw;
  return `${m[3]}.${m[2]}.${m[1]}`;
}

function val(v: Record<string, string>, id: string, fallback: string): string {
  const s = v[id]?.trim();
  return s ? s : fallback;
}

function wrapFormal(body: string, v: Record<string, string>, subject: string): string {
  const today = new Intl.DateTimeFormat("tr-TR").format(new Date());
  return [
    `Tarih: ${today}`,
    "",
    `Sayın ${val(v, "recipientName", "[karşı tarafın adı]")},`,
    "",
    `Konu: ${subject}`,
    "",
    body,
    "",
    "Saygılarımla,",
    val(v, "senderName", "[adınız soyadınız]"),
  ].join("\n");
}

function wrapMessage(body: string, v: Record<string, string>, tone: ReplyTone): string {
  const name = v.recipientName?.trim();
  return [`Merhaba${name ? ` ${name}` : ""},`, "", body, "", tone === "kibar" ? "İyi günler dilerim." : "Bilginize."].join(
    "\n",
  );
}

const common: ReplyField[] = [
  { id: "recipientName", label: "Karşı tarafın adı", placeholder: "Örn. Ahmet Bey", optional: true },
  { id: "senderName", label: "Adınız", placeholder: "Örn. Ayşe Demir", optional: true },
];

export const REPLY_SCENARIOS: ReplyScenario[] = [
  {
    id: "kira-zammi",
    title: "Kira zammına itiraz",
    recipient: "Ev sahibine",
    summary: "Ev sahibi yasal tavanın üzerinde zam istiyor.",
    fields: [
      { id: "currentRent", label: "Mevcut aylık kira", placeholder: "25000", type: "number", suffix: "TL" },
      { id: "requestedRate", label: "İstenen artış oranı", placeholder: "80", type: "number", suffix: "%" },
      {
        id: "legalRate",
        label: "Yasal tavan (12 aylık TÜFE ortalaması)",
        placeholder: "Kira artış aracından bakın",
        type: "number",
        suffix: "%",
        optional: true,
      },
      ...common,
    ],
    legalNote:
      "TBK m.344: Konut kiralarında yenilenen dönemdeki artış, bir önceki kira yılının 12 aylık TÜFE ortalamasını geçemez.",
    build: (v, tone, channel) => {
      const rate = val(v, "requestedRate", "[istenen oran]");
      const legal = v.legalRate?.trim();
      const rent = Number(String(v.currentRent ?? "").replace(/\./g, "").replace(",", "."));
      const legalNum = Number(String(legal ?? "").replace(",", "."));
      const newRent =
        legal && !Number.isNaN(rent) && !Number.isNaN(legalNum) && rent > 0
          ? money(String(Math.round(rent * (1 + legalNum / 100))))
          : null;
      const lines =
        tone === "kibar"
          ? [
              `Yeni kira dönemi için ilettiğiniz %${rate} artış talebini aldım, teşekkür ederim.`,
              `Türk Borçlar Kanunu'nun 344. maddesine göre konut kiralarında artış, bir önceki kira yılının 12 aylık TÜFE ortalamasını geçemiyor.${legal ? ` Bu oran şu an %${legal}.` : ""}`,
              newRent
                ? `Bu nedenle yeni dönem kirasını yasal sınır içinde ${newRent} olarak ödemeyi öneriyorum.`
                : "Bu nedenle artışın yasal sınır içinde uygulanmasını rica ediyorum.",
              "Uygun görürseniz bu konuyu birlikte netleştirelim.",
            ]
          : [
              `Yeni kira dönemi için talep ettiğiniz %${rate} artış, Türk Borçlar Kanunu'nun 344. maddesindeki sınırı aşmaktadır.`,
              `Konut kiralarında artış, bir önceki kira yılının 12 aylık TÜFE ortalamasını geçemez.${legal ? ` Bu oran %${legal}'dir.` : ""}`,
              newRent
                ? `Yeni dönem kirasını yasal sınır olan ${newRent} üzerinden ödeyeceğimi bildiririm.`
                : "Kira bedelini yasal sınır içinde ödemeye devam edeceğimi bildiririm.",
              "Yasal sınırı aşan talebi kabul etmediğimi kayda geçirmek isterim.",
            ];
      const body = lines.join(channel === "resmi" ? "\n\n" : "\n");
      return channel === "resmi" ? wrapFormal(body, v, "Kira artış talebi hakkında") : wrapMessage(body, v, tone);
    },
  },
  {
    id: "depozito",
    title: "Depozito iadesi talebi",
    recipient: "Ev sahibine",
    summary: "Taşındınız ama depozito geri verilmedi.",
    fields: [
      { id: "deposit", label: "Depozito tutarı", placeholder: "50000", type: "number", suffix: "TL" },
      { id: "moveOutDate", label: "Anahtar teslim tarihi", placeholder: "", type: "date" },
      { id: "days", label: "Ödeme için süre (gün)", placeholder: "7", type: "number", optional: true },
      ...common,
    ],
    legalNote:
      "TBK m.342: Güvence bedeli kiracıya aittir. Kiraya veren, haklı bir alacağı yoksa sözleşme bitince iade etmelidir; hasar iddiası belgelenmelidir.",
    build: (v, tone, channel) => {
      const days = val(v, "days", "7");
      const lines =
        tone === "kibar"
          ? [
              `${dateTr(v.moveOutDate)} tarihinde taşınmazı boşaltıp anahtarı teslim ettim.`,
              `Sözleşme başında verdiğim ${money(v.deposit)} depozitonun iadesini rica ediyorum.`,
              "Taşınmazda bir hasar olduğunu düşünüyorsanız, belgeleriyle birlikte iletirseniz memnun olurum.",
              `Önümüzdeki ${days} gün içinde iade edebilirseniz çok sevinirim.`,
            ]
          : [
              `${dateTr(v.moveOutDate)} tarihinde taşınmazı boşaltarak anahtarı teslim ettim.`,
              `Türk Borçlar Kanunu'nun 342. maddesi uyarınca ${money(v.deposit)} tutarındaki güvence bedelinin ${days} gün içinde tarafıma iadesini talep ediyorum.`,
              "Belgelenmiş bir hasar iddianız yoksa depozitonun tamamının iadesi gerekir.",
              "Süre içinde iade yapılmazsa yasal yollara başvuracağımı bildiririm.",
            ];
      const body = lines.join(channel === "resmi" ? "\n\n" : "\n");
      return channel === "resmi" ? wrapFormal(body, v, "Depozito (güvence bedeli) iadesi") : wrapMessage(body, v, tone);
    },
  },
  {
    id: "tahliye",
    title: "\"Evi boşaltın\" talebine cevap",
    recipient: "Ev sahibine",
    summary: "Ev sahibi sebep göstermeden çıkmanızı istiyor.",
    fields: [
      { id: "startDate", label: "Kira başlangıç tarihi", placeholder: "", type: "date", optional: true },
      ...common,
    ],
    legalNote:
      "TBK m.347 ve m.350–352: Ev sahibi, 10 yıllık uzama süresi dolmadan ancak kanunda sayılan sebeplerle (gereksinim, yeniden inşa, yazılı tahliye taahhüdü, iki haklı ihtar vb.) tahliye isteyebilir.",
    build: (v, tone, channel) => {
      const lines =
        tone === "kibar"
          ? [
              "Taşınmazı boşaltmamı istediğinizi öğrendim.",
              `${v.startDate ? `${dateTr(v.startDate)} tarihinden beri ` : ""}kira bedelini düzenli ödüyor ve sözleşmeye uyuyorum.`,
              "Türk Borçlar Kanunu'na göre konut kira sözleşmeleri, kiracı bildirimde bulunmadıkça her yıl aynı koşullarla uzar; ev sahibinin tahliye isteyebilmesi için kanunda sayılan bir sebebin bulunması gerekir.",
              "Bir gerekçeniz varsa yazılı olarak paylaşırsanız birlikte değerlendirebiliriz.",
            ]
          : [
              "Taşınmazı boşaltmam yönündeki talebinizi aldım.",
              "Kira bedelini düzenli ödüyor ve sözleşmeye uyuyorum. Türk Borçlar Kanunu'nun 347. maddesine göre konut kira sözleşmesi, kiracı bildirimde bulunmadıkça kendiliğinden uzar.",
              "Kanunda sayılan bir tahliye sebebi bulunmadıkça taşınmazı boşaltma yükümlülüğüm bulunmamaktadır.",
              "Gerekçenizi yazılı olarak bildirmenizi rica ederim.",
            ];
      const body = lines.join(channel === "resmi" ? "\n\n" : "\n");
      return channel === "resmi" ? wrapFormal(body, v, "Tahliye talebiniz hakkında") : wrapMessage(body, v, tone);
    },
  },
  {
    id: "maas",
    title: "Ödenmeyen maaş talebi",
    recipient: "İşverene",
    summary: "Maaşınız zamanında yatmadı.",
    fields: [
      { id: "period", label: "Ödenmeyen dönem", placeholder: "Eylül 2026 maaşı" },
      { id: "amount", label: "Net tutar", placeholder: "40000", type: "number", suffix: "TL", optional: true },
      ...common,
    ],
    legalNote:
      "İş K. m.34: Ücreti ödeme gününden itibaren 20 gün içinde mücbir sebep dışında ödenmeyen işçi, iş görmekten kaçınabilir. Ödenmeyen ücret m.24 uyarınca haklı fesih sebebidir.",
    build: (v, tone, channel) => {
      const what = `${val(v, "period", "[dönem]")}${v.amount ? ` (${money(v.amount)})` : ""}`;
      const lines =
        tone === "kibar"
          ? [
              `${what} henüz hesabıma yatmadı.`,
              "Bir aksaklık olduysa ödemenin ne zaman yapılacağını bildirirseniz planlamamı ona göre yapabilirim.",
            ]
          : [
              `${what} ödeme gününde ödenmemiştir.`,
              "İş Kanunu'nun 34. maddesi uyarınca ücretin ödeme gününden itibaren 20 gün içinde ödenmemesi halinde iş görmekten kaçınma hakkım doğmaktadır.",
              "Ödenmeyen ücretin gecikmeksizin ödenmesini talep ederim.",
            ];
      const body = lines.join(channel === "resmi" ? "\n\n" : "\n");
      return channel === "resmi" ? wrapFormal(body, v, "Ödenmeyen ücret") : wrapMessage(body, v, tone);
    },
  },
  {
    id: "freelance-odeme",
    title: "Ödeme hatırlatma",
    recipient: "Müşteriye",
    summary: "Serbest çalıştığınız işin ödemesi gecikti.",
    fields: [
      { id: "project", label: "Proje / iş", placeholder: "Web sitesi tasarımı" },
      { id: "amount", label: "Tutar", placeholder: "30000", type: "number", suffix: "TL" },
      { id: "dueDate", label: "Vade tarihi", placeholder: "", type: "date" },
      ...common,
    ],
    legalNote:
      "TBK m.117–120: Vadesi gelen borçta borçlu ihtarla temerrüde düşer; vade günü kararlaştırılmışsa ihtar gerekmez ve gecikme faizi işler.",
    build: (v, tone, channel) => {
      const lines =
        tone === "kibar"
          ? [
              `${val(v, "project", "[proje]")} için ${dateTr(v.dueDate)} vadeli ${money(v.amount)} tutarındaki ödemeyi henüz alamadım.`,
              "Gözden kaçmış olabilir diye hatırlatmak istedim. Ödemenin ne zaman yapılacağını paylaşabilir misiniz?",
            ]
          : [
              `${val(v, "project", "[proje]")} kapsamında ${dateTr(v.dueDate)} tarihinde ödenmesi gereken ${money(v.amount)} hâlâ ödenmemiştir.`,
              "Türk Borçlar Kanunu uyarınca vadesi geçen bu alacak için gecikme faizi işlemektedir.",
              "Ödemenin 7 gün içinde yapılmasını, aksi halde yasal yollara başvuracağımı bildiririm.",
            ];
      const body = lines.join(channel === "resmi" ? "\n\n" : "\n");
      return channel === "resmi" ? wrapFormal(body, v, "Vadesi geçmiş ödeme") : wrapMessage(body, v, tone);
    },
  },
];

export function getScenario(id: string | null | undefined): ReplyScenario {
  return REPLY_SCENARIOS.find((s) => s.id === id) ?? REPLY_SCENARIOS[0];
}
