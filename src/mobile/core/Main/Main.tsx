import * as React from 'react';

import Loadable from 'shared/components/Loadable';
import { Loader } from 'shared/components/Loader';
import { useAppSelector } from 'shared/store/hooks';

import Routes from 'mobile/routes';

const fallback = { fallback: <Loader /> };

const Space = Loadable(() => import('mobile/modules/space'), fallback);

export const Main = React.memo(() => {
  const isAppOpen = useAppSelector(state => state.app.isOpen);

  return (
    <>
      <Routes />
      {isAppOpen && <Space />}
    </>
  );
});