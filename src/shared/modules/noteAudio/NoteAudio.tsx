import { Box } from '@chakra-ui/react';
import React from 'react';

import { pauseAudio, playAudio, PlayAudioParams, resumeAudio, startAudio } from 'shared/modules/noteAudio/audioSlice';
import { NoteAudioSnippet } from 'shared/modules/noteAudio/NoteAudioSnippet';
import { audioSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { formatTime } from 'shared/util/formatTime';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  audioId: string,
};

export const NoteAudio = React.memo((props: Props) => {
  const { audioId } = props;
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(state => state.audio.audioId === audioId);
  const currentTime = useAppSelector(state => state.audio.currentTime);
  const isPlaying = useAppSelector(state => state.audio.isPlaying && isActive);
  const audio = useAppSelector(state => audioSelector.getById(state, audioId));

  invariant(audio, 'Missing audio');

  const { name } = splitFileName(audio.filename);
  
  return (
    <Box>
      <NoteAudioSnippet
        isPlaying={isPlaying}
        name={name}
        duration={audio.duration}
        currentTime={isActive ? currentTime : null}
        onPlay={(startTime) => {
          if (isActive) {
            dispatch(playAudio({ startTime }));
            return;
          }

          dispatch(startAudio({
            audioId,
            startTime,
          }));
        }}
        onPause={() => dispatch(pauseAudio())}
      />
    </Box>
  );
});
