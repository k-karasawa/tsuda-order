export const checkExistingReturn = async (supabaseClient: any, orderId: string) => {
  const { data, error } = await supabaseClient
    .from('item_return')
    .select('id')
    .eq('return_orderlist_id', orderId)
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data?.[0]?.id;
};

export const fetchAllExistingReturns = async (supabaseClient: any, orderId: string) => {
  const { data, error } = await supabaseClient
    .from('item_return')
    .select('*')
    .eq('return_orderlist_id', orderId)
    .order('id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const registerNewReturn = async (supabaseClient: any, orderId: number, data: {
  return_date: string;
  reshipment_date: string | null;
  remark: string;
}, progressId: number) => {
  const { error } = await supabaseClient.from('item_return').insert([
    {
      return_orderlist_id: orderId,
      ...data,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  const { error: updateError } = await supabaseClient
    .from('order_list')
    .update({ progress: progressId })
    .eq('id', orderId);

  if (updateError) {
    throw new Error(updateError.message);
  }
};

export const updateExistingReturn = async (supabaseClient: any, orderId: number, data: {
  return_date: string;
  reshipment_date: string | null;
  remark: string;
}) => {
  const existingReturnId = await checkExistingReturn(supabaseClient, String(orderId));
  if (!existingReturnId) {
    throw new Error("No existing return found for the given orderId.");
  }

  const { error } = await supabaseClient
    .from('item_return')
    .update(data)
    .eq('id', existingReturnId);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteExistingReturn = async (supabaseClient: any, returnId: string): Promise<void> => {
  try {
    await supabaseClient
      .from('item_return')
      .delete()
      .eq('id', returnId);
  } catch (error) {
    throw new Error('Failed to delete the return item.');
  }
};
