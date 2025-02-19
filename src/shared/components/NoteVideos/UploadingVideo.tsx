import { AbsoluteCenter, Box, Center, ProgressCircle } from '@chakra-ui/react';
import React from 'react';

import { api } from 'shared/api';
import { FileSnippet } from 'shared/components/NoteFiles/FileSnippet';
import { ProgressCircleRing, ProgressCircleRoot } from 'shared/components/ui/progress-circle';
import { useFileUpload } from 'shared/modules/fileUpload';
import { getFileUploadProgress } from 'shared/modules/fileUpload/fileUploadHelpers';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { useUploadEntity } from 'shared/modules/fileUpload/useUploadEntity';
import { useAppSelector } from 'shared/store/hooks';
import { emitter } from 'shared/util/emitter';
import { formatFileSize } from 'shared/util/formatFileSize';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  fileId: string,
  width: number,
  height: number,
}

export const UploadingVideo = React.memo((props: Props) => {
  const { fileId, width, height } = props;
  const uploadVideo = useUploadEntity(fileId);
  const { removeFiles } = useFileUpload();

  invariant(uploadVideo, 'Uploading file is missing');

  const progress = getFileUploadProgress(uploadVideo);
  
  const options = React.useMemo(() => {
    return [
      ...uploadVideo.status === 'uploading' ? [{
        label: 'Cancel',
        onClick: () => {
          emitter.emit(`cancelFileUpload:${uploadVideo.fileId}`);
        },
      }] : [],
      ...uploadVideo.status === 'processing' && uploadVideo.tempId ? [{
        label: 'Cancel',
        onClick: async () => {
          await api.post(`/upload/${uploadVideo.tempId}/cancel`, {});
          removeFiles([uploadVideo.fileId]);
        },
      }] : [],
      ...uploadVideo.status === 'error' ? [
        {
          label: 'Remove',
          onClick: () => {
            removeFiles([uploadVideo.fileId]);
          },
        },
      ] : [],
    ];
  }, [uploadVideo.status, uploadVideo.fileId, uploadVideo.tempId, removeFiles]);

  return (
    <Box
      position="relative"
      w={width}
      h={height}
      borderRadius="md"
      overflow="hidden"
    >
      <video
        controls={false}
        width={width}
        height={height}
        src={uploadVideo.objectUrl!}
      />
      <AbsoluteCenter>
        <ProgressCircleRoot
          size="sm"
          value={progress}
          colorPalette="gray"
          animation={'spin 2s linear infinite'}
        >
          <ProgressCircleRing css={{ '--thickness': '2px' }} />
        </ProgressCircleRoot>
      </AbsoluteCenter>
    </Box>
  );
});