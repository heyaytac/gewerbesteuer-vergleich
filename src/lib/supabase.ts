import { createClient } from '@supabase/supabase-js';
import { CityData } from '@/types/city';

const supabaseUrl = 'https://kxnzmfuyftpkmnlnpfnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bnptZnV5ZnRwa21ubG5wZm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMjI1NzksImV4cCI6MjA1MDY5ODU3OX0.MZUu9x4CXW2q9eX5e9tMnye8IWkb4uatXEvJ3-Y-QzM';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchCities = async (): Promise<CityData[]> => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }

  return data || [];
};

export const searchCities = async (searchTerm: string): Promise<CityData[]> => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .ilike('name', `%${searchTerm}%`)
    .order('name')
    .limit(10);

  if (error) {
    console.error('Error searching cities:', error);
    throw error;
  }

  return data || [];
};