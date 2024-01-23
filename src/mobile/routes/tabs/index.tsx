import { loadSpaces } from 'shared/actions/space/loadSpaces';
import { ContentLoader } from 'shared/components/ContentLoader';
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
    loaderComponent: <ContentLoader />,
  };
}
