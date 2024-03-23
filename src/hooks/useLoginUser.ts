import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks';
import { useSessionInfo } from '@/hooks/useSessionInfo';

export const useLoginUser = () => {
  const [userInfo, setUserInfo] = useState<{ name: string; role: string }>({ name: '', role: '' });
  const supabase = useSupabaseClient();
  const session = useSessionInfo();
  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userEmail) {
        const { data, error } = await supabase
          .from('login_users')
          .select('name, role')
          .eq('email', userEmail)
          .single();

        if (error) {
          console.error('ユーザー情報の取得に失敗しました', error);
        } else {
          setUserInfo({ name: data.name ?? '', role: data.role ?? '' });
        }
      } else {
        setUserInfo({ name: '', role: '' });
      }
    };

    fetchUserInfo();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUserInfo({ name: '', role: '' });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [userEmail, supabase]);

  return userInfo;
};
