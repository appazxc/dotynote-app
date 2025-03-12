import { AxiosError } from 'axios';
import { ZodIssue } from 'zod';

type FormError = {
  [key: string]: {
    code: string;
    message: string;
  };
}

export const parseApiError = (apiError: unknown) => {
  const error: {
    statusCode: number,
    code: string | number,
    message: string,
    fieldErrors: FormError,
  } = {
    statusCode: 400,
    code: '',
    message: 'An error has occurred',
    fieldErrors: {},
  };

  if (apiError instanceof AxiosError) {
    error.code = apiError.code || error.code;
    error.message = apiError.response?.data?.message || apiError.message || error.message;
    error.statusCode = apiError.response?.status || error.statusCode;
    error.fieldErrors = (apiError.response?.data?.errors || []).reduce((acc, item: ZodIssue) => {
      acc[item.path[0]] = {
        code: item.code,
        message: item.message,
      };
      return acc;
    }, {});
  }

  return error;
};
