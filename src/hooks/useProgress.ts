import useSWR from 'swr';
import { useSupabaseClient } from '@/hooks';
import type { ProgressType } from '../types/types';
import { SupabaseClient } from '@supabase/supabase-js';

const fetchProgress = async (supabaseClient: SupabaseClient): Promise<ProgressType[]> => {
  const response = await supabaseClient.from('progress').select('id, progress, color, sort').order('sort', { ascending: true });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const useProgress = () => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR('progress', () => fetchProgress(supabase));

  return {
    data,
    loading: !error && !data,
    error,
    refetchProgress: () => fetchProgress(supabase),
  };
};
