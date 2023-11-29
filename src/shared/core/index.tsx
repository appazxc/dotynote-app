import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import theme from 'shared/styles/theme';

import MainProviders from './components/MainProviders';
import { Main } from './components/Main';

export default function Core () {
  return (
    <MainProviders>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Main />
    </MainProviders>
  );
}
