import React, { useState } from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';
import { AcceptCard } from './AcceptCard';
import dayjs from 'dayjs';
import styles from './styles/DashboardGuest.module.css';

const getStartEndOfMonth = (date: dayjs.Dayjs): [dayjs.Dayjs, dayjs.Dayjs] => {
  return [date.startOf('month'), date.endOf('month')];
};

export const DashboardGuest: React.FC = () => {
  const [orderData, setOrderData] = useState<any[]>([]);
  const [chartOrderData, setChartOrderData] = useState<any[]>([]);
  const [acceptOrderData, setAcceptOrderData] = useState<any[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(
    getStartEndOfMonth(dayjs())
  );

  return (
    <div className={styles.container}>
      <FilterCard
        setOrderData={setOrderData}
        setAcceptOrderData={setAcceptOrderData}
        setChartOrderData={setChartOrderData}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      />
      <div className={styles.dashboardLayout}>
        <div className={styles.leftColumn}>
          <StateCard orderData={orderData} />
          <AcceptCard orderData={acceptOrderData} totalOrders={orderData.length} />
        </div>
        <div className={styles.rightColumn}>
          <ChartCard orderData={chartOrderData} selectedDateRange={selectedDateRange} />
        </div>
      </div>
    </div>
  );
};
