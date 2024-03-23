import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, Table, Spin } from 'antd';
import type { OrderListDataType } from '../../types/types';
import { useProgress } from '../../hooks/useProgress';
import { useRecoilValue, useRecoilState } from 'recoil';
import { XScrollState } from '../../recoil/atoms';
import { selectedOrderAtom } from '../../recoil/selectedOrderAtom';

interface OrderTabsProps {
  data: OrderListDataType[];
  columns: any;
  onRowClick: (record: OrderListDataType) => void;
}

interface OrderTableProps {
  columns: any;
  dataSource: OrderListDataType[];
  scrollX: number | string;
  onRowClick: (record: OrderListDataType) => void;
  setSelectedOrder: (order: OrderListDataType) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ columns, dataSource, scrollX, onRowClick, setSelectedOrder }) => (
  <Table
    size="small"
    columns={columns}
    dataSource={dataSource}
    rowKey="id"
    pagination={{ position: ['bottomLeft'], pageSize: 50, total: dataSource.length, showSizeChanger: false }}
    scroll={{ x: scrollX, y: 520 }}
    sticky={{ offsetScroll: 0, offsetHeader: 0 }}
    onRow={(record) => ({ onClick: () => { setSelectedOrder(record); onRowClick(record); }, })}
  />
);

export const OrderTabs: React.FC<OrderTabsProps> = ({ data, columns, onRowClick }) => {
  const scrollX = useRecoilValue(XScrollState);
  const [, setSelectedOrder] = useRecoilState(selectedOrderAtom);
  const [activeTab, setActiveTab] = useState<string | null>('inProgress');
  const { data: progressData, loading: progressLoading } = useProgress();

  useEffect(() => {
    if (progressData) {
      setActiveTab('inProgress');
    }
  }, [progressData]);

  const progressIds = useMemo(() => ({
    completedId: progressData?.find(p => p.progress === '完了')?.id,
    lostId: progressData?.find(p => p.progress === '失注')?.id,
    inReceivedId: progressData?.find(p => p.progress === '受付')?.id,
  }), [progressData]);

  const filteredData = useMemo(() => {
    if (!activeTab) {
      return [];
    }
    switch (activeTab) {
      case 'all':
        return data;
      case 'inProgress':
        return data.filter(order => order.progress !== progressIds.lostId && order.progress !== progressIds.completedId);
      case 'inReceived':
        return data.filter(order => order.progress === progressIds.inReceivedId);
      case 'completed':
        return data.filter(order => order.progress === progressIds.completedId);
      case 'lost':
        return data.filter(order => order.progress === progressIds.lostId);
      default:
        return data;
    }
  }, [data, activeTab, progressIds]);

  const tabItems = useMemo(() => [
    {
      label: '進行中',
      key: 'inProgress',
      children: <OrderTable columns={columns} dataSource={filteredData} scrollX={scrollX} onRowClick={onRowClick} setSelectedOrder={setSelectedOrder} />,
    },
    {
      label: '受付',
      key: 'inReceived',
      children: <OrderTable columns={columns} dataSource={filteredData} scrollX={scrollX} onRowClick={onRowClick} setSelectedOrder={setSelectedOrder} />,
    },
    {
      label: '完了',
      key: 'completed',
      children: <OrderTable columns={columns} dataSource={filteredData} scrollX={scrollX} onRowClick={onRowClick} setSelectedOrder={setSelectedOrder} />,
    },
    {
      label: '失注',
      key: 'lost',
      children: <OrderTable columns={columns} dataSource={filteredData} scrollX={scrollX} onRowClick={onRowClick} setSelectedOrder={setSelectedOrder} />,
    },
    {
      label: '全体',
      key: 'all',
      children: <OrderTable columns={columns} dataSource={data} scrollX={scrollX} onRowClick={onRowClick} setSelectedOrder={setSelectedOrder} />,
    },
  ], [columns, filteredData, scrollX, onRowClick, setSelectedOrder, data]);

  if (progressLoading || !data) {
    return <Spin size="large" />;
  }

  return (
    <Tabs
      defaultActiveKey="inProgress"
      onChange={setActiveTab}
      items={tabItems}
    />
  );
};
