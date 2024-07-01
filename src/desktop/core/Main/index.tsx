import * as React from 'react';

import { ContentLoader } from 'shared/components/ContentLoader';
import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/store/hooks';

import Routes from 'desktop/_routes';

const Space = Loadable(
  () => import('desktop/modules/space'),
  { fallback: <ContentLoader text="Loadable Space desktop" /> } 
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
