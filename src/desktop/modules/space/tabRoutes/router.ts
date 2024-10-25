import { createRouter } from '@tanstack/react-router';

import { Loader } from 'shared/components/Loader';

import { DefaultErrorComponent } from 'desktop/modules/space/tabRoutes/DefaultErrorComponent';
import { DefaultNotFoundComponent } from 'desktop/modules/space/tabRoutes/DefaultNotFoundComponent';
import { idx } from 'desktop/modules/space/tabRoutes/idx';
import { note } from 'desktop/modules/space/tabRoutes/note';
import { noteNotFound } from 'desktop/modules/space/tabRoutes/noteNotFound';
import { notePostsSettings } from 'desktop/modules/space/tabRoutes/notePostsSettings';
import { noteSettings } from 'desktop/modules/space/tabRoutes/noteSettings';
import { pinnedPosts } from 'desktop/modules/space/tabRoutes/pinnedPosts';
import { root } from 'desktop/modules/space/tabRoutes/root';
import { context } from 'desktop/modules/space/tabRoutes/routerContext';

const routeTree = root.addChildren([
  idx, 
  note,
  noteSettings,
  notePostsSettings,
  noteNotFound,
  pinnedPosts,
]);

const defaultRouterOptions = {
  routeTree,
  context,
  defaultStaleTime: Infinity,
  defaultPreloadStaleTime: Infinity,
  defaultPendingMinMs: 0,
  defaultPendingMs: 0,
  defaultPendingComponent: Loader,
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
