import {
  RouterProvider,
} from '@tanstack/react-router';
import * as React from 'react';

import { getNewRouterInstance } from './router';

function Routes() {
  const router = React.useMemo(() => getNewRouterInstance(), []);

  return (
    <RouterProvider 
      router={router}
    />
  );
}

export default React.memo(Routes);
