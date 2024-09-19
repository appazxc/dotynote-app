import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { parseApiError } from 'shared/helpers/api/getApiError';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { entityApi } from '../entityApi';

export const updateNoteMutationKey = () => ['updateNote'];

export const useUpdateNote = () => {
  const toast = useToast();
  
  return useMutation({
    mutationKey: updateNoteMutationKey(),
    mutationFn: ({ id, data }: { id: number, data: Partial<NoteEntity> }) => {
      return entityApi.note.update(id, data);
    },
    onError: (error) => {
      toast({
        description: parseApiError(error).message,
        status: 'error',
      });
    },
  });
};
