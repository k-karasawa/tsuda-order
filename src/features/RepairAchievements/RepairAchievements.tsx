import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@/hooks';
import { useRequest } from '@/hooks/useRequest';
import { Table } from 'antd';
import { columns } from './columns_repairachievements';
import styles from './styles/RepairAchievementsStyles.module.css';

interface RequestData {
  id: number;
  name: string;
}

interface OrderListData {
  item_code: string;
  request: number | null;
}

interface GroupedData {
  [key: string]: {
    item_code: string;
    total_count: number;
    children: Array<{ name: string; count: number; key: string }>;
  };
}

export const RepairAchievements = () => {
  const supabase = useSupabaseClient();
  const { data: requestData } = useRequest();
  const [data, setData] = useState<Array<{ key: string; item_code: string; total_count: number; children: Array<{ key: string; item_code: string; count: number }> }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      let { data: orderList, error } = await supabase
        .from('order_list')
        .select('item_code, request')
        .order('item_code', { ascending: true }) as { data: OrderListData[] | null, error: any };

      if (error || !orderList) {
        console.error('データの取得に失敗しました', error);
        return;
      }

      if (!requestData) {
        console.error('requestデータの取得に失敗しました');
        return;
      }

      const requestIdToNameMap = requestData.reduce((acc: { [key: number]: string }, { id, name }: RequestData) => {
        acc[id] = name;
        return acc;
      }, {});

      const groupedData: GroupedData = orderList.reduce((acc: GroupedData, { item_code, request }: OrderListData) => {
        const requestName = request ? requestIdToNameMap[request] : '未指定';
        if (!acc[item_code]) {
          acc[item_code] = { item_code, total_count: 0, children: [] };
        }
        acc[item_code].total_count += 1;
        const existingRequest = acc[item_code].children.find(r => r.name === requestName);
        if (existingRequest) {
          existingRequest.count += 1;
        } else {
          acc[item_code].children.push({ name: requestName, count: 1, key: `${item_code}-${requestName}` });
        }
        return acc;
      }, {});

      const sortedGroupedData = Object.values(groupedData).sort((a, b) => b.total_count - a.total_count);

      const tableData = sortedGroupedData.map(item => ({
        key: item.item_code,
        item_code: item.item_code,
        total_count: item.total_count,
        children: item.children.map(child => ({
          key: child.key,
          item_code: child.name,
          count: child.count,
        })),
      }));

      setData(tableData);
    };

    if (requestData) {
      fetchData();
    }
  }, [requestData, supabase]);

  return (
    <div className={styles.repairAchievementsContainer}>
      <Table
        style={{ width: '50%' }}
        dataSource={data}
        columns={columns}
        defaultExpandAllRows={true}
      />
    </div>
  );
};
