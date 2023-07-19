import React, { useState } from 'react';
import { PlusCircleOutlined, SnippetsOutlined, FileOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import { AggregationPage } from '@/pages/aggregation';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

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
  getItem('受注登録', '2', <PlusCircleOutlined />),
  getItem('受注状況', 'sub1', <SnippetsOutlined />, [
    getItem('Tリバース Eng', '3'),
    getItem('Sリバース Eng', '4'),
    getItem('Mリバース Eng', '5'),
    getItem('特機事業部案件', '6'),
    getItem('全受注案件', '7'),
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
      // 他のページの場合の条件もここに追加...
      default:
        return <div>Bill is a cat.</div>;
    }
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
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb items={[
              { content: 'User' },
              { content: 'Bill' }
            ]} />
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};



