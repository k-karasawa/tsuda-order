import React from 'react';
import { useOrderList } from '../hooks/useOrderList';
import { OrderListPresentation } from '@/components/OrderListPresentation';

export const OrderListContainer: React.FC = () => {
  const { data, loading, error } = useOrderList();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <OrderListPresentation data={data} />;
};
