/**
 * Haklarım Kontrolü: panik anında 4-5 soruyla hak, tahmini alacak ve süre özeti.
 * Saf fonksiyonlar — UI ve test aynı mantığı kullanır. Oranlar official-rates'ten gelir,
 * burada uydurma tutar yazılmaz.
 */
import { RENT_CEILING, SEVERANCE_CEILING } from "@/lib/legal/official-rates";

export type RightsScenarioId =
  | "isten-cikarildim"
  | "ev-sahibi-cikin-diyor"
  | "kira-zammi"
  | "depozito"
  | "maas-odenmedi";

export type QuestionOption = { value: string; label: string };

export type Question =
  | { id: string; kind: "number"; label: string; help?: string; suffix?: string; min?: number }
  | { id: string; kind: "choice"; label: string; help?: string; options: QuestionOption[] }
  | { id: string; kind: "date"; label: string; help?: string };

export type RightsScenario = {
  id: RightsScenarioId;
  title: string;
  /** Kullanıcının kendi cümlesi — seçim kartında */
  prompt: string;
  questions: Question[];
};

export type Answers = Record<string, string>;

export type ResultLevel = "good" | "warn" | "risk";

export type RightsResult = {
  headline: string;
  rights: Array<{ title: string; body: string; cite?: string; level: ResultLevel }>;
  amounts: Array<{ label: string; value: number; note?: string }>;
  deadlines: Array<{ label: string; body: string }>;
  nextSteps: Array<{ label: string; href: string }>;
  lawyerWhen: string;
};

const YES_NO: QuestionOption[] = [
  { value: "evet", label: "Evet" },
  { value: "hayir", label: "Hayır" },
];

