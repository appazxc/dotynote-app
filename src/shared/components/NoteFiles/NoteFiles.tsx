import { Stack, StackProps } from '@chakra-ui/react';
import React from 'react';

import { NoteFile } from 'shared/components/NoteFiles/NoteFile';
import { UploadingFile } from 'shared/components/NoteFiles/UploadingFile';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import {
  selectUploadEntities,
} from 'shared/modules/fileUpload/fileUploadSelectors';
import { useAppSelector } from 'shared/store/hooks';
import { NoteFileEntity } from 'shared/types/entities/NoteFileEntity';

type Props = {
  noteId: number,
  hasControls?: boolean,
  isDisabled?: boolean,
  files: NoteFileEntity[],
  inPost?: boolean,
  size?: 'sm' | 'md',
} & StackProps;

export const NoteFiles = React.memo((props: Props) => {
  const { noteId, hasControls, files: noteFiles, size, isDisabled, inPost, ...boxProps } = props;
  const { files } = useFileUpload();

  const filteredNoteFiles = React.useMemo(() => noteFiles
    .filter(file => !file._isDeleted)
  , [noteFiles]);

  const filteredNoteFileIds = React.useMemo(() => {
    return filteredNoteFiles.map(file => file.id);
  }, [filteredNoteFiles]);

  const uploadFiles = useAppSelector(state => 
    selectUploadEntities(state, { 
      files, 
      tag: buildFileTag({ zone: 'note', zoneId: noteId, type: 'file' }),
    }));

  const filteredUploadFiles = React.useMemo(() => {
    return uploadFiles.filter((file) => file.realId ? !filteredNoteFileIds.includes(file.realId) : true);
  }, [filteredNoteFileIds, uploadFiles]);

  if (!filteredNoteFiles.length && !filteredUploadFiles.length) {
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
      {filteredNoteFiles.map((noteFile) => {
        return (
          <NoteFile
            key={noteFile.id}
            noteId={noteId}
            id={noteFile.id}
            filename={noteFile.filename}
            fileSize={noteFile.size}
            size={size}
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
