import { Box } from '@chakra-ui/react';
import React from 'react';

import { AppLayoutHeader } from '../AppLayoutHeader';

type Props = React.PropsWithChildren<{
  showNoteMenu?: boolean
}>

export const AppLayout = ({ children, showNoteMenu }: Props) => {
  return (
    <Box w="full" h="full">
      <AppLayoutHeader showNoteMenu={showNoteMenu} />
      {children}
    </Box>
  );
};
