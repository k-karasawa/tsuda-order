import { useSelectedOrder } from './useSelectedOrder';
import { registerNewReturn, fetchAllExistingReturns } from '../helpers/itemReturnHelper';

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

    return registerNewReturn(selectedOrder.id, data);
  };

  return {
    addNewReturn: handleAddNewReturn,
    fetchExistingReturn: fetchAllExistingReturns,
    selectedOrder,
  };
};
