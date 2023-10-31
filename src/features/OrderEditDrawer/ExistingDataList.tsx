import React from 'react';
import { Button } from 'antd';
import { ExistingDataListProps } from './types/types';

export const ExistingDataList: React.FC<ExistingDataListProps> = ({ data, onAddNew }) => (
  <div>
    {data.map((item, index) => (
      <div key={index}>
        <p>出戻り日: {item.return_date}</p>
        <p>再出荷日: {item.reshipment_date}</p>
        <p>備考: {item.remark}</p>
      </div>
    ))}
    <Button type="dashed" onClick={onAddNew}>
      新しいレコードを追加
    </Button>
  </div>
);
