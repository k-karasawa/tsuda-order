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
    getItem('Tリバース Eng', '3'),
    getItem('Sリバース Eng', '4'),
    getItem('Mリバース Eng', '5'),
    getItem('特機事業部案件', '6'),
  ]),
  getItem('帳票発行', '/salesaggregate', <PieChartOutlined />),
  getItem('関連ファイル', '/salesaggregate', <PieChartOutlined />),
  getItem('設定管理', '90', <SettingOutlined />, [
    getItem('マスター管理', '/mastercontrol'),
    getItem('システム設定', '/system-settings')
  ])
]
