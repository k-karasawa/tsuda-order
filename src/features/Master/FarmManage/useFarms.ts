import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks';
export const useFarms = () => {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = useSupabaseClient();

  const fetchFarms = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('farm').select('*');
    if (data) {
      setFarms(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFarms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddOrEditFarm = async (name: string, sort: number | null, prefix: string, currentFarm: any) => {
    if (name && sort !== null && prefix) {
      const farmData = {
        name,
        sort,
        prefix
      };

      let error = null;

      if (currentFarm) {
        const response = await supabase.from('farm').update(farmData).eq('id', currentFarm.id);
        error = response.error;
      } else {
        const response = await supabase.from('farm').insert([farmData]);
        error = response.error;
      }

      if (error) {
        throw error;
      } else {
        fetchFarms();
      }
    } else {
      throw new Error("Required fields are missing.");
    }
  };

  const handleDeleteFarm = async (id: number) => {
    const { error } = await supabase.from('farm').delete().eq('id', id);
    if (error) {
      throw error;
    } else {
      fetchFarms();
    }
  };

  return {
    farms,
    loading,
    fetchFarms,
    handleAddOrEditFarm,
    handleDeleteFarm
  };
};
