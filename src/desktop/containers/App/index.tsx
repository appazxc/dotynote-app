import * as React from 'react';
import {
  Box
} from '@chakra-ui/react';

import Providers from './components/Providers';

function App () {
  return (
    <Providers>
      <Box textAlign="center" fontSize="xl">
        desktop
      </Box>
    </Providers>
  );
}

export default App;
