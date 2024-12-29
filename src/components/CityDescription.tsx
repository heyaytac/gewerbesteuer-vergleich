import { CityData } from "@/types/city";

interface CityDescriptionProps {
  city: CityData;
}

export const CityDescription = ({ city }: CityDescriptionProps) => {
  const getCityDescription = (city: CityData) => {
    const effectiveRate = ((city.hebesatz / 100) * 0.035 * 100).toFixed(1);
    
    const descriptions: { [key: string]: JSX.Element } = {
      "München": (
        <>
          <p className="mb-4">
            München, die bayerische Landeshauptstadt mit einem Gewerbesteuerhebesatz von {city.hebesatz}%, präsentiert sich als führender Technologie- und Innovationsstandort. Die Metropole bietet:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Hochqualifizierte Arbeitskräfte & Top-Universitäten</li>
            <li>Sitz zahlreicher DAX-Konzerne</li>
            <li>Effektive Steuerbelastung: {effectiveRate}%</li>
          </ul>
          <p>
            Der Hebesatz liegt über dem Bundesdurchschnitt, wird aber durch exzellente Infrastruktur und hohe Lebensqualität ausgeglichen.
          </p>
        </>
      ),
      "Hamburg": (
        <>
          <p className="mb-4">
            Hamburg, die Handelsmetropole mit einem Gewerbesteuerhebesatz von {city.hebesatz}%, ist Deutschlands wichtigster Hafenstandort. Die Hansestadt zeichnet sich aus durch:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Größter Seehafen Deutschlands</li>
            <li>Internationale Handelsbeziehungen</li>
            <li>Effektive Steuerbelastung: {effectiveRate}%</li>
          </ul>
          <p>
            Der moderate Hebesatz kombiniert mit erstklassiger Hafeninfrastruktur macht Hamburg zu einem attraktiven Wirtschaftsstandort.
          </p>
        </>
      ),
      "Berlin": (
        <>
          <p className="mb-4">
            Berlin, die deutsche Hauptstadt mit einem Gewerbesteuerhebesatz von {city.hebesatz}%, ist das pulsierende Zentrum der Start-up-Szene. Die Metropole bietet:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Dynamisches Start-up-Ökosystem</li>
            <li>Internationale Talent-Pool</li>
            <li>Effektive Steuerbelastung: {effectiveRate}%</li>
          </ul>
          <p>
            Der günstige Hebesatz macht Berlin besonders attraktiv für Unternehmensgründungen und Expansionen.
          </p>
        </>
      ),
      "Frankfurt": (
        <>
          <p className="mb-4">
            Frankfurt am Main, mit einem Gewerbesteuerhebesatz von {city.hebesatz}%, positioniert sich als führender Finanzplatz Deutschlands. Die Mainmetropole bietet:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Europäische Zentralbank & Finanzdistrikt</li>
            <li>Internationaler Flughafen</li>
            <li>Effektive Steuerbelastung: {effectiveRate}%</li>
          </ul>
          <p>
            Der Hebesatz liegt über dem Bundesdurchschnitt, wird aber durch erstklassige Infrastruktur und internationale Vernetzung kompensiert.
          </p>
        </>
      ),
      "Köln": (
        <>
          <p className="mb-4">
            Köln, die Rheinmetropole mit einem Gewerbesteuerhebesatz von {city.hebesatz}%, ist ein bedeutender Medien- und Versicherungsstandort. Die Stadt überzeugt durch:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Starker Medien- und Versicherungssektor</li>
            <li>Zentrale Lage in Europa</li>
            <li>Effektive Steuerbelastung: {effectiveRate}%</li>
          </ul>
          <p>
            Der Hebesatz wird durch die hervorragende Verkehrsanbindung und das große Fachkräftepotential aufgewogen.
          </p>
        </>
      )
    };

    // Default description for cities not in the list
    return descriptions[city.name] || (
      <>
        <p className="mb-4">
          {city.name}, mit einem Gewerbesteuerhebesatz von {city.hebesatz}%, bietet Unternehmen einen attraktiven Wirtschaftsstandort in {city.bundesland}.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Strategische Lage in {city.bundesland}</li>
          <li>Effektive Steuerbelastung: {effectiveRate}%</li>
          <li>Einwohnerzahl: {city.einwohner.toLocaleString()}</li>
        </ul>
        <p>
          Der lokale Hebesatz und die regionale Infrastruktur bieten Unternehmen verschiedener Größen optimale Rahmenbedingungen.
        </p>
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