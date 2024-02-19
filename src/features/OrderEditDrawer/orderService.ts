export const updateOrder = async (supabaseClient: any, values: any, orderId: string | number) => {
  const { data, error } = await supabaseClient
      .from('order_list')
      .update(values)
      .eq('id', orderId);

  return { data, error };
};
