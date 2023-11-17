import Routes from 'desktop/routes';
import * as React from 'react';
import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/store/hooks';
import ContentLoader from 'shared/components/ContentLoader';

const fallback = { fallback: <ContentLoader /> };

const App = Loadable(
  () => import(/* webpackChunkName: "AppPage" */ 'desktop/modules/space'), 
  fallback
);

function Main() {
  const isAppOpen = useAppSelector(state => state.app.isOpen);

  return (
    <>
      <Routes />
      {isAppOpen && <App />}
    </>
  );
}

export default React.memo(Main);
