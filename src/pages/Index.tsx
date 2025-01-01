import { useState } from "react";
import { CityData } from "@/types/city";
import ComparisonTable from "@/components/ComparisonTable";
import TaxCalculator from "@/components/TaxCalculator";
import { useQuery } from "@tanstack/react-query";
import { searchCities, fetchCities } from "@/lib/supabase";
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
        <FeaturesSection />
        <ContactForm />
        <CityFooter cities={allCities} />
      </div>
    </div>
  );
};

export default Index;