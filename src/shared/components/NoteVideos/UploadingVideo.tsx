import { Box } from '@chakra-ui/react';
import React from 'react';

import { api } from 'shared/api';
import { MediaProgressCircle } from 'shared/components/MediaProgressCircle';
import { useFileUpload } from 'shared/modules/fileUpload';
import { getFileUploadProgress } from 'shared/modules/fileUpload/fileUploadHelpers';
import { useUploadEntity } from 'shared/modules/fileUpload/useUploadEntity';
import { emitter } from 'shared/util/emitter';
import { invariant } from 'shared/util/invariant';

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
  
  const handleCancel = React.useCallback(async () => {
    if (uploadVideo.status === 'uploading'){
      emitter.emit(`cancelFileUpload:${uploadVideo.fileId}`);
    }

    if (uploadVideo.status === 'processing' && uploadVideo.tempId) {
      await api.post(`/upload/${uploadVideo.tempId}/cancel`, {});
      removeFiles([uploadVideo.fileId]);
    }
  }, [uploadVideo.status, uploadVideo.tempId, uploadVideo.fileId, removeFiles]);

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

  if (!uploadVideo.objectUrl) {
    return null;
  }
  
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
        src={uploadVideo.objectUrl}
      />
      <MediaProgressCircle
        progress={progress}
        min={3}
        onCancel={handleCancel}
      />
    </Box>
  );
});