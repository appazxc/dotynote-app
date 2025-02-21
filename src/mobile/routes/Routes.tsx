import {
  RouterProvider,
} from '@tanstack/react-router';
import * as React from 'react';

import { getNewRouterInstance } from './router';

function Routes() {
  return (
    <RouterProvider 
      router={getNewRouterInstance()} 
    />
  );
}

export default React.memo(Routes);
