import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CityData } from "@/types/city";

interface TaxRateChartProps {
  cities: CityData[];
}

export function TaxRateChart({ cities }: TaxRateChartProps) {
  const data = cities.map(city => ({
    name: city.name,
    hebesatz: city.hebesatz,
    grundsteuerB: city.grundsteuerB
  }));

  return (
    <div className="w-full h-[400px] mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Steuersätze im Vergleich</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hebesatz" fill="#4f46e5" name="Hebesatz" />
          <Bar dataKey="grundsteuerB" fill="#06b6d4" name="Grundsteuer B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}