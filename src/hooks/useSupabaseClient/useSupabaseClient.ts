import { useSupabaseClient as _useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/types/database.types";

export const useSupabaseClient = () => {
  const supabase = _useSupabaseClient<Database>();

  return supabase;
};
