import { Box } from '@chakra-ui/react';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { SpaceLayout } from 'mobile/modules/space/components/SpaceLayout';

export const NonActiveTab = () => {
  return (
    <SpaceLayout>
      <Box
        w="full"
        h="full"
        display="flex"
        flexDirection="column"
      >
        <Box flexGrow="1">
           no active tab
        </Box>
        <Box flexShrink="0">
          <FooterNavigation />
        </Box>
      </Box>
    </SpaceLayout>
  );
};
