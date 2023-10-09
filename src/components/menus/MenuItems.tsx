import React from 'react';
import { MenuItem } from './types';
import {
  FileTextOutlined,
  TeamOutlined,
  LogoutOutlined,
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
  getItem('部門別一覧', '30', <LogoutOutlined />, [
    getItem('修理', '1'),
    getItem('複製', '2'),
    getItem('OH', '3'),
    getItem('その他', '4'),
    getItem('販売', '5'),
    getItem('開発', '6'),
    getItem('工事', '7'),
  ]),
  getItem('商社別一覧', '31', <LogoutOutlined />, [
    getItem('Tリバース Eng', '8'),
    getItem('Sリバース Eng', '9'),
    getItem('Mリバース Eng', '10'),
    getItem('特機事業部案件', '11'),
  ]),
  getItem('帳票発行', '/96', <PieChartOutlined />),
  getItem('関連ファイル', '/97', <PieChartOutlined />),
  getItem('設定管理', '90', <SettingOutlined />, [
    getItem('マスター管理', '/98'),
    getItem('システム設定', '/99')
  ])
]
