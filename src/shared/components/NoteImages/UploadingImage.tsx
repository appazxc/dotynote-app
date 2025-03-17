import { Box, Center, Float, Icon } from '@chakra-ui/react';
import React from 'react';
import { GoClock } from 'react-icons/go';
import { IoMdInformationCircle } from 'react-icons/io';

import { api } from 'shared/api';
import { MediaProgressCircle } from 'shared/components/MediaProgressCircle';
import { NoteImage } from 'shared/components/NoteImages/NoteImage';
import { Tooltip } from 'shared/components/ui/tooltip';
import { useFileUpload } from 'shared/modules/fileUpload';
import { getFileUploadProgress } from 'shared/modules/fileUpload/fileUploadHelpers';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { useAppSelector } from 'shared/store/hooks';
import { emitter } from 'shared/util/emitter';
import { invariant } from 'shared/util/invariant';

type Props = {
  fileId: string;
  height: number;
  width: number;
  src: string | null;
}

export const UploadingImage = React.memo(({ fileId, height, width, src }: Props) => {
  const uploadFile = useAppSelector(state => selectUploadFileEntity(state, fileId));
  const { removeFiles } = useFileUpload();
  invariant(uploadFile, 'Missing upload file');

  const { status, error } = uploadFile;
  const progress = getFileUploadProgress(uploadFile);

  const handleCancel = React.useCallback(async () => {
    if (uploadFile.status === 'uploading'){
      emitter.emit(`cancelFileUpload:${uploadFile.fileId}`);
    }

    if (uploadFile.status === 'processing' && uploadFile.tempId) {
      await api.post(`/upload/${uploadFile.tempId}/cancel`, {});
      removeFiles([uploadFile.fileId]);
    }

    if (uploadFile.status === 'error') {
      removeFiles([uploadFile.fileId]);
    }
  }, [uploadFile.status, uploadFile.tempId, uploadFile.fileId, removeFiles]);

  return src ? (
    <Box position="relative">
      <NoteImage
        height={height}
        width={width}
        src={src}
      />

      {status === 'idle' && (
        <Center
          position="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          bg="gray.200"
          opacity="0.3"
        >
          <Icon fontSize="30px" color="black">
            <Box>
              <GoClock />
            </Box>
          </Icon>
        </Center>
      )}

      <MediaProgressCircle
        progress={progress}
        min={3}
        onCancel={(event: React.MouseEvent) => {
          event.stopPropagation();
          handleCancel();
        }}
      />

      {status === 'error' && (
        <Float
          offset="15px"
          cursor="pointer"
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
        >
          <Tooltip content={error}>
            <Icon fontSize="20px" color="red">
              <Box>
                <IoMdInformationCircle />
              </Box>
            </Icon>
          </Tooltip>
        </Float>
      )}
    </Box>
  ) : null;
});
