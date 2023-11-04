import React, { useEffect, useState } from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';
import styles from './styles/Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const [orderData, setOrderData] = useState<any[]>([]);

  const aggregatedData = {
    受注: `${orderData.length} 件`,
    売上: '¥0', // TODO: 実際の売上の集計ロジックに置き換える
    最優先: '0 件', // TODO: 実際の最優先の集計ロジックに置き換える
    納期遅れ: '0 件', // TODO: 実際の納期遅れの集計ロジックに置き換える
  };

  return (
    <div className={styles.container}>
      <FilterCard setOrderData={setOrderData} />
      <StateCard data={aggregatedData} orderData={orderData} /> {/* 修正部分 */}
      <ChartCard />
    </div>
  );
};
