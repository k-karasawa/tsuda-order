import useSWR from 'swr'
import { useSupabaseClient } from '@/hooks'
import type { FarmType } from '../types/types'

export const useFarm = () => {
  const supabase = useSupabaseClient();

  const fetchFarm = async (): Promise<FarmType[]> => {
    const response = await supabase.from('farm').select('id, name, sort, prefix').order('sort', { ascending: true })

    if (response.error) {
      throw response.error
    }

    // prefix が null の場合、空文字列 "" を設定
    return response.data.map(item => ({
      ...item,
      sort: item.sort !== null ? item.sort : 0,
      prefix: item.prefix !== null ? item.prefix : "",
    }));
  }

  const { data, error } = useSWR('farm', fetchFarm)

  return {
    data,
    loading: !error && !data,
    error,
    refetchFarm: fetchFarm,
  }
}
