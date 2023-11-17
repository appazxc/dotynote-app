import React from 'react';
import ContentLoader from 'shared/components/ContentLoader';
import { RouteLoader } from 'shared/types/common/router';

import { App } from './App';

const loader: RouteLoader = async (args) => {

};

const deferLoader: RouteLoader = async ({ store }) => {
};

export default async function() {
  return {
    Component: App,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
