import { useRecoilValue } from 'recoil';
import { selectedOrderAtom } from '@/recoil/selectedOrderAtom';
import { supabase } from '../../../../utils/supabase';

export const useRegisterReturn = () => {
  const selectedOrder = useRecoilValue(selectedOrderAtom);

  const registerReturn = async (data: {
    return_date: string;
    reshipment_date: string;
    remark: string;
  }) => {
    if (!selectedOrder?.id) {
      throw new Error('Order ID not found.');
    }

    const response = await supabase.from('item_return').insert([
      {
        return_orderlist_id: selectedOrder.id,
        return_date: data.return_date,
        reshipment_date: data.reshipment_date,
        remark: data.remark,
      },
    ]);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  };

  return { registerReturn };
};
