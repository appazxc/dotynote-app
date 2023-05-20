import {
  Box
} from '@chakra-ui/react';
import * as React from 'react';

import Providers from './components/Providers';

function Main () {
  return (
    <Providers>
      <Box textAlign="center" fontSize="xl">
        mobile
      </Box>
    </Providers>
  );
}

export default Main;
