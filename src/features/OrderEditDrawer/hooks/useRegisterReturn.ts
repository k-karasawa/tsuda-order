import { useSelectedOrder } from './useSelectedOrder';
import { registerNewReturn, fetchAllExistingReturns } from '../helpers/itemReturnHelper';
import { useProgress } from '@/hooks/useProgress';
import { mutate } from 'swr';

export const useRegisterReturn = () => {
  const selectedOrder = useSelectedOrder();
  const { data: progressData } = useProgress();

  const handleAddNewReturn = async (data: {
    return_date: string;
    reshipment_date: string | null;
    remark: string;
  }) => {
    if (!selectedOrder || !selectedOrder.id) {
      throw new Error('Order ID not found.');
    }

    const progressId = progressData?.find(item => item.progress === '出戻り')?.id;
    if (!progressId) {
      throw new Error('Progress ID for 出戻り not found.');
    }

    await registerNewReturn(selectedOrder.id, data, progressId);
    mutate('orders');
  };

  return {
    addNewReturn: handleAddNewReturn,
    fetchExistingReturn: fetchAllExistingReturns,
    selectedOrder,
  };
};
