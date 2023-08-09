import React from 'react';
import ContentLoader from 'shared/components/ContentLoader';

import { HomePage } from './HomePage';
import { loader } from './loader';

export default function() {
  return {
    Component: HomePage,
    loader,
    // loaderComponent: <ContentLoader />,
  };
}
