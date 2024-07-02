import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // Specify a staleTime to only fetch when the data is older than a certain amount of time
      staleTime: 1000 * 60 * 100,
      gcTime: 1000 * 60 * 100, // 100 minutes
      retry(failureCount, error) {
        const axiosError = error as AxiosError;

        const errorCode = axiosError?.response?.status;

        if (failureCount <= 3 && errorCode === 500 || errorCode === 408) {
          return true;
        }

        return false;
      },
    },
  },
});
