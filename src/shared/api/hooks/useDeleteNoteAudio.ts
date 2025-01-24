import { useMutation } from '@tanstack/react-query';

import { DeleteAttachmentParams } from 'shared/actions/note/deleteNoteAttachmentFactory';
import { deleteNoteAudio } from 'shared/actions/note/deleteNoteAudio';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const useDeleteNoteAudio = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: DeleteAttachmentParams) => {
      return dispatch(deleteNoteAudio(data));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'info',
      });
    },
  });
};
