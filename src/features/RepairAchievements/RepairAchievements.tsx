import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@/hooks';
import { useRequest } from '@/hooks/useRequest';
import { Table, Select } from 'antd';
import { columns } from './columns_repairachievements';
import { RepairAchievementsChart } from './RepairAchievementsChart';
import { SimilarCase } from './SimilarCase';
import styles from './styles/RepairAchievementsStyles.module.css';

interface RequestData {
  id: number;
  name: string;
}

export interface OrderListData {
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

const { Option } = Select;

export const RepairAchievements = () => {
  const supabase = useSupabaseClient();
  const { data: requestData } = useRequest();
  const [selectedRowData, setSelectedRowData] = useState<{ name: string; count: number }[]>([]);
  const [data, setData] = useState<Array<{ key: string; item_code: string; total_count: number; children: Array<{ key: string; item_code: string; count: number }> }>>([]);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [selectedItemCode, setSelectedItemCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchAllOrders = async (from = 0, allData: OrderListData[] = []): Promise<OrderListData[]> => {
      const response = await supabase
        .from('order_list')
        .select('item_code, request')
        .range(from, from + 999);

      if (response.error) {
        console.error('Error fetching orders:', response.error);
        throw response.error;
      }

      const filteredData = response.data.filter(d => d.item_code !== null);

      const newData: OrderListData[] = allData.concat(filteredData as OrderListData[]);

      if (response.data.length === 1000) {
        return fetchAllOrders(from + 1000, newData);
      } else {
        return newData;
      }
    };

    const fetchData = async () => {
      try {
        let orderList = await fetchAllOrders();

        if (!requestData) {
          console.error('requestデータの取得に失敗しました');
          return;
        }

        // requestIdToNameMapの作成
        const requestIdToNameMap = requestData.reduce((acc: { [key: number]: string }, { id, name }: RequestData) => {
          acc[id] = name;
          return acc;
        }, {});

        // orderListを処理してgroupedDataを作成
        const groupedData: GroupedData = orderList.reduce((acc: GroupedData, { item_code, request }: OrderListData) => {
          // ここでrequestIdToNameMapからrequest名を取得
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
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };

    if (requestData) {
      fetchData();
    }
  }, [requestData, supabase]);

  const getFilteredData = () => {
    if (!filter) {
      return data;
    }
    return data.filter(item => item.item_code.includes(filter));
  };

  return (
    <div className={styles.repairAchievementsContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.tableContainer}>
          <Select
            showSearch
            style={{ width: 200, marginBottom: 16 }}
            placeholder="アイテムコードで検索"
            optionFilterProp="children"
            onChange={value => setFilter(value)}
            filterOption={(input, option) =>
              option?.children ? option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
            allowClear
          >
            {data.map(item => (
              <Option key={item.key} value={item.item_code}>{item.item_code}</Option>
            ))}
          </Select>
          <Table
            dataSource={getFilteredData()}
            columns={columns}
            size="middle"
            onRow={(record) => ({
              onClick: () => {
                if (record.children) {
                  const selectedData = record.children.map(({ item_code, count }) => ({ name: item_code, count }));
                  setSelectedRowData(selectedData);
                  setSelectedItemCode(record.item_code);
                }
              },
            })}
          />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.chartContainer}>
          <RepairAchievementsChart data={selectedRowData} />
        </div>
        <div className={styles.similarCaseContainer}>
          <SimilarCase selectedItemCode={selectedItemCode} allData={data} />
        </div>
      </div>
    </div>
  );
};
