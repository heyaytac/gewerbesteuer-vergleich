import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchResults from "@/components/SearchResults";
import { CityData } from "@/types/city";
import { SearchFilters, SearchFilters as SearchFiltersType } from "@/components/SearchFilters";
import { RecentSearches } from "@/components/RecentSearches";
import { LoadingState } from "@/components/LoadingState";

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: SearchFiltersType;
  onFilterChange: (filters: SearchFiltersType) => void;
  results: CityData[];
  isSearchLoading: boolean;
  recentSearches: string[];
  onSearchSelect: (search: string) => void;
  onCitySelect: (city: CityData) => void;
}

const SearchSection = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  results,
  isSearchLoading,
  recentSearches,
  onSearchSelect,
  onCitySelect,
}: SearchSectionProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <SearchFilters onFilterChange={onFilterChange} />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Stadt eingeben..."
          className="pl-10 h-12 text-lg"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <RecentSearches
        searches={recentSearches}
        onSearchSelect={onSearchSelect}
      />

      {isSearchLoading ? (
        <LoadingState />
      ) : (
        <SearchResults results={results} onCitySelect={onCitySelect} />
      )}
    </div>
  );
};

export default SearchSection;