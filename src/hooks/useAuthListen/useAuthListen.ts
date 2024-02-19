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
        // handle initial session
      } else if (event === "SIGNED_IN") {
        if (router.pathname.includes("/auth")) {
          router.push("/");
        }
        // handle sign in event
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseClient]);
};
