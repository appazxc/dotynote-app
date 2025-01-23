import { Stack, StackProps } from '@chakra-ui/react';
import React from 'react';

import { NoteFile } from 'shared/components/NoteAudioFiles/NoteFile';
import { UploadingFile } from 'shared/components/NoteAudioFiles/UploadingFile';
import { useFileUpload } from 'shared/modules/fileUpload';
import {
  selectUploadEntities,
} from 'shared/modules/fileUpload/fileUploadSelectors';
import { useAppSelector } from 'shared/store/hooks';
import { NoteAudioEntity } from 'shared/types/entities/NoteAudioEntity';

type Props = {
  noteId: number,
  hasControls?: boolean,
  isDisabled?: boolean,
  audio: NoteAudioEntity[],
  inPost?: boolean,
  size?: 'sm' | 'md',
} & StackProps;

export const NoteAudioFiles = React.memo((props: Props) => {
  const { noteId, hasControls, audio: audioFiles, size, isDisabled, inPost, ...boxProps } = props;
  const { files } = useFileUpload();

  const filteredNoteAudioFiles = React.useMemo(() => audioFiles
    .filter(file => !file._isDeleted)
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
      gap="2"
      onClick={(e) => {
        if (!isDisabled) {
          e.stopPropagation();
        }
      }}
    >
      {filteredNoteAudioFiles.map((noteAudio) => {
        return (
          <NoteFile
            key={noteAudio.id}
            noteId={noteId}
            id={noteAudio.id}
            filename={noteAudio.filename}
            fileSize={noteAudio.size}
            size={size}
            url={noteAudio.url}
            isDisabled={isDisabled}
          />
        );
      })}
      {filteredUploadFiles.map((uploadFile) => {
        return (
          <UploadingFile
            key={uploadFile.fileId}
            filename={uploadFile.file.name}
            fileSize={uploadFile.file.size}
            progress={uploadFile.progress}
            size={size}
          />
        );
      })}
    </Stack>
  );
});
