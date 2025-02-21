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
  noteId: number;
  hasControls?: boolean;
  isDisabled?: boolean;
  audio: NoteAudioEntity[];
  inPost?: boolean;
  size?: 'sm' | 'md';
} & StackProps;

export const NoteAudioFiles = React.memo((props: Props) => {
  const { noteId, hasControls, audio: audioFiles, size, isDisabled, inPost, ...boxProps } = props;
  const { files } = useFileUpload();

  const filteredNoteAudioFiles = React.useMemo(() => audioFiles
    .filter(file => !file._isDeleted).sort((a, b) => a.pos - b.pos)
  , [audioFiles]);

  const filteredNoteFileIds = React.useMemo(() => {
    return filteredNoteAudioFiles.map(audio => audio.id);
  }, [filteredNoteAudioFiles]);

  const uploadFiles = useAppSelector(state => 
    selectUploadEntities(state, { 
      files, 
      noteId,
      type: 'audio',
    }));

  const filteredUploadFiles = React.useMemo(() => {
    return uploadFiles.filter((file) => file.realId ? !filteredNoteFileIds.includes(file.realId) : true);
  }, [filteredNoteFileIds, uploadFiles]);

  if (!filteredNoteAudioFiles.length && !filteredUploadFiles.length) {
    return null;
  }
  
  return (
    <Stack
      {...boxProps}
      gap="0"
      onClick={(e) => {
        if (!isDisabled) {
          e.stopPropagation();
        }
      }}
    >
      {filteredNoteAudioFiles.map((noteAudio) => {
        return (
          <NoteAudio
            key={noteAudio.id}
            noteId={noteId}
            audioId={noteAudio.id}
          />
        );
      })}
      {filteredUploadFiles.map((uploadFile) => {
        return (
          <UploadingAudio
            key={uploadFile.fileId}
            id={uploadFile.fileId}
            filename={uploadFile.file.name}
            fileSize={uploadFile.file.size}
            size={size}
          />
        );
      })}
    </Stack>
  );
});
