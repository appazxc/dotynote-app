import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import Loadable from 'shared/components/Loadable';
import { useMedia } from 'shared/hooks/useMedia';
import theme from 'shared/styles/theme';

import MainProviders from './components/MainProviders';

const MainDesktop = Loadable(() => import(/* webpackChunkName: "MainDesktop" */ 'desktop/containers/Main'));
const MainMobile = Loadable(() => import(/* webpackChunkName: "MainMobile" */ 'mobile/containers/Main'));

export default function Main () {
  const [isLargerThan768, initialized] = useMedia('(min-width: 768px)');

  if (!initialized) {
    return null;
  }

  return (
    <MainProviders>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {isLargerThan768 ? <MainDesktop /> : <MainMobile />}
    </MainProviders>
  );
}
