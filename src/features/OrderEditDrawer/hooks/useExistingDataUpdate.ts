import useSWR, { mutate } from 'swr';
import { supabase }  from '../../../../utils/supabase';
import { ExistingData } from '../types/types';

export const useUpdateExistingData = () => {

  const fetcher = async (url: string) => {
    const { data, error } = await supabase
    .from('item_return')
    .select('*');
    if (error) {
      console.error("Fetcher error:", error);
      throw error;
    }
    return data;
  };

  const { data, error } = useSWR<ExistingData[]>('/api/existingData', fetcher, { refreshWhenHidden: true, refreshInterval: 0 });

  const updateData = async (updatedData: ExistingData) => {
    try {
      const { error } = await supabase
        .from('item_return')
        .update({
          return_date: updatedData.return_date,
          reshipment_date: updatedData.reshipment_date || null,
          remark: updatedData.remark
        })
        .match({ id: updatedData.id });

      if (error) throw error;

      mutate('/api/existingData', (currentData: ExistingData[] | undefined) => {
        return currentData?.map((item: ExistingData) =>
          item.id === updatedData.id ? updatedData : item
        );
      });

    } catch (err) {
      console.error('Failed to update data:', err);
      throw err;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    updateData
  };
};
