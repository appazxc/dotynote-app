import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import { useMedia } from 'shared/hooks/useMedia';
import theme from 'shared/styles/theme';

import MainProviders from './components/MainProviders';
import { Main } from './components/Main';

export default function Core () {
  const [isLargerThan768, initialized] = useMedia('(min-width: 768px)');

  if (!initialized) {
    return null;
  }

  return (
    <MainProviders>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Main isMobile={!isLargerThan768} />
    </MainProviders>
  );
}
