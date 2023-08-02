import React from 'react';
import ContentLoader from 'shared/components/ContentLoader';

import { HomePage } from './HomePage';

export default function() {
  return {
    Component: HomePage,
    loaderComponent: <ContentLoader />,
  };
}
