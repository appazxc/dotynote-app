import PageLoader from 'shared/components/PageLoader';
import { RouteLoader } from 'shared/types/common/router';

import { App } from './App';

const loader: RouteLoader = async (args) => {

};

const deferLoader = async () => {
};

export default async function() {
  return {
    Component: App,
    loader,
    deferLoader,
    loaderComponent: <PageLoader />,
  };
}
