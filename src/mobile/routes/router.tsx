import {
  createRouter,
} from '@tanstack/react-router';

import { Loader } from 'shared/components/Loader';

import { auth, guest } from 'mobile/routes/guards';

import { app } from './app';
import { DefaultErrorComponent } from './DefaultErrorComponent';
import { DefaultNotFoundComponent } from './DefaultNotFoundComponent';
import { idx } from './idx';
import { login } from './login';
import { root } from './root';
import { context } from './routerContext';

const routeTree = root.addChildren([
  auth.addChildren([app]), 
  guest.addChildren([idx, login]),
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
