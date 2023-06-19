import Pages from 'desktop/pages';
import * as React from 'react';
import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/state/hooks';

const App = Loadable(() => import(/* App */ 'desktop/modules/App'));

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
