import React from 'react';

import { Box } from '@chakra-ui/react';

import { MainHeaderButton } from 'desktop/modules/space/components/SpaceLayout/MainHeaderButton';
import { MenuHeaderButton } from 'desktop/modules/space/components/SpaceLayout/MenuHeaderButton';
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
            <MainHeaderButton />
            <Box mx="2" color="gray">|</Box>
            <Box flexGrow="1" overflow="hidden">
              <SpaceTabs />
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          ml="1"
          flexShrink="0"
        >
          <MenuHeaderButton />
        </Box>
      </Box>
    </>
  );
});
