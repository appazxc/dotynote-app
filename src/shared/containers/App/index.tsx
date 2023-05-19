import * as React from 'react';
import {
  Spinner
} from '@chakra-ui/react';
import { useMedia } from 'shared/hooks/useMedia';

const AppDesktop = React.lazy(() => import(/* webpackChunkName: "AppDesktop" */ 'desktop/containers/App'));
const AppMobile = React.lazy(() => import(/* webpackChunkName: "AppMobile" */ 'mobile/containers/App'));

export function App () {
  const [isLargerThan768, setted] = useMedia('(min-width: 768px)');

  if (!setted) {
    return null;
  }

  return (
    <React.Suspense fallback={<Spinner />}>
      {isLargerThan768 ? <AppDesktop /> : <AppMobile />}
    </React.Suspense>
  );
}
