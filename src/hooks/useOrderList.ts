import useSWR from 'swr';
import { supabase } from '../../utils/supabase';
import type { OrderListDataType } from '@/types/types';

const fetchOrders = async (): Promise<OrderListDataType[]> => {
  const response = await supabase.from('order_list_extended').select('*');

  if (response.error) {
    throw response.error;
  }

  return response.data.map(item => ({
    ...item,
    fullOrderCode: item.prefix + item.order_code,
  }));
};

export const useOrderList = () => {
  const { data, error } = useSWR('orders', fetchOrders);

  return {
    data,
    loading: !error && !data,
    error,
    refetchOrderList: fetchOrders,
  };
};
