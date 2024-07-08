import { Loader } from 'shared/components/Loader';
import { deferLoader } from 'shared/routes/app/deferLoader';

import { App } from './App';

export default async function() {
  return {
    Component: App,
    deferLoader,
    loaderComponent: <Loader text="App" />,
  };
}
