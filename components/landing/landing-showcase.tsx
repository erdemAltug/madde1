"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  FileSearch,
  FileText,
  Map,
  MessageCircle,
  PenLine,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { RENT_CEILING, SEVERANCE_CEILING } from "@/lib/legal/official-rates";
import { cn } from "@/lib/utils";

const fmt = (n: number) => new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(n);

/** Örnek: 4 yıl 3 ay kıdem, 45.000 ₺ brüt — tavan altında kalır */
const SAMPLE_GROSS = 45_000;
const SAMPLE_YEARS = 4.25;
const kidem = Math.min(SAMPLE_GROSS, SEVERANCE_CEILING.annualGrossTry) * SAMPLE_YEARS;
const ihbar = (SAMPLE_GROSS / 30) * 56; // 3 yıldan fazla: 8 hafta
const izin = (SAMPLE_GROSS / 30) * 9;

type TabId = "roadmap" | "draft" | "petition" | "scan" | "rights" | "ask";
type GroupId = "create" | "check";

const ROADMAP_Q = "Ev kiralayacağım, nereden başlamalıyım?";
const DRAFT_Q = "Freelance web tasarım işi aldım, beni koruyan bir hizmet sözleşmesi hazırlar mısın?";

const GROUPS: { id: GroupId; label: string; hint: string }[] = [
  { id: "create", label: "Sıfırdan birlikte yapalım", hint: "Elinizde hiçbir şey yokken" },
  { id: "check", label: "Elinizdekini kontrol edelim", hint: "Sözleşme, hesap, soru" },
];

const TABS: {
  id: TabId;
  group: GroupId;
  label: string;
  icon: React.ElementType;
  title: string;
  body: string;
  href: string;
  cta: string;
}[] = [
  {
    id: "roadmap",
    group: "create",
    label: "Yol haritası",
    icon: Map,
    title: "Ne yapacağınızı bilmiyorsanız buradan başlayın",
    body: "Taşınmak, iş değiştirmek, bir işe başlamak… Durumunuzu tek cümleyle yazın; Clause adım adım ne yapmanız gerektiğini, hangi belgeyi isteyeceğinizi ve hangi tarihe dikkat edeceğinizi sırayla çıkarsın.",
    href: `/asistan?soru=${encodeURIComponent(ROADMAP_Q)}`,
    cta: "Yol haritamı çıkar",
  },
  {
    id: "draft",
    group: "create",
    label: "Sözleşme hazırla",
    icon: PenLine,
    title: "Sözleşmeniz yoksa, sizi koruyanını birlikte yazalım",
    body: "Kiraya veriyor, freelance iş alıyor ya da birine borç veriyorsanız anlatın; Clause sizin lehinize maddeleri ekleyerek sözleşmeyi baştan hazırlasın. Ödeme, teslim, fesih ve fikri haklar unutulmaz.",
    href: `/asistan?soru=${encodeURIComponent(DRAFT_Q)}`,
    cta: "Sözleşmemi hazırla",
  },
  {
    id: "scan",
    group: "check",
    label: "Sözleşme tarama",
    icon: FileSearch,
    title: "İmzalamadan önce tuzakları görün",
    body: "Kira, iş veya hizmet sözleşmenizin fotoğrafını çekin ya da metni yapıştırın. Kanuna aykırı ve aleyhinize olan maddeler renkle işaretlenir, her biri için ne yapacağınız yazılır.",
    href: "/araclar/sozlesme-tuzak-tarama",
    cta: "Sözleşmemi tara",
  },
  {
    id: "rights",
    group: "check",
    label: "Haklarım hesabı",
    icon: Calculator,
    title: "Alacağınızı kuruşu kuruşuna görün",
    body: "5 soruyu cevaplayın; kıdem, ihbar ve izin alacağınız güncel resmi tavanlarla hesaplansın. Hangi süre içinde nereye başvuracağınız da listelenir.",
    href: "/haklarim/kontrol",
    cta: "Haklarımı hesapla",
  },
  {
    id: "petition",
    group: "create",
    label: "Dilekçe",
    icon: FileText,
    title: "Gönderilmeye hazır, resmi formatta",
    body: "Durumunuzu anlatın; doğru kanun dayanağıyla ihtarname, itiraz veya şikâyet dilekçeniz hazırlansın. Kopyalayın, imzalayın, gönderin.",
    href: "/dilekce-olusturucu",
    cta: "Dilekçemi yaz",
  },
  {
    id: "ask",
    group: "check",
    label: "Soru-cevap",
    icon: MessageCircle,
    title: "Net cevap, resmi kanun metniyle",
    body: "Her cevap mevzuat.gov.tr'deki güncel kanun metnine dayanır. Dayandığımız maddeden alıntıyı gösteririz; böylece cevabın nereden geldiğini kendiniz görürsünüz.",
    href: "/asistan",
    cta: "Soru sor",
  },
];

