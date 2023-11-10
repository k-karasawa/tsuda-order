import React from 'react';
import { MenuItem } from './types';
import {
  FileTextOutlined,
  SnippetsOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { signOut } from '@/components/Auth/signout';

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  action?: () => void,
): MenuItem {
  return {
    key: key.toString(),
    icon,
    children,
    label,
    action,
  };
}

export const items: MenuItem[] = [
  getItem('ダッシュボード', '/', <BarChartOutlined />),
  getItem('案件登録', '/add-order', <FileTextOutlined />),
  getItem('案件一覧', '/order-list', <FileTextOutlined />),
  getItem('部門別一覧', '1', <FolderOpenOutlined />, [
    getItem('修理', '/order-repair', <SnippetsOutlined />),
    getItem('複製', '/order-duplicate', <SnippetsOutlined />),
    getItem('OH', '/order-oh', <SnippetsOutlined />),
    getItem('その他', '/order-other', <SnippetsOutlined />),
    getItem('調査', '/order-survey', <SnippetsOutlined />),
    getItem('販売', '/order-sale', <SnippetsOutlined />),
    getItem('開発', '/order-development', <SnippetsOutlined />),
    getItem('工事', '/order-construction', <SnippetsOutlined />),
  ]),
  getItem('商社別一覧', '2', <FolderOpenOutlined />, [
    getItem('富士フイルム', '/order-f', <SnippetsOutlined />),
    getItem('Tリバース Eng', '/order-t', <SnippetsOutlined />),
    getItem('Sリバース Eng', '/order-s', <SnippetsOutlined />),
    getItem('Mリバース Eng', '/order-m', <SnippetsOutlined />),
    getItem('特機事業部案件', '/order-ts', <SnippetsOutlined />),
  ]),
  getItem('設定管理', '3', <SettingOutlined />, [
    getItem('マスター管理', '/master'),
  ]),
  getItem('サインアウト', 'SIGN_OUT', <LogoutOutlined />, undefined, signOut),
]
