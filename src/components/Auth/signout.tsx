import { supabase } from '../../../utils/supabase';

export const signOut = async () => {
  await supabase.auth.signOut();
};
