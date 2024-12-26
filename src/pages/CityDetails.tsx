import { useParams, Link } from "react-router-dom";
import { cities } from "@/data/cities";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CityDetails = () => {
  const { cityName } = useParams();
  const city = cities.find(c => c.name.toLowerCase() === cityName?.toLowerCase());

  if (!city) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">Stadt nicht gefunden</h1>
          <div className="mt-4 text-center">
            <Button asChild>
              <Link to="/" className="inline-flex items-center">
                <ArrowLeft className="mr-2" />
                Zurück zur Startseite
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link to="/" className="inline-flex items-center">
              <ArrowLeft className="mr-2" />
              Zurück zur Startseite
            </Link>
          </Button>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">{city.name}</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Standortinformationen</h2>
              <p className="text-gray-600">Bundesland: {city.bundesland}</p>
              <p className="text-gray-600">Einwohner: {city.einwohner.toLocaleString()}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Steuersätze</h2>
              <p className="text-gray-600">Gewerbesteuer-Hebesatz: {city.hebesatz}%</p>
              <p className="text-gray-600">Grundsteuer B: {city.grundsteuerB}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;