import { CityData } from "@/types/city";
import { X } from "lucide-react";
import ExportButton from "./ExportButton";

interface ComparisonTableProps {
  cities: CityData[];
  onRemoveCity: (cityId: number) => void;
}

const ComparisonTable = ({ cities, onRemoveCity }: ComparisonTableProps) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Städtevergleich</h2>
        {cities.length >= 2 && <ExportButton cities={cities} />}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Stadt</th>
              <th className="text-right py-2">Hebesatz</th>
              <th className="text-right py-2">Grundsteuer B</th>
              <th className="text-right py-2">Einwohner</th>
              <th className="text-right py-2"></th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.id} className="border-b last:border-b-0">
                <td className="py-3">
                  <div>
                    <div className="font-semibold">{city.name}</div>
                    <div className="text-sm text-gray-600">{city.bundesland}</div>
                  </div>
                </td>
                <td className="text-right py-3">{city.hebesatz}%</td>
                <td className="text-right py-3">{city.grundsteuerB}%</td>
                <td className="text-right py-3">{city.einwohner.toLocaleString()}</td>
                <td className="text-right py-3">
                  <button
                    onClick={() => onRemoveCity(city.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;