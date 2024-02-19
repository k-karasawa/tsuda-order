import { useEffect } from "react";
import { useRouter } from "next/router";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type UseAuthListen = {
  supabaseClient: SupabaseClient<Database>;
};

export const useAuthListen = ({ supabaseClient }: UseAuthListen) => {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        // 初期セッションの処理
      } else if (event === "SIGNED_IN") {
        // サインインイベントの処理
        if (router.pathname.includes("/auth")) {
          router.push("/");
        }
      } else if (event === "SIGNED_OUT") {
        // サインアウトイベントの処理
        router.push('/auth'); // ログインページにリダイレクト
      } else if (event === "PASSWORD_RECOVERY") {
        // パスワード回復イベントの処理
      } else if (event === "TOKEN_REFRESHED") {
        // トークン更新イベントの処理
      } else if (event === "USER_UPDATED") {
        // ユーザー更新イベントの処理
      }
    });

    return () => subscription.unsubscribe();
  }, [supabaseClient, router]); // router を依存配列に追加
};
