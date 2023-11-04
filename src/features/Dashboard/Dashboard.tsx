import React, { useState } from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';
import styles from './styles/Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const [orderData, setOrderData] = useState<any[]>([]);
  const [chartOrderData, setChartOrderData] = useState<any[]>([]);

  return (
    <div className={styles.container}>
      <FilterCard
        setOrderData={setOrderData}
        setChartOrderData={setChartOrderData}
      />
      <StateCard orderData={orderData} />
      <ChartCard orderData={chartOrderData} />
    </div>
  );
};
