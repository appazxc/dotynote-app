import { Box } from '@chakra-ui/react';

import { Loader } from 'shared/components/Loader';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { SpaceLayout } from 'mobile/modules/space/components/SpaceLayout';

export const FakeTabLoading = () => {
  return (
    <SpaceLayout>
      <Box
        w="full"
        h="full"
        display="flex"
        flexDirection="column"
      >
        <Box flexGrow="1">
          <Loader />
        </Box>
        <Box flexShrink="0">
          <FooterNavigation />
        </Box>
      </Box>
    </SpaceLayout>
  );
};
