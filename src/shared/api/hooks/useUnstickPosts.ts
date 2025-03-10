import { useMutation } from '@tanstack/react-query';

import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';

import { entityApi } from '../entityApi';

export const useUnstickPosts = (id: number | number[]) => {
  return useMutation({
    mutationFn: () => {
      return entityApi.post.deleteMany(Array.isArray(id) ? id : [id], { deleteFlag: true });
    },
    onError: (error) => {
      const apiError = parseApiError(error);

      toaster.create({
        description: apiError.message,
        type: 'error',
      });
    },
  });
};
