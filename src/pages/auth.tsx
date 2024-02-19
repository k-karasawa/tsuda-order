import { useSupabaseClient } from '@/hooks/useSupabaseClient';
import { Auth } from '@supabase/auth-ui-react';

const AuthPage = () => {
  const supabaseClient = useSupabaseClient();
  return <Auth supabaseClient={supabaseClient} />;
}

export default AuthPage;
