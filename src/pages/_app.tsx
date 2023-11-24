import '@/styles/globals.css';
import { ReactElement } from 'react';
import { MainMenu } from '@/components/menus/MainMenu';
import { AppProps } from "next/app";
import { supabase } from "../../utils/supabase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import jaJP from 'antd/lib/locale/ja_JP';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: ReactElement) => <MainMenu pagetitle={Component.pagetitle}>{page}</MainMenu>);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/auth");
        } else if (event === "SIGNED_IN" && router.pathname === "/auth") {
          router.push("/");
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <RecoilRoot>
      <ConfigProvider locale={jaJP}>
        <SessionContextProvider
          supabaseClient={supabase}
          initialSession={pageProps.initialSession}
        >
          {getLayout(<Component {...pageProps} />)}
        </SessionContextProvider>
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default MyApp;
