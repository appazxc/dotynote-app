import { useMutation } from '@tanstack/react-query';

import { DeleteAttachmentParams } from 'shared/actions/note/deleteNoteAttachmentFactory';
import { deleteNoteVideo } from 'shared/actions/note/deleteNoteVideo';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const useDeleteNoteVideo = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: DeleteAttachmentParams) => {
      return dispatch(deleteNoteVideo(data));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'info',
      });
    },
  });
};
