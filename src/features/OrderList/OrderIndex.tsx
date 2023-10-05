import React from 'react';
import styles from './styles.module.css';
import { OrderListContainer } from '@/containers/OrderListContainer';

export const OrderIndex: React.FC = () => (
  <div className={styles.container}>
    <OrderListContainer />
  </div>
);
