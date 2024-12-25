import { createClient } from '@supabase/supabase-js';
import { CityData } from '@/types/city';

const supabaseUrl = 'https://vjsfjxkzybqxppnerhbr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqc2ZqeGt6eWJxeHBwbmVyaGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODg5NzAsImV4cCI6MjAyMzA2NDk3MH0.Ij9XWI5QHPz5Yw5FkEJwxcVEVHQWBFVU-wRhGYK_Zzg';

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