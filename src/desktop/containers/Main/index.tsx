import Pages from 'desktop/pages';
import * as React from 'react';
import Providers from './components/Providers';

const App = React.lazy(() => import(/* App */ 'desktop/modules/App'));

function Main () {
  return (
    <Providers>
      <Pages />
      {false && <App />}
    </Providers>
  );
}

export default Main;
