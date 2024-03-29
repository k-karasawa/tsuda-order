import { MenuItem } from "./types";
import {
  FileTextOutlined,
  SnippetsOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  BarChartOutlined,
  LogoutOutlined,
  FileAddOutlined,
  DashboardOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

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
    children: children || undefined,
    label,
    action,
  };
}

export const items: MenuItem[] = [
  getItem('ダッシュボード', '/', <DashboardOutlined />),
  getItem('案件登録', '/add-order', <FileAddOutlined />),
  getItem('案件一覧', '/order-list', <FileTextOutlined />),
  getItem('部門別一覧', '1', <FolderOpenOutlined />, [
    getItem('修理', '/order-repair', <SnippetsOutlined />),
    getItem('複製', '/order-duplicate', <SnippetsOutlined />),
    getItem('OH', '/order-oh', <SnippetsOutlined />),
    getItem('富士フイルム', '/order-f', <SnippetsOutlined />),
    getItem('その他', '/order-other', <SnippetsOutlined />),
    getItem('調査', '/order-survey', <SnippetsOutlined />),
    getItem('販売', '/order-sale', <SnippetsOutlined />),
    getItem('開発', '/order-development', <SnippetsOutlined />),
    getItem('工事', '/order-construction', <SnippetsOutlined />),
  ]),
  getItem('商社別一覧', '2', <FolderOpenOutlined />, [
    getItem('Tリバース Eng', '/order-t', <SnippetsOutlined />),
    getItem('Sリバース Eng', '/order-s', <SnippetsOutlined />),
    getItem('Mリバース Eng', '/order-m', <SnippetsOutlined />),
    getItem('特機事業部案件', '/order-ts', <SnippetsOutlined />),
  ]),
  getItem('設定管理', '3', <SettingOutlined />, [
    getItem('マスター管理', '/master'),
    getItem('アナウンス設定', '/notice'),
  ]),
  getItem('過去実績', '/repair-achievements', <FileProtectOutlined />),
  getItem('検収予測', '/forecast', <BarChartOutlined />),
  getItem('サインアウト', 'SIGN_OUT', <LogoutOutlined />),
];

export const useFilteredItems = (role: string | null) => {
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    let itemsToShow: MenuItem[] = [];
    if (role === 'guest') {
      itemsToShow = [
        getItem('ダッシュボード', '/dashboard-guest', <DashboardOutlined />),
        getItem('案件一覧', '/order-list', <FileTextOutlined />),
        getItem('サインアウト', 'SIGN_OUT', <LogoutOutlined />),
      ];
    } else if (['admin', 'user', 'manager'].includes(role || '')) {
      itemsToShow = items;
    }
    setFilteredItems(itemsToShow);
  }, [role]);

  return filteredItems;
};
