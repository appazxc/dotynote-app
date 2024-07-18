import {
  Box,
} from '@chakra-ui/react';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { DefaultTabSidebar } from '../TabLayout/DefaultTabSidebar';

import { Sidebar } from './Sidebar';

export const SettingsLayout = ({ children }) => {
  return (
    <TabLayout
      leftSide={(
        <Box display="flex" pl="2">
          <Box
            minW="200px"
            pt="2"
            flexDirection="column"
            display="flex"
          >
            <DefaultTabSidebar inline />  

            <Sidebar />
          </Box>  
        </Box>
      ) }
    >
      <Box
        maxW="md"
        px="3"
        py="6"
      >
        <Box
          maxW="md"
          mx="auto"
        >
          {children}
        </Box>
      </Box>
    </TabLayout>
  );
};