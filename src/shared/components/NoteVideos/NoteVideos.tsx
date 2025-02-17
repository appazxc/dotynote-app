import { Stack, StackProps } from '@chakra-ui/react';
import React from 'react';

import { NoteVideo } from 'shared/components/NoteVideos/NoteVideo';
import { UploadingVideo } from 'shared/components/NoteVideos/UploadingVideo';
import { useFileUpload } from 'shared/modules/fileUpload';
import {
  selectUploadEntities,
} from 'shared/modules/fileUpload/fileUploadSelectors';
import { useAppSelector } from 'shared/store/hooks';
import { NoteVideoEntity } from 'shared/types/entities/NoteVideoEntity';

type Props = {
  noteId: number,
  hasControls?: boolean,
  videos: NoteVideoEntity[],
  inPost?: boolean,
  size?: 'sm' | 'md',
} & StackProps;

export const NoteVideos = React.memo((props: Props) => {
  const { noteId, hasControls, videos: noteVideos, size, inPost, ...boxProps } = props;
  const { files } = useFileUpload();

  const filteredNoteFiles = React.useMemo(() => 
    noteVideos.filter(file => !file._isDeleted).sort((a, b) => a.pos - b.pos), [noteVideos]);
  const filteredNoteFileIds = React.useMemo(() => filteredNoteFiles.map(file => file.id), [filteredNoteFiles]);

  const uploadFiles = useAppSelector(state => 
    selectUploadEntities(state, { 
      files, 
      noteId,
      type: 'video',
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
    >
      {filteredNoteFileIds.map((id) => {
        return (
          <NoteVideo
            key={id}
            noteId={noteId}
            id={id}
            size={size}
          />
        );
      })}
      {filteredUploadFiles.map((uploadFile) => {
        return (
          <UploadingVideo
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
