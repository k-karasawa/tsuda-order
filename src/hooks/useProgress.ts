
import useSWR from 'swr';
import { supabase } from '../../utils/supabase';
import type { ProgressType } from '@/types/types';

const fetchProgress = async (): Promise<ProgressType[]> => {
  const response = await supabase.from('progress').select('id, progress');

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const useProgress = () => {
  const { data, error } = useSWR('progress', fetchProgress);

  return {
    data,
    loading: !error && !data,
    error,
    refetchProgress: fetchProgress,
  };
};
