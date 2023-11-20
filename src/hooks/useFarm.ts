import useSWR from 'swr'
import { supabase } from '../../utils/supabase'
import type { FarmType } from '../types/types'

const fetchFarm = async (): Promise<FarmType[]> => {
  const response = await supabase.from('farm').select('id, name, sort, prefix').order('sort', { ascending: true })

  if (response.error) {
    throw response.error
  }

  return response.data
}

export const useFarm = () => {
  const { data, error } = useSWR('farm', fetchFarm)

  return {
    data,
    loading: !error && !data,
    error,
    refetchFarm: fetchFarm,
  }
}
