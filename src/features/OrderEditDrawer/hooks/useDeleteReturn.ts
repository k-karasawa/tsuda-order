import { useState } from 'react';
import { useSupabaseClient } from '@/hooks';
import { mutate } from 'swr';
import { ExistingData } from '../types/types';

export const useDeleteReturn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();

  const deleteReturn = async (id: number) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('item_return')
        .delete()
        .match({ id });

      if (error) throw error;

      mutate('/api/existingData', (currentData: ExistingData[] | undefined) => {
        return currentData?.filter((item: ExistingData) => item.id !== id);
      }, true);

      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to delete item return:", error);
      return false;
    }
  };

  return { deleteReturn, isLoading };
};
