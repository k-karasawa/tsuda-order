import { supabase } from '../../../../utils/supabase';

export const checkExistingReturn = async (orderId: string) => {
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

export const fetchAllExistingReturns = async (orderId: string) => {
  const { data, error } = await supabase
    .from('item_return')
    .select('*')
    .eq('return_orderlist_id', orderId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const registerNewReturn = async (orderId: number, data: {
  return_date: string;
  reshipment_date: string | null;
  remark: string;
}) => {
  const { error } = await supabase.from('item_return').insert([
    {
      return_orderlist_id: orderId,
      ...data,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
};

export const updateExistingReturn = async (orderId: number, data: {
  return_date: string;
  reshipment_date: string | null;
  remark: string;
}) => {
  const existingReturnId = await checkExistingReturn(String(orderId));
  if (!existingReturnId) {
    throw new Error("No existing return found for the given orderId.");
  }

  const { error } = await supabase
    .from('item_return')
    .update(data)
    .eq('id', existingReturnId);

  if (error) {
    throw new Error(error.message);
  }
};
