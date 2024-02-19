import useSWR from 'swr';
import { useSupabaseClient } from '@/hooks';
import type { CustomerType } from '../types/types';

const fetchCustomer = async (supabaseClient: any): Promise<CustomerType[]> => {
  const response = await supabaseClient.from('customer').select('id, name, sort').order('sort', { ascending: true });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const useCustomer = () => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR('customer', () => fetchCustomer(supabase));

  return {
    data,
    loading: !error && !data,
    error,
    refetchCustomer: () => fetchCustomer(supabase),
  };
};
