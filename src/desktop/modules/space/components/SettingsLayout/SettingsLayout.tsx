import {
  Box,
  Container,
  GridItem,
} from '@chakra-ui/react';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { DefaultTabSidebar } from '../TabLayout/DefaultTabSidebar';

import { Sidebar } from './Sidebar';

export const SettingsLayout = ({ children }) => {
  return (
    <TabLayout
      leftSide={(
        <Box display="flex" pl="2">
          <Box minW="200px" pt="2">
            <Sidebar />
          </Box>
          <DefaultTabSidebar />  
        </Box>
      ) }
    >
      <Box
        maxW="container.lg"
        py="2"
        px="3"
      >
        <Box
          maxW="container.md"
          mx="auto"
          bg="papayawhip"
        >
          {children}
        </Box>
      </Box>
    </TabLayout>
  );
};