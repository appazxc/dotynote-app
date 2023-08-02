import PageLoader from 'shared/components/PageLoader';

import { HomePage } from './HomePage';

export default async function() {
  return {
    Component: HomePage,
    loaderComponent: <PageLoader />,
  };
}
