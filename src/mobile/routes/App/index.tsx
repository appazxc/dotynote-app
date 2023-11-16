import React from 'react';
import ContentLoader from 'shared/components/ContentLoader';
import { RouteLoader } from 'shared/types/common/router';

import { App } from './App';
import { queryClient } from 'shared/api/queryClient';

const loader: RouteLoader = async (args) => {

};

const deferLoader = async () => {
  try {
    const data = await queryClient.fetchQuery({ queryKey, queryFn })
  } catch (error) {
    console.log(error)
  }
};

export default async function() {
  return {
    Component: App,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
