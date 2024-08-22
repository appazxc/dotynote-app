import * as React from 'react';

import {
  RouterProvider,
} from '@tanstack/react-router';

import { createRouterInstance } from './router';

function Routes() {
  return (
    <RouterProvider 
      router={createRouterInstance()}
    />
  );
}

export default React.memo(Routes);
