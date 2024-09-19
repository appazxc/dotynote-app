import { AxiosError } from 'axios';

export const parseApiError = (err: unknown) => {
  const error = {
    statusCode: 400,
    code: '',
    message: 'An error has occurred',
  };

  if (err instanceof AxiosError) {
    error.code = err.code || error.code;
    error.message = err.response?.data?.message;
    error.statusCode = err.response?.status || error.statusCode;
  }

  return error;
};
