import * as React from 'react';
import Loadable from 'shared/components/Loadable';
import { useMedia } from 'shared/hooks/useMedia';
import MainProviders from './components/MainProviders';

const MainDesktop = Loadable(React.lazy(() => import(/* webpackChunkName: "MainDesktop" */ 'desktop/containers/Main')));
const MainMobile = Loadable(React.lazy(() => import(/* webpackChunkName: "MainMobile" */ 'mobile/containers/Main')));

export default function Main () {
  const [isLargerThan768, initialized] = useMedia('(min-width: 768px)');

  if (!initialized) {
    return null;
  }

  return (
    <MainProviders>
      {isLargerThan768 ? <MainDesktop /> : <MainMobile />}
    </MainProviders>
  );
}
