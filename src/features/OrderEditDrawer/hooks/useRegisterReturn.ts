import { useRecoilValue } from 'recoil';
import { selectedOrderAtom } from '@/recoil/selectedOrderAtom';
import { supabase } from '../../../../utils/supabase';

export const useRegisterReturn = () => {
  const selectedOrder = useRecoilValue(selectedOrderAtom);

  const checkExistingReturn = async (orderId: string) => {
    const { data, error } = await supabase
      .from('item_return')
      .select('id')
      .eq('return_orderlist_id', orderId)
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    return data?.[0]?.id;
  };

  const fetchAllExistingReturns = async (orderId: string) => {
    const { data, error } = await supabase
      .from('item_return')
      .select('*')
      .eq('return_orderlist_id', orderId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const registerOrUpdateReturn = async (data: {
    return_date: string;
    reshipment_date: string;
    remark: string;
  }) => {
    if (!selectedOrder?.id) {
      throw new Error('Order ID not found.');
    }

    const existingReturnId = await checkExistingReturn(String(selectedOrder.id));

    if (existingReturnId) {
      const { error } = await supabase
        .from('item_return')
        .update({
          return_date: data.return_date,
          reshipment_date: data.reshipment_date,
          remark: data.remark,
        })
        .eq('id', existingReturnId);

      if (error) {
        throw new Error(error.message);
      }
    } else {
      const { error } = await supabase.from('item_return').insert([
        {
          return_orderlist_id: selectedOrder.id,
          return_date: data.return_date,
          reshipment_date: data.reshipment_date,
          remark: data.remark,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }
    }
  };

  const registerReturnData = async (data: {
    return_date: string;
    reshipment_date: string;
    remark: string;
  }) => {
    if (!selectedOrder?.id) {
      throw new Error('Order ID not found.');
    }

    const { error } = await supabase.from('item_return').insert([
      {
        return_orderlist_id: selectedOrder.id,
        return_date: data.return_date,
        reshipment_date: data.reshipment_date,
        remark: data.remark,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }
  };

  return {
    registerReturn: registerReturnData,
    fetchExistingReturn: fetchAllExistingReturns,
    selectedOrder
  };
};
