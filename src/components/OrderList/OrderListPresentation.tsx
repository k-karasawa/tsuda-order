import React from 'react';
import { Table, Tooltip } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { columns as originalColumns } from '@/data/columns';
import type { OrderListDataType, OrderListPresentationProps } from '@/types/types';
import { filterableColumns } from '@/data/filterableColumns';

export const OrderListPresentation: React.FC<OrderListPresentationProps> = ({ data }) => {

  const renderTooltip = (text: string, record: OrderListDataType, index: number, column: ColumnType<OrderListDataType>) => {
    const displayText = column.ellipsis ? `${text.toString().slice(0, 20)}...` : text;
    return (
      <Tooltip placement="topLeft" title={text}>
        {displayText}
      </Tooltip>
    );
  };

  const dynamicFilters = filterableColumns.reduce((acc, colName) => {
    acc[colName] = Array.from(new Set(data.map(item => item[colName as keyof OrderListDataType]))).map(value => ({
      text: value,
      value: value,
    }));
    return acc;
  }, {} as Record<string, any[]>);

  const columns = originalColumns.map((col): ColumnType<OrderListDataType> => {
    const baseCol = {
      ...col,
      ellipsis: true,
      render: (text: string, record: OrderListDataType, index: number) => renderTooltip(text, record, index, col)
    };

    if ('dataIndex' in col && dynamicFilters[col.dataIndex as keyof OrderListDataType]) {
      return {
        ...baseCol,
        filters: dynamicFilters[col.dataIndex as keyof OrderListDataType],
        onFilter: (value: string | number | boolean, record: OrderListDataType) => {
          const itemValue = record[col.dataIndex as keyof OrderListDataType];
          return (itemValue ? itemValue.toString() : '').includes(value.toString());
        },
      };
    }
    return baseCol;
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
