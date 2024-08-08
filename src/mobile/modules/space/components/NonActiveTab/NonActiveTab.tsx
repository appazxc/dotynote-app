import { Box } from '@chakra-ui/react';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { TabLayout } from 'mobile/modules/space/components/TabLayout';

export const NonActiveTab = () => {
  return (
    <TabLayout footer={<FooterNavigation />}>
      <Box flexGrow="1">
        no active tab
      </Box>
    </TabLayout>
  );
};
