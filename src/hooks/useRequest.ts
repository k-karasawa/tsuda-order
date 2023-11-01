import useSWR from 'swr';
import { supabase } from '../../utils/supabase';
import type { RequestType } from '@/types/types';

const fetchRequest = async (): Promise<RequestType[]> => {
  const response = await supabase.from('request').select('id, name, sort');

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const useRequest = () => {
  const { data, error } = useSWR('request', fetchRequest);

  return {
    data,
    loading: !error && !data,
    error,
    refetchRequest: fetchRequest,
  };
};
