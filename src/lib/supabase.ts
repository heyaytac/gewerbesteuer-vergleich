import { query } from './db';
import { CityData } from '@/types/city';

export const fetchCities = async (): Promise<CityData[]> => {
  try {
    const result = await query('SELECT * FROM cities ORDER BY name');
    return result.rows;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const searchCities = async (searchTerm: string): Promise<CityData[]> => {
  try {
    const result = await query(
      'SELECT * FROM cities WHERE name ILIKE $1 ORDER BY name LIMIT 10',
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
};