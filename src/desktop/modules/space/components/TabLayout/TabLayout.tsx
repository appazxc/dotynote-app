import React from 'react';

import { Box } from '@chakra-ui/react';

import { ScrollProvider } from 'shared/components/ScrollProvider';
import { TabScrollRestoration } from 'shared/modules/space/components/TabScrollRestoration';

import { DefaultTabSidebar } from './DefaultTabSidebar';

type Props = {
  children: React.ReactNode,
  leftSide?: React.ReactNode,
  footer?: React.ReactNode,
  header?: React.ReactNode,
  defaultSidebar?: React.ReactNode,
  scrollRestoration?: boolean,
}

export const TabLayout = (props: Props) => {
  const { children, leftSide, header, footer, defaultSidebar, scrollRestoration = true } = props;

  return (
    <Box
      w="full"
      h="full"
      display="flex"
      position="relative"
      zIndex="0"
    >
      {leftSide || defaultSidebar && (
        <Box h="full" flexShrink="0">
          {leftSide || <DefaultTabSidebar />}
        </Box>
      )}
      <Box
        flexGrow="1"
        h="full"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Box flexShrink="0">
          {header}
        </Box>
        <Box flexGrow="1" position="relative">
          <Box
            w="full"
            h="full"
            position="absolute"
          >
            <ScrollProvider>
              {(ref) => (
                <>
                  <Box
                    ref={ref}
                    // bg="red.100"
                    w="full"
                    h="full"
                    overflowX="hidden"
                    overflowY="scroll"
                    css={{
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                    }}
                  >
                    {children}
                    {scrollRestoration && <TabScrollRestoration />}
                  </Box>
                </>
              )}
            </ScrollProvider>
          </Box>
        </Box>
        <Box
          flexShrink="0"
          position="absolute"
          w="full"
          left="0"
          bottom="0"
          background="body"
        >
          {footer}
        </Box>
      </Box>
    </Box>
  );
};
