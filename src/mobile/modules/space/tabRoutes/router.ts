import { createRouter } from '@tanstack/react-router';

import { Loader } from 'shared/components/Loader';

import { DefaultNotFoundComponent } from 'mobile/modules/space/tabRoutes/DefaultNotFoundComponent';
import { DefaultTabError } from 'mobile/modules/space/tabRoutes/DefaultTabError';
import { note } from 'mobile/modules/space/tabRoutes/note';
import { noteNotFound } from 'mobile/modules/space/tabRoutes/noteNotFound';
import { noteSettings } from 'mobile/modules/space/tabRoutes/noteSettings';
import { pinnedPosts } from 'mobile/modules/space/tabRoutes/pinnedPosts';
import { root } from 'mobile/modules/space/tabRoutes/root';
import { context } from 'mobile/modules/space/tabRoutes/routerContext';

const routeTree = root.addChildren([
  note,
  noteSettings,
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
  defaultErrorComponent: DefaultTabError,
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
