import React from 'react';
import { Tooltip } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import type { OrderListDataType } from '@/types/types';

export const renderTooltip = (text: string, record: OrderListDataType, index: number, column: ColumnType<OrderListDataType>) => {
  const displayText = column.ellipsis ? `${text.toString().slice(0, 20)}...` : text;
  return (
    <Tooltip placement="topLeft" title={text}>
      {displayText}
    </Tooltip>
  );
};
