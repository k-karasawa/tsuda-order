import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { supabase } from '../../../utils/supabase';

const { Option } = Select;

interface Props {
  tableName: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

interface OptionType {
  label: string;
  value: number | string;
}

export const SelectDataCreate: React.FC<Props> = ({ tableName, placeholder, value, onChange }) => {
  const [data, setData] = useState<OptionType[]>([]);

  useEffect(() => {
    fetchTableData(tableName).then(setData);
  }, [tableName]);

  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={data.map(item => ({ value: item.value, label: item.label }))}
    />
  );
};

const fetchTableData = async (tableName: string): Promise<OptionType[]> => {
  if (tableName === 'progress') {
    const { data, error } = await supabase
      .from('progress')
      .select('id, progress');
    return handleDataAndError(data, error, 'progress');

  } else if (tableName === 'priority') {
    const { data, error } = await supabase
      .from('priority')
      .select('id, level');
    return handleDataAndError(data, error, 'level');

  } else if (tableName === 'request') {
    const { data, error } = await supabase
      .from('request')
      .select('id, name');
    return handleDataAndError(data, error, 'name');

  } else if (tableName === 'customer') {
    const { data, error } = await supabase
      .from('customer')
      .select('id, name');
    return handleDataAndError(data, error, 'name');

  } else if (tableName === 'customer_department') {
    const { data, error } = await supabase
      .from('customer_department')
      .select('id, department');
    return handleDataAndError(data, error, 'department');

  } else if (tableName === 'farm') {
    const { data, error } = await supabase
      .from('farm')
      .select('id, name');
    return handleDataAndError(data, error, 'name');
  }

  // 他のテーブルのロジックを追加する場合はこちらを利用
  return [
    { value: 1, label: 'データ1' },
    { value: 2, label: 'データ2' }
  ];
};

const handleDataAndError = (data: any, error: any, labelField: string) => {
  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return [];
  }

  return data.map((item: any) => ({
    value: item.id,
    label: item[labelField]
  }));
};
