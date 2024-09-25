import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { parseApiError } from 'shared/helpers/api/getApiError';

import { entityApi } from '../entityApi';

export const deleteNoteMutationKey = () => ['deleteNote'];

export const useDeleteNotes = (id: number | number[]) => {
  const toast = useToast();

  return useMutation({
    mutationKey: deleteNoteMutationKey(),
    mutationFn: () => {
      return entityApi.note.deleteMany(Array.isArray(id) ? id : [id], { deleteFlag: true });
    },
    onError: (error) => {
      toast({
        description: parseApiError(error).message,
        status: 'error',
      });
    },
  });
};
