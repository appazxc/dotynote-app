import {
  createRouter,
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
  about, 
  app, 
  login,
  spaces,
]);

const router = createRouter({ 
  routeTree,
  context,
  defaultPendingMinMs: 0,
  defaultNotFoundComponent: DefaultNotFoundComponent,
  defaultErrorComponent: DefaultErrorComponent,
});

export type Router = typeof router;

export { router };
