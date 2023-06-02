import Pages from 'desktop/pages';
import * as React from 'react';
import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/state/hooks';

const App = Loadable(React.lazy(() => import(/* App */ 'desktop/modules/App')));

function MainContent(props) {
  const isAppOpen = useAppSelector(state => state.app.isOpen);
  console.log('isAppOpen', isAppOpen);

  return (
    <div>
      isAppOpen {String(isAppOpen)}
      <Pages />
      {isAppOpen && <App />}
    </div>
  );
}

export default React.memo(MainContent);
