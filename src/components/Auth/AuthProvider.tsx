import { supabase } from "../../../utils/supabase";
import { ReactNode, useContext, createContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

type AuthCtx = {
  session: Session;
  loading: boolean;
  setLoading: any;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  signup: ({ email, password }: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>(null);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = supabase.auth;

  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    let mounted = true;
    const currentSession = auth.getSession();
    if (mounted) {
      setSession(currentSession);
      setLoading(false);
    }

    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === "SIGNED_OUT") {
        setSession(null);
      }
    });
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error } = await auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error("Login error:", error);
      alert("ログインに失敗しました");
    }
  };

  const signup = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error } = await auth.signUp({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error("Signup error:", error);
      alert("サインアップに失敗しました");
    }
  };

  const logout = async () => {
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Logout error:", error);
      alert("ログアウトに失敗しました");
    }
  };

  const exposed = {
    session,
    loading,
    setLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={exposed}>{!loading && children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
