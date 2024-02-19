import useSWR, { mutate } from 'swr';
import { useSupabaseClient } from '@/hooks';
import type { OrderListDataType } from '@/types/types';
import { SupabaseClient } from '@supabase/supabase-js';

// supabaseの制約で1000件以上のデータは取得できないので、再帰的に取得するようにした
// fetchAllOrders関数をコンポーネントまたはカスタムフックの外で定義しない
const fetchOrders = async (supabaseClient: SupabaseClient): Promise<OrderListDataType[]> => {
  const fetchAllOrders = async (from = 0, allData: OrderListDataType[] = []): Promise<OrderListDataType[]> => {
    const response = await supabaseClient
      .from('order_list_extended')
      .select('*')
      .range(from, from + 999);

    if (response.error) {
      console.error('Error fetching orders:', response.error);
      throw response.error;
    }

    const newData = allData.concat(response.data);

    if (response.data.length === 1000) {
      return fetchAllOrders(from + 1000, newData);
    } else {
      return newData;
    }
  };

  const allData = await fetchAllOrders(0, []);
  return allData.map(item => ({
    ...item,
    fullOrderCode: item.prefix + item.order_code,
  }));
};

export const useOrderList = () => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR('orders', () => fetchOrders(supabase));
  const revalidate = () => {
    mutate('orders');
  };

  return {
    data,
    loading: !error && !data,
    error,
    refetchOrderList: () => fetchOrders(supabase),
    revalidate
  };
};

const fetchItemReturns = async (supabaseClient: SupabaseClient): Promise<any[]> => {
  const response = await supabaseClient.from('item_return').select('return_orderlist_id');
  if (response.error) {
    throw response.error;
  }
  return response.data;
};

export const useItemReturns = () => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR('itemReturns', () => fetchItemReturns(supabase));
  return {
    itemReturns: data,
    loading: !error && !data,
    error,
  };
};
