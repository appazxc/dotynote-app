import { useOrientation } from '@uidotdev/usehooks';
import { ScreenOrientationLockType } from '@vidstack/react';
import React from 'react';

import {
  DialogBackdrop,
  DialogContent,
  DialogRoot,
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

export const NoteVideoModalMobile = React.memo(({ noteVideo }: Props) => {
  const dispatch = useAppDispatch();
  const { name } = splitFileName(noteVideo.filename);
  const orientation = useOrientation();
  
  const handleFullScreenChange = (isFullScreen: boolean) => {
    if (!isFullScreen) {
      dispatch(hideModal());
    }
  };

  return (
    <DialogRoot
      defaultOpen
      placement="center"
      size="full"
      motionPreset="none"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent>
        <VideoPlayer
          autoFullscreen
          autoPlay
          url={noteVideo.url}
          width={noteVideo.width}
          height={noteVideo.height}
          mimeType={noteVideo.mimeType}
          posterUrl={noteVideo.thumbnail.url}
          title={name}
          fullscreenOrientation={orientation.type as ScreenOrientationLockType}
          onFullScreenChange={handleFullScreenChange}
        /> 
      </DialogContent>
    </DialogRoot>
  );
});
