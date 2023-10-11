import React from 'react';
import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';

interface CustomDatePickerProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, value, onChange }) => {
  return (
    <Form.Item label={label}>
      <DatePicker
        value={value ? dayjs(value) : undefined}
        style={{ width: '100%' }}
        onChange={(date) => onChange(date ? date.format("YYYY-MM-DD") : null)}
      />
    </Form.Item>
  );
};
