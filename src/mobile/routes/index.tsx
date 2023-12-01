import * as React from 'react';
import {
  RouterProvider,
} from 'react-router-dom';

import { router } from './router';
import { ContentLoader } from 'shared/components/ContentLoader';

function Routes() {
  return (
    <RouterProvider 
      router={router}
      fallbackElement={<ContentLoader />}
    />
  );
}

export default Routes;
