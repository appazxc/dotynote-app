import { RouteLoader } from 'shared/types/common/router';

import { Home } from './Home';

const loader: RouteLoader = async (args) => {
  return null;
};

export default async function() {
  return {
    Component: Home,
    loader,
  };
}
