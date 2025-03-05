import React from 'react';
import { useScreen } from 'usehooks-ts';

import {
  DialogBackdrop,
  DialogContent,
  DialogRoot,
} from 'shared/components/ui/dialog';
import { VideoPlayer } from 'shared/components/VideoPlayer';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteVideoEntity } from 'shared/types/entities/NoteVideoEntity';
import { invariant } from 'shared/util/invariant';
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
  const { height } = useScreen();
  const isAutoFullscreen = height < 600;

  invariant(noteVideo.url, 'Note video url is missing');
  
  const handleFullScreenChange = (isFullScreen: boolean) => {
    if (!isAutoFullscreen) {
      return;
    }

    if (!isFullScreen) {
      dispatch(hideModal());
    }
  };

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
          autoPlay
          url={noteVideo.url}
          width={noteVideo.width}
          height={noteVideo.height}
          mimeType={noteVideo.mimeType}
          posterUrl={noteVideo.thumbnail.url}
          title={name}
          autoFullscreen={isAutoFullscreen}
          onFullScreenChange={handleFullScreenChange}
        /> 
      </DialogContent>
    </DialogRoot>
  );
});
