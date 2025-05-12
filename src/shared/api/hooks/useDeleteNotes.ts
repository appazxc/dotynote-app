import { useMutation } from '@tanstack/react-query';

import { deleteNotes } from 'shared/actions/note/deleteNotes';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const deleteNoteMutationKey = () => ['deleteNotes'];

export const useDeleteNotes = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: deleteNoteMutationKey(),
    mutationFn: (noteIds: string[]) => {
      return dispatch(deleteNotes(noteIds));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
