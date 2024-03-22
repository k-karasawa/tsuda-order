import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@/hooks';
import { useSessionInfo } from '@/hooks/useSessionInfo';

export const useLoginUser = () => {
  const [userName, setUserName] = useState<string>('');
  const supabase = useSupabaseClient();
  const session = useSessionInfo();
  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchUserName = async () => {
      if (userEmail) {
        const { data, error } = await supabase
          .from('login_users')
          .select('name')
          .eq('email', userEmail)
          .single();

        if (error) {
          console.error('ユーザー名の取得に失敗しました', error);
        } else {
          setUserName(data.name ?? '');
        }
      }
    };

    fetchUserName();
  }, [userEmail, supabase]);

  return userName;
};
