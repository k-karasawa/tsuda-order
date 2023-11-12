import useSWR from 'swr';
import { supabase } from '../../utils/supabase';
import type { CustomerType } from '../types/types';

const fetchCustomer = async (): Promise<CustomerType[]> => {
  const response = await supabase.from('customer').select('id, name, sort').order('sort', { ascending: true });

  if (response.error) {
    throw response.error;
  }

  return response.data;
};

export const useCustomer = () => {
  const { data, error } = useSWR('customer', fetchCustomer);

  return {
    data,
    loading: !error && !data,
    error,
    refetchCustomer: fetchCustomer,
  };
};
