import React, { useState } from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';
import { AcceptCard } from './AcceptCard';
import dayjs from 'dayjs';
import styles from './styles/Dashboard.module.css';

const getStartEndOfMonth = (date: dayjs.Dayjs): [dayjs.Dayjs, dayjs.Dayjs] => {
  return [date.startOf('month'), date.endOf('month')];
};

export const Dashboard: React.FC = () => {
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
      <StateCard orderData={orderData} />
      <AcceptCard orderData={acceptOrderData} />
      <ChartCard orderData={chartOrderData} selectedDateRange={selectedDateRange} />
    </div>
  );
};
