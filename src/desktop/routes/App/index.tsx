import PageLoader from 'shared/components/PageLoader';

import { App } from './App';
import { deferLoader } from './deferLoader';

export default async function() {
  return {
    Component: App,
    deferLoader,
    loaderComponent: <PageLoader />,
  };
}
