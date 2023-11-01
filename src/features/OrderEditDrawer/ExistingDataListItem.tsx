import React from 'react';
import { List, DatePicker, Input } from 'antd';
import dayjs from 'dayjs';
import { ExistingData } from './types/types';
import { ExistingDataListItemProps } from './types/types';

export const ExistingDataListItem: React.FC<ExistingDataListItemProps> = ({ data, isEditing, onEditChange }) => {
  const handleDateChange = (key: keyof ExistingData, date: dayjs.Dayjs | null) => {
    onEditChange(key, date?.format('YYYY-MM-DD'));
  };

  const handleRemarkChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onEditChange('remark', e.target.value);
  };

  if (isEditing) {
    return (
      <>
        <List.Item style={{ marginLeft: '1rem' }}>
          出戻り日:
          <DatePicker value={dayjs(data.return_date)} onChange={date => handleDateChange('return_date', date)} />
        </List.Item>
        <List.Item style={{ marginLeft: '1rem' }}>
          再出荷日:
          <DatePicker value={dayjs(data.reshipment_date)} onChange={date => handleDateChange('reshipment_date', date)} />
        </List.Item>
        <List.Item style={{ marginLeft: '1rem' }}>
          備考:
          <Input.TextArea value={data.remark} onChange={handleRemarkChange} />
        </List.Item>
      </>
    );
  } else {
    return (
      <>
        <List.Item style={{ marginLeft: '1rem' }}>出戻り日: {data.return_date}</List.Item>
        <List.Item style={{ marginLeft: '1rem' }}>再出荷日: {data.reshipment_date}</List.Item>
        <List.Item style={{ marginLeft: '1rem' }}>備考: {data.remark}</List.Item>
      </>
    );
  }
};
