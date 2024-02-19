import { useSupabaseClient } from '@/hooks/useSupabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import styles from '@/styles/pages/auth.module.scss';

const AuthPage = () => {
  const supabaseClient = useSupabaseClient();
  return (
    <Auth
      supabaseClient={supabaseClient}
      appearance={{
        theme: ThemeSupa,
        className: {
          container: styles['loginpage-container']
        },
        style: {}
      }}
      providers={[]}
    />
  );
};

export default AuthPage;
