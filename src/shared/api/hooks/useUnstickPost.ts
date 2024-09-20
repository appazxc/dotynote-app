import { useMutation } from '@tanstack/react-query';

import { entityApi } from '../entityApi';

export const useUnstickPost = (id: number) => {
  return useMutation({
    mutationFn: () => {
      return entityApi.post.delete(id, { deleteFlag: true });
    },
  });
};
