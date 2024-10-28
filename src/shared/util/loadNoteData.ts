import { redirect } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';

type Params = {
  noteId: number,
  extraLoaders?: Promise<unknown>[],
  flags?: {
    // if false, it won't redirect to note not found page. Default is true.
    shouldRedirect?: boolean
  }
}

export const loadNoteData = async ({
  noteId,
  extraLoaders = [],
  flags = {},
}: Params) => {
  const { shouldRedirect = true } = flags;
  try {
    await Promise.all([
      queryClient.fetchQuery(options.notes.load(noteId)),
      ...extraLoaders,
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