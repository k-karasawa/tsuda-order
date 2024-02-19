import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = useSupabaseClient();

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('customer').select('*');
    if (data) {
      setCustomers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    customers,
    loading,
    fetchCustomers,
  };
};
