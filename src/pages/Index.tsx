import { useState, useEffect } from "react";
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
import { SearchFilters, SearchFilters as SearchFiltersType } from "@/components/SearchFilters";
import { RecentSearches } from "@/components/RecentSearches";
import { CityStats } from "@/components/CityStats";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCities, setSelectedCities] = useState<CityData[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const [filters, setFilters] = useState<SearchFiltersType>({
    bundesland: "",
    minPopulation: 0,
    maxPopulation: 10000000,
    minHebesatz: 0,
    maxHebesatz: 1000,
  });

  const { toast } = useToast();

  const { data: results = [], isLoading: isSearchLoading } = useQuery({
    queryKey: ['cities', searchTerm, filters],
    queryFn: () => searchCities(searchTerm),
    enabled: searchTerm.length > 2,
  });

  const { data: allCities = [], isLoading: isAllCitiesLoading } = useQuery({
    queryKey: ['allCities'],
    queryFn: fetchCities,
  });

  const filteredResults = results.filter((city) => {
    return (
      (!filters.bundesland || city.bundesland.toLowerCase().includes(filters.bundesland.toLowerCase())) &&
      city.einwohner >= filters.minPopulation &&
      city.einwohner <= filters.maxPopulation &&
      city.hebesatz >= filters.minHebesatz &&
      city.hebesatz <= filters.maxHebesatz
    );
  });

  const handleCitySelect = (city: CityData) => {
    if (!selectedCities.find(c => c.id === city.id)) {
      if (selectedCities.length >= 3) {
        toast({
          title: "Maximale Anzahl erreicht",
          description: "Sie können maximal 3 Städte vergleichen.",
          variant: "destructive",
        });
        return;
      }
      setSelectedCities([...selectedCities, city]);
      setSearchTerm("");
      
      // Add to recent searches
      if (!recentSearches.includes(city.name)) {
        const newSearches = [city.name, ...recentSearches.slice(0, 4)];
        setRecentSearches(newSearches);
        localStorage.setItem("recentSearches", JSON.stringify(newSearches));
      }
    }
  };

  const handleRemoveCity = (cityId: number) => {
    setSelectedCities(selectedCities.filter(city => city.id !== cityId));
  };

  const handleFilterChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
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

        <div className="max-w-2xl mx-auto space-y-6">
          <SearchFilters onFilterChange={handleFilterChange} />

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

          <RecentSearches
            searches={recentSearches}
            onSearchSelect={setSearchTerm}
          />

          {isSearchLoading ? (
            <LoadingState />
          ) : (
            <SearchResults results={filteredResults} onCitySelect={handleCitySelect} />
          )}
          
          {selectedCities.length > 0 && (
            <>
              <ComparisonTable cities={selectedCities} onRemoveCity={handleRemoveCity} />
              <TaxRateChart cities={selectedCities} />
              {selectedCities.map((city) => (
                <CityStats key={city.id} city={city} />
              ))}
            </>
          )}

          <TaxCalculator />
        </div>

        <section className="mt-24 text-center animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Warum Gewerbesteuer vergleichen?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Kosten optimieren</h3>
              <p className="text-muted-foreground">
                Durch die Wahl des richtigen Standorts können Sie erhebliche Steuerersparnisse erzielen.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Transparent vergleichen</h3>
              <p className="text-muted-foreground">
                Alle Hebesätze und Informationen übersichtlich auf einen Blick.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Fundiert entscheiden</h3>
              <p className="text-muted-foreground">
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
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {city.name}
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">{city.name}</h4>
                    <p className="text-sm text-muted-foreground">Bundesland: {city.bundesland}</p>
                    <p className="text-sm text-muted-foreground">Hebesatz: {city.hebesatz}%</p>
                    <p className="text-sm text-muted-foreground">Grundsteuer B: {city.grundsteuerB}%</p>
                    <p className="text-sm text-muted-foreground">Einwohner: {city.einwohner.toLocaleString()}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Gewerbesteuer Vergleich
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;