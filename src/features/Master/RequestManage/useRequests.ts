import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks';

export const useRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = useSupabaseClient(); // この行を追加

  useEffect(() => {
    fetchRequests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('request').select('*'); // 修正: supabase を正しく参照
    if (error) {
      console.error('Error fetching requests:', error);
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  return { requests, loading, fetchRequests };
};
