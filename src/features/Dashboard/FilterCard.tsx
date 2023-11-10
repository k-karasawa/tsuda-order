import { Card, DatePicker, Select, Space } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles/Dashboard.module.css';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useProgress } from '@/hooks/useProgress';
import { useRequest } from '@/hooks/useRequest';
import { useOrderList } from '@/hooks/useOrderList';
import locale from 'antd/es/date-picker/locale/ja_JP';
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
  const [selectedRequest, setSelectedRequest] = useState<string>('none');
  const [selectedProgress, setSelectedProgress] = useState<string>('none');

  const { data: allOrderData, error: orderListError } = useOrderList();

  useEffect(() => {
    if (orderListError) {
      console.error('Error fetching order data:', orderListError);
      return;
    }

    if (allOrderData) {
      const startOfRange = selectedDateRange[0].startOf('day');
      const endOfRange = selectedDateRange[1].endOf('day');

      const filteredOrders = allOrderData.filter(order => {
        const orderDate = dayjs(order.order_date);
        return orderDate.isAfter(startOfRange) && orderDate.isBefore(endOfRange);
      });

      setOrderData(filteredOrders);
      setChartOrderData(filteredOrders);
    }
  }, [allOrderData, orderListError, selectedDateRange, setOrderData, setChartOrderData]);

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

  return (
    <div className={styles.cardscontainer}>
      <div className={`${styles.statecardwrapper} ${styles.fullwidthcard}`}>
        <Card className={styles.selectcontent} style={{ height: 60 }}>
          <Space>
            月選択：
            <RangePicker
              locale={locale}
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
            ステータス：
            <Select
              listHeight={500}
              defaultValue="none"
              style={{ width: 120 }}
              options={progressOptions}
              onChange={(value) => setSelectedProgress(value)}
            />
            依頼内容：
            <Select
              defaultValue="none"
              style={{ width: 120 }}
              options={requestOptions}
              onChange={(value) => setSelectedRequest(value)}
            />
          </Space>
        </Card>
      </div>
    </div>
  );
};
