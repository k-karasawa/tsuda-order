import { useMemo } from 'react';
import { useOrderList } from '../hooks/useOrderList';
import { OrderListPresentation } from '../components/OrderList/OrderListPresentation';
import { Spin } from 'antd';
import { OrderListDataType } from '../types/types';
import { ColumnsType } from 'antd/es/table';

type OrderListContainerProps = {
  filter?: (order: OrderListDataType) => boolean;
  customColumns?: ColumnsType<OrderListDataType>;
  sortOrder?: 'default' | 'assorting';
  filterCondition?: string;
}

export const OrderListContainer: React.FC<OrderListContainerProps> = ({ filter, customColumns, sortOrder = 'default', filterCondition }) => {
  const { data, loading, error, refetchOrderList } = useOrderList();

  const safeData = useMemo(() => data || [], [data]);

  const filteredData = useMemo(() => filter ? safeData.filter(filter) : safeData, [safeData, filter]);

  const sortedData = useMemo(() => {
    let sorted = filteredData;
    if (sortOrder === 'assorting') {
      sorted = sorted.sort((a, b) => {
        const dateA = a.desired_delivery_date ? new Date(a.desired_delivery_date) : new Date(8640000000000000);
        const dateB = b.desired_delivery_date ? new Date(b.desired_delivery_date) : new Date(8640000000000000);

        if (dateA > dateB) return 1;
        if (dateA < dateB) return -1;

        if (a.priority < b.priority) return -1;
        if (a.priority > b.priority) return 1;

        return a.id - b.id;
      });
    } else if (sortOrder === 'default') {
      sorted = sorted.sort((a, b) => b.id - a.id);
    }
    return sorted;
  }, [filteredData, sortOrder]);

  if (loading) return <Spin size="large" />;
  if (error) return <p>Error: {error.message}</p>;
  if (!safeData.length) return null;

  return <OrderListPresentation
    data={sortedData}
    refetchOrderList={refetchOrderList}
    columns={customColumns}
    filterCondition={filterCondition}
  />;
};
