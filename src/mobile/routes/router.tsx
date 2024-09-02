import {
  createRouter,
} from '@tanstack/react-router';

import { Loader } from 'shared/components/Loader';

import { app } from 'mobile/routes/app';
import { DefaultErrorComponent } from 'mobile/routes/DefaultErrorComponent';
import { DefaultNotFoundComponent } from 'mobile/routes/DefaultNotFoundComponent';
import { auth, guest } from 'mobile/routes/guards';
import { idx } from 'mobile/routes/idx';
import { login } from 'mobile/routes/login';
import { loginEmail } from 'mobile/routes/loginEmail';
import { root } from 'mobile/routes/root';
import { context } from 'mobile/routes/routerContext';

const routeTree = root.addChildren([
  auth.addChildren([app]), 
  guest.addChildren([idx, login, loginEmail]),
]);

const createNewRouter = () => createRouter({ 
  routeTree,
  context,
  defaultPendingMinMs: 0,
  defaultPreloadStaleTime: Infinity,
  defaultNotFoundComponent: DefaultNotFoundComponent,
  defaultErrorComponent: DefaultErrorComponent,
  defaultPendingComponent: Loader,
});

let router = createNewRouter();

export const getNewRouterInstance = () => {
  return router = createNewRouter();
};

export type Router = typeof router;

export { router };
