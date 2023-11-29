import { ContentLoader } from 'shared/components/ContentLoader';

import { App } from './App';
import { deferLoader } from 'shared/routes/app/deferLoader';

export default async function() {
  return {
    Component: App,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
