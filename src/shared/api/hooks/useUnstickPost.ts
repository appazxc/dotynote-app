import { useMutation } from '@tanstack/react-query';

import { IdentityType } from 'shared/types/entities/BaseEntity';

import { useNoteTabId } from 'desktop/modules/space/tabs/note/hooks/useNoteTabId';
import { noteTabStore } from 'desktop/modules/space/tabs/note/lib/noteTabStore';

import { entityApi } from '../entityApi';
import { queryClient } from '../queryClient';

import { PageParam } from './useInfinityPosts';

type QueryData = {
  pageParams: PageParam[],
  pages: IdentityType[][]
}

export const useUnstickPost = (id: IdentityType) => {
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
    async onSuccess() {
      const { queryKey } = noteTabStore.get(noteTabId) || {};
      await queryClient.invalidateQueries({ queryKey });
      entityApi.post.deleteEntity(id);
    },
  });
};
