import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';

export const usePinPost = () => {
  return useMutation({
    mutationFn: (postId: number) => {
      return api.post<string>(`/posts/${postId}/pin`, {});
    },
  });
};
