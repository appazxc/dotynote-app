import Routes from 'mobile/routes';
import * as React from 'react';
import Loadable from '../../../shared/components/loadable';
import { useAppSelector } from 'shared/store/hooks';
import ContentLoader from '../../../shared/components/ContentLoader';

const fallback = { fallback: <ContentLoader /> };

const App = Loadable(() => import(/* webpackChunkName: "AppPage" */ 'mobile/modules/App'), fallback);

export const Main = () => {
  const isAppOpen = useAppSelector(state => state.app.isOpen);

  return (
    <>
      <Routes />
      {isAppOpen && <App />}
    </>
  );
};