export const RIGHTS_SCENARIOS: RightsScenario[] = [
  {
    id: "isten-cikarildim",
    title: "İşten çıkarıldım",
    prompt: "İşten çıkarıldım, ne alabilirim?",
    questions: [
      { id: "years", kind: "number", label: "Bu işyerinde kaç yıl çalıştınız?", help: "Örn. 3,5 yıl için 3.5 yazın.", suffix: "yıl", min: 0 },
      { id: "gross", kind: "number", label: "Son aylık brüt maaşınız?", help: "Bordrodaki brüt tutar; düzenli yemek ve yol yardımı dahil.", suffix: "TL", min: 0 },
      {
        id: "how",
        kind: "choice",
        label: "İş nasıl sona erdi?",
        options: [
          { value: "employer", label: "İşveren çıkardı (performans, küçülme, sebepsiz)" },
          { value: "misconduct", label: "İşveren ahlak / iyi niyet kuralına aykırılık dedi" },
          { value: "just_cause", label: "Ben feshettim: maaş ödenmedi, mobbing, sigorta eksik" },
          { value: "resigned", label: "Kendi isteğimle istifa ettim" },
        ],
      },
      { id: "notice", kind: "choice", label: "İşveren size önceden bildirim süresi verdi ya da ihbar ücretini ödedi mi?", options: YES_NO },
      { id: "leave", kind: "number", label: "Kullanmadığınız yıllık izin günü var mı?", help: "Yoksa 0 yazın.", suffix: "gün", min: 0 },
    ],
  },
  {
    id: "ev-sahibi-cikin-diyor",
    title: "Ev sahibi çıkın diyor",
    prompt: "Ev sahibi evden çıkmamı istiyor.",
    questions: [
      { id: "years", kind: "number", label: "Bu evde kaç yıldır kiracısınız?", suffix: "yıl", min: 0 },
      {
        id: "reason",
        kind: "choice",
        label: "Ev sahibi hangi sebebi söylüyor?",
        options: [
          { value: "need", label: "Kendisi ya da yakını oturacak" },
          { value: "new_owner", label: "Evi yeni satın aldı" },
          { value: "renovation", label: "Yıkıp yeniden yapacak / esaslı tadilat" },
          { value: "late_rent", label: "Kirayı geç ödediğimi söylüyor" },
          { value: "pledge", label: "Tahliye taahhüdü imzalamıştım" },
          { value: "none", label: "Sebep yok, sadece çık diyor" },
        ],
      },
      { id: "written", kind: "choice", label: "Noter ihtarnamesi ya da yazılı bildirim geldi mi?", options: YES_NO },
      { id: "sameDay", kind: "choice", label: "Tahliye taahhüdünü kira sözleşmesiyle aynı gün mü imzaladınız?", help: "Taahhüt yoksa “Hayır” seçin.", options: YES_NO },
    ],
  },
  {
    id: "kira-zammi",
    title: "Ev sahibi zam istiyor",
    prompt: "Ev sahibi kiraya yüksek zam istiyor.",
    questions: [
      { id: "current", kind: "number", label: "Şu anki aylık kiranız?", suffix: "TL", min: 0 },
      { id: "requested", kind: "number", label: "Ev sahibinin istediği yeni kira?", suffix: "TL", min: 0 },
      { id: "over5", kind: "choice", label: "Bu evde 5 yıldan uzun süredir mi oturuyorsunuz?", options: YES_NO },
    ],
  },
  {
    id: "depozito",
    title: "Depozitomu vermiyor",
    prompt: "Ev sahibi depozitomu geri vermiyor.",
    questions: [
      { id: "deposit", kind: "number", label: "Depozito tutarı?", suffix: "TL", min: 0 },
      { id: "moveOut", kind: "date", label: "Evi hangi tarihte teslim ettiniz?" },
      {
        id: "bank",
        kind: "choice",
        label: "Depozito bankada vadeli hesaba mı yatırıldı?",
        options: [
          { value: "evet", label: "Evet, banka hesabında" },
          { value: "hayir", label: "Hayır, elden / ev sahibinin hesabına verdim" },
        ],
      },
      { id: "damage", kind: "choice", label: "Ev sahibi evde hasar olduğunu söylüyor mu?", options: YES_NO },
    ],
  },
  {
    id: "maas-odenmedi",
    title: "Maaşım ödenmedi",
    prompt: "Maaşım ödenmedi ya da sürekli gecikiyor.",
    questions: [
      { id: "lateDays", kind: "number", label: "Maaş ödeme gününden bu yana kaç gün geçti?", suffix: "gün", min: 0 },
      { id: "months", kind: "number", label: "Toplam kaç aylık maaş ödenmedi?", suffix: "ay", min: 0 },
      { id: "net", kind: "number", label: "Aylık net maaşınız?", suffix: "TL", min: 0 },
      { id: "years", kind: "number", label: "Bu işyerinde kaç yıl çalıştınız?", suffix: "yıl", min: 0 },
      { id: "gross", kind: "number", label: "Aylık brüt maaşınız?", help: "Kıdem tahmini için; bilmiyorsanız net × 1,4 yazabilirsiniz.", suffix: "TL", min: 0 },
    ],
  },
];

export function getRightsScenario(id: string | null | undefined): RightsScenario | undefined {
  return RIGHTS_SCENARIOS.find((s) => s.id === id);
}

