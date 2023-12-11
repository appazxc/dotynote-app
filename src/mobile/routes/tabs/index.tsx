import { loadSpacesAndMakeActive } from 'shared/actions/space/loadSpacesAndMakeActive';
import { ContentLoader } from 'shared/components/ContentLoader';
import { RouteLoader } from 'shared/types/common/router';

import { Tabs } from './Tabs';

const loader = async () => {};

const deferLoader: RouteLoader = async ({ store: { dispatch } }) => {
  await dispatch(loadSpacesAndMakeActive());
};

export default async function() {
  return {
    Component: Tabs,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
