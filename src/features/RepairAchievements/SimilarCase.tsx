import React from 'react';
import { Table } from 'antd';

interface SimilarCaseProps {
  selectedItemCode: string | undefined;
  allData: Array<{
    key: string;
    item_code: string;
    total_count: number;
    children: Array<{ key: string; item_code: string; count: number }>;
  }>;
}

export const SimilarCase: React.FC<SimilarCaseProps> = ({ selectedItemCode, allData }) => {
  const similarItems = allData.filter(item =>
    selectedItemCode && item.item_code.includes(selectedItemCode) && item.item_code !== selectedItemCode
  );

  const columns = [
    {
      title: '類似実績',
      dataIndex: 'item_code',
      key: 'item_code',
    },
  ];

  return (
    <Table
      dataSource={similarItems}
      columns={columns}
      rowKey="item_code"
      size="small"
    />
  );
};
