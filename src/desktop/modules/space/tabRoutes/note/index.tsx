import React from 'react';

import { Outlet, createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';

import { root } from '../root';

export const noteRoot = createRoute({
  getParentRoute: () => root,
  path: 'n',
  component: React.memo(() => <Outlet />),
});

const noteIndex = createRoute({
  getParentRoute: () => noteRoot,
  path: '/',
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  return <div>Select a note.</div>;
}

export const notePage = createRoute({
  getParentRoute: () => noteRoot,
  path: '$noteId',
  component: lazyRouteComponent(() => import('./Note')),
  loader: async ({ params }) => {
    console.log('loader', params.noteId);
    await queryClient.fetchQuery(options.notes.load(params.noteId));
  },
  shouldReload: false,
});

export const note = noteRoot.addChildren([notePage, noteIndex]);