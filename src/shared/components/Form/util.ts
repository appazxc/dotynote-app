import { AnyFormApi, FormApi } from '@tanstack/react-form';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { parseApiError } from 'shared/helpers/api/getApiError';

export const handleFormApiErrors = (formApi: AnyFormApi, apiError: unknown) => {
  const { fieldErrors, message } = parseApiError(apiError);

  Object.entries(fieldErrors).forEach(([key, value]: any[]) => {
    formApi.setFieldMeta(key, (prev) => ({
      ...prev,
      errorMap: {
        onServer: [value],
      },
    }));
  });

  if (!Object.keys(fieldErrors).length) {
    formApi.setErrorMap({
      onSubmit: {
        //@ts-ignore
        form: message,
      },
    });
  }
};

export const hasServerError = (errors) => {
  return !!errors.root?.serverError;
};

export const getServerErrorMessage = (errors) => {
  return errors.root?.serverError?.message;
};
