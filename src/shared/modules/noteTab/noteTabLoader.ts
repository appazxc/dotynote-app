import { redirect } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';

type Params = {
  shouldRedirect?: boolean
}

export const noteTabLoader = async (noteId: number, { shouldRedirect = true }: Params = {}) => {
  try {
    await Promise.all([
      queryClient.fetchQuery(options.notes.load(noteId)),
      queryClient.fetchQuery(options.posts.loadPinnedPostsCount(noteId)),
    ]); 
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      // if 404 loader will always call refetch
      if (shouldRedirect) {
        throw redirect({
          to: '/note-not-found',
        });
      }
    }
    
    throw err;
  }
};