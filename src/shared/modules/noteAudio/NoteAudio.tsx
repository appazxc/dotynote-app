import { Box } from '@chakra-ui/react';
import React from 'react';

import { api } from 'shared/api';
import { useDeleteNoteAudio } from 'shared/api/hooks/useDeleteNoteAudio';
import { useAudio } from 'shared/modules/noteAudio/AudioProvider';
import { NoteAudioSnippet } from 'shared/modules/noteAudio/NoteAudioSnippet';
import { audioSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { downloadFile } from 'shared/util/downloadFile';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  noteId: number,
  audioId: string,
};

export const NoteAudio = React.memo((props: Props) => {
  const { audioId, noteId } = props;
  const { isPlaying, activeAudioId, playAudio, startAudio, pauseAudio, currentTime } = useAudio();
  const audio = useAppSelector(state => audioSelector.getById(state, audioId));
  const isActive = activeAudioId === audioId;

  const { mutate, isPending } = useDeleteNoteAudio();

  invariant(audio, 'Missing audio');

  const handleFileDownload = async () => {
    const fileUrl = await api.get<string>(`/notes/audio/${audioId}/signed-url`);

    downloadFile(fileUrl);
  };
  
  const { name } = splitFileName(audio.filename);
  
  const options = [
    { 
      label: 'Download', 
      onClick: () =>{
        handleFileDownload();
      }, 
    },
    { 
      label: 'Delete', 
      onClick: () =>{
        if (isPending) {
          return;
        }

        mutate({
          noteId,
          entityId: audioId,
        });
      }, 
    },
  ];

  return (
    <NoteAudioSnippet
      isPlaying={isPlaying && isActive}
      name={name}
      duration={audio.duration}
      currentTime={isActive ? currentTime : null}
      options={options}
      onPlay={(startTime) => {
        if (isActive) {
          playAudio({ startTime });
          return;
        }

        startAudio({
          audioId,
          startTime,
        });
      }}
      onPause={() => pauseAudio()}
      onProgressClick={(startTime) => {
        if (isActive) {
          playAudio({ startTime });
          return;
        }
      }}
    />
  );
});
