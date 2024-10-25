import { redirect } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';

export const noteTabLoader = async (noteId: number) => {
  try {
    await Promise.all([
      queryClient.fetchQuery(options.notes.load(noteId)),
      queryClient.fetchQuery(options.posts.loadPinnedPostsCount(noteId)),
    ]); 
  } catch (err: unknown) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      // if 404 loader will always call refetch
      throw redirect({
        to: '/note-not-found',
      });
    }
    
    throw err;
  }
};