import useSWR from 'swr';
import { useSupabaseClient } from '@/hooks';
import type { RequestType } from '@/types/types';
import { SupabaseClient } from '@supabase/supabase-js';

const fetchRequest = async (supabaseClient: SupabaseClient): Promise<RequestType[]> => {
  const response = await supabaseClient.from('request').select('id, name, sort');

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const useRequest = () => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR('request', () => fetchRequest(supabase));

  return {
    data,
    loading: !error && !data,
    error,
    refetchRequest: () => fetchRequest(supabase),
  };
};
