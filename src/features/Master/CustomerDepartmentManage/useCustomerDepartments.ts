import { useState, useEffect, useCallback } from 'react';
import { useSupabaseClient } from '@/hooks';
import { message } from 'antd';

export const useCustomerDepartments = (customerID?: number) => {
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<any[]>([]);
  const supabase = useSupabaseClient();

  const fetchDepartments = useCallback(async (customerID: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('customer_department')
      .select('*, customer:customer_id(name)')
      .eq('customer_id', customerID);

    if (error) {
      console.error(error);
      message.error('部署情報の取得に失敗しました。');
    } else {
      setDepartments(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (customerID) fetchDepartments(customerID);
  }, [customerID, fetchDepartments]);

  return { departments, loading, fetchDepartments };
};
