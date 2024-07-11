import { createRouter } from '@tanstack/react-router';

import { addMainNote } from './addMainNote';
import { DefaultErrorComponent } from './DefaultErrorComponent';
import { DefaultNotFoundComponent } from './DefaultNotFoundComponent';
import { DefaultPendingComponent } from './DefaultPendingComponent';
import { idx } from './idx';
import { note } from './note';
import { noteSettings } from './noteSettings';
import { profile } from './profile';
import { root } from './root';
import { context } from './routerContext';
import { settings } from './settings';

const routeTree = root.addChildren([
  idx, 
  note,
  addMainNote,
  profile,
  noteSettings,
  settings,
]);

const defaultRouterOptions = {
  routeTree,
  context,
  defaultStaleTime: Infinity,
  defaultPreloadStaleTime: Infinity,
  defaultPendingMinMs: 0,
  defaultPendingMs: 0,
  defaultPendingComponent: DefaultPendingComponent,
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
