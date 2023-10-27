import { useState, useEffect } from 'react';
import { supabase } from '../../../../utils/supabase';

export const useRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('request').select('*');
    if (error) {
      console.error('Error fetching requests:', error);
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  return { requests, loading, fetchRequests };
};
