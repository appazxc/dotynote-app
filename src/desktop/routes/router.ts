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
  about, 
  app, 
  login,
  spaces,
]);

const router = createRouter({ 
  routeTree,
  context,
  history: extendHistory(createBrowserHistory()),
  defaultPendingMinMs: 0,
  defaultNotFoundComponent: DefaultNotFoundComponent,
  defaultErrorComponent: DefaultErrorComponent,
});

function extendHistory(history: RouterHistory): RouterHistory {
  Object.keys(history).forEach((key) => {
    if (typeof history[key] === 'function') {
      const oldFunction = history[key];

      const newFunction = function(...args) {
        return oldFunction(...args);
      };

      newFunction.bind(history);
      history[key] = newFunction;
    }
  });

  return history;
}

export type Router = typeof router;

export { router };
