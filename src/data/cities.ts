import { CityData } from "@/types/city";

export const cities: CityData[] = [
  {
    id: 1,
    name: "München",
    bundesland: "Bayern",
    hebesatz: 490,
    grundsteuerB: 535,
    einwohner: 1488202,
    infrastructureScore: {
      transport: 95,
      internet: 90,
      business: 92
    },
    costOfLiving: {
      officeRent: 38.5,
      utilities: 280,
      salary: 4800
    }
  },
  {
    id: 2,
    name: "Hamburg",
    bundesland: "Hamburg",
    hebesatz: 470,
    grundsteuerB: 540,
    einwohner: 1841179,
    infrastructureScore: {
      transport: 90,
      internet: 88,
      business: 88
    },
    costOfLiving: {
      officeRent: 28.5,
      utilities: 265,
      salary: 4500
    }
  },
  {
    id: 3,
    name: "Berlin",
    bundesland: "Berlin",
    hebesatz: 410,
    grundsteuerB: 810,
    einwohner: 3669495,
    infrastructureScore: {
      transport: 85,
      internet: 92,
      business: 90
    },
    costOfLiving: {
      officeRent: 26.0,
      utilities: 250,
      salary: 4200
    }
  },
  {
    id: 4,
    name: "Frankfurt",
    bundesland: "Hessen",
    hebesatz: 460,
    grundsteuerB: 500,
    einwohner: 753056,
    infrastructureScore: {
      transport: 92,
      internet: 85,
      business: 95
    },
    costOfLiving: {
      officeRent: 35.0,
      utilities: 270,
      salary: 4600
    }
  },
  {
    id: 5,
    name: "Köln",
    bundesland: "Nordrhein-Westfalen",
    hebesatz: 475,
    grundsteuerB: 515,
    einwohner: 1087863,
    infrastructureScore: {
      transport: 88,
      internet: 86,
      business: 85
    },
    costOfLiving: {
      officeRent: 25.0,
      utilities: 255,
      salary: 4300
    }
  },
];