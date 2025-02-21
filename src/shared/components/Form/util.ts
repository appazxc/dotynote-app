import { AxiosError } from 'axios';
import pick from 'lodash/pick';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ZodIssue } from 'zod';

type CreateFormErrorsReturn = {
  [key: string]: {
    code: string;
    message: string;
  };
}

export const handleFormApiErrors = <T extends FieldValues>(form: UseFormReturn<T>, apiError: unknown) => {
  const formErrors = createFormErrors(apiError);

  const errors = pick(formErrors, Object.keys(form.formState.dirtyFields));

  Object.entries(errors).forEach(([key, value]: any[]) => {
    form.setError(key as Path<T>, {
      type: 'manual',
      message: value.message,
    });
  });
};

export const createFormErrors = (apiError: unknown): CreateFormErrorsReturn => {
  if (apiError instanceof AxiosError) {
    const errors = apiError.response?.data.errors || [];

    return errors.reduce((acc, error: ZodIssue) => {
      return {
        ...acc,
        [error.path[0]]: {
          code: error.code,
          message: error.message,
        },
      };
    }, {});
  }
  
  console.error('Unhandled createFormErrors apiError', apiError);

  return {};
};