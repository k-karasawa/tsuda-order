import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd/es/table';
import styles from './styles.module.css';
import { initialData } from './TableData';
import { columns } from './columns';

const onChange: TableProps<OrderListDataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const OrderIndex: React.FC = () => (
  <div className={styles.container}>
    <Table
      columns={columns}
      dataSource={initialData}
      onChange={onChange}
      rowKey="id"
      pagination={{
        position: ['bottomCenter'],
        pageSize: 20,
        total: initialData.length,
        showSizeChanger: false,
      }}
      style={{ width: 2000 }}
    />
  </div>
);
