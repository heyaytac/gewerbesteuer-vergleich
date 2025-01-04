import { CityData } from "@/types/city";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Euro } from "lucide-react";

interface CityMetricsProps {
  city: CityData;
}

export function CityMetrics({ city }: CityMetricsProps) {
  const calculateInfrastructureScore = (city: CityData) => {
    return Math.round((city.infrastructureScore.transport + 
                       city.infrastructureScore.internet + 
                       city.infrastructureScore.business) / 3);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Infrastructure Score Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Infrastructure Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Public Transport</span>
              <span className="text-sm text-muted-foreground">{city.infrastructureScore.transport}%</span>
            </div>
            <Progress value={city.infrastructureScore.transport} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Internet Connectivity</span>
              <span className="text-sm text-muted-foreground">{city.infrastructureScore.internet}%</span>
            </div>
            <Progress value={city.infrastructureScore.internet} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Business Support</span>
              <span className="text-sm text-muted-foreground">{city.infrastructureScore.business}%</span>
            </div>
            <Progress value={city.infrastructureScore.business} />
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Overall Score</span>
              <span className="text-2xl font-bold">{calculateInfrastructureScore(city)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost of Living Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Cost of Living</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <div className="space-y-1">
              <p className="text-sm font-medium">Office Rent (per m²)</p>
              <p className="text-2xl font-bold">{city.costOfLiving.officeRent}€</p>
            </div>
            <Euro className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <div className="space-y-1">
              <p className="text-sm font-medium">Monthly Utilities</p>
              <p className="text-2xl font-bold">{city.costOfLiving.utilities}€</p>
            </div>
            <Euro className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <div className="space-y-1">
              <p className="text-sm font-medium">Average Salary</p>
              <p className="text-2xl font-bold">{city.costOfLiving.salary}€</p>
            </div>
            <Euro className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}