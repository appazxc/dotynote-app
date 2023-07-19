import Routes from 'desktop/routes';
import * as React from 'react';
import Loadable from 'shared/components/Loadable';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import PageLoader from 'shared/components/PageLoader';
import { fetchMe } from 'shared/store/slices/authSlice';

const fallback = { fallback: <PageLoader /> };

const App = Loadable(() => import(/* webpackChunkName: "AppPage" */ 'desktop/modules/App'), fallback);

function Main() {
  const dispatch = useAppDispatch();
  const isAppOpen = useAppSelector(state => state.app.isOpen);

  React.useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <>
      <Routes />
      {isAppOpen && <App />}
    </>
  );
}

export default React.memo(Main);
