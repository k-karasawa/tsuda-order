import useSWR, { mutate } from 'swr';
import { supabase } from '../../utils/supabase';
import type { OrderListDataType } from '@/types/types';

//supabaseの制約で1000件以上のデータは取得できないので、再帰的に取得するようにした
const fetchAllOrders = async (from = 0): Promise<OrderListDataType[]> => {
  const response = await supabase
    .from('order_list_extended')
    .select('*')
    .range(from, from + 999);

  if (response.error) {
    console.error('Error fetching orders:', response.error);
    throw response.error;
  }

  if (response.data.length === 1000) {
    return response.data.concat(await fetchAllOrders(from + 1000));
  } else {
    return response.data;
  }
};

const fetchOrders = async (): Promise<OrderListDataType[]> => {
  const allData = await fetchAllOrders();
  console.log(`Total fetched data count: ${allData.length}`);

  return allData.map(item => ({
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
