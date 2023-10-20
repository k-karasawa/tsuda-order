import React from 'react';
import { useRequireLogin } from '../components/Auth/useRequireLogin';
import { OrderAssorting } from '@/features/OrderAssorting/OrderAssorting';

const OrderDevelopmentPage = () => {
  useRequireLogin();
  return (
    <OrderAssorting filterCondition="開発" />
  )
}

export default OrderDevelopmentPage;
