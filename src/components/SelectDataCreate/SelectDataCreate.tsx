import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { supabase } from '../../../utils/supabase';

const { Option } = Select;

interface Props {
  tableName: keyof TableMappingType;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

interface OptionType {
  label: string;
  value: number | string;
}

type TableMappingType = {
  [key in 'progress' | 'priority' | 'request' | 'customer' | 'customer_department' | 'farm']: string;
};

const tableMappings: TableMappingType = {
  progress: 'progress',
  priority: 'level',
  request: 'name',
  customer: 'name',
  customer_department: 'department',
  farm: 'name',
};

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

const fetchTableData = async (tableName: keyof TableMappingType): Promise<OptionType[]> => {
  const labelField = tableMappings[tableName];
  const { data, error } = await supabase
    .from(tableName)
    .select(`id, ${labelField}`)
    .order('sort', { ascending: true });

  return handleDataAndError(data, error, labelField);
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
