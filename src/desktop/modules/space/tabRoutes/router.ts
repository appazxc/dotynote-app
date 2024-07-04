import {
  createBrowserHistory,
  createRouter,
  RouterHistory,
} from '@tanstack/react-router';

import { about } from './about';
import { app } from './app';
import { DefaultErrorComponent } from './DefaultErrorComponent';
import { DefaultNotFoundComponent } from './DefaultNotFoundComponent';
import { idx } from './idx';
import { login } from './login';
import { root } from './root';
import { context } from './routerContext';
import { spaces } from './spaces';

const routeTree = root.addChildren([
  idx, 
]);

const defaultRouterOptions = {
  routeTree,
  context,
  defaultStaleTime: Infinity,
  defaultPreloadStaleTime: Infinity,
  defaultPendingMinMs: 0,
  defaultNotFoundComponent: DefaultNotFoundComponent,
  defaultErrorComponent: DefaultErrorComponent,
};

const router = createRouter({ 
  ...defaultRouterOptions,
});

export const createTabRouter = (history) => {
  return createRouter({ 
    history,
    ...defaultRouterOptions,
  });
};

export type Router = typeof router;

export { router };
