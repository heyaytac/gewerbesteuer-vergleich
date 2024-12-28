import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import { toast } from "sonner";

const TaxCalculator = () => {
  const [revenue, setRevenue] = useState<string>("");

  const calculateTax = () => {
    if (!revenue || isNaN(Number(revenue))) {
      toast.error("Bitte geben Sie einen gültigen Betrag ein");
      return;
    }

    const numRevenue = Number(revenue);
    
    // Only calculate if revenue is above the tax-free allowance (24,500€)
    if (numRevenue <= 24500) {
      toast.info("Dieser Betrag liegt unter dem Freibetrag von 24.500€");
      return;
    }

    const taxableAmount = numRevenue - 24500; // Apply tax-free allowance
    const baseRate = 0.035; // 3.5% Steuermesszahl
    
    const cityTaxes = cities.map(city => {
      const effectiveRate = (city.hebesatz / 100) * baseRate;
      const tax = taxableAmount * effectiveRate;
      return {
        city: city.name,
        tax,
        hebesatz: city.hebesatz,
        effectiveRate: effectiveRate * 100 // Convert to percentage
      };
    });

    const sortedCities = cityTaxes.sort((a, b) => a.tax - b.tax);
    const lowestTax = sortedCities[0];
    const highestTax = sortedCities[sortedCities.length - 1];
    const savings = highestTax.tax - lowestTax.tax;

    toast.success(
      <div className="space-y-2">
        <p className="font-semibold">Beste Option: {lowestTax.city}</p>
        <p>Hebesatz: {lowestTax.hebesatz}%</p>
        <p>Effektiver Steuersatz: {lowestTax.effectiveRate.toFixed(2)}%</p>
        <p>Gewerbesteuer: {lowestTax.tax.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
        <p className="mt-2">Mögliche Ersparnis: {savings.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
      </div>,
      {
        duration: 8000
      }
    );
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Gewerbesteuer-Rechner</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="revenue" className="block text-sm font-medium text-muted-foreground mb-1">
            Jahresgewinn/-umsatz
          </label>
          <Input
            id="revenue"
            type="number"
            placeholder="z.B. 100000"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="w-full"
          />
        </div>
        <Button 
          onClick={calculateTax}
          className="w-full"
        >
          Berechnen
        </Button>
      </div>
    </div>
  );
};

export default TaxCalculator;