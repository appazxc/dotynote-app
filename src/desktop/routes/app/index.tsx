import { ContentLoader } from 'shared/components/ContentLoader';
import { deferLoader } from 'shared/routes/app/deferLoader';

import { App } from './App';

export default async function() {
  return {
    Component: App,
    deferLoader,
    loaderComponent: <ContentLoader text="App" />,
  };
}
