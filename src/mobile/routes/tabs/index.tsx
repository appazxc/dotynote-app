import { loadSpaces } from 'shared/actions/space/loadSpaces';
import { Loader } from 'shared/components/Loader';
import { RouteLoader } from 'shared/types/common/router';

import { Tabs } from './Tabs';

const loader = async () => {};

const deferLoader: RouteLoader = async ({ store: { dispatch } }) => {
  return await dispatch(loadSpaces());
};

export default async function() {
  return {
    Component: Tabs,
    loader,
    deferLoader,
    loaderComponent: <Loader />,
  };
}
