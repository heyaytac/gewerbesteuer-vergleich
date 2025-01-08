import { CityData } from '@/types/city';

const API_URL = 'http://localhost:3001/api';

export const fetchCities = async (): Promise<CityData[]> => {
  const response = await fetch(`${API_URL}/cities`);
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  return response.json();
};

export const searchCities = async (searchTerm: string): Promise<CityData[]> => {
  const response = await fetch(`${API_URL}/cities/search?term=${encodeURIComponent(searchTerm)}`);
  if (!response.ok) {
    throw new Error('Failed to search cities');
  }
  return response.json();
};