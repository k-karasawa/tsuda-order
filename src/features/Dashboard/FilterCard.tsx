import { Card, DatePicker, Select, Space } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles/Dashboard.module.css'
import { getStartEndOfMonth } from './helpers/dateHelpers';
import dayjs from 'dayjs';
import { useProgress } from '@/hooks/useProgress';
import { useRequest } from '@/hooks/useRequest';
import { supabase } from '../../../utils/supabase';

const { RangePicker } = DatePicker;

interface FilterCardProps {
  setOrderData: React.Dispatch<React.SetStateAction<any[]>>;
}

export const FilterCard: React.FC<FilterCardProps> = ({ setOrderData }) => {
  const [reloadData, setReloadData] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string>('none');
  const [selectedProgress, setSelectedProgress] = useState<string>('none');
  const [selectedDateRange, setSelectedDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(
    getStartEndOfMonth(dayjs())
  );

  const { data: progressData, loading, error } = useProgress();

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

  useEffect(() => {
  }, [reloadData]);

  useEffect(() => {
    if (progressOptions.length > 0 && requestOptions.length > 0) {
      setReloadData(true);
    }
  }, [progressOptions, requestOptions]);

  useEffect(() => {
    const fetchOrders = async () => {
      let query = supabase.from('order_list_extended').select('*');

      if (selectedProgress !== 'none') {
        query = query.filter('progress', 'eq', selectedProgress);
      }

      if (selectedRequest !== 'none') {
        query = query.filter('request', 'eq', selectedRequest);
      }

      query = query.filter('order_date', 'gte', selectedDateRange[0].format('YYYY-MM-DD'))
                   .filter('order_date', 'lte', selectedDateRange[1].format('YYYY-MM-DD'));

      const { data, error } = await query;

      if (error) {
        console.error(error);
      } else {
        setOrderData(data || []);
      }
    };

    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProgress, selectedRequest, selectedDateRange]);

  if (error) {
    return <div>エラーが発生しました。</div>;
  }

  return (
    <div className={styles.cardscontainer}>
      <div className={`${styles.statecardwrapper} ${styles.fullwidthcard}`}>
        <Card className={styles.selectcontent} style={{ height: 60 }}>
        <Space>
          月選択：
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
