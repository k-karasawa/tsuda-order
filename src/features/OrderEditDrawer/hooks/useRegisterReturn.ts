import { useSelectedOrder } from './useSelectedOrder';
import { registerNewReturn, fetchAllExistingReturns } from '../helpers/itemReturnHelper';
import { mutate } from 'swr';

export const useRegisterReturn = () => {
  const selectedOrder = useSelectedOrder();

  const handleAddNewReturn = async (data: {
    return_date: string;
    reshipment_date: string | null;
    remark: string;
  }) => {
    if (!selectedOrder || !selectedOrder.id) {
      throw new Error('Order ID not found.');
    }

    await registerNewReturn(selectedOrder.id, data);
    mutate('orders');
  };

  return {
    addNewReturn: handleAddNewReturn,
    fetchExistingReturn: fetchAllExistingReturns,
    selectedOrder,
  };
};
