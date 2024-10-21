import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { parseApiError } from 'shared/helpers/api/getApiError';

import { entityApi } from '../entityApi';

export const useRemovePosts = (id: number | number[]) => {
  const toast = useToast();

  return useMutation({
    mutationFn: () => {
      return entityApi.post.deleteMany(Array.isArray(id) ? id : [id], { deleteFlag: true });
    },
    onError: (error) => {
      const apiError = parseApiError(error);

      toast({
        description: apiError.message,
        status: 'error',
      });
    },
  });
};
