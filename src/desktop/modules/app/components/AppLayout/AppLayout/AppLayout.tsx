import { Box, Progress } from '@chakra-ui/react';
import React from 'react';

import { AppLayoutHeader } from '../AppLayoutHeader';
import { useAppSelector } from 'shared/store/hooks';
import { ScrollProvider } from 'shared/components/ScrollProvider';

type Props = React.PropsWithChildren<{
  showNoteMenu?: boolean
}>

export const AppLayout = ({ children, showNoteMenu }: Props) => {
  const isLoading = useAppSelector(state => state.app.isPageLoading);

  return (
    <Box
      w="full"
      h="full"
      display="flex"
      flexDirection="column"
    >
      {isLoading && (
        <Progress
          size='xs'
          isIndeterminate
          position="absolute"
          w="full"
          left="0"
          top="0"
          colorScheme="purple"
          transitionDuration="2s"
        />
      )}
      <AppLayoutHeader showNoteMenu={showNoteMenu} />
      <ScrollProvider>
        {(ref) => (
          <Box
            ref={ref}
            bg="red.100"
            flexGrow="1"
            overflowX="hidden"
            overflowY="scroll"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none'
              },
            }}
          >
            {children}
          </Box>
        )}
      </ScrollProvider>
    </Box>
  );
};


