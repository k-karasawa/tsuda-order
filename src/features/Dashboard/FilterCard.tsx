import { Card, DatePicker, Select, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './styles/Dashboard.module.css'
import { getStartEndOfMonth } from './helpers/dateHelpers';
import dayjs from 'dayjs';
import { useProgress } from '@/hooks/useProgress';
import { useRequest } from '@/hooks/useRequest';
import { supabase } from '../../../utils/supabase';
import { useRecoilState } from 'recoil';
import { orderDataState, selectedProgressState } from '@/recoil/dashboard';
import { selectedRequestState } from '@/recoil/dashboard';

const { RangePicker } = DatePicker;

export const FilterCard: React.FC = () => {
  const [reloadData, setReloadData] = useState(false);
  const [selectedRequest, setSelectedRequest] = useRecoilState(selectedRequestState);
  const [orderData, setOrderData] = useRecoilState(orderDataState);
  const [selectedProgress, setSelectedProgress] = useRecoilState(selectedProgressState);
  const [selectedDateRange, setSelectedDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(
    getStartEndOfMonth(dayjs())
  );

  const { data: progressData, loading, error } = useProgress();

  const progressOptions = progressData?.map((item) => ({
    value: item.id.toString(),
    label: item.progress
  }));

  const { data: requestData, loading: requestLoading, error: requestError } = useRequest();

  const requestOptions = requestData?.map((item) => ({
    value: item.id.toString(),
    label: item.name,
    sort: item.sort
  })).sort((a, b) => a.sort - b.sort).map(({ value, label }) => ({ value, label }));

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
      };

      fetchOrders();
      setReloadData(false);
    }
  }, [reloadData]);

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
            defaultValue="全て"
            style={{ width: 120 }}
            options={progressOptions}
            onChange={(value) => setSelectedProgress(value)}
          />
          依頼内容：
          <Select
            defaultValue="全体"
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
