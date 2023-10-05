import React from 'react';
import { Table, Tooltip } from 'antd';
import { columns as originalColumns } from '@/data/columns';
import type { OrderListDataType } from '@/types/types';

interface OrderListPresentationProps {
  data: OrderListDataType[];
}

export const OrderListPresentation: React.FC<OrderListPresentationProps> = ({ data }) => {

  const filterableColumns = [
    'order_code',
    'priority_level',
    'progress_name',
    'request_name',
    'customer_name',
    'customer_department_name',
    'customer_person',
    'item_code',
    'item_name',
    'customer_management_code',
    'estimate_code',
    'order_form_code',
    'comment',
    'farm_name'
  ];

  const dynamicFilters = filterableColumns.reduce((acc, colName) => {
    acc[colName] = [...new Set(data.map(item => item[colName]))].map(value => ({
      text: value,
      value: value,
    }));
    return acc;
  }, {} as Record<string, any[]>);

  const columns = originalColumns.map(col => {
    if (dynamicFilters[col.dataIndex as string]) {
      return {
        ...col,
        filters: dynamicFilters[col.dataIndex as string],
        onFilter: (value, record) => record[col.dataIndex].includes(value as string),
      };
    }
    return {
      ...col,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    };
  });

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
