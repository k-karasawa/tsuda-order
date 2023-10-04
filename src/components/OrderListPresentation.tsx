import React from 'react';
import { Table, Tooltip } from 'antd';
import { columns as originalColumns } from '@/data/columns';
import type { OrderListDataType } from '@/types/types';

interface OrderListPresentationProps {
  data: OrderListDataType[];
}

export const OrderListPresentation: React.FC<OrderListPresentationProps> = ({ data }) => {
  // 一意なorder_codeの一覧を取得
  const uniqueOrderCodes = [...new Set(data.map(item => item.order_code))];

  // filtersを動的に生成
  const orderCodeFilters = uniqueOrderCodes.map(code => ({
    text: code,
    value: code,
  }));

  // 元のカラム定義を変更して、新しいfiltersとellipsis、カスタムツールチップを適用
  const columns = originalColumns.map(col => {
    if (col.dataIndex === 'order_code') {
      return {
        ...col,
        filters: orderCodeFilters,
        onFilter: (value, record) => record.order_code.includes(value as string),
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
      scroll={{ x: 3600 }}
    />
  );
};
