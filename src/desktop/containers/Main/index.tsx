import Pages from 'desktop/routes';
import * as React from 'react';
import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/store/hooks';
import PageLoader from 'shared/components/PageLoader';

const fallback = { fallback: <PageLoader /> };

const App = Loadable(() => import(/* webpackChunkName: "AppPage" */ 'desktop/modules/App'), fallback);

function Main(props) {
  const isAppOpen = useAppSelector(state => state.app.isOpen);

  return (
    <>
      <Pages />
      {isAppOpen && <App />}
    </>
  );
}

export default React.memo(Main);
