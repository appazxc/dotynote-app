import React from 'react';

import {
  Outlet,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import config from 'shared/config';

export const root = createRootRoute({
  component: React.memo(() => (
    <>
      <Outlet />
      {config.devtools.tabRouter && <TanStackRouterDevtools />}
    </>
  )),
});