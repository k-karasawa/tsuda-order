import { useState, useEffect } from 'react';
import { supabase } from '../../../../utils/supabase';

interface Customer {
  id: number;
  name: string;
  sort: number;
}

export const useCustomersInfo = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('customer')
      .select('id, name, sort')
      .order('sort', { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setCustomers(data || []);
    }
    setLoading(false);
  };

  return { customers, loading };
};
