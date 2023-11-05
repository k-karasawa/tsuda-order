import React from 'react';
import { useOrderList } from '../hooks/useOrderList';
import { OrderListPresentation } from '../components/OrderList/OrderListPresentation';
import { Spin } from 'antd';
import { OrderListDataType } from '../types/types';
import { ColumnsType } from 'antd/es/table';

type OrderListContainerProps = {
  filter?: (order: OrderListDataType) => boolean;
  customColumns?: ColumnsType<OrderListDataType>;
  sortOrder?: 'default' | 'assorting';
}

export const OrderListContainer: React.FC<OrderListContainerProps> = ({ filter, customColumns, sortOrder = 'default' }) => {
  const { data, loading, error, refetchOrderList } = useOrderList();

  if (loading) return <Spin size="large" tip="Loading..." />;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return null;

  const filteredData = filter ? data.filter(filter) : data;

  let sortedData = filteredData;
  if (sortOrder === 'assorting') {
    sortedData = sortedData.sort((a, b) => {
      const dateA = a.desired_delivery_date ? new Date(a.desired_delivery_date) : new Date(8640000000000000);
      const dateB = b.desired_delivery_date ? new Date(b.desired_delivery_date) : new Date(8640000000000000);

      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;

      if (a.priority < b.priority) return -1;
      if (a.priority > b.priority) return 1;

      return a.id - b.id;
    });
  } else if (sortOrder === 'default') {
    sortedData = sortedData.sort((a, b) => b.id - a.id);
  }

  return <OrderListPresentation data={sortedData} refetchOrderList={refetchOrderList} columns={customColumns} />;
};
