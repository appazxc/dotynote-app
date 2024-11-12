import { useMutation } from '@tanstack/react-query';

import { deletePostNotes } from 'shared/actions/deletePostNotes';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const deletePostNotesMutationKey = (noteId: number) => ['deletePostNotes', noteId];

export const useDeletePostNotes = (noteId: number) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationKey: deletePostNotesMutationKey(noteId),
    mutationFn: (postIds: number[]) => {
      return dispatch(deletePostNotes(noteId, postIds));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
