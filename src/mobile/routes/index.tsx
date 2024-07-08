import * as React from 'react';

import {
  RouterProvider,
} from 'react-router-dom';

import { Loader } from 'shared/components/Loader';

import { router } from './router';

function Routes() {
  return (
    <RouterProvider 
      router={router}
      fallbackElement={<Loader />}
    />
  );
}

export default React.memo(Routes);
