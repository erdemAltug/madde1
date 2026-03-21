export const SAMPLE_RENTAL_CONTRACT = `KİRA SÖZLEŞMESİ

1. Taraflar
Kiraya Veren: Örnek A.Ş., İstanbul
Kiracı: Örnek Kişi, İstanbul

2. Konu
İstanbul ili, Kadıköy ilçesindeki … ada … parseldeki bağımsız bölüm kiralanmıştır.

3. Süre ve Kira Bedeli
Süre: 12 ay, …/…/2024 – …/…/2025
Aylık kira: 25.000 TL (KDV hariç).
Kira bedeli her yıl %40 oranında artırılacaktır.

4. Temerrüt
Kiracı kira ödemezse, tek taraflı fesih hakkı doğar ve depozito iade edilmez.

5. Genel
Taraflar uyuşmazlıkta İstanbul Mahkemeleri yetkilidir.
…/…/2024`;

export const LEGAL_LOADING_MESSAGES = [
  "Mevzuat taranıyor…",
  "TBK hükümleri eşleştiriliyor…",
  "Riskler hesaplanıyor…",
  "Madde yapısı inceleniyor…",
  "Yükümlülük dengesi kontrol ediliyor…",
];

export const CONTRACT_TYPE_SLUGS: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  kira: {
    title: "Kira sözleşmesi TBK analizi",
    description:
      "Kira sözleşmenizi yapay zeka ile TBK ve güncel düzenlemelere göre ön analizden geçirin.",
    keywords: [
      "kira sözleşmesi analizi",
      "TBK kira",
      "yapay zeka kira sözleşmesi analizi",
    ],
  },
  "hizmet-sozlesmesi": {
    title: "Hizmet sözleşmesi hukuki ön inceleme",
    description:
      "Hizmet sözleşmelerinde risk ve eksik madde tespiti için Madde1 analiz çalışma alanı.",
    keywords: ["hizmet sözleşmesi", "TBK hizmet", "hukuki risk analizi AI"],
  },
  "tahliye-taahhutnamesi": {
    title: "Tahliye taahhütnamesi kontrolü",
    description:
      "Tahliye taahhütnamesi ve benzeri belgelerde tipik eksiklik ve usul riskleri.",
    keywords: ["tahliye taahhütnamesi", "kira tahliye", "Madde1 legaltech"],
  },
};
