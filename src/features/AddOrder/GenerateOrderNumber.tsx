import React, { useEffect, useCallback } from 'react';
import { supabase } from '@/../utils/supabase';

interface Props {
  farmId: string | number | null;
  setOrderCode: (code: string) => void;
  setOrderPrefix: (prefix: string) => void;
}

export const GenerateOrderNumber: React.FC<Props> = ({ farmId, setOrderCode, setOrderPrefix }) => {

  const generateOrderNumber = useCallback(async (id: string) => {
    const actualId = id.split('_')[0];

    const { data: prefixData, error: prefixError } = await supabase
      .from('farm')
      .select('prefix')
      .eq('id', actualId)
      .single();

    if (prefixError) {
      console.error('Failed to fetch prefix:', prefixError);
      return;
    }

    if (!prefixData || !prefixData.prefix) {
      console.error('Invalid prefix data received:', prefixData);
      return;
    }

    const prefix = prefixData.prefix;

    const { data, error: fetchError } = await supabase
      .from('order_list')
      .select('order_code')
      .eq('prefix', prefix)
      .order('order_code', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('Failed to fetch order number:', fetchError);
      return;
    }

    let currentMax = 0;
    if (data && data[0] && data[0].order_code) {
      currentMax = parseInt(data[0].order_code);
    }

    if (isNaN(currentMax)) {
      console.error('Failed to parse order number from:', data[0]?.order_code);
      return;
    }

    const newOrderCode = (currentMax + 1).toString();

    // ここで親コンポーネントのstateを直接更新
    setOrderCode(newOrderCode);
    setOrderPrefix(prefix);

  }, [setOrderCode, setOrderPrefix]);

  useEffect(() => {
    if (farmId !== null && farmId !== undefined) {
      generateOrderNumber(farmId.toString());
    }
  }, [farmId, generateOrderNumber]);

  return null;
};
