import ContentLoader from 'shared/components/ContentLoader';

import { App } from './App';
import { deferLoader } from './deferLoader';

export default async function() {
  return {
    Component: App,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
