import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import type { OrderListDataType } from '@/types/types';

export const useOrderList = () => {
  const [data, setData] = useState<OrderListDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await supabase.from('order_list').select('*');

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

    fetchData();
  }, []);

  return { data, loading, error };
};
