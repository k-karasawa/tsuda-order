import React from 'react';
import { Tabs, TabsProps } from 'antd';
import { CustomerDepartmentManage } from './CustomerDepartmentManage/CustomerDepartmentManage';
import { CustomerManage } from './CustomerManage/CustomerManage';
import { FarmManage } from './FarmManage/FarmManage';
import { ProgressManage } from './ProgressManage/ProgressManage';
import { RequestManage } from './RequestManage/RequestManage';
import styles from './styles/Master.module.css';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '商社管理',
    children: <FarmManage />,
  },
  {
    key: '2',
    label: '顧客管理',
    children: <CustomerManage />,
  },
  {
    key: '3',
    label: '部署管理',
    children: <CustomerDepartmentManage />,
  },
  {
    key: '4',
    label: '進捗管理',
    children: <ProgressManage />,
  },
  {
    key: '5',
    label: '依頼管理',
    children: <RequestManage />,
  },
];

export const MasterList: React.FC = () => (
  <div className={styles.container}>
    <Tabs defaultActiveKey="1" items={items}/>
  </div>
);
