import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks';
import { useSessionInfo } from '@/hooks/useSessionInfo';
import { jwtDecode } from 'jwt-decode';

export const useLoginUser = () => {
  const [userInfo, setUserInfo] = useState<{ name: string; role: string | null }>({ name: '', role: null });
  const supabase = useSupabaseClient();
  const session = useSessionInfo();
  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userEmail) {
        const { data, error } = await supabase
          .from('login_users')
          .select('name')
          .eq('email', userEmail)
          .single();

        if (error) {
          console.error('ユーザー情報の取得に失敗しました', error);
        } else {
          // JWTからroleを取得
          const jwt = jwtDecode<{ user_role: string | null }>(session.access_token);
          setUserInfo({ name: data.name ?? '', role: jwt.user_role });
        }
      } else {
        setUserInfo({ name: '', role: null });
      }
    };

    fetchUserInfo();
  }, [userEmail, supabase, session]);

  return userInfo;
};
