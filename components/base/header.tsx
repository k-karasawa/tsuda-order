import React, { useState } from 'react';
import { PlusCircleOutlined, SnippetsOutlined, FileOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { AggregationPage } from '@/pages/aggregation';
import { OrderRegistrationPage } from '@/pages/orderregistration';
import { ReceiveOrders } from '@/pages/receiveorders';

const { Header, Content, Sider } = Layout;

type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  label: React.ReactNode;
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('受注情報集計', '1', <PieChartOutlined />),
  getItem('案件登録', '2', <PlusCircleOutlined />),
  getItem('案件状況', 'sub1', <SnippetsOutlined />, [
    getItem('Tリバース Eng', '3'),
    getItem('Sリバース Eng', '4'),
    getItem('Mリバース Eng', '5'),
    getItem('特機事業部案件', '6'),
    getItem('全案件', '7'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '8'), getItem('Team 2', '9')]),
  getItem('関連ファイル', '10', <FileOutlined />),
];

export const HeaderPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('1');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const renderContent = () => {
    switch (currentPage) {
      case '1':
        return <AggregationPage />;
      case '2':
        return <OrderRegistrationPage />;
      case '3':
        return <ReceiveOrders />;
      // 他のページの場合の条件もここに追加...
      default:
        return <div>Bill is a cat.</div>;
    }
  };

  const getPageTitle = (key: string): string => {
    const menuItem = items.find(item => item.key === key);
    if (menuItem) {
      return menuItem.label as string;
    }
    return "Unknown Page";
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="app-title" style={{ padding: '10px', textAlign: 'center', color: '#cccccc' }}>
            {collapsed ? '津田' : <>津田製作所<br />受注管理アプリ</>}
          </div>
          <div className="demo-logo-vertical" />
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline" 
            items={items} 
            onClick={({ key }) => setCurrentPage(key.toString())}
          />
        </Sider>
        <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {getPageTitle(currentPage)}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          {renderContent()}
        </Content>
        </Layout>
      </Layout>
    </>
  );
};