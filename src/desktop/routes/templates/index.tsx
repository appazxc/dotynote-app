import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { app } from 'desktop/routes/app';

export const templatesRoot = createRoute({
  getParentRoute: () => app,
  path: '/templates',
  component: lazyRouteComponent(() => import('./templates')),
});

export const noteTemplates = createRoute({
  getParentRoute: () => templatesRoot,
  path: '/notes',
  component: lazyRouteComponent(() => import('./NoteTemplates/NoteTemplates')),
});

export const postTemplates = createRoute({
  getParentRoute: () => templatesRoot,
  path: '/posts',
  component: lazyRouteComponent(() => import('./PostTemplates/PostTemplates')),
});

export const templates = templatesRoot.addChildren([noteTemplates, postTemplates]);