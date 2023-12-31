import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, Table, Spin, Button } from 'antd';
import type { OrderListDataType } from '../../types/types';
import { useProgress } from '../../hooks/useProgress';
import { useRecoilValue, useRecoilState } from 'recoil';
import { XScrollState } from '../../recoil/atoms';
import { selectedOrderAtom } from '../../recoil/selectedOrderAtom';
const { TabPane } = Tabs;

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, data, PROGRESS_COMPLETED_ID, PROGRESS_INRECEIVED_ID, PROGRESS_LOST_ID]);

  if (progressLoading || !data) {
    return <Spin size="large" />;
  }

  return (
    <Tabs defaultActiveKey="inProgress" onChange={setActiveTab}>
      <TabPane tab="進行中" key="inProgress">
        <Table
          size="small"
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            position: ['bottomLeft'],
            pageSize: 50,
            total: filteredData.length,
            showSizeChanger: false,
          }}
          scroll={{ x: scrollX, y: 520 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedOrder(record);
              onRowClick(record);
            },
          })}
        />
      </TabPane>
      <TabPane tab="受付" key="inReceived">
        <Table
          size="small"
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            position: ['bottomLeft'],
            pageSize: 50,
            total: filteredData.length,
            showSizeChanger: false,
          }}
          scroll={{ x: scrollX, y: 680 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedOrder(record);
              onRowClick(record);
            },
          })}
        />
      </TabPane>
      <TabPane tab="完了" key="completed">
        <Table
          size="small"
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            position: ['bottomLeft'],
            pageSize: 50,
            total: filteredData.length,
            showSizeChanger: false,
          }}
          scroll={{ x: scrollX, y: 680 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedOrder(record);
              onRowClick(record);
            },
          })}
        />
      </TabPane>
      <TabPane tab="失注" key="lost">
        <Table
          size="small"
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            position: ['bottomLeft'],
            pageSize: 50,
            total: filteredData.length,
            showSizeChanger: false,
          }}
          scroll={{ x: scrollX, y: 680 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedOrder(record);
              onRowClick(record);
            },
          })}
        />
      </TabPane>
      <TabPane tab="全案件" key="all">
        <Table
          size="small"
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            position: ['bottomLeft'],
            pageSize: 50,
            total: filteredData.length,
            showSizeChanger: false,
          }}
          scroll={{ x: scrollX, y: 680 }}
          sticky={{ offsetScroll: 0, offsetHeader: 0 }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedOrder(record);
              onRowClick(record);
            },
          })}
        />
      </TabPane>
    </Tabs>
  );
};
