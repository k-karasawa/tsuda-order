import type { ColumnType } from 'antd/lib/table';
import type { OrderListDataType } from '../types/types';
import { renderTooltip } from '../components/OrderList/RenderTooltip';

export const generateColumns = (
  originalColumns: ColumnType<OrderListDataType>[],
  dynamicFilters: Record<string, any[]>
): ColumnType<OrderListDataType>[] => {

  return originalColumns.map((col: ColumnType<OrderListDataType>) => {
    const baseCol = {
      ...col,
      ellipsis: true,
      render: (text: string, record: OrderListDataType, index: number) => renderTooltip(text, record, index, col) // renderTooltip should be defined or imported
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
};
