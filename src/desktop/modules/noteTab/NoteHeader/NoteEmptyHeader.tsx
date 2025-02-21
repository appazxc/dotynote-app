import { Box } from '@chakra-ui/react';
import React from 'react';

import { headerHeight } from './constants';

export const NoteEmptyHeader = () => {
  return (
    <Box h={headerHeight} />
  );
};
