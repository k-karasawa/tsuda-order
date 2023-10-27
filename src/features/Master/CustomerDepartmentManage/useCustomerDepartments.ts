import { useState, useEffect } from 'react';
import { supabase } from '../../../../utils/supabase';
import { message } from 'antd';

export const useCustomerDepartments = (customerID?: number) => {
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    if (customerID) fetchDepartments(customerID);
  }, [customerID]);

  const fetchDepartments = async (customerID: number) => {
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
  };

  return { departments, loading, fetchDepartments };
};
