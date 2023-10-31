import useSWR, { mutate } from 'swr';
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
  const revalidate = () => {
    mutate('orders');
  };

  return {
    data,
    loading: !error && !data,
    error,
    refetchOrderList: fetchOrders,
    revalidate
  };
};

const fetchItemReturns = async (): Promise<any[]> => {
  const response = await supabase.from('item_return').select('return_orderlist_id');
  if (response.error) {
    throw response.error;
  }
  console.log(response.data)
  return response.data;

};

export const useItemReturns = () => {
  const { data, error } = useSWR('itemReturns', fetchItemReturns);
  return {
    itemReturns: data,
    loading: !error && !data,
    error,
  };
};
