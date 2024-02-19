import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks';

export const useProgresses = () => {
  const [progresses, setProgresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();

  useEffect(() => {
    fetchProgresses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProgresses = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('progress').select('*');
    if (data) {
      setProgresses(data);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  return { progresses, loading, fetchProgresses };
};
