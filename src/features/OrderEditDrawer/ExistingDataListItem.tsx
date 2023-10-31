import React from 'react';
import { List, DatePicker, Input } from 'antd';
import dayjs from 'dayjs';
import { ExistingData } from './types/types';

interface ExistingDataListItemProps {
  data: ExistingData;
  isEditing: boolean;
  onEditChange: (key: keyof ExistingData, value: any) => void;
}

export const ExistingDataListItem: React.FC<ExistingDataListItemProps> = ({ data, isEditing, onEditChange }) => {
  if (isEditing) {
    return (
      <>
        <List.Item style={{ marginLeft: '1rem' }}>
          出戻り日: <DatePicker value={dayjs(data.return_date)} onChange={date => onEditChange('return_date', date?.format('YYYY-MM-DD'))} />
        </List.Item>
        <List.Item style={{ marginLeft: '1rem' }}>
          再出荷日: <DatePicker value={dayjs(data.reshipment_date)} onChange={date => onEditChange('reshipment_date', date?.format('YYYY-MM-DD'))} />
        </List.Item>
        <List.Item style={{ marginLeft: '1rem' }}>
          備考: <Input.TextArea value={data.remark} onChange={e => onEditChange('remark', e.target.value)} />
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
