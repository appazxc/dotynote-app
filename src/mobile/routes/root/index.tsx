import {
  Outlet,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { GlobalDialogs } from 'shared/components/GlobalDialogs';
import config from 'shared/config';

export const root = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <GlobalDialogs />
      {config.devtools.router && <TanStackRouterDevtools />}
    </>
  ),
});