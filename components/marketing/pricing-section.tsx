import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Ücretsiz",
    price: "0 TL",
    desc: "Denemek için ideal.",
    features: ["1 analiz", "Canlı akış", "Temel özet"],
    cta: "Başla",
    highlight: false,
  },
  {
    name: "Solo",
    price: "499 TL",
    desc: "Bireysel profesyoneller.",
    features: ["10 analiz", "PDF dışa aktarım", "Öncelikli hız"],
    cta: "Solo seç",
    highlight: true,
  },
  {
    name: "Pro",
    price: "1499 TL",
    desc: "Ekipler ve yoğun kullanım.",
    features: ["Sınırsız analiz", "Ekip alanı", "Özel entegrasyon hazır UI"],
    cta: "Pro ile görüş",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section className="space-y-6" id="fiyatlandirma">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Fiyatlandırma
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ödeme altyapısı entegrasyonu için hazır arayüz — yakında aktif.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <Card
            key={t.name}
            className={
              t.highlight
                ? "border-primary/50 bg-primary/5 shadow-md shadow-primary/10"
                : "border-border/80 bg-card/40"
            }
          >
            <CardHeader>
              <CardTitle className="text-lg">{t.name}</CardTitle>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {t.price}
              </p>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-foreground/90">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={t.highlight ? "default" : "secondary"}
                type="button"
              >
                {t.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
