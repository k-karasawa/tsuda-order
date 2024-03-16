import { useEffect, useState } from 'react';
import { useSupabaseClient } from "@/hooks";
import { Session } from '@supabase/supabase-js';

export const useSessionInfo = () => {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return session;
};
