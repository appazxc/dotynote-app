import React from 'react';

import { loadAudioUrl } from 'shared/actions/note/loadAudioUrl';
import { toaster } from 'shared/components/ui/toaster';
import { useNoteAudio } from 'shared/modules/noteAudio/useNoteAudio';
import { selectActiveAudio } from 'shared/selectors/audio/selectActiveAudio';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { saveAudioTime } from 'shared/util/audio/saveAudioTime';

export const AudioController = React.memo(() => {
  const dispatch = useAppDispatch();
  const audio = useAppSelector(selectActiveAudio);
  const { error, isPlaying, getPosition } = useNoteAudio(audio?.id);

  React.useEffect(() => {
    if (error && audio?.id && audio?.noteId) {
      dispatch(loadAudioUrl(audio.noteId, audio?.id)).then(() => {
        toaster.create({
          type: 'error',
          description: 'Error loading audio. Please try again.',
        });
      });
    }
  }, [dispatch, error, audio?.id, audio?.noteId]);

  React.useEffect(() => {
    if (!audio?.id || !isPlaying) {
      return;
    }
    
    const timer = setInterval(() => {
      saveAudioTime(audio?.id, getPosition());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch, audio?.id, isPlaying, getPosition]);

  return null;
});
