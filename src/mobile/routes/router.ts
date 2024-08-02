import {
  createRouter,
} from '@tanstack/react-router';

import { Loader } from 'shared/components/Loader';

// import { about } from './about';
import { app } from './app';
import { DefaultErrorComponent } from './DefaultErrorComponent';
import { DefaultNotFoundComponent } from './DefaultNotFoundComponent';
import { idx } from './idx';
// import { login } from './login';
import { root } from './root';
import { context } from './routerContext';

const routeTree = root.addChildren([
  idx, 
  // about, 
  app, 
  // login,
]);

const router = createRouter({ 
  routeTree,
  context,
  defaultPendingMinMs: 0,
  defaultStaleTime: Infinity,
  defaultPreloadStaleTime: Infinity,
  defaultNotFoundComponent: DefaultNotFoundComponent,
  defaultErrorComponent: DefaultErrorComponent,
  defaultPendingComponent: Loader,
});

export type Router = typeof router;

export { router };
