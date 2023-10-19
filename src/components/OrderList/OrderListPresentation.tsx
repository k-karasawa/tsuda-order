import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { columns as originalColumns } from '@/data/columns';
import { createDynamicFilters } from '@/hooks/filterUtils';
import { generateColumns } from '@/hooks/columnUtils';
import type { OrderListPresentationProps, OrderListDataType } from '@/types/types';
import { filterableColumns } from '@/data/filterableColumns';
import { OrderTabs } from './OrderTabs';
import { OrderEditDrawer } from '@/features/OrderEditDrawer/OrderEditDrawer';
import { useOrderList } from '@/hooks/useOrderList';
import Link from 'next/link';

export const OrderListPresentation: React.FC<OrderListPresentationProps> = ({ data, refetchOrderList }) => {
  const { revalidate } = useOrderList();
  const [selectedOrder, setSelectedOrder] = useState<OrderListDataType | undefined>();
  const dynamicFilters = createDynamicFilters(data, filterableColumns);
  const columns = generateColumns(originalColumns, dynamicFilters);

  const handleRowClick = (record: OrderListDataType) => {
    setSelectedOrder(record);
  };

  return (
    <OrderEditDrawer selectedOrder={selectedOrder} onUpdated={revalidate}>
      {showDrawer => (
        <>
          <Link href="/add-order">
            <FloatButton
              icon={<FileAddOutlined />}
              tooltip={<div>案件登録</div>}
              type="primary"
              style={{ right: 20 }}
            />
          </Link>
          <OrderTabs
            data={data}
            columns={columns}
            onRowClick={record => {
              handleRowClick(record);
              showDrawer();
            }}
          />
        </>
      )}
    </OrderEditDrawer>
  );
};
