import { useMutation } from '@tanstack/react-query';

import { DeleteAttachmentParams } from 'shared/actions/note/deleteNoteAttachmentFactory';
import { deleteNoteImage } from 'shared/actions/note/deleteNoteImage';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const useDeleteNoteImage = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: DeleteAttachmentParams) => {
      return dispatch(deleteNoteImage(data));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'info',
      });
    },
  });
};
