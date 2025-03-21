import React from 'react';

import { api } from 'shared/api';
import { useDeleteNoteAudio } from 'shared/api/hooks/useDeleteNoteAudio';
import { NoteAudioWidget } from 'shared/modules/noteAudio/NoteAudioWidget';
import { useNoteAudio } from 'shared/modules/noteAudio/useNoteAudio';
import { noteAudioSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { downloadFile } from 'shared/util/downloadFile';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  noteId: number;
  audioId: string;
};

export const NoteAudio = React.memo((props: Props) => {
  const { audioId, noteId } = props;
  const audio = useAppSelector(state => noteAudioSelector.getById(state, audioId));
  const { isActive, isPlaying, isLoading, seek, play, pause } = useNoteAudio(audioId);
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
    <NoteAudioWidget
      isActive={isActive}
      isLoading={isLoading}
      isPlaying={isPlaying}
      name={name}
      duration={audio.duration}
      options={options}
      onPlay={play}
      onPause={pause}
      onTrackClick={seek}
    />
  );
});
