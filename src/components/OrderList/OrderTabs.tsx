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

export const OrderTabs: React.FC<OrderTabsProps> = ({ data, columns, onRowClick }) => {
  const scrollX = useRecoilValue(XScrollState);
  const [, setSelectedOrder] = useRecoilState(selectedOrderAtom);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { data: progressData, loading: progressLoading } = useProgress();

  useEffect(() => {
    if (progressData) {
      setActiveTab('inProgress');
    }
  }, [progressData]);

  const PROGRESS_COMPLETED_ID = progressData?.find(p => p.progress === '完了')?.id;
  const PROGRESS_LOST_ID = progressData?.find(p => p.progress === '失注')?.id;
  const PROGRESS_INRECEIVED_ID = progressData?.find(p => p.progress === '受付')?.id;

  const filteredData = useMemo(() => {
    if (progressLoading || !data || !activeTab) {
      return [];
    }

    switch (activeTab) {
      case 'all':
        return data;
      case 'inProgress':
        return data.filter(order => order.progress !== PROGRESS_LOST_ID && order.progress !== PROGRESS_COMPLETED_ID);
      case 'inReceived':
        return data.filter(order => order.progress === PROGRESS_INRECEIVED_ID);
      case 'completed':
        return data.filter(order => order.progress === PROGRESS_COMPLETED_ID);
      case 'lost':
        return data.filter(order => order.progress === PROGRESS_LOST_ID);
      default:
        return data;
    }
  }, [progressLoading, data, activeTab, PROGRESS_LOST_ID, PROGRESS_COMPLETED_ID, PROGRESS_INRECEIVED_ID]);

  if (progressLoading || !data) {
    return <Spin size="large" />;
  }

  const tabItems = [
    {
      label: '進行中',
      key: 'inProgress',
      children:
        <Table
          size="small"
          columns={columns}
          dataSource={filteredData.filter(order => order.progress !== PROGRESS_LOST_ID && order.progress !== PROGRESS_COMPLETED_ID)}
          rowKey="id"
          pagination={{ position: ['bottomLeft'], pageSize: 50, total: filteredData.length, showSizeChanger: false, }}
          scroll={{ x: scrollX, y: 520 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({ onClick: () => { setSelectedOrder(record); onRowClick(record); }, })}
        />,
    },
    {
      label: '受付',
      key: 'inReceived',
      children:
        <Table
          size="small"
          columns={columns}
          dataSource={filteredData.filter(order => order.progress === PROGRESS_INRECEIVED_ID)}
          rowKey="id"
          pagination={{ position: ['bottomLeft'], pageSize: 50, total: filteredData.length, showSizeChanger: false, }}
          scroll={{ x: scrollX, y: 520 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({ onClick: () => { setSelectedOrder(record); onRowClick(record); }, })}
        />,
    },
    {
      label: '完了',
      key: 'completed',
      children:
        <Table size="small"
          columns={columns}
          dataSource={filteredData.filter(order => order.progress === PROGRESS_COMPLETED_ID)}
          rowKey="id"
          pagination={{ position: ['bottomLeft'], pageSize: 50, total: filteredData.length, showSizeChanger: false, }}
          scroll={{ x: scrollX, y: 520 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({ onClick: () => { setSelectedOrder(record); onRowClick(record); }, })}
        />,
    },
    {
      label: '失注',
      key: 'lost',
      children:
        <Table
          size="small"
          columns={columns}
          dataSource={filteredData.filter(order => order.progress === PROGRESS_LOST_ID)}
          rowKey="id"
          pagination={{ position: ['bottomLeft'], pageSize: 50, total: filteredData.length, showSizeChanger: false, }}
          scroll={{ x: scrollX, y: 520 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({ onClick: () => { setSelectedOrder(record); onRowClick(record); }, })}
        />,
    },
    {
      label: '全体',
      key: 'all',
      children:
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ position: ['bottomLeft'], pageSize: 50, total: data.length, showSizeChanger: false, }}
          scroll={{ x: scrollX, y: 520 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({ onClick: () => { setSelectedOrder(record); onRowClick(record); }, })}
        />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="inProgress"
      onChange={setActiveTab}
      items={tabItems}
    />
  );
};
