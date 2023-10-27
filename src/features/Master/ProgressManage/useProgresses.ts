import { useState, useEffect } from 'react';
import { supabase } from '../../../../utils/supabase';

export const useProgresses = () => {
  const [progresses, setProgresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgresses();
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
