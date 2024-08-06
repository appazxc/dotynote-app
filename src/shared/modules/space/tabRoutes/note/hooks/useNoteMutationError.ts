import { Mutation, useMutationState } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import last from 'lodash/last';

import { deleteNoteMutationKey } from 'shared/api/hooks/useDeleteNote';
import { updateNoteMutationKey } from 'shared/api/hooks/useUpdateNote';
import { getTextFromZodError } from 'shared/util/api/getTextFromZodError';

const isZodIssue = (error: AxiosError<any>) => {
  return !!error?.response?.data.errors;
};

const select = (mutation: Mutation<unknown, Error, unknown, unknown>) => {
  if (!(mutation.state.error instanceof AxiosError)) {
    return null;
  }

  if (isZodIssue(mutation.state.error)) {
    return getTextFromZodError(mutation.state.error?.response?.data.errors[0]);
  }
  
  if (mutation.state.error?.response?.data.statusCode) {
    return mutation.state.error?.response?.data.message;
  }

  return null;
};

export const useNoteMutationError = (id: number) => {
  const updateErrors = useMutationState<string>({
    filters: { mutationKey: updateNoteMutationKey(id) },
    select,
  });

  const updateError = last(updateErrors);

  const deleteErrors = useMutationState<string>({
    filters: { mutationKey: deleteNoteMutationKey(id) },
    select,
  });

  const deleteError = last(deleteErrors);

  const validErrors = [updateError, deleteError].filter(Boolean);

  if (!validErrors.length) {
    return '';
  }

  return validErrors[0];
};