function num(v: string | undefined): number {
  if (!v) return 0;
  const t = v.trim().replace(/\s|₺|tl/gi, "");
  // "60.000,50" ve "4,5" → Türkçe biçim; "60.000" → binlik ayraç; "4.5" → ondalık
  const normalized = t.includes(",")
    ? t.replace(/\./g, "").replace(",", ".")
    : /^\d{1,3}(\.\d{3})+$/.test(t)
      ? t.replace(/\./g, "")
      : t;
  const n = Number(normalized);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** İş Kanunu m.17 — kıdeme göre bildirim süresi (hafta) */
export function noticeWeeks(years: number): number {
  if (years < 0.5) return 2;
  if (years < 1.5) return 4;
  if (years < 3) return 6;
  return 8;
}

export function severanceEstimate(years: number, gross: number): number {
  if (years < 1) return 0;
  return Math.round(years * Math.min(gross, SEVERANCE_CEILING.annualGrossTry));
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

const LAWYER_DEFAULT =
  "Karşı taraf dava açtıysa, icra takibi başlattıysa ya da tutar yüksekse bir avukata danışın. Baro adli yardım bürosu, geliri düşük olanlara ücretsiz destek verir.";

export function computeRights(id: RightsScenarioId, a: Answers): RightsResult {
  switch (id) {
    case "isten-cikarildim":
      return dismissal(a);
    case "ev-sahibi-cikin-diyor":
      return eviction(a);
    case "kira-zammi":
      return rentIncrease(a);
    case "depozito":
      return deposit(a);
    case "maas-odenmedi":
      return unpaidSalary(a);
  }
}

function dismissal(a: Answers): RightsResult {
  const years = num(a.years);
  const gross = num(a.gross);
  const leave = num(a.leave);
  const how = a.how;
  const daily = gross / 30;

  const severanceOwed = years >= 1 && (how === "employer" || how === "just_cause");
  const noticeOwed = how === "employer" && a.notice === "hayir";
  const severance = severanceOwed ? severanceEstimate(years, gross) : 0;
  const weeks = noticeWeeks(years);
  const notice = noticeOwed ? Math.round(daily * weeks * 7) : 0;
  const leavePay = Math.round(daily * leave);

  const rights: RightsResult["rights"] = [];
  if (severanceOwed) {
    rights.push({
      title: "Kıdem tazminatı hakkınız var",
      body: `En az 1 yıl çalıştınız ve iş, kıdem hakkını düşürmeyen bir sebeple bitti. Her tam yıl için bir brüt maaş, artan süre için orantılı tutar ödenir; brüt maaş ${SEVERANCE_CEILING.periodLabel} tavanı olan ${formatTry(SEVERANCE_CEILING.annualGrossTry)} ile sınırlıdır.`,
      cite: "1475 s. İş Kanunu m.14",
      level: "good",
    });
  } else if (how === "misconduct") {
    rights.push({
      title: "Kıdem ve ihbar ödenmeyebilir, ama itiraz edebilirsiniz",
      body: "Ahlak ve iyi niyet kuralına aykırılık (İş Kanunu m.25/II) iddiasını işveren ispatlamak zorundadır. İddia doğru değilse kıdem ve ihbar alacağınızı arabulucu yoluyla isteyebilirsiniz.",
      cite: "İşK m.25",
      level: "warn",
    });
  } else if (how === "resigned") {
    rights.push({
      title: "İstifada kıdem genelde ödenmez",
      body: "İstisnalar var: emeklilik için yaş dışındaki şartları doldurmak, askerlik, kadın çalışanın evlendikten sonraki 1 yıl içinde ayrılması. Bunlardan biri varsa kıdem hakkınız doğar.",
      cite: "1475 s. İşK m.14",
      level: "warn",
    });
  } else if (years < 1) {
    rights.push({
      title: "Kıdem için 1 yıl dolmamış",
      body: "Kıdem tazminatı için aynı işverende en az 1 yıl çalışmak gerekir. İhbar ve izin alacakları yine de doğabilir.",
      level: "warn",
    });
  }

  if (noticeOwed) {
    rights.push({
      title: `İhbar tazminatı: ${weeks} hafta`,
      body: "İşveren bildirim süresi vermeden ya da bu sürenin ücretini peşin ödemeden sözleşmeyi bitirdiyse ihbar tazminatı ödemek zorundadır.",
      cite: "İşK m.17",
      level: "good",
    });
  }

  if (leave > 0) {
    rights.push({
      title: "Kullanılmayan izin ücreti",
      body: "İş hangi sebeple biterse bitsin, kullanmadığınız yıllık izinlerin ücreti ödenir.",
      cite: "İşK m.59",
      level: "good",
    });
  }

  const deadlines: RightsResult["deadlines"] = [
    {
      label: "İşe iade için 1 ay",
      body: "İşyerinde 30 veya daha fazla işçi varsa ve en az 6 ay çalıştıysanız, fesih bildiriminden itibaren 1 ay içinde arabulucuya başvurarak işe iade isteyebilirsiniz.",
    },
    {
      label: "Alacaklar için 5 yıl",
      body: "Kıdem, ihbar ve izin alacaklarında zamanaşımı 5 yıldır. Dava açmadan önce arabulucuya başvurmak zorunludur.",
    },
  ];

  const total = severance + notice + leavePay;
  return {
    headline:
      total > 0
        ? `Tahmini toplam brüt alacağınız ${formatTry(total)}.`
        : "Bu bilgilere göre tazminat görünmüyor, ama haklarınız tükenmiş değil.",
    rights,
    amounts: [
      ...(severance ? [{ label: "Kıdem tazminatı", value: severance, note: "Brüt; damga vergisi kesilir" }] : []),
      ...(notice ? [{ label: "İhbar tazminatı", value: notice, note: "Brüt; gelir ve damga vergisi kesilir" }] : []),
      ...(leavePay ? [{ label: "Yıllık izin ücreti", value: leavePay, note: "Brüt" }] : []),
    ],
    deadlines,
    nextSteps: [
      { label: "Kıdem tazminatını ayrıntılı hesapla", href: "/araclar/kidem-tazminati-hesaplama" },
      { label: "İş sözleşmemdeki fesih maddesini tarat", href: "/?persona=job_seeker&open=1" },
      { label: "Asistana durumumu sor", href: "/asistan" },
    ],
    lawyerWhen:
      "İşveren 25/II (ahlak ve iyi niyet) iddia ediyorsa, işe iade düşünüyorsanız ya da toplam alacak birkaç maaşı geçiyorsa bir iş hukuku avukatına danışın.",
  };
}

function eviction(a: Answers): RightsResult {
  const years = num(a.years);
  const reason = a.reason;
  const written = a.written === "evet";
  const rights: RightsResult["rights"] = [];
  const deadlines: RightsResult["deadlines"] = [];

  if (!written) {
    rights.push({
      title: "Sözlü “çık” demek tek başına sonuç doğurmaz",
      body: "Ev sahibi kiracıyı ancak kanundaki sebeplerden biriyle ve mahkeme ya da icra yoluyla çıkarabilir. Kilidi değiştirmek, elektrik-suyu kesmek gibi yollar hukuka aykırıdır.",
      cite: "TBK m.347-352",
      level: "good",
    });
  }

  switch (reason) {
    case "none":
      rights.push({
        title: years < 10 ? "Sebepsiz çıkarma hakkı yok" : "10 yılı geçtiyseniz sebepsiz fesih mümkün",
        body:
          years < 10
            ? "Konut kirasında sözleşme süresi bitince kiracı çıkmazsa sözleşme aynı koşullarla 1 yıl uzar. Ev sahibi, sözleşme süresine ek 10 yıllık uzama dolmadan sebep göstermeden sözleşmeyi bitiremez."
            : "Sözleşme süresine ek 10 yıllık uzama süresi dolduysa ev sahibi, her uzama yılının bitiminden en az 3 ay önce bildirerek sebep göstermeden sözleşmeyi sona erdirebilir.",
        cite: "TBK m.347",
        level: years < 10 ? "good" : "risk",
      });
      break;
    case "need":
      rights.push({
        title: "İhtiyaç sebebini ev sahibi ispatlamalı",
        body: "Ev sahibi kendisinin, eşinin, çocuklarının, ana-babasının ya da bakmakla yükümlü olduğu kişilerin konut ihtiyacını gerçek ve samimi olarak kanıtlamak zorundadır. Tahliye ettirirse evi 3 yıl boyunca başkasına kiralayamaz.",
        cite: "TBK m.350, m.355",
        level: "warn",
      });
      deadlines.push({
        label: "Dava süresi",
        body: "Ev sahibi, belirli süreli sözleşmenin bitiminden itibaren 1 ay içinde dava açmalı ya da icra takibi başlatmalıdır. Bu süre kaçarsa ihtiyaç sebebiyle tahliye bir sonraki kira yılına kalır.",
      });
      break;
    case "new_owner":
      rights.push({
        title: "Yeni malikin süresi sınırlı",
        body: "Evi yeni alan kişi, edinmeden itibaren 1 ay içinde ihtiyacını yazılı bildirmeli; dava ancak edinmeden 6 ay sonra açılabilir. İhtiyaç burada da ispat edilmelidir.",
        cite: "TBK m.351",
        level: "warn",
      });
      break;
    case "renovation":
      rights.push({
        title: "Esaslı tadilat gerçek olmalı",
        body: "Yeniden inşa ya da esaslı onarım, evde oturmayı imkânsız kılıyorsa tahliye sebebidir. Boya-badana gibi işler bu kapsamda değildir; ev sahibi işi 3 yıl içinde yapmazsa yeniden kiralamada kısıtlar devam eder.",
        cite: "TBK m.350, m.355",
        level: "warn",
      });
      break;
    case "late_rent":
      rights.push({
        title: "İki haklı ihtar riski",
        body: "Bir kira yılı içinde kirayı ödemediğiniz için size iki kez yazılı ve haklı ihtar çekildiyse ev sahibi tahliye davası açabilir. Tek gecikme tek başına yeterli değildir; ödemelerinizi dekontla belgeleyin.",
        cite: "TBK m.352/2",
        level: "risk",
      });
      break;
    case "pledge":
      rights.push({
        title: a.sameDay === "evet" ? "Aynı gün imzalanan taahhüt tartışmalı" : "Tahliye taahhüdü bağlayıcı olabilir",
        body:
          a.sameDay === "evet"
            ? "Yargıtay uygulamasında, kira sözleşmesiyle aynı anda alınan tahliye taahhüdü kiracının baskı altında imzaladığı kabul edilerek geçersiz sayılabilir. Taahhüt kira başladıktan sonra serbest iradeyle verilmiş olmalıdır."
            : "Kira başladıktan sonra yazılı olarak verilen taahhütte belirtilen tarihte çıkmazsanız ev sahibi o tarihten itibaren 1 ay içinde icra ya da dava yoluyla tahliye isteyebilir.",
        cite: "TBK m.352/1",
        level: a.sameDay === "evet" ? "good" : "risk",
      });
      break;
  }

  deadlines.push({
    label: "Önce arabulucu",
    body: "Kira uyuşmazlıklarında dava açmadan önce arabulucuya başvurmak zorunludur. Ev sahibi dava açtıysa tebligatı takip edin; süreleri kaçırmamak için hemen yanıt verin.",
  });

  const safe = rights.every((r) => r.level !== "risk");
  return {
    headline: safe
      ? "Bu bilgilere göre ev sahibi sizi hemen çıkaramaz."
      : "Tahliye riski var — süreleri kaçırmadan harekete geçin.",
    rights,
    amounts: [],
    deadlines,
    nextSteps: [
      { label: "Ev sahibine cevap taslağı hazırla", href: "/cevap-taslagi?senaryo=tahliye" },
      { label: "Tahliye taahhüdümü kontrol et", href: "/araclar/tahliye-taahhudu-gecerlilik-kontrolu" },
      { label: "Kira sözleşmemi tarat", href: "/?persona=tenant&open=1" },
    ],
    lawyerWhen:
      "Size dava dilekçesi ya da icra emri tebliğ edildiyse bekletmeden bir avukata danışın; itiraz süreleri 7 gün kadar kısa olabilir.",
  };
}

function rentIncrease(a: Answers): RightsResult {
  const current = num(a.current);
  const requested = num(a.requested);
  const over5 = a.over5 === "evet";
  const legalMax = Math.round(current * (1 + RENT_CEILING.pct / 100));
  const askedPct = current > 0 ? ((requested - current) / current) * 100 : 0;
  const excess = Math.max(0, requested - legalMax);

  const rights: RightsResult["rights"] = [
    {
      title: excess > 0 ? `İstenen artış tavanı aşıyor` : "İstenen artış yasal sınırda",
      body: `Yenilenen kira dönemlerinde artış, önceki kira yılının 12 aylık TÜFE ortalamasını geçemez. ${RENT_CEILING.periodLabel} için bu oran %${RENT_CEILING.pct.toLocaleString("tr-TR")}. İstenen artış: %${askedPct.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}.`,
      cite: "TBK m.344",
      level: excess > 0 ? "risk" : "good",
    },
  ];
  if (over5) {
    rights.push({
      title: "5 yılı geçtiyseniz kira tespit davası açılabilir",
      body: "5 yıldan uzun süren kiralarda ev sahibi, emsal kiralara göre yeni kiranın hâkim tarafından belirlenmesini isteyebilir. Bu durumda TÜFE tavanı tek başına sınır değildir; hâkim hakkaniyete göre karar verir.",
      cite: "TBK m.344/3",
      level: "warn",
    });
  }
  rights.push({
    title: "Kabul etmek zorunda değilsiniz",
    body: "Tavan üzerindeki artışı kabul etmezseniz eski kira artı yasal artışla ödemeye devam edebilirsiniz. Ödemeleri açıklamalı banka havalesiyle yapın.",
    level: "good",
  });

  return {
    headline:
      excess > 0
        ? `Yasal üst sınır ${formatTry(legalMax)}; istenen tutar ${formatTry(excess)} fazla.`
        : `İstenen kira yasal üst sınır olan ${formatTry(legalMax)} içinde.`,
    rights,
    amounts: [
      { label: "Yasal azami yeni kira", value: legalMax, note: RENT_CEILING.sourceLabel },
      ...(excess > 0 ? [{ label: "Tavanı aşan kısım (aylık)", value: excess }] : []),
    ],
    deadlines: [
      {
        label: "Kira yılı başı",
        body: "Artış, yeni kira yılı başladığında geçerli olur. Ev sahibinin talebine yazılı cevap verip itirazınızı belgeleyin.",
      },
    ],
    nextSteps: [
      { label: "Ev sahibine itiraz mesajı hazırla", href: `/cevap-taslagi?senaryo=kira-zammi` },
      { label: "Kira artışını ayrıntılı hesapla", href: "/araclar/kira-sozlesmesi-artis-orani-hesaplama" },
      { label: "Kira sözleşmemi tarat", href: "/?persona=tenant&open=1" },
    ],
    lawyerWhen: "Ev sahibi kira tespit davası açtıysa ya da tahliye ile tehdit ediyorsa bir avukata danışın.",
  };
}

function deposit(a: Answers): RightsResult {
  const amount = num(a.deposit);
  const bank = a.bank === "evet";
  const moveOut = a.moveOut;
  const rights: RightsResult["rights"] = [];
  const deadlines: RightsResult["deadlines"] = [];

  if (bank) {
    rights.push({
      title: "Bankadan doğrudan isteyebilirsiniz",
      body: "Ev sahibi, sözleşme bittikten sonra 3 ay içinde size karşı dava ya da icra takibi başlattığını bankaya yazılı bildirmezse banka depozitoyu sizin talebinizle iade etmek zorundadır.",
      cite: "TBK m.342",
      level: "good",
    });
    if (moveOut) {
      deadlines.push({
        label: "Bankaya başvuru tarihi",
        body: `Teslim tarihinize göre ${addDays(moveOut, 90)} tarihinden sonra bankaya başvurabilirsiniz (sözleşme teslimle sona erdiyse).`,
      });
    }
  } else {
    rights.push({
      title: "Depozito sizin paranızdır",
      body: "Elden verilen depozito da kira bitince iade edilir. Ev sahibi ancak gerçek bir zarar ya da ödenmemiş borç varsa kesinti yapabilir ve bunu belgelemelidir.",
      cite: "TBK m.342",
      level: "good",
    });
    deadlines.push({
      label: "Yazılı talep",
      body: "Önce yazılı (WhatsApp da olur) ödeme talebi gönderin, makul süre verin. Ödenmezse arabulucuya başvurup ardından icra takibi başlatabilirsiniz.",
    });
  }

  if (a.damage === "evet") {
    rights.push({
      title: "Olağan yıpranmadan kesinti yapılamaz",
      body: "Boya solması, normal kullanım izleri gibi olağan yıpranma kiracının sorumluluğunda değildir. Teslim günü çekilmiş fotoğraf ve video en güçlü kanıtınızdır.",
      cite: "TBK m.334",
      level: "warn",
    });
  }

  return {
    headline: amount > 0 ? `${formatTry(amount)} depozitonuzu geri isteyebilirsiniz.` : "Depozitonuzu geri isteyebilirsiniz.",
    rights,
    amounts: amount > 0 ? [{ label: "İade edilmesi gereken depozito", value: amount, note: "Belgelenmiş hasar ve borç düşülerek" }] : [],
    deadlines,
    nextSteps: [
      { label: "Ev sahibine depozito talebi yaz", href: "/cevap-taslagi?senaryo=depozito" },
      { label: "Depozito haklarını ayrıntılı oku", href: "/haklarim/depozito-haklarim" },
    ],
    lawyerWhen: "Ev sahibi yüksek bir hasar bedeli talep ediyor ya da size icra takibi başlattıysa bir avukata danışın.",
  };
}

function unpaidSalary(a: Answers): RightsResult {
  const lateDays = num(a.lateDays);
  const months = num(a.months);
  const net = num(a.net);
  const years = num(a.years);
  const gross = num(a.gross) || net * 1.4;
  const unpaid = Math.round(months * net);
  const severance = severanceEstimate(years, gross);

  const rights: RightsResult["rights"] = [
    {
      title: "Ödenmeyen ücret faiziyle istenir",
      body: "Ödeme gününde ödenmeyen ücret için mevduata uygulanan en yüksek faiz işler.",
      cite: "İşK m.34",
      level: "good",
    },
  ];
  if (lateDays >= 20) {
    rights.push({
      title: "Çalışmama hakkınız doğdu",
      body: "Ücret ödeme gününden itibaren 20 gün içinde mücbir sebep olmadan ödenmezse işten kaçınabilirsiniz; bu sebeple sözleşmeniz feshedilemez. Bunu tek başınıza kullanırsanız yazılı bildirim yapın.",
      cite: "İşK m.34",
      level: "good",
    });
  }
  rights.push({
    title: "Haklı nedenle fesih ve kıdem",
    body:
      years >= 1
        ? "Ücretin ödenmemesi haklı fesih sebebidir. Bu yolla ayrılırsanız ihbar süresi beklemeden ayrılır ve kıdem tazminatınızı alırsınız. Feshi noter ya da yazılı bildirimle, sebebini belirterek yapın."
        : "Ücretin ödenmemesi haklı fesih sebebidir; ihbar süresi beklemeden ayrılabilirsiniz. 1 yılı doldurmadığınız için kıdem doğmaz, ödenmeyen maaşlar yine alacağınızdır.",
    cite: "İşK m.24/II-e",
    level: years >= 1 ? "good" : "warn",
  });

  return {
    headline:
      unpaid > 0
        ? `${formatTry(unpaid)} ödenmemiş maaşınızı faiziyle isteyebilirsiniz.`
        : "Gecikmiş maaşınızı faiziyle isteyebilirsiniz.",
    rights,
    amounts: [
      ...(unpaid ? [{ label: "Ödenmemiş net maaş", value: unpaid }] : []),
      ...(severance ? [{ label: "Haklı fesihte tahmini kıdem", value: severance, note: "Brüt; tavan uygulanmış" }] : []),
    ],
    deadlines: [
      { label: "Alacak için 5 yıl", body: "Ücret alacaklarında zamanaşımı 5 yıldır. Dava öncesi arabulucuya başvurmak zorunludur." },
      { label: "Haklı fesih için 6 iş günü", body: "Ahlak ve iyi niyet kuralına aykırılığa dayalı fesihlerde öğrenmeden itibaren 6 iş günü süre vardır; ücretin ödenmemesi devam eden bir durum olduğundan ödenmediği sürece fesih hakkı genellikle sürer. Yine de geciktirmeyin." },
    ],
    nextSteps: [
      { label: "İşverene maaş talep yazısı hazırla", href: "/cevap-taslagi?senaryo=maas" },
      { label: "Kıdem tazminatını hesapla", href: "/araclar/kidem-tazminati-hesaplama" },
      { label: "Asistana durumumu sor", href: "/asistan" },
    ],
    lawyerWhen: LAWYER_DEFAULT,
  };
}

export function formatTry(n: number): string {
  return n.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });
}
