import { useMutation } from '@tanstack/react-query';

import { entityApi } from '../entityApi';

export const useUnstickPost = (id: string) => {
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
