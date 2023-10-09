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
      const response = await supabase.from('order_list_extended').select('*');

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
