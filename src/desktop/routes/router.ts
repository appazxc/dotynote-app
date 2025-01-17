import {
  createRouter,
} from '@tanstack/react-router';

import { Loader } from 'shared/components/Loader';

import { app } from 'desktop/routes/app';
import { DefaultErrorComponent } from 'desktop/routes/DefaultErrorComponent';
import { DefaultNotFoundComponent } from 'desktop/routes/DefaultNotFoundComponent';
import { auth, guest } from 'desktop/routes/guards';
import { idx } from 'desktop/routes/idx';
import { login } from 'desktop/routes/login';
import { loginEmail } from 'desktop/routes/loginEmail';
import { root } from 'desktop/routes/root';
import { context } from 'desktop/routes/routerContext';

const routeTree = root.addChildren([
  guest.addChildren([idx, login, loginEmail]),
  auth.addChildren([app]), 
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
