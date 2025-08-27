import { Box } from '@chakra-ui/react';
import React from 'react';

import { SpaceAudioWidget } from 'desktop/modules/space/components/SpaceAudioWidget';
import { DotHeaderButton } from 'desktop/modules/space/components/SpaceLayout/DotHeaderButton';
import { SpaceHeaderMenu } from 'desktop/modules/space/components/SpaceLayout/SpaceHeaderMenu';
import { SpaceTabs } from 'desktop/modules/space/components/SpaceLayout/SpaceTabs';

export const SpaceHeader = React.memo(() => {
  return (
    <>
      <Box
        w="full"
        px="2"
        py="2"
        display="flex"
        alignItems="center"
        flexShrink="0"
      >
        <Box flexGrow="1" overflow="hidden">
          <Box
            display="flex"
            alignItems="center"
            flexGrow="1"
          >
            <DotHeaderButton />
            <Box mx="2" color="gray.200">|</Box>
            <Box flexGrow="1" overflow="hidden">
              <SpaceTabs />
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="stretch"
          justifyContent="space-between"
          ml="1"
          flexShrink="0"
          gap="2"
        >
          <SpaceAudioWidget />
          <SpaceHeaderMenu />
        </Box>
      </Box>
    </>
  );
});
