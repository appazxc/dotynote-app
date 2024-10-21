import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';

export const useUnpinPost = () => {
  return useMutation({
    mutationFn: (postId: number) => {
      return api.post<string>(`/posts/${postId}/unpin`, {});
    },
  });
};
