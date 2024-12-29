import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CityData } from "@/types/city";

interface CityFooterProps {
  cities: CityData[];
}

const CityFooter = ({ cities }: CityFooterProps) => {
  return (
    <footer className="mt-24 border-t pt-12 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {cities.map((city) => (
          <HoverCard key={city.id}>
            <HoverCardTrigger asChild>
              <Link
                to={`/stadt/${city.name.toLowerCase()}`}
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
  );
};

export default CityFooter;