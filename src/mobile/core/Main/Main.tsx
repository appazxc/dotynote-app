import * as React from 'react';

import { ContentLoader } from 'shared/components/ContentLoader';
import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/store/hooks';

import Routes from 'mobile/routes';

const fallback = { fallback: <ContentLoader /> };

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