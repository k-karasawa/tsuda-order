import { supabase } from '../../../utils/supabase';

export const updateOrder = async (values: any, orderId: string | number) => {
    const { data, error } = await supabase
        .from('order_list')
        .update(values)
        .eq('id', orderId);

    return { data, error };
};
