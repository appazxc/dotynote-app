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

type Props = {
  noteId: number;
  noteVideo: NoteVideoEntity,
};

function isHorizontal(noteVideo: NoteVideoEntity) {
  return noteVideo.width > noteVideo.height;
}

export const NoteVideoModalDesktop = React.memo(({ noteVideo }: Props) => {
  const dispatch = useAppDispatch();
  console.log('noteVideo', noteVideo);
  const isVideoHorizontal = isHorizontal(noteVideo);
  console.log('dsa', isVideoHorizontal ? '600px' : '300px');
  return (
    <DialogRoot
      defaultOpen
      placement="center"
      size="full"
      motionPreset="none"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent
        alignItems="center"
        display="flex"
        justifyContent="center"
        background="transparent"
        width="fit-content"
        boxShadow="none"
        animationDuration="0"
      >
        <Box
          maxW={isVideoHorizontal ? '70vw' : '26vw'}
        >
          <VideoPlayer
            url={noteVideo.url}
            width={noteVideo.width}
            height={noteVideo.height}
            mimeType={noteVideo.mimeType}
            posterUrl={noteVideo.thumbnail.url}
          /> 
        </Box>
      </DialogContent>
    </DialogRoot>
  );
});
