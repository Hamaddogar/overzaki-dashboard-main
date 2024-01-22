import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { endpoints, postFetcher } from 'src/utils/axios';
import axios from 'axios';

// ----------------------------------------------------------------------

export function useSearchLayout(query: string | undefined) {
  const body = {
    id: query,
  };
  const { data, error } = useSWR({ url: endpoints.layout, body }, postFetcher);

  const memoizedValue = useMemo(
    () => ({
      data: data || {},
      error,
    }),
    [data, error]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function AddLayout(settings: any) {
  const body = {
    ...settings,
  };

  return axios
    .post(endpoints?.builder?.save, body)
    .then((res) => res.data)
    .catch((error) => error);
}
