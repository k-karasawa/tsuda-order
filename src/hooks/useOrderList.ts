import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import type { OrderListDataType } from '@/types/types';

export const useOrderList = () => {
  const [data, setData] = useState<OrderListDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await supabase
        .from('order_list_extended')
        .select('*')
        .order('desired_delivery_date', { ascending: true }) // 期限が近い順
        .order('priority', { ascending: true })              // 優先度の昇順
        .order('id', { ascending: false })                   // idの降順

      if (response.error) {
        throw response.error;
      }

      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetchOrderList: fetchData };

};
