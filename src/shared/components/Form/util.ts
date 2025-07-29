import { AnyFormApi } from '@tanstack/react-form';

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
      onServer: {
        form: message,
      },
    });
  }
};

export const resetFormErrors = (formApi: AnyFormApi) => {
  formApi.setErrorMap({
    onServer: undefined,
  });
};

export const hasServerError = (errors) => {
  return !!errors.root?.serverError;
};

export const getServerErrorMessage = (errors) => {
  return errors.root?.serverError?.message;
};
