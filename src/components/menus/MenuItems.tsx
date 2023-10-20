import React from 'react';
import { MenuItem } from './types';
import {
  FileTextOutlined,
  SnippetsOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key: key.toString(),
    icon,
    children,
    label,
  };
}

export const items: MenuItem[] = [
  getItem('ダッシュボード', '/', <BarChartOutlined />),
  getItem('案件登録', '/add-order', <FileTextOutlined />),
  getItem('案件一覧', '/order-list', <FileTextOutlined />),
  getItem('部門別一覧', '', <FolderOpenOutlined />, [
    getItem('修理', '/order-repair', <SnippetsOutlined />),
    getItem('複製', '/order-duplicate', <SnippetsOutlined />),
    getItem('OH', '/order-oh', <SnippetsOutlined />),
    getItem('その他', '/order-other', <SnippetsOutlined />),
    getItem('販売', '/order-sale', <SnippetsOutlined />),
    getItem('開発', '/order-development', <SnippetsOutlined />),
    getItem('工事', '/order-construction', <SnippetsOutlined />),
  ]),
  getItem('商社別一覧', '31', <FolderOpenOutlined />, [
    getItem('Tリバース Eng', '8', <SnippetsOutlined />),
    getItem('Sリバース Eng', '9', <SnippetsOutlined />),
    getItem('Mリバース Eng', '10', <SnippetsOutlined />),
    getItem('特機事業部案件', '11', <SnippetsOutlined />),
  ]),
  getItem('設定管理', '90', <SettingOutlined />, [
    getItem('マスター管理', '/98'),
    getItem('システム設定', '/99')
  ])
]
