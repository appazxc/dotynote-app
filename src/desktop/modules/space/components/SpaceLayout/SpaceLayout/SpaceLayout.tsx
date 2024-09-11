import React from 'react';

import { Box, Progress } from '@chakra-ui/react';

import { BrowserProviders } from 'shared/components/BrowserProviders';
import { useAppInProgress } from 'shared/modules/loaders/loadersSlice';
import { useAppSelector } from 'shared/store/hooks';

import { SpaceHeader } from '../SpaceHeader';

type Props = React.PropsWithChildren<unknown>;

export const SpaceLayout = ({ children }: Props) => {
  const isLoading = useAppSelector((state) => state.app.isPageLoading);
  const isAppInProgress = useAppInProgress();

  return (
    <BrowserProviders>
      <Box
        w="full"
        h="full"
        display="flex"
        flexDirection="column"
      >
        <SpaceHeader />
        {(isLoading || isAppInProgress) && (
          <Progress
            isIndeterminate
            size="xs"
            position="absolute"
            w="full"
            left="0"
            top="0"
            colorScheme="purple"
            transitionDuration="2s"
          />
        )}
        <Box
          w="full"
          flexGrow={1}
          overflow="hidden"
        >
          {children}
        </Box>
      </Box>
    </BrowserProviders>
  );
};