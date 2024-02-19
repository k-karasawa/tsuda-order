import { ReactNode } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { items } from './MenuItems';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@/hooks';
const { Header, Content, Sider } = Layout;

export const MainMenu: React.FC<{children: ReactNode, pagetitle?: string}> = ({children, pagetitle}) => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/auth');
    } else {
      console.error('サインアウトに失敗しました。', error.message);
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "SIGN_OUT") {
      signOut();
    } else {
      router.push(key);
    }
  };

  const getPageTitle = (key: string): string => {
    const menuItem = items.find(item => item.key === key);
    if (menuItem) {
      return menuItem.label as string;
    }
    for (let mainItem of items) {
      if (mainItem.children) {
        const subMenuItem = mainItem.children.find(item => item.key === key);
        if (subMenuItem) {
          return subMenuItem.label as string;
        }
      }
    }
    return "Unknown Page";
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <div className="app-title" style={{ marginBottom: 20, padding: '10px', textAlign: 'center', color: '#cccccc' }}>
            <p>津田製作所</p>案件管理アプリ
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['/']}
            selectedKeys={[router.pathname]}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>

        <Layout>
          <Header style={{ background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {pagetitle ? pagetitle : getPageTitle(router.pathname)}
          </Header>
          <Content style={{ marginTop: '1.2rem' }}>
            <Breadcrumb>
            </Breadcrumb>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
