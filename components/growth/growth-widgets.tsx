import { RentIncreaseCalculator } from "@/components/growth/rent-increase-calculator";
import { StampTaxCalculator } from "@/components/growth/stamp-tax-calculator";
import { TahliyeCheckWidget } from "@/components/growth/tahliye-check-widget";

export function GrowthWidgets() {
  return (
    <section
      aria-label="Yardımcı hesaplayıcılar"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      <RentIncreaseCalculator />
      <StampTaxCalculator />
      <TahliyeCheckWidget />
    </section>
  );
}
