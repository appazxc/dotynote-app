import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import { MediaProgressCircle } from 'shared/components/MediaProgressCircle';
import { getFileUploadProgress } from 'shared/modules/fileUpload/fileUploadHelpers';
import { selectUploadFileEntity } from 'shared/modules/fileUpload/fileUploadSelectors';
import { useAppSelector } from 'shared/store/hooks';
import { emitter } from 'shared/util/emitter';
import { formatTime } from 'shared/util/formatTime';
import { invariant } from 'shared/util/invariant';
import { splitFileName } from 'shared/util/splitFileName';

type Props = {
  id: string;
  filename: string;
}

export const UploadingAudio = React.memo(({ id, filename }: Props) => {
  const uploadAudio = useAppSelector(state => selectUploadFileEntity(state, id));

  invariant(uploadAudio, 'Uploading audio is missing');

  const progress = getFileUploadProgress(uploadAudio);
  const { status, duration } = uploadAudio;
  const isError = status === 'error';

  const handleCancel = React.useCallback(() => {
    emitter.emit(`cancelFileUpload:${uploadAudio.fileId}`);
  }, [uploadAudio.fileId]);

  const { name } = splitFileName(filename);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap="3"
      p="2"
      pb="3"
    >
      <Box
        position="relative"
        w="40px"
        h="40px"
      >
        <MediaProgressCircle
          progress={progress}
          min={isError ? 0 : 3}
          iconColor={isError ? 'red.300' : undefined}
          bg="gray.800"
          size="2sm"
          onCancel={handleCancel}
        />
      </Box>
      <Box>
        <Text display="block">{name}</Text>
        <Text fontSize="xs" color="gray.400">{formatTime(duration)}</Text>
      </Box>
    </Box>
  );
});