import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks';

interface Customer {
  id: number;
  name: string;
  sort: number;
}

export const useCustomersInfo = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('customer')
        .select('id, name, sort')
        .order('sort', { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setCustomers(data.map(customer => ({
          id: customer.id,
          name: customer.name || '',
          sort: customer.sort || 0
        })));
      }
      setLoading(false);
    };

    fetchCustomers();
  }, [supabase]);

  return { customers, loading };
};
