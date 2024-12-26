import { Button } from "./ui/button";
import { Select } from "./ui/select";
import { Input } from "./ui/input";
import { useState } from "react";
import { CityData } from "@/types/city";

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  bundesland: string;
  minPopulation: number;
  maxPopulation: number;
  minHebesatz: number;
  maxHebesatz: number;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    bundesland: "",
    minPopulation: 0,
    maxPopulation: 10000000,
    minHebesatz: 0,
    maxHebesatz: 1000,
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-card rounded-lg shadow-sm animate-fade-in">
      <div className="space-y-2">
        <label className="text-sm font-medium">Bundesland</label>
        <Input
          type="text"
          placeholder="Bundesland eingeben"
          onChange={(e) => handleFilterChange("bundesland", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Einwohner</label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            onChange={(e) => handleFilterChange("minPopulation", parseInt(e.target.value) || 0)}
          />
          <Input
            type="number"
            placeholder="Max"
            onChange={(e) => handleFilterChange("maxPopulation", parseInt(e.target.value) || 10000000)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Hebesatz</label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            onChange={(e) => handleFilterChange("minHebesatz", parseInt(e.target.value) || 0)}
          />
          <Input
            type="number"
            placeholder="Max"
            onChange={(e) => handleFilterChange("maxHebesatz", parseInt(e.target.value) || 1000)}
          />
        </div>
      </div>
    </div>
  );
}