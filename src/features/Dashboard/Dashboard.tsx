import React, { useEffect } from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';
import styles from './styles/Dashboard.module.css';
import { useRecoilValue, useRecoilState } from 'recoil';
import { orderDataState, selectedProgressState, tableDataState } from '@/recoil/dashboard';

export const Dashboard: React.FC = () => {
  const orderData = useRecoilValue(orderDataState);
  const [tableData, setTableData] = useRecoilState(tableDataState);

  useEffect(() => {
    setTableData(orderData);
  }, [orderData, setTableData]);

  const aggregatedData = {
    受注: `${orderData.length} 件`,
    売上: '¥0',
    対応中: '0 件',
    納期遅れ: '0 件',
  };

  return (
    <div className={styles.container}>
      <FilterCard />
      <StateCard data={aggregatedData} />
      <ChartCard />
    </div>
  );
};
