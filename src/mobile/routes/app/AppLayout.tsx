import { Box } from '@chakra-ui/react';
import React from 'react';

import { BrowserProviders } from 'shared/components/BrowserProviders';
import { useAppSelector } from 'shared/store/hooks';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';

type Props = {
  children: React.ReactNode;
};

export const AppLayout = React.memo(({ children }: Props) => {
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);
console.log('13', );
  return (
    <BrowserProviders>
      <Box
        w="full"
        h="full"
        minW="80"
        mx="auto"
        maxW="lg"
      >
        <Box
          w="full"
          h="full"
          display="flex"
          flexDirection="column"
        >
          <Box
            flexGrow="1"
            w="full"
            overflow="hidden"
          >
            {children}
          </Box>
          {!isAdvancedEditActive && (
            <Box w="full" flexShrink="0">
              <FooterNavigation />
            </Box>
          )}
        </Box>
      </Box>
    </BrowserProviders>
  );
});
