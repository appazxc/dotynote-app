import React from 'react';

import { Loader } from 'shared/components/Loader';
import { deferLoader } from 'shared/routes/app/deferLoader';
import { RouteLoader } from 'shared/types/common/router';

import { App } from './App';

const loader: RouteLoader = async (args) => {};

export default async function() {
  return {
    Component: App,
    loader,
    deferLoader,
    loaderComponent: <Loader />,
  };
}
