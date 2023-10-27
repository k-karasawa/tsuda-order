import { useState, useEffect } from 'react';
import { supabase } from '../../../../utils/supabase';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, []);

  return {
    customers,
    loading,
    fetchCustomers,
  };
};
