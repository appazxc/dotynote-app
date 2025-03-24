import { AbsoluteCenter, Box, BoxProps, IconButton, ProgressCircle, ProgressCircleRootProps } from '@chakra-ui/react';
import React from 'react';

import { CloseIcon, DoneIcon } from 'shared/components/ui/icons';
import { ProgressCircleRoot } from 'shared/components/ui/progress-circle';

type Props = {
  progress: number;
  min?: number;
  iconColor?: string;
  onCancel?: (event: React.MouseEvent) => void;
  bg?: BoxProps['bg'];
  p?: BoxProps['p'];
  size?: ProgressCircleRootProps['size'];
};

export const MediaProgressCircle = React.memo((props: Props) => {
  const { 
    progress,
    onCancel,
    min = 0,
    iconColor = 'white',
    bg = 'gray.800/40',
    size = 'md',
  } = props;
  const isComplete = progress === 100;

  return (
    <AbsoluteCenter>
      <Box
        bg={bg}
        display="flex"
        p="2px"
        borderRadius="full"
        position="relative"
      >
        <ProgressCircleRoot
          size={size}
          value={Math.max(min, progress)}
          animation={'spin 2s linear infinite'}
        >
          <ProgressCircle.Circle>
            <ProgressCircle.Track 
              css={{ '--track-color': 'transparent' }}
            />
            <ProgressCircle.Range stroke="white" />
          </ProgressCircle.Circle>
        </ProgressCircleRoot>
        {!!onCancel && !isComplete && (
          <AbsoluteCenter>
            <IconButton
              variant="plain"
              color={iconColor}
              iconSize="auto"
              onClick={onCancel}
            >
              <CloseIcon size="25px" />
            </IconButton>
          </AbsoluteCenter>
        )}
      </Box>
      {isComplete && (
        <AbsoluteCenter>
          <IconButton
            variant="plain"
            color={iconColor}
            iconSize="auto"
          >
            <DoneIcon size="25px" />
          </IconButton>
        </AbsoluteCenter>
      )}
    </AbsoluteCenter>
  );
});
