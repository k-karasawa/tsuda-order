import { Card, DatePicker, Select, Space } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./styles/Dashboard.module.css";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useRequest } from "@/hooks/useRequest";
import { useFarm } from "@/hooks/useFarm";
import { useCustomer } from "@/hooks/useCustomer";
import { useOrderList } from "@/hooks/useOrderList";
import { CSVDownloader } from "@/features/CSVExport/CSVExport";
import { filterOrdersByDate, filterOrdersByAcceptDate } from "./utils/filterOrders";
import "dayjs/locale/ja";
import { useFilteredData } from "@/contexts/FilterdDataContext";

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
}) => {
  const { setFilteredData } = useFilteredData();
  const [selectedRequest, setSelectedRequest] = useState<string>('none');
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [selectedProgress, setSelectedProgress] = useState<string>('none');
  const [selectedFarm, setSelectedFarm] = useState<string>('none');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('none');
  const [acceptFiltered, setAcceptFiltered] = useState<any[]>([]);
  const { data: allOrderData, error: orderListError } = useOrderList();
  const [selectedDateRange, setSelectedDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().startOf('month'),
    dayjs().add(1, 'year').endOf('month'),
  ]);

  const filterOrders = (orders: any[], selectedRequest: string, selectedFarm: string, selectedCustomer: string) => {
    let filtered = orders;
    if (selectedRequest !== 'none') {
      filtered = filtered.filter(order => order.request === Number(selectedRequest));
    }
    if (selectedFarm !== 'none') {
      filtered = filtered.filter(order => order.farm === Number(selectedFarm));
    }
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
      const startOfRange = selectedDateRange[0].startOf('month');
      const endOfRange = selectedDateRange[1].endOf('month');

      // desired_delivery_dateに基づいてフィルタリング
      let orderFiltered = allOrderData.filter(order => {
        const deliveryDate = dayjs(order.desired_delivery_date);
        return deliveryDate.isAfter(startOfRange) && deliveryDate.isBefore(endOfRange);
      });

      // accept_dateに基づいてフィルタリング（必要に応じて）
      let acceptFiltered = filterOrdersByAcceptDate(allOrderData, startOfRange, endOfRange);

      // 選択されたリクエスト、農場、顧客に基づいてさらにフィルタリング
      orderFiltered = filterOrders(orderFiltered, selectedRequest, selectedFarm, selectedCustomer);
      acceptFiltered = filterOrders(acceptFiltered, selectedRequest, selectedFarm, selectedCustomer);

      // コンテキストにフィルタリングされたデータを設定
      setFilteredData(orderFiltered);

      // 既存のデータ設定ロジックを保持（もし必要なら）
      setOrderData(orderFiltered);
      setChartOrderData(orderFiltered);
      setAcceptOrderData(acceptFiltered);
      setAcceptFiltered(acceptFiltered);
    }
  }, [
    allOrderData,
    orderListError,
    selectedDateRange,
    selectedRequest,
    selectedFarm,
    selectedCustomer,
    setOrderData,
    setChartOrderData,
    setAcceptOrderData,
    setFilteredData
  ]);

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
                options={customerOptions}
                onChange={(value) => setSelectedCustomer(value)}
              />
            </div>
            <div className={styles.filterItem} style={{ display: 'flex', alignItems: 'center', height: '100%', gap: 8 }}>
              <CSVDownloader
                data={acceptFiltered}
                filename={`${dayjs().format('YYYYMMDD')}-検収日_集計.csv`}
                buttonLabel="検収予測データ"
              />
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};
