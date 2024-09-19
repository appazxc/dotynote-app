import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { parseApiError } from 'shared/helpers/api/getApiError';

import { entityApi } from '../entityApi';

export const deleteNoteMutationKey = (id: number) => ['deleteNote', id];

export const useDeleteNote = (id: number) => {
  const toast = useToast();

  return useMutation({
    mutationKey: ['deleteNote', id],
    mutationFn: () => {
      return entityApi.note.delete(id, { deleteFlag: true });
    },
    onError: (error) => {
      toast({
        description: parseApiError(error).message,
        status: 'error',
      });
    },
  });
};
