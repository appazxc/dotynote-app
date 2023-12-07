import React from 'react';
import { ContentLoader } from 'shared/components/ContentLoader';
import { RouteLoader } from 'shared/types/common/router';

import { App } from './App';
import { deferLoader } from 'shared/routes/app/deferLoader';

const loader: RouteLoader = async (args) => {};

export default async function() {
  return {
    Component: App,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
