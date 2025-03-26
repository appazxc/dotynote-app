import { Box, Float, Icon } from '@chakra-ui/react';
import React from 'react';
import { IoMdInformationCircle } from 'react-icons/io';

import { BaseImage } from 'shared/components/BaseImage';
import { MediaProgressCircle } from 'shared/components/MediaProgressCircle';
import { Tooltip } from 'shared/components/ui/tooltip';
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

  invariant(uploadFile, 'Missing upload file');

  const { status, error } = uploadFile;
  const progress = getFileUploadProgress(uploadFile);

  const handleCancel = React.useCallback(async () => {
    emitter.emit(`cancelFileUpload:${uploadFile.fileId}`);
  }, [uploadFile.fileId]);

  return src ? (
    <Box position="relative">
      <BaseImage
        height={height}
        width={width}
        src={src}
      />

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
