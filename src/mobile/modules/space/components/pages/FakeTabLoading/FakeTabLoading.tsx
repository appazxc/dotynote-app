import { Box } from '@chakra-ui/react';

import { ContentLoader } from 'shared/components/ContentLoader';

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
          <ContentLoader />
        </Box>
        <Box flexShrink="0">
          <FooterNavigation />
        </Box>
      </Box>
    </SpaceLayout>
  );
};