export function LandingShowcase() {
  const [tab, setTab] = React.useState<TabId>("roadmap");
  const active = TABS.find((t) => t.id === tab)!;
  const group = active.group;
  const pickGroup = (g: GroupId) => setTab(TABS.find((t) => t.group === g)!.id);

  return (
    <section className="relative overflow-hidden bg-[#0B1B3A] py-16 text-white sm:py-24" aria-labelledby="showcase-baslik">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#005BEA]/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-amber-300">Ne alacağınızı önceden görün</p>
          <h2 id="showcase-baslik" className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Clause size tam olarak ne verir?
          </h2>
          <p className="mt-3 text-lg text-slate-300">
            Sadece elinizdekini yorumlamayız: elinizde hiçbir şey yokken de yol gösterir, belgenizi baştan hazırlarız.
          </p>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 gap-1 rounded-2xl bg-white/5 p-1 ring-1 ring-white/10 sm:inline-grid sm:w-auto">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => pickGroup(g.id)}
              aria-pressed={group === g.id}
              className={cn(
                "rounded-xl px-3 py-2.5 text-left transition sm:px-5",
                group === g.id ? "bg-amber-400 text-[#0B1B3A]" : "text-slate-200 hover:bg-white/10",
              )}
            >
              <span className="block text-sm font-bold">{g.label}</span>
              <span className={cn("block text-xs", group === g.id ? "text-[#0B1B3A]/70" : "text-slate-400")}>
                {g.hint}
              </span>
            </button>
          ))}
        </div>

        <div role="tablist" aria-label="Örnek çıktılar" className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {TABS.filter((t) => t.group === group).map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              aria-controls={`showcase-${t.id}`}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                tab === t.id ? "bg-white text-[#0B1B3A]" : "bg-white/10 text-slate-200 hover:bg-white/15",
              )}
            >
              <t.icon className="h-4 w-4" aria-hidden />
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-semibold">{active.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-slate-300">{active.body}</p>
            <Link
              href={active.href}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-[#0B1B3A] transition hover:bg-amber-300"
            >
              {active.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div id={`showcase-${tab}`} role="tabpanel" key={tab} className="order-1 lg:order-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="relative rounded-3xl bg-white p-5 text-slate-900 shadow-2xl shadow-black/30 sm:p-6">
              <span className="absolute right-4 top-4 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                Örnek çıktı
              </span>
              {tab === "roadmap" ? <RoadmapDemo /> : null}
              {tab === "draft" ? <DraftDemo /> : null}
              {tab === "scan" ? <ScanDemo /> : null}
              {tab === "rights" ? <RightsDemo /> : null}
              {tab === "petition" ? <PetitionDemo /> : null}
              {tab === "ask" ? <AskDemo /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapDemo() {
  const steps = [
    { t: "Ev sahibinin gerçekten malik olduğunu doğrulayın", d: "Tapu fotokopisini isteyin, kimliğindeki adla eşleştirin. Vekil ise vekâletnameyi görün.", tag: "İmzadan önce" },
    { t: "Depozito en fazla 3 aylık kira olabilir", d: "Fazlasını istemek geçersiz; para olarak verilirse sizin adınıza vadeli hesaba yatırılır.", tag: "TBK m.342" },
    { t: "Sözleşmeyi imzalamadan taratın", d: "Artış oranı, tahliye taahhüdü ve tamir maddelerini birlikte kontrol edelim.", tag: "2 dakika" },
    { t: "Teslimde tutanak ve fotoğraf", d: "Mevcut hasarları tarihli fotoğraflarla kayda alın; çıkışta depozitonuzu bu korur.", tag: "Taşınma günü" },
    { t: "Kira artış tarihini takvime ekleyin", d: "Yenileme ayında yasal tavanı hesaplayıp size hatırlatırız.", tag: "Hatırlatma" },
  ];
  return (
    <div>
      <div className="flex justify-end pt-6 sm:pr-24 sm:pt-0">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[#005BEA] px-4 py-2.5 text-sm text-white">{ROADMAP_Q}</p>
      </div>
      <p className="mt-4 text-sm font-bold">Ev kiralama yol haritanız · 5 adım</p>
      <ol className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <li key={s.t} className="flex gap-3 rounded-2xl border border-slate-200 p-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#005BEA] text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-semibold">{s.t}</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-900">{s.tag}</span>
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-slate-600">{s.d}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DraftDemo() {
  const added = [
    "%50 peşin, kalanı teslimde",
    "Gecikmede faiz",
    "2 tur revizyon sınırı",
    "Fikri haklar ödemeyle devredilir",
    "Erken fesihte yapılan iş ödenir",
  ];
  return (
    <div>
      <p className="pr-20 text-sm font-bold">Hizmet sözleşmesi · web tasarım (freelance)</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {added.map((a) => (
          <span
            key={a}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-800 ring-1 ring-emerald-200"
          >
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            {a}
          </span>
        ))}
      </div>
      <div className="mt-4 max-h-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-[#FCFCFA] p-4 font-serif text-[13px] leading-relaxed text-slate-800 [mask-image:linear-gradient(to_bottom,black_75%,transparent)] sm:p-5">
        <p className="text-center font-bold tracking-wide">HİZMET SÖZLEŞMESİ</p>
        <p className="mt-3">
          <span className="font-semibold">Madde 1 — Taraflar.</span> [Müşteri] ile [Adınız] (Hizmet Veren) arasında aşağıdaki
          şartlarla akdedilmiştir.
        </p>
        <p className="mt-2">
          <span className="font-semibold">Madde 2 — İşin konusu ve teslim.</span> 5 sayfalık kurumsal web sitesinin tasarımı;
          teslim tarihi [tarih]. Müşteri kaynaklı gecikmeler teslim süresine eklenir.
        </p>
        <p className="mt-2">
          <span className="font-semibold">Madde 3 — Ücret ve ödeme.</span> Toplam ücret [tutar] ₺&apos;dir. %50&apos;si imzada,
          kalanı teslimde ödenir. Geciken ödemelere yasal faiz uygulanır.
        </p>
        <p className="mt-2">
          <span className="font-semibold">Madde 4 — Revizyon.</span> Ücrete iki tur revizyon dahildir; ek talepler ayrıca
          ücretlendirilir.
        </p>
        <p className="mt-2">
          <span className="font-semibold">Madde 5 — Fikri haklar.</span> Eser üzerindeki mali haklar, ücretin tamamı ödendiğinde
          Müşteri&apos;ye devredilir.
        </p>
      </div>
    </div>
  );
}

function ScanDemo() {
  const items = [
    { level: "high", clause: "Madde 7 — \"Kira her yıl %50 artırılır.\"", why: `Konut kirasında yenileme artışı TÜFE ortalamasını geçemez; ${RENT_CEILING.periodLabel} için tavan %${RENT_CEILING.pct.toLocaleString("tr-TR")}.`, cite: "TBK m.344" },
    { level: "high", clause: "Madde 9 — \"Depozito 6 aylık kira tutarındadır.\"", why: "Güvence bedeli en fazla 3 aylık kira olabilir; fazlası geçersiz.", cite: "TBK m.342" },
    { level: "mid", clause: "Madde 12 — \"Kiracı tüm tamiratlardan sorumludur.\"", why: "Kiracı yalnız olağan kullanım için gerekli temizlik ve bakım giderlerinden sorumludur; esaslı onarım ev sahibine aittir.", cite: "TBK m.317" },
    { level: "ok", clause: "Madde 3 — Kira süresi 1 yıl", why: "Standart ve kanuna uygun.", cite: null },
  ] as const;
  return (
    <div>
      <div className="flex items-center gap-3 pr-20">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-lg font-bold text-red-600">42</span>
        <div>
          <p className="text-sm font-bold">Konut kira sözleşmesi · Güven skoru 42/100</p>
          <p className="text-xs text-slate-500">2 yüksek, 1 orta risk bulundu</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li
            key={it.clause}
            className={cn(
              "rounded-2xl border p-3",
              it.level === "high" && "border-red-200 bg-red-50/60",
              it.level === "mid" && "border-amber-200 bg-amber-50/60",
              it.level === "ok" && "border-emerald-200 bg-emerald-50/50",
            )}
          >
            <p className="flex items-start gap-2 text-sm font-semibold">
              {it.level === "high" ? <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden /> : null}
              {it.level === "mid" ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden /> : null}
              {it.level === "ok" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden /> : null}
              {it.clause}
            </p>
            <p className="mt-1 pl-6 text-[13px] leading-snug text-slate-600">
              {it.why}
              {it.cite ? <span className="ml-1.5 font-semibold text-[#005BEA]">{it.cite}</span> : null}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RightsDemo() {
  const rows = [
    { k: "Kıdem tazminatı", v: kidem, note: "4 yıl 3 ay × brüt ücret" },
    { k: "İhbar tazminatı", v: ihbar, note: "8 hafta (3 yıldan fazla)" },
    { k: "Kullanılmayan izin", v: izin, note: "9 gün" },
  ];
  const total = rows.reduce((s, r) => s + r.v, 0);
  return (
    <div>
      <p className="pr-20 text-sm font-bold">İşten çıkarılma · 4 yıl 3 ay · {fmt(SAMPLE_GROSS)} ₺ brüt</p>
      <p className="text-xs text-slate-500">Kıdem tavanı ({SEVERANCE_CEILING.periodLabel}): {fmt(SEVERANCE_CEILING.annualGrossTry)} ₺</p>
      <dl className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center justify-between gap-3 px-4 py-3">
            <dt>
              <span className="block text-sm font-semibold">{r.k}</span>
              <span className="text-xs text-slate-500">{r.note}</span>
            </dt>
            <dd className="text-base font-bold tabular-nums">{fmt(r.v)} ₺</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-3 rounded-b-2xl bg-[#005BEA]/5 px-4 py-3">
          <dt className="text-sm font-bold">Toplam (brüt, tahmini)</dt>
          <dd className="text-xl font-bold tabular-nums text-[#005BEA]">{fmt(total)} ₺</dd>
        </div>
      </dl>
      <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-[13px] leading-snug text-amber-950">
        <p className="font-semibold">⏰ Süreniz: 5 yıl (alacak), önce arabulucuya başvuru zorunlu</p>
        <p className="mt-0.5 text-amber-900/80">İşe iade için fesihten itibaren 1 ay içinde arabulucuya başvurmalısınız.</p>
      </div>
    </div>
  );
}

function PetitionDemo() {
  return (
    <div className="pr-1">
      <p className="pr-20 text-sm font-bold">Kiraya verene ihtarname · kira artışı itirazı</p>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-[#FCFCFA] p-4 font-serif text-[13px] leading-relaxed text-slate-800 sm:p-5">
        <p className="text-center font-bold tracking-wide">İHTARNAME</p>
        <p className="mt-3"><span className="font-semibold">Keşide eden:</span> [Adınız Soyadınız], [adres]</p>
        <p><span className="font-semibold">Muhatap:</span> [Ev sahibinin adı], [adres]</p>
        <p className="mt-3">
          Taraflar arasındaki kira sözleşmesinin yenilenmesinde tarafınızca talep edilen %60 oranındaki artış, Türk Borçlar
          Kanunu&apos;nun 344. maddesi uyarınca bir önceki kira yılının on iki aylık TÜFE ortalamasını aşamaz. Bu oran{" "}
          {RENT_CEILING.periodLabel.toLocaleLowerCase("tr-TR")} için %{RENT_CEILING.pct.toLocaleString("tr-TR")}&apos;dir.
        </p>
        <p className="mt-2">Yasal sınırı aşan kısmı ödemeyeceğimi ve kirayı yasal oranla ödemeye devam edeceğimi ihtaren bildiririm.</p>
        <p className="mt-3 text-right">[Tarih] · [İmza]</p>
      </div>
    </div>
  );
}

function AskDemo() {
  return (
    <div className="space-y-3">
      <div className="flex justify-end pt-6 sm:pt-0">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[#005BEA] px-4 py-2.5 text-sm text-white">
          Ödeme emri geldi ama borcum yok. Ne kadar sürede itiraz etmeliyim?
        </p>
      </div>
      <div className="rounded-2xl rounded-bl-md bg-slate-50 p-4 ring-1 ring-slate-200">
        <p className="text-sm leading-relaxed">
          <strong>Ödeme emrinin size tebliğinden itibaren 7 gün içinde</strong> itiraz etmelisiniz. İtirazla takip durur;
          süreyi kaçırırsanız takip kesinleşir.
        </p>
        <ol className="mt-2 list-decimal space-y-0.5 pl-5 text-[13px] text-slate-700">
          <li>Tebliğ tarihini not edin.</li>
          <li>Takibi yapan icra dairesine yazılı veya sözlü itiraz edin.</li>
          <li>&quot;Borcum yoktur&quot; demeniz yeterli; gerekçe yazmak zorunda değilsiniz.</li>
        </ol>
        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
          <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Resmi metinle doğrulandı · İİK m.62
          </p>
          <p className="mt-1 flex gap-1.5 text-[13px] italic leading-snug text-slate-700">
            <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 not-italic text-emerald-700" aria-hidden />
            &ldquo;İtiraz etmek istiyen borçlu, itirazını, ödeme emrinin tebliği tarihinden itibaren yedi gün içinde dilekçe ile veya sözlü olarak icra dairesine bildirmeye mecburdur.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
