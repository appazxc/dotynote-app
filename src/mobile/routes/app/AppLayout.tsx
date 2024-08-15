import React from 'react';

import { Box, useTheme } from '@chakra-ui/react';

import { BrowserLocationProvider } from 'shared/components/BrowserLocationProvider';
import { BrowserRouterProvider } from 'shared/components/BrowserRouterProvider';
import { useAppSelector } from 'shared/store/hooks';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';

type Props = {
  children: React.ReactNode,
};

export const AppLayout = React.memo(({ children }: Props) => {
  const theme = useTheme();
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);

  return (
    <BrowserRouterProvider>
      <BrowserLocationProvider>
        <Box
          w="full"
          h="full"
          minW="80"
          mx="auto"
          maxW={theme.breakpoints.sm}
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
      </BrowserLocationProvider>
    </BrowserRouterProvider>
  );
});
