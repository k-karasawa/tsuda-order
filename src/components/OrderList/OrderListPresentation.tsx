import React from 'react';
import { Table } from 'antd';
import { columns as originalColumns } from '@/data/columns';
import type { OrderListPresentationProps } from '@/types/types';
import { filterableColumns } from '@/data/filterableColumns';
import { createDynamicFilters } from '@/hooks/filterUtils';
import { generateColumns } from '@/hooks/columnUtils';

export const OrderListPresentation: React.FC<OrderListPresentationProps> = ({ data }) => {
  const dynamicFilters = createDynamicFilters(data, filterableColumns);
  const columns = generateColumns(originalColumns, dynamicFilters);

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
      scroll={{ x: 3700 }}
    />
  );
};
