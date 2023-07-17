import { AxiosError } from 'axios';

export const getApiError = (err: unknown) => {
  let error = 'An error has occurred';

  if (err instanceof AxiosError) {
    error = err.response?.data?.message || error;
  }

  return error;
};
