import { Button } from "./ui/button";
import { Clock } from "lucide-react";

interface RecentSearchesProps {
  searches: string[];
  onSearchSelect: (search: string) => void;
}

export function RecentSearches({ searches, onSearchSelect }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="mt-2 flex gap-2 flex-wrap animate-fade-in">
      <Clock className="w-4 h-4 text-muted-foreground" />
      {searches.map((search) => (
        <Button
          key={search}
          variant="ghost"
          size="sm"
          onClick={() => onSearchSelect(search)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {search}
        </Button>
      ))}
    </div>
  );
}