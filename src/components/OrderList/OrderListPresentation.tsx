import React from 'react';
import { Table, FloatButton } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { columns as originalColumns } from '@/data/columns';
import type { OrderListPresentationProps } from '@/types/types';
import { filterableColumns } from '@/data/filterableColumns';
import { createDynamicFilters } from '@/hooks/filterUtils';
import { generateColumns } from '@/hooks/columnUtils';
import { OrderEditDrawer } from '@/features/OrderEditDrawer/OrderEditDrawer';
import Link from 'next/link';

export const OrderListPresentation: React.FC<OrderListPresentationProps> = ({ data }) => {
  const dynamicFilters = createDynamicFilters(data, filterableColumns);
  const columns = generateColumns(originalColumns, dynamicFilters);

  return (
    <OrderEditDrawer>
      {showDrawer => (
        <>
          <Link href="/add-order">
            <FloatButton icon={<FileAddOutlined />} tooltip={<div>案件登録</div>} type="primary" style={{ right: 20 }} />
          </Link>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{
              position: ['bottomLeft'],
              pageSize: 20,
              total: data.length,
              showSizeChanger: false,
            }}
            scroll={{ x: 3700 }}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                showDrawer();
              },
            })}
          />
        </>
      )}
    </OrderEditDrawer>
  );
};

