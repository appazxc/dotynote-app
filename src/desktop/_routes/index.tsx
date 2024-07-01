import * as React from 'react';

import {
  RouterProvider,
} from 'react-router-dom';

import { ContentLoader } from 'shared/components/ContentLoader';

import router from './router';

function Routes() {
  return (
    <RouterProvider 
      router={router} 
      fallbackElement={<ContentLoader text={'RouterProvider'} />}
    />
  );
}

export default React.memo(Routes);
