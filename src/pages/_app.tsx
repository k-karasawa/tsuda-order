import "@/styles/globals.css";
import { useState, ReactElement } from "react";
import { MainMenu } from "@/components/menus/MainMenu";
import { type AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import jaJP from "antd/lib/locale/ja_JP";
import { useAuthListen } from "@/hooks/useAuthListen";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import type { Database } from "@/types/database.types";

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  pageProps: {
    initialSession: Session;
  };
}) {
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());
  const getLayout = Component.getLayout ?? ((page: ReactElement) => <MainMenu pagetitle={Component.pagetitle}>{page}</MainMenu>);
  useAuthListen({ supabaseClient });
  return (
    <RecoilRoot>
      <ConfigProvider locale={jaJP}>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          {getLayout(<Component {...pageProps} />)}
        </SessionContextProvider>
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default MyApp;
