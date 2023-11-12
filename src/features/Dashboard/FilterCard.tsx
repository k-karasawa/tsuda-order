import { Card, DatePicker, Select, Space } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles/Dashboard.module.css';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useProgress } from '@/hooks/useProgress';
import { useRequest } from '@/hooks/useRequest';
import { useFarm } from '@/hooks/useFarm';
import { useCustomer } from '@/hooks/useCustomer';
import { useOrderList } from '@/hooks/useOrderList';
import { CSVDownloader } from '@/features/CSVExport/CSVExport';
import { filterOrdersByDate } from './utils/filterOrders';
import 'dayjs/locale/ja';

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

interface FilterCardProps {
  setOrderData: React.Dispatch<React.SetStateAction<any[]>>;
  setChartOrderData: React.Dispatch<React.SetStateAction<any[]>>;
  selectedDateRange: [dayjs.Dayjs, dayjs.Dayjs];
  setSelectedDateRange: React.Dispatch<React.SetStateAction<[dayjs.Dayjs, dayjs.Dayjs]>>;
}

export const FilterCard: React.FC<FilterCardProps> = ({
  setOrderData,
  setChartOrderData,
  selectedDateRange,
  setSelectedDateRange
}) => {
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<string>('none');
  const [selectedProgress, setSelectedProgress] = useState<string>('none');
  const [selectedFarm, setSelectedFarm] = useState<string>('none');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('none');

  const { data: allOrderData, error: orderListError } = useOrderList();

  useEffect(() => {
    if (orderListError) {
      console.error('Error fetching order data:', orderListError);
      return;
    }

    if (allOrderData && selectedDateRange) {
      const startOfRange = selectedDateRange[0].startOf('day');
      const endOfRange = selectedDateRange[1].endOf('day');

      let filtered = filterOrdersByDate(allOrderData, startOfRange, endOfRange);

      if (selectedProgress !== 'none') {
        filtered = filtered.filter(order => order.progress === Number(selectedProgress));
      }

      if (selectedRequest !== 'none') {
        filtered = filtered.filter(order => order.request === Number(selectedRequest));
      }

      setFilteredOrders(filtered);
      setOrderData(filtered);
      setChartOrderData(filtered);
    }
  }, [allOrderData, orderListError, selectedDateRange, selectedProgress, selectedRequest, setOrderData, setChartOrderData]);

  const { data: progressData, loading: progressLoading, error: progressError } = useProgress();
  const progressOptions = useMemo(() => [
    { value: 'none', label: '選択なし' },
    ...(progressData?.map((item) => ({
      value: item.id.toString(),
      label: item.progress
    })) || [])
  ], [progressData]);

  const { data: requestData, loading: requestLoading, error: requestError } = useRequest();
  const requestOptions = useMemo(() => [
    { value: 'none', label: '選択なし' },
    ...(requestData?.map((item) => ({
      value: item.id.toString(),
      label: item.name,
      sort: item.sort
    })).sort((a, b) => a.sort - b.sort).map(({ value, label }) => ({ value, label })) || [])
  ], [requestData]);

  const { data: farmData, loading: farmLoading, error: farmError } = useFarm();
  const farmOptions = useMemo(() => [
    { value: 'none', label: '選択なし' },
    ...(farmData?.map((item) => ({
      value: item.id.toString(),
      label: item.name
    })) || [])
  ], [farmData]);

  return (
    <div className={styles.cardscontainer}>
      <div className={`${styles.statecardwrapper} ${styles.fullwidthcard}`}>
        <Card className={styles.selectcontent}>
          <Space direction="horizontal" size="middle" style={{ width: '100%' }}>
            <div className={styles.filterItem}>
              <div>月選択：</div>
              <RangePicker
                picker="month"
                value={selectedDateRange}
                onChange={(dates) => {
                  if (dates && dates[0] && dates[1]) {
                    const startDate = dates[0].startOf('month');
                    const endDate = dates[1].endOf('month');
                    setSelectedDateRange([startDate, endDate]);
                  }
                }}
              />
            </div>
            <div className={styles.filterItem}>
              <div>ステータス：</div>
              <Select
                listHeight={500}
                defaultValue="none"
                style={{ width: 140 }}
                options={progressOptions}
                onChange={(value) => setSelectedProgress(value)}
              />
            </div>
            <div className={styles.filterItem}>
              <div>依頼内容：</div>
              <Select
                defaultValue="none"
                style={{ width: 140 }}
                options={requestOptions}
                onChange={(value) => setSelectedRequest(value)}
              />
            </div>
            <div className={styles.filterItem}>
              <div>商社：</div>
              <Select
                defaultValue="none"
                style={{ width: 140 }}
                options={farmOptions}
                onChange={(value) => setSelectedFarm(value)}
              />
            </div>
            <div className={styles.filterItem}>
              <div>顧客：</div>
              <Select
                defaultValue="none"
                style={{ width: 140 }}
                options={farmOptions}
                onChange={(value) => setSelectedCustomer(value)}
              />
            </div>
            <div className={styles.filterItem} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <CSVDownloader data={filteredOrders} filename="filtered_orders.csv" />
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};
