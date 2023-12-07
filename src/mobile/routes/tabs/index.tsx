import { ContentLoader } from 'shared/components/ContentLoader';

import { Tabs } from './Tabs';
import { RouteLoader } from 'shared/types/common/router';
import { loadSpacesAndMakeActive } from 'shared/actions/space/loadSpacesAndMakeActive';

const loader = async () => {};

const deferLoader: RouteLoader = async ({ store: { dispatch }}) => {
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
