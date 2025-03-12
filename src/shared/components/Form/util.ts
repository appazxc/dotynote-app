import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { parseApiError } from 'shared/helpers/api/getApiError';

export const handleFormApiErrors = <T extends FieldValues>(setError: UseFormSetError<T>, apiError: unknown) => {
  const { fieldErrors, message } = parseApiError(apiError);

  Object.entries(fieldErrors).forEach(([key, value]: any[]) => {
    setError(key as Path<T>, {
      type: 'manual',
      message: value.message,
    });
  });

  if (!Object.keys(fieldErrors).length) {
    setError('root.serverError', {
      message: message,
    });
  }
};

export const hasServerError = (errors) => {
  return !!errors.root?.serverError;
};

export const getServerErrorMessage = (errors) => {
  return errors.root?.serverError?.message;
};
