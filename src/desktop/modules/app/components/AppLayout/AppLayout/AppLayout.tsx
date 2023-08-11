import { Box, Progress } from '@chakra-ui/react';
import React from 'react';

import { AppLayoutHeader } from '../AppLayoutHeader';
import { useAppSelector } from 'shared/store/hooks';

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
      <Box
        bg="red.100"
        flexGrow="1"
        overflowX="hidden"
        overflowY="scroll"
      >
        {children}
      </Box>
    </Box>
  );
};
