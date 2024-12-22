import { CityData } from "@/types/city";

interface SearchResultsProps {
  results: CityData[];
}

const SearchResults = ({ results }: SearchResultsProps) => {
  if (results.length === 0) return null;

  return (
    <div className="mt-4 bg-white rounded-lg shadow-lg overflow-hidden">
      {results.map((city) => (
        <div
          key={city.id}
          className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{city.name}</h3>
              <p className="text-sm text-gray-600">{city.bundesland}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">{city.hebesatz}%</p>
              <p className="text-sm text-gray-600">Hebesatz</p>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>Grundsteuer B: {city.grundsteuerB}%</p>
            <p>Einwohner: {city.einwohner.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;