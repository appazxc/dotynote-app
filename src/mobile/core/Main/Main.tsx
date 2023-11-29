import Routes from 'mobile/routes';
import * as React from 'react';
import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/store/hooks';
import { ContentLoader } from 'shared/components/ContentLoader';

const fallback = { fallback: <ContentLoader /> };

const Space = Loadable(() => import('mobile/modules/space'), fallback);

export const Main = () => {
  const isAppOpen = useAppSelector(state => state.app.isOpen);

  return (
    <>
      <Routes />
      {isAppOpen && <Space />}
    </>
  );
};