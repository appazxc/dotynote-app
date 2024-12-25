import { Box, BoxProps, Center, Float, Icon } from '@chakra-ui/react';
import React from 'react';
import { GoClock } from 'react-icons/go';
import { IoMdInformationCircle } from 'react-icons/io';

import { NoteImage } from 'shared/components/NoteImages/NoteImage';
import { ProgressCircleRing, ProgressCircleRoot } from 'shared/components/ui/progress-circle';
import { Tooltip } from 'shared/components/ui/tooltip';
import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';

type Props = {
  height: number,
  width: number,
  src: string | null,
  status: UploadFileEntity['status'],
  error: UploadFileEntity['error'],
}

export const UploadingImage = React.memo(({ height, width, src, status, error }: Props) => {
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

      {status === 'pending' && (
        <Center
          position="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
        > 
          <ProgressCircleRoot
            size="sm"
            value={null}
            colorPalette="gray"
            animation={'spin 2s linear infinite'}
          >
            <ProgressCircleRing css={{ '--thickness': '2px' }} />
          </ProgressCircleRoot>
        </Center>
      )}
      {status === 'error' && (
        <Float
          offset="15px"
          zIndex="docked"
          cursor="pointer"
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
