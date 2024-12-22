import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchResults from "@/components/SearchResults";
import { CityData } from "@/types/city";
import { cities } from "@/data/cities";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<CityData[]>([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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

          <SearchResults results={results} />
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
      </div>
    </div>
  );
};

export default Index;