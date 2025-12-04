import useSWR, { SWRConfiguration, KeyedMutator } from 'swr';
import axios from 'axios';

type UseApiReturn<Data> = {
  data?: Data;
  error?: unknown;
  loading: boolean;
  mutate: KeyedMutator<Data>;
  isValidating: boolean;
};

/**
 * Lightweight data fetcher based on SWR.
 * Accepts a URL (or null/undefined to skip) and returns data/error/loading.
 */
export const useApi = <Data>(
  url?: string | null,
  config?: SWRConfiguration<Data, unknown>,
): UseApiReturn<Data> => {
  const {
    data,
    error,
    mutate,
    isValidating,
  } = useSWR<Data>(
    url || null,
    async (endpoint: string) => {
      const response = await axios.get<Data>(endpoint, {
        timeout: 60_000,
      });
      return response.data;
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      ...config,
    },
  );

  const loading = Boolean(url) && !data && !error;

  return {
    data,
    error,
    loading,
    mutate,
    isValidating,
  };
};
