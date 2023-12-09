import Routes from 'desktop/routes';
import * as React from 'react';
import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/store/hooks';

const Space = Loadable(
  () => import('desktop/modules/space'), 
);

function Main() {
  const isAppOpen = useAppSelector(state => state.app.isOpen);

  return (
    <>
      <Routes />
      {isAppOpen && <Space />}
    </>
  );
}

export default React.memo(Main);
