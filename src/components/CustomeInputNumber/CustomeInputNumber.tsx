import React from 'react';
import { InputNumber } from 'antd';

interface CustomInputNumberProps {
  value?: number;
  onChange?: (value: number | null) => void; // nullを許容するように変更
}

export const CustomInputNumber: React.FC<CustomInputNumberProps> = ({ value = 0, onChange }) => { // 初期値を0に変更
  const handleChange = (value: number | null) => { // nullを許容するように変更
    if (value !== null && onChange) {
      onChange(value);
    }
  };

  return (
    <InputNumber
      value={value}
      style={{ width: '100%' }}
      onChange={handleChange}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value ? parseFloat(value.replace(/\$\s?|(,*)/g, '')) : 0} // valueがundefinedの場合は0を返す
    />
  );
};
