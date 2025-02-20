import { AbsoluteCenter, Box, IconButton, ProgressCircle } from '@chakra-ui/react';
import React from 'react';

import { CloseIcon } from 'shared/components/ui/icons';
import { ProgressCircleRoot } from 'shared/components/ui/progress-circle';

type Props = {
  progress: number,
  min?: number,
  onCancel?: () => void,
};

export const MediaProgressCircle = React.memo(({ progress, onCancel, min = 0 }: Props) => {
  return (
    <AbsoluteCenter>
      <Box
        bg="gray.800/40"
        display="flex"
        p="2px"
        borderRadius="full"
        position="relative"
      >
        <ProgressCircleRoot
          size="md"
          value={Math.max(min, progress)}
          colorPalette="gray"
          animation={'spin 2s linear infinite'}
        >
          <ProgressCircle.Circle css={{ '--thickness': '2px' }}>
            <ProgressCircle.Track 
              css={{ '--track-color': 'transparent' }}
            />
            <ProgressCircle.Range stroke="white" />
          </ProgressCircle.Circle>
        </ProgressCircleRoot>
        {!!onCancel && (
          <AbsoluteCenter>
            <IconButton
              variant="plain"
              color="white"
              iconSize="auto"
              onClick={onCancel}
            >
              <CloseIcon size="25px" />
            </IconButton>
          </AbsoluteCenter>
        )}
      </Box>
    </AbsoluteCenter>
  );
});
