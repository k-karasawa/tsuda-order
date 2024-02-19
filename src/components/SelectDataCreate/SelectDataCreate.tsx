import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useSupabaseClient } from '@/hooks';

const { Option } = Select;

interface Props {
  tableName: keyof TableMappingType;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
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

export const SelectDataCreate: React.FC<Props> = ({ tableName, placeholder, value, defaultValue, onChange }) => {
  const [data, setData] = useState<OptionType[]>([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchTableData = async () => {
      const labelField = tableMappings[tableName];
      const { data, error } = await supabase
        .from(tableName)
        .select(`id, ${labelField}`)
        .order('sort', { ascending: true });

      if (error) {
        console.error("Error fetching data from Supabase:", error);
        return [];
      }

      const options = data.map((item: any) => ({
        value: item.id,
        label: item[labelField]
      }));

      setData(options);
    };

    fetchTableData();
  }, [tableName, supabase]);

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      options={data.map(item => ({ value: item.value, label: item.label }))}
      listHeight={400}
      dropdownRender={menu => (
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          {menu}
        </div>
      )}
    />
  );
};
