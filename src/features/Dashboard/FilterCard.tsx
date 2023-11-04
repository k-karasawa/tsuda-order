import { Card, DatePicker, Select, Space } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles/Dashboard.module.css'
import { getStartEndOfMonth } from './helpers/dateHelpers';
import dayjs from 'dayjs';
import { useProgress } from '@/hooks/useProgress';
import { useRequest } from '@/hooks/useRequest';
import { supabase } from '../../../utils/supabase';
import { useRecoilState } from 'recoil';

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
    setReloadData(true);
  }, [progressOptions, requestOptions]);

  useEffect(() => {
    if (reloadData) {
      const fetchOrders = async () => {
        const { data, error } = await supabase.from('order_list_extended').select('*');

        if (error) {
          console.error(error);
        } else {
          setOrderData(data || []);
        }
        setReloadData(false);
      };

      fetchOrders();
    }
  }, [reloadData, setOrderData]);

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
              onChange={(dates) => setSelectedDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
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
