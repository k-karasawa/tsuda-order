import React, { useState } from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';
import styles from './styles/Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const [orderData, setOrderData] = useState<any[]>([]);

  return (
    <div className={styles.container}>
      <FilterCard setOrderData={setOrderData} />
      <StateCard orderData={orderData} />
      <ChartCard />
    </div>
  );
};
