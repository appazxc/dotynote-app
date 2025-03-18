import { Box, Float } from '@chakra-ui/react';
import React from 'react';
import { IoMdInformationCircle } from 'react-icons/io';

import { MediaProgressCircle } from 'shared/components/MediaProgressCircle';
import { Icon } from 'shared/components/ui/icon';
import { Tooltip } from 'shared/components/ui/tooltip';
import { getFileUploadProgress } from 'shared/modules/fileUpload/fileUploadHelpers';
import { useUploadEntity } from 'shared/modules/fileUpload/useUploadEntity';
import { emitter } from 'shared/util/emitter';
import { invariant } from 'shared/util/invariant';

type Props = {
  fileId: string;
  width: number;
  height: number;
}

export const UploadingVideo = React.memo((props: Props) => {
  const { fileId, width, height } = props;
  const uploadVideo = useUploadEntity(fileId);
  
  invariant(uploadVideo, 'Uploading file is missing');

  const progress = getFileUploadProgress(uploadVideo);
  const { status, error } = uploadVideo;
  const isError = status === 'error';

  const handleCancel = React.useCallback(async () => {
    emitter.emit(`cancelFileUpload:${uploadVideo.fileId}`);
  }, [uploadVideo.fileId]);

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
      onClick={(event) => event.stopPropagation()}
    >
      <video
        controls={false}
        width={width}
        height={height}
        src={uploadVideo.objectUrl}
      />
      <MediaProgressCircle
        progress={progress}
        min={isError ? 0 : 3}
        iconColor={isError ? 'red.300' : undefined}
        onCancel={handleCancel}
      />
      {isError && (
        <Float
          offset="15px"
          zIndex="docked"
          cursor="pointer"
        >
          <Tooltip portalled content={error}>
            <Icon fontSize="20px" color="red">
              <IoMdInformationCircle />
            </Icon>
          </Tooltip>
        </Float>
      )}
    </Box>
  );
});