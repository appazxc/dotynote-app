import {
  Spinner
} from '@chakra-ui/react';
import * as React from 'react';
import { useMedia } from 'shared/hooks/useMedia';

const MainDesktop = React.lazy(() => import(/* webpackChunkName: "MainDesktop" */ 'desktop/containers/Main'));
const MainMobile = React.lazy(() => import(/* webpackChunkName: "MainMobile" */ 'mobile/containers/Main'));

export default function Main () {
  const [isLargerThan768, initialized] = useMedia('(min-width: 768px)');

  if (!initialized) {
    return null;
  }

  return (
    <React.Suspense fallback={<Spinner />}>
      {isLargerThan768 ? <MainDesktop /> : <MainMobile />}
    </React.Suspense>
  );
}
