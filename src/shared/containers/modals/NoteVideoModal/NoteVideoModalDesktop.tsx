import { Box } from '@chakra-ui/react';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from 'shared/components/ui/dialog';
import { VideoPlayer } from 'shared/components/VideoPlayer';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteVideoEntity } from 'shared/types/entities/NoteVideoEntity';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  noteId: number;
  noteVideo: NoteVideoEntity,
};

function isHorizontal(noteVideo: NoteVideoEntity) {
  return noteVideo.width > noteVideo.height;
}

export const NoteVideoModalDesktop = React.memo(({ noteVideo }: Props) => {
  const dispatch = useAppDispatch();

  const isVideoHorizontal = isHorizontal(noteVideo);
  const { name } = splitFileName(noteVideo.filename);

  return (
    <DialogRoot
      defaultOpen
      placement="center"
      size={isVideoHorizontal ? 'lg' : 'xs'}
      motionPreset="none"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent>
        <VideoPlayer
          url={noteVideo.url}
          width={noteVideo.width}
          height={noteVideo.height}
          mimeType={noteVideo.mimeType}
          posterUrl={noteVideo.thumbnail.url}
          title={name}
        /> 
      </DialogContent>
    </DialogRoot>
  );
});
