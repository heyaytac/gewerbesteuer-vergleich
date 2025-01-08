import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { query } from "@/lib/db";
import { CityStats } from "@/components/CityStats";
import { LoadingState } from "@/components/LoadingState";
import { CityDescription } from "@/components/CityDescription";

const CityDetails = () => {
  const { cityName } = useParams();

  const { data: city, isLoading } = useQuery({
    queryKey: ['city', cityName],
    queryFn: async () => {
      const result = await query(
        'SELECT * FROM cities WHERE LOWER(name) = LOWER($1) LIMIT 1',
        [cityName || '']
      );
      return result.rows[0];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <LoadingState />
        </div>
      </div>
    );
  }

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
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <CityDescription city={city} />
          <CityStats city={city} />
        </div>
      </div>
    </div>
  );
};

export default CityDetails;