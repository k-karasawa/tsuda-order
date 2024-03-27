import { useEffect } from "react";
import { useRouter } from "next/router";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import { jwtDecode } from 'jwt-decode'

type UseAuthListen = {
  supabaseClient: SupabaseClient<Database>;
};

export const useAuthListen = ({ supabaseClient }: UseAuthListen) => {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // サインインイベントの処理
        if (router.pathname.includes("/auth")) {
          const jwt = jwtDecode<{user_role: string | null}>(session.access_token);
          if (jwt.user_role === 'guest') {
            router.push('/dashboard-guest');
          } else {
            router.push('/');
          }
        }
      } else if (event === "SIGNED_OUT") {
        // サインアウトイベントの処理
        router.push('/auth');
      } else if (event === "PASSWORD_RECOVERY") {
        // パスワード回復イベントの処理
      } else if (event === "TOKEN_REFRESHED") {
        // トークン更新イベントの処理
      } else if (event === "USER_UPDATED") {
        // ユーザー更新イベントの処理
      }
    });

    return () => subscription.unsubscribe();
  }, [supabaseClient, router]);
};
