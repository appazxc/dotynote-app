import * as React from 'react';
import {
  RouterProvider,
} from 'react-router-dom';

import router from './router';

function Routes() {
  return (
    <RouterProvider 
      router={router} 
    />
  );
}

export default React.memo(Routes);
