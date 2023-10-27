import { CaretRightOutlined } from '@ant-design/icons';
import type { CSSProperties } from 'react';
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import styles from './styles/Master.module.css';
import { FarmManage } from './FarmManage/FarmManage';
import { ProgressManage } from './ProgressManage/ProgressManage';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
  {
    key: '1',
    label: '商社管理',
    children: <FarmManage />,
    style: panelStyle,
  },
  {
    key: '2',
    label: '顧客管理',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: '部署管理',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '4',
    label: '依頼内容管理',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '5',
    label: '進捗ラベル管理',
    children: <ProgressManage />,
    style: panelStyle,
  },
];

export const MasterList: React.FC = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <div className={styles.container}>
      各種マスター設定
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </div>
  );
};
