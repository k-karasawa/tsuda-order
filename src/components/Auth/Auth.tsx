import { Auth as SupabaseAuthComponent } from "@supabase/auth-ui-react";
import { supabase } from "../../../utils/supabase";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import styles from "./styles.module.css";

export const Auth = () => {
  const supabaseClient = supabase

  return (
    <SupabaseAuthComponent
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
