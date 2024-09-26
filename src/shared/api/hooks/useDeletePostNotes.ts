import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { deletePostNotes } from 'shared/actions/deletePostNotes';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const deletePostNotesMutationKey = (noteId: number) => ['deletePostNotes', noteId];

export const useDeletePostNotes = (noteId: number) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationKey: deletePostNotesMutationKey(noteId),
    mutationFn: (postIds: number[]) => {
      return dispatch(deletePostNotes(noteId, postIds));
    },
    onError: (error) => {
      toast({
        description: parseApiError(error).message,
        status: 'error',
      });
    },
  });
};
