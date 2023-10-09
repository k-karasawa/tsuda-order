import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLookupTables() {
  const { data, error } = useSWR('/api/lookupTablesAPI', fetcher);

  return {
    lookupTables: data,
    isLoading: !error && !data,
    isError: error,
  };
}
