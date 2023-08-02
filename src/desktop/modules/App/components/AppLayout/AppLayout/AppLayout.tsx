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
    <Box w="full" h="full">
      {isLoading && (
        <Progress
          size='xs'
          isIndeterminate
          position="absolute"
          w="full"
          left="0"
          top="0"
        />
      )}
      <AppLayoutHeader showNoteMenu={showNoteMenu} />
      {children}
    </Box>
  );
};
