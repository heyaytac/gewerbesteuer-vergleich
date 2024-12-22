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
    const baseRate = 0.035; // 3.5% Steuermesszahl
    
    const cityTaxes = cities.map(city => {
      const taxRate = (city.hebesatz / 100) * baseRate;
      const tax = numRevenue * taxRate;
      return {
        city: city.name,
        tax,
        hebesatz: city.hebesatz
      };
    });

    const sortedCities = cityTaxes.sort((a, b) => a.tax - b.tax);
    const lowestTax = sortedCities[0];
    const highestTax = sortedCities[sortedCities.length - 1];
    const savings = highestTax.tax - lowestTax.tax;

    toast.success(
      `Beste Option: ${lowestTax.city} (${lowestTax.hebesatz}%)
      Mögliche Ersparnis: ${savings.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`,
      { duration: 5000 }
    );
  };

  return (
    <div className="mt-12 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Gewerbesteuer-Rechner</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 mb-1">
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