import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchResults from "@/components/SearchResults";
import { CityData } from "@/types/city";
import { cities } from "@/data/cities";
import ComparisonTable from "@/components/ComparisonTable";
import TaxCalculator from "@/components/TaxCalculator";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<CityData[]>([]);
  const [selectedCities, setSelectedCities] = useState<CityData[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleCitySelect = (city: CityData) => {
    if (!selectedCities.find(c => c.id === city.id) && selectedCities.length < 3) {
      setSelectedCities([...selectedCities, city]);
      setSearchTerm("");
      setResults([]);
    }
  };

  const handleRemoveCity = (cityId: number) => {
    setSelectedCities(selectedCities.filter(city => city.id !== cityId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-inter">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Gewerbesteuer-Vergleich
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vergleichen Sie die Gewerbesteuer-Hebesätze deutscher Städte und finden Sie den optimalen Standort für Ihr Unternehmen
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Stadt eingeben..."
              className="pl-10 h-12 text-lg"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <SearchResults results={results} onCitySelect={handleCitySelect} />
          
          {selectedCities.length > 0 && (
            <ComparisonTable cities={selectedCities} onRemoveCity={handleRemoveCity} />
          )}

          <TaxCalculator />
        </div>

        <section className="mt-24 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Warum Gewerbesteuer vergleichen?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Kosten optimieren</h3>
              <p className="text-gray-600">
                Durch die Wahl des richtigen Standorts können Sie erhebliche Steuerersparnisse erzielen.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Transparent vergleichen</h3>
              <p className="text-gray-600">
                Alle Hebesätze und Informationen übersichtlich auf einen Blick.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Fundiert entscheiden</h3>
              <p className="text-gray-600">
                Treffen Sie Ihre Standortentscheidung auf Basis aktueller Daten.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-24 border-t pt-12 pb-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Alle Städte im Überblick</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cities.map((city) => (
                <Link
                  key={city.id}
                  to={`/city/${city.name.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center mt-12 text-sm text-gray-600">
            © {new Date().getFullYear()} Gewerbesteuer Vergleich
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;