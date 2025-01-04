import { CityData } from "@/types/city";

interface CityDescriptionProps {
  city: CityData;
}

export const CityDescription = ({ city }: CityDescriptionProps) => {
  const getCityDescription = (city: CityData) => {
    const effectiveRate = ((city.hebesatz / 100) * 0.035 * 100).toFixed(1);
    
    // Generate a detailed description for each city based on its characteristics
    return (
      <>
        <h1 className="text-3xl font-bold mb-4">
          Gewerbesteuer in {city.name} 2024: Hebesätze & Wirtschaftsstandort
        </h1>
        <p className="mb-4">
          {city.name}, {city.bundesland === "Nordrhein-Westfalen" ? "in" : "im"} {city.bundesland} mit einem Gewerbesteuerhebesatz von {city.hebesatz}%, 
          bietet Unternehmen einen strategischen Wirtschaftsstandort mit folgenden Vorteilen:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Strategische Lage {city.bundesland === "Nordrhein-Westfalen" ? "in" : "im"} {city.bundesland}</li>
          <li>Effektive Steuerbelastung: {effectiveRate}%</li>
          <li>Einwohnerzahl: {city.einwohner.toLocaleString()} (Stand 2024)</li>
          {city.grundsteuerB && (
            <li>Grundsteuer B: {city.grundsteuerB}%</li>
          )}
        </ul>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-3">Wirtschaftliche Bedeutung</h2>
          <p className="mb-4">
            Mit {city.einwohner.toLocaleString()} Einwohnern zählt {city.name} zu den bedeutenden Wirtschaftsstandorten {city.bundesland === "Nordrhein-Westfalen" ? "in" : "im"} {city.bundesland}. 
            Der Gewerbesteuerhebesatz von {city.hebesatz}% resultiert in einer effektiven Steuerbelastung von {effectiveRate}%.
          </p>
          
          <h2 className="text-xl font-semibold mb-3">Standortvorteile</h2>
          <p className="mb-4">
            Unternehmen profitieren von:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Gut ausgebauter Infrastruktur</li>
            <li>Qualifiziertem Fachkräftepotential</li>
            <li>Verkehrsgünstiger Lage</li>
            <li>Modernen Gewerbegebieten</li>
          </ul>

          <h2 className="text-xl font-semibold mb-3">Steuerliche Rahmenbedingungen</h2>
          <p>
            Der Hebesatz von {city.hebesatz}% liegt {city.hebesatz > 400 ? "über" : "unter"} dem bundesweiten Durchschnitt. 
            Dies führt zu einer effektiven Gewerbesteuerbelastung von {effectiveRate}%. 
            Die Grundsteuer B beträgt {city.grundsteuerB}%.
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="prose max-w-none mb-8">
      <div className="text-gray-600">
        {getCityDescription(city)}
      </div>
    </div>
  );
};