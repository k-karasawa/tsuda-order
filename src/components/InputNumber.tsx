import React, { useState, useEffect } from 'react';
import { Input, Form } from 'antd';

interface Props {
  value: number;
  onChange: (value: number) => void;
  onInvalidNumber: (value: string) => void;
}

export const InputNumber: React.FC<Props> = ({ value, onChange, onInvalidNumber }) => {
  const [localValue, setLocalValue] = useState<string>("");

  useEffect(() => {
    setLocalValue(formatNumberToLocaleString(value));
  }, [value]);

  const formatNumberToLocaleString = (num: number) => {
    if (num === undefined || isNaN(num)) {
      num = 0;
    }
    return num.toLocaleString();
  };

  const removeNonNumeric = (str: string) => {
    return str.replace(/[^\d]/g, '');
  };

  const onChangeHandler = (value: string) => {
    const onlyNumbers = removeNonNumeric(value.replace(/[０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xFEE0)));
    const formattedValue = formatNumberToLocaleString(Number(onlyNumbers));
    if (isNaN(Number(onlyNumbers))) {
      setLocalValue(value);
      onInvalidNumber(value);
    } else {
      setLocalValue(formattedValue);
      onChange(Number(onlyNumbers));
    }
  };

  return (
    <Form.Item
      validateStatus={localValue && isNaN(Number(removeNonNumeric(localValue))) ? "error" : ""}
      help={localValue && isNaN(Number(removeNonNumeric(localValue))) ? "数字を入力してください。" : ""}
    >
      <Input
        type="text"
        inputMode="numeric"
        value={localValue}
        onChange={(e) => onChangeHandler(e.target.value)}
        prefix="¥"
      />
    </Form.Item>
  );
};
