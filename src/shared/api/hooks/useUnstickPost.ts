import { useMutation } from '@tanstack/react-query';

import { useNoteTabId } from 'shared/modules/space/tabRoutes/note/hooks/useNoteTabId';

import { entityApi } from '../entityApi';

import { PageParam } from './useInfinityPosts';

type QueryData = {
  pageParams: PageParam[],
  pages: string[][]
}

export const useUnstickPost = (id: string) => {
  const noteTabId = useNoteTabId();

  return useMutation({
    mutationFn: () => {
      return entityApi.post.delete(id, { deleteFlag: true });
    },
    onMutate: () => {
      // const { queryKey } = noteTabStore.get(noteTabId) || {};
      // console.log('queryKey', queryKey);

      // if (queryKey) {
      //   queryClient.setQueryData(queryKey, (data: QueryData) => {
      //     console.log('queryClientdata', data);

      //     return {
      //       ...data,
      //       pages: data.pages.map((page) => page.filter(postId => postId !== id)),
      //     };
      //   });
      // }
      // queryClient.invalidateQueries({ queryKey });
    },
  });
};
