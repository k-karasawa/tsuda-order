import React, { useEffect, useCallback } from 'react';
import { useSupabaseClient } from '@/hooks';

interface Props {
  farmId: string | number | null;
  setOrderCode: (code: string) => void;
  setOrderPrefix: (prefix: string) => void;
}

export const GenerateOrderNumber: React.FC<Props> = ({ farmId, setOrderCode, setOrderPrefix }) => {
  const supabase = useSupabaseClient();

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
      .order('order_code', { ascending: false });

    if (fetchError) {
      console.error('Failed to fetch order numbers:', fetchError);
      return;
    }

    // 5桁の数値を除外して最大値を見つける
    const maxOrderCode = data
      ?.map((record: { order_code: any }) => record.order_code.toString())
      .filter((code: string) => code.length < 5) // 5桁の数値を除外
      .reduce((max: number, code: string) => Math.max(max, parseInt(code, 10)), 0);

    const newOrderCode = maxOrderCode + 1;

    setOrderCode(newOrderCode.toString());
    setOrderPrefix(prefix);

  }, [supabase, setOrderCode, setOrderPrefix]);

  useEffect(() => {
    if (farmId !== null && farmId !== undefined) {
      generateOrderNumber(farmId.toString());
    }
  }, [farmId, generateOrderNumber]);

  return null;
};
