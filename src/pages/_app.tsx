import '@/styles/globals.css';
import { ReactElement } from 'react';
import { MainMenu } from '@/components/menus/MainMenu';
import { AppProps } from "next/app";
import { supabase } from "../../utils/supabase";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: ReactElement) => <MainMenu pagetitle={Component.pagetitle}>{page}</MainMenu>);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/auth");
        }
        if (event === "SIGNED_IN") {
          router.push("/");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
