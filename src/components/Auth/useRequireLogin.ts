import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';

export const useRequireLogin = () => {
  const session = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!session.isLoading && !session.session) {
      router.push('/auth');
    }
  }, [session, router]);
};
