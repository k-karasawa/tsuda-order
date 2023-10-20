import React from 'react';
import { useOrderList } from '../hooks/useOrderList';
import { OrderListPresentation } from '@/components/OrderList/OrderListPresentation';
import { Spin } from 'antd';
import { OrderListDataType } from '@/types/types';

type OrderListContainerProps = {
  filter?: (order: OrderListDataType) => boolean;
}

export const OrderListContainer: React.FC<OrderListContainerProps> = ({ filter }) => {
  const { data, loading, error, refetchOrderList } = useOrderList();

  if (loading) return <Spin size="large" tip="Loading..." />;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return null;

  const filteredData = filter ? data.filter(filter) : data;

  return <OrderListPresentation data={filteredData} refetchOrderList={refetchOrderList} />;
};

