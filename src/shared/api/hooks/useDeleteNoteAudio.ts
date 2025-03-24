import { useMutation } from '@tanstack/react-query';

import { DeleteAttachmentParams } from 'shared/actions/note/deleteNoteAttachmentFactory';
import { deleteNoteAudio } from 'shared/actions/note/deleteNoteAudio';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useNoteAudio } from 'shared/modules/noteAudio/useNoteAudio';
import { selectActiveAudioId } from 'shared/selectors/audio/selectActiveAudio';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

export const useDeleteNoteAudio = () => {
  const dispatch = useAppDispatch();
  const activeAudioId = useAppSelector(selectActiveAudioId);
  const { stop } = useNoteAudio();

  return useMutation({
    mutationFn: (data: DeleteAttachmentParams) => {
      if (activeAudioId === data.entityId) {
        stop();
      }

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
