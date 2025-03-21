import React from 'react';

import { loadAudioUrl } from 'shared/actions/note/loadAudioUrl';
import { toaster } from 'shared/components/ui/toaster';
import { useNoteAudio } from 'shared/modules/noteAudio/useNoteAudio';
import { selectActiveAudio } from 'shared/selectors/selectActiveAudio';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

export const AudioErrorToaster = React.memo(() => {
  const dispatch = useAppDispatch();
  const audio = useAppSelector(selectActiveAudio);
  const { error } = useNoteAudio(audio?.id);

  React.useEffect(() => {
    if (error && audio?.id) {
      dispatch(loadAudioUrl(audio?.id)).then(() => {
        toaster.create({
          type: 'error',
          description: 'Error loading audio, please try again.',
        });
      });
    }
  }, [dispatch, error, audio?.id]);

  return null;
});
