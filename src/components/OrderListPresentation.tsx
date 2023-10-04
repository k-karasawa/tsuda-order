import React from 'react';
import { Table } from 'antd';
import { columns } from '@/data/columns';
import type { OrderListDataType } from '@/types/types';

interface OrderListPresentationProps {
  data: OrderListDataType[];
}

export const OrderListPresentation: React.FC<OrderListPresentationProps> = ({ data }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        position: ['bottomLeft'],
        pageSize: 20,
        total: data.length,
        showSizeChanger: false,
      }}
    />
  );
};
