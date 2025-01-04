export interface CityData {
  id: number;
  name: string;
  bundesland: string;
  hebesatz: number;
  grundsteuerB: number;
  einwohner: number;
  infrastructureScore: {
    transport: number;
    internet: number;
    business: number;
  };
  costOfLiving: {
    officeRent: number; // Average price per m² in EUR
    utilities: number;  // Monthly average in EUR
    salary: number;     // Average monthly salary in EUR
  };
}