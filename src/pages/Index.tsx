import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchResults from "@/components/SearchResults";
import { CityData } from "@/types/city";
import ComparisonTable from "@/components/ComparisonTable";
import TaxCalculator from "@/components/TaxCalculator";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchCities, fetchCities } from "@/lib/supabase";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoadingState } from "@/components/LoadingState";
import { TaxRateChart } from "@/components/TaxRateChart";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCities, setSelectedCities] = useState<CityData[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const { data: results = [], isLoading: isSearchLoading } = useQuery({
    queryKey: ['cities', searchTerm],
    queryFn: () => searchCities(searchTerm),
    enabled: searchTerm.length > 2,
  });

  const { data: allCities = [], isLoading: isAllCitiesLoading } = useQuery({
    queryKey: ['allCities'],
    queryFn: fetchCities,
  });

  const handleCitySelect = (city: CityData) => {
    if (!selectedCities.find(c => c.id === city.id) && selectedCities.length < 3) {
      setSelectedCities([...selectedCities, city]);
      setSearchTerm("");
      // Add to recent searches
      if (!recentSearches.includes(city.name)) {
        setRecentSearches([city.name, ...recentSearches.slice(0, 4)]);
      }
    }
  };

  const handleRemoveCity = (cityId: number) => {
    setSelectedCities(selectedCities.filter(city => city.id !== cityId));
  };

  if (isAllCitiesLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 font-inter animate-fade-in">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Gewerbesteuer-Vergleich
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vergleichen Sie die Gewerbesteuer-Hebesätze deutscher Städte und finden Sie den optimalen Standort für Ihr Unternehmen
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Stadt eingeben..."
              className="pl-10 h-12 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {recentSearches.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  className="text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchTerm(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {isSearchLoading ? (
            <LoadingState />
          ) : (
            <SearchResults results={results} onCitySelect={handleCitySelect} />
          )}
          
          {selectedCities.length > 0 && (
            <>
              <ComparisonTable cities={selectedCities} onRemoveCity={handleRemoveCity} />
              <TaxRateChart cities={selectedCities} />
            </>
          )}

          <TaxCalculator />
        </div>

        <section className="mt-24 text-center animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {allCities.map((city) => (
              <HoverCard key={city.id}>
                <HoverCardTrigger asChild>
                  <Link
                    to={`/city/${city.name.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    {city.name}
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">{city.name}</h4>
                    <p className="text-sm text-gray-600">Bundesland: {city.bundesland}</p>
                    <p className="text-sm text-gray-600">Hebesatz: {city.hebesatz}%</p>
                    <p className="text-sm text-gray-600">Grundsteuer B: {city.grundsteuerB}%</p>
                    <p className="text-sm text-gray-600">Einwohner: {city.einwohner.toLocaleString()}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Gewerbesteuer Vergleich
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;