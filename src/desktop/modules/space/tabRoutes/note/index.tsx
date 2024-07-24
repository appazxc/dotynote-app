import { Center } from '@chakra-ui/react';
import { createRoute, lazyRouteComponent, notFound } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';

import { root } from '../root';

export const note = createRoute({
  getParentRoute: () => root,
  path: 'n/$noteId',
  component: lazyRouteComponent(() => import('./Note')),
  loader: async ({ params }) => {
    try {
      await queryClient.fetchQuery(options.notes.load(params.noteId));
    } catch (err: unknown) {
      if (!(err instanceof AxiosError)) {
        throw err;
      }

      throw notFound();
    }
  },
  // в текучей версии роутера не работает
  notFoundComponent: () => {
    return (
      <Center>
        not found
      </Center>
    );
  },

  pendingMinMs: 0,
  pendingMs: 300,
  shouldReload: false,
});