import { useState } from "react";
import { CityData } from "@/types/city";
import ComparisonTable from "@/components/ComparisonTable";
import TaxCalculator from "@/components/TaxCalculator";
import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "@/lib/api";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoadingState } from "@/components/LoadingState";
import { TaxRateChart } from "@/components/TaxRateChart";
import { SearchFilters as SearchFiltersType } from "@/components/SearchFilters";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import FeaturesSection from "@/components/FeaturesSection";
import ContactForm from "@/components/ContactForm";
import CityFooter from "@/components/CityFooter";
import { CityStats } from "@/components/CityStats";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

  const { data: results = [], isLoading: isSearchLoading } = useQuery<CityData[]>({
    queryKey: ['cities', searchTerm, filters],
    queryFn: () => searchTerm.length > 2 ? fetchCities() : Promise.resolve([]),
    enabled: searchTerm.length > 2,
  });

  const { data: allCities = [], isLoading: isAllCitiesLoading } = useQuery<CityData[]>({
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

  if (isAllCitiesLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 font-inter animate-fade-in">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-12">
        <Header />

        <SearchSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={setFilters}
          results={filteredResults}
          isSearchLoading={isSearchLoading}
          recentSearches={recentSearches}
          onSearchSelect={setSearchTerm}
          onCitySelect={handleCitySelect}
        />
        
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

        {/* Blog Section */}
        <section className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Aktuelle Artikel</h2>
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">
                Gewerbesteuer 2024: Aktuelle Änderungen und wichtige Hinweise
              </h3>
              <p className="text-muted-foreground mb-6">
                Die Gewerbesteuer bleibt auch 2024 ein zentrales Thema für Unternehmer. Erfahren Sie, 
                welche aktuellen Entwicklungen Sie kennen müssen und wie Sie Ihre Gewerbesteuer optimal planen können.
              </p>
              <Link to="/blog/gewerbesteuer-2024">
                <Button variant="outline" className="group">
                  Weiterlesen
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">
                Der ultimative Leitfaden zum Gewerbesteuerrechner
              </h3>
              <p className="text-muted-foreground mb-6">
                Die Berechnung der Gewerbesteuer stellt viele Unternehmer vor große Herausforderungen. 
                Ein Gewerbesteuerrechner kann dabei eine unverzichtbare Hilfe sein. In diesem Artikel 
                erfahren Sie alles Wichtige über dieses nützliche Tool.
              </p>
              <Link to="/blog/gewerbesteuerrechner-leitfaden">
                <Button variant="outline" className="group">
                  Weiterlesen
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <ContactForm />
        <CityFooter cities={allCities} />
      </div>
    </div>
  );
};

export default Index;
