import React from 'react';
import { useOrderList } from '../hooks/useOrderList';
import { OrderListPresentation } from '@/components/OrderList/OrderListPresentation';
import { Spin } from 'antd';

export const OrderListContainer: React.FC = () => {
  const { data, loading, error, refetchOrderList } = useOrderList();

  if (loading) return <Spin size="large" tip="Loading..." />;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return null;

  return <OrderListPresentation data={data} refetchOrderList={refetchOrderList} />;
};
