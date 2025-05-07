import { Stack, StackProps } from '@chakra-ui/react';
import React from 'react';

import { useFileUpload } from 'shared/modules/fileUpload';
import {
  selectUploadEntities,
} from 'shared/modules/fileUpload/fileUploadSelectors';
import { NoteAudio } from 'shared/modules/noteAudio/NoteAudio';
import { UploadingAudio } from 'shared/modules/noteAudio/UploadingAudio';
import { useAppSelector } from 'shared/store/hooks';
import { NoteAudioEntity } from 'shared/types/entities/NoteAudioEntity';

type Props = {
  noteId: string;
  audio: NoteAudioEntity[];
  inPost?: boolean;
} & StackProps;

export const NoteAudioFiles = React.memo((props: Props) => {
  const { noteId, audio: audioFiles, inPost, ...boxProps } = props;
  const { files } = useFileUpload();
  const uploadFiles = useAppSelector(state => 
    selectUploadEntities(state, { 
      files, 
      noteId,
      type: 'audio',
    }));

  const filteredNoteAudioFiles = React.useMemo(() => 
    audioFiles.filter(file => !file._isDeleted).sort((a, b) => a.pos - b.pos), [audioFiles]);

  const filteredNoteFileIds = React.useMemo(() => 
    filteredNoteAudioFiles.map(audio => audio.id), [filteredNoteAudioFiles]);

  const filteredUploadFiles = React.useMemo(() => {
    return uploadFiles.filter((file) => file.realId ? !filteredNoteFileIds.includes(file.realId) : true);
  }, [filteredNoteFileIds, uploadFiles]);

  const audio = React.useMemo(() => {
    return [...filteredNoteAudioFiles, ...filteredUploadFiles].sort((a, b) => a.pos - b.pos);
  }, [filteredNoteAudioFiles, filteredUploadFiles]);

  if (!filteredNoteAudioFiles.length && !filteredUploadFiles.length) {
    return null;
  }
  
  return (
    <Stack
      {...boxProps}
      gap="0"
      onClick={(event) => event.stopPropagation()}
    >
      {audio.map((audio) => {
        if ('fileId' in audio) {
          return (
            <UploadingAudio
              key={audio.fileId}
              id={audio.fileId}
              filename={audio.filename}
            />
          );
        }

        return (
          <NoteAudio
            key={audio.id}
            noteId={noteId}
            audioId={audio.id}
          />
        );
      })}
    </Stack>
  );
});
