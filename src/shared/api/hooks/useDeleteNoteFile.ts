import { useMutation } from '@tanstack/react-query';

import { DeleteAttachmentParams } from 'shared/actions/note/deleteNoteAttachmentFactory';
import { deleteNoteFile } from 'shared/actions/note/deleteNoteFile';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const useDeleteNoteFile = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: DeleteAttachmentParams) => {
      return dispatch(deleteNoteFile(data));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'info',
      });
    },
  });
};
