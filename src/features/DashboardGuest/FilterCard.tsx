import { Card, DatePicker, Select, Space } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles/DashboardGuest.module.css';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useProgress } from '@/hooks/useProgress';
import { useRequest } from '@/hooks/useRequest';
import { useFarm } from '@/hooks/useFarm';
import { useCustomer } from '@/hooks/useCustomer';
import { useOrderList } from '@/hooks/useOrderList';
import { CSVDownloader } from '@/features/CSVExport/CSVExport';
import { filterOrdersByDate, filterOrdersByAcceptDate } from './utils/filterOrders';
import 'dayjs/locale/ja';

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

interface FilterCardProps {
  setOrderData: React.Dispatch<React.SetStateAction<any[]>>;
  setAcceptOrderData: React.Dispatch<React.SetStateAction<any[]>>;
  setChartOrderData: React.Dispatch<React.SetStateAction<any[]>>;
  selectedDateRange: [dayjs.Dayjs, dayjs.Dayjs];
  setSelectedDateRange: React.Dispatch<React.SetStateAction<[dayjs.Dayjs, dayjs.Dayjs]>>;
}

export const FilterCard: React.FC<FilterCardProps> = ({
  setOrderData,
  setAcceptOrderData,
  setChartOrderData,
  selectedDateRange,
  setSelectedDateRange
}) => {
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<string>('none');
  const [selectedProgress, setSelectedProgress] = useState<string>('none');
  const [selectedFarm, setSelectedFarm] = useState<string>('none');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('none');
  const [acceptFiltered, setAcceptFiltered] = useState<any[]>([]);
  const { data: allOrderData, error: orderListError } = useOrderList();

  const filterOrders = (orders: any[], selectedProgress: string, selectedRequest: string, selectedFarm: string, selectedCustomer: string) => {
    let filtered = orders;

    // ステータスによるフィルタリング
    if (selectedProgress !== 'none') {
      filtered = filtered.filter(order => order.progress === Number(selectedProgress));
    }

    // 依頼内容によるフィルタリング
    if (selectedRequest !== 'none') {
      filtered = filtered.filter(order => order.request === Number(selectedRequest));
    }

    // 商社によるフィルタリング
    if (selectedFarm !== 'none') {
      filtered = filtered.filter(order => order.farm === Number(selectedFarm));
    }

    // 顧客によるフィルタリング
    if (selectedCustomer !== 'none') {
      filtered = filtered.filter(order => order.customer === Number(selectedCustomer));
    }

    return filtered;
  };

  useEffect(() => {
    if (orderListError) {
      console.error('Error fetching order data:', orderListError);
      return;
    }

    if (allOrderData && selectedDateRange) {
      const startOfRange = selectedDateRange[0].startOf('day');
      const endOfRange = selectedDateRange[1].endOf('day');

      // 日付によるorder_dateのフィルタリング
      let orderFiltered = filterOrdersByDate(allOrderData, startOfRange, endOfRange);

      // 日付によるaccept_dateのフィルタリング
      let acceptFiltered = filterOrdersByAcceptDate(allOrderData, startOfRange, endOfRange);

      // 共通のフィルタリングを適用
      orderFiltered = filterOrders(orderFiltered, selectedProgress, selectedRequest, selectedFarm, selectedCustomer);
      acceptFiltered = filterOrders(acceptFiltered, selectedProgress, selectedRequest, selectedFarm, selectedCustomer);

      setFilteredOrders(orderFiltered);
      setOrderData(orderFiltered);
      setChartOrderData(orderFiltered);
      setAcceptOrderData(acceptFiltered);
      setAcceptFiltered(acceptFiltered);
    }
  }, [
    allOrderData,
    orderListError,
    selectedDateRange,
    selectedProgress,
    selectedRequest,
    selectedFarm,
    selectedCustomer,
    setOrderData,
    setChartOrderData,
    setAcceptOrderData
  ]);

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

  const { data: customerData, loading: customerLoading, error: customerError } = useCustomer();
  const customerOptions = useMemo(() => [
    { value: 'none', label: '選択なし' },
    ...(customerData?.map((item) => ({
      value: item.id.toString(),
      label: item.name
    })) || [])
  ], [customerData]);

  return (
    <div className={styles.cardscontainer}>
      <div className={`${styles.statecardwrapper} ${styles.fullwidthcard}`}>
        <Card className={styles.selectcontent}>
          <Space direction="horizontal" size="middle" style={{ width: '100%' }}>
            <div className={styles.filterItem}>
              <div>月選択：</div>
              <RangePicker
                picker="date"
                value={selectedDateRange}
                onChange={(dates) => {
                  if (dates && dates[0] && dates[1]) {
                    const startDate = dates[0];
                    const endDate = dates[1];
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
            <div className={styles.filterItem} style={{ display: 'flex', alignItems: 'center', height: '100%', gap: 8 }}>
              <CSVDownloader
                data={filteredOrders}
                filename={`${dayjs().format('YYYYMMDD')}-受注日_集計.csv`}
                buttonLabel="受注日"
              />
              <CSVDownloader
                data={acceptFiltered}
                filename={`${dayjs().format('YYYYMMDD')}-検収日_集計.csv`}
                buttonLabel="検収日"
              />
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};
