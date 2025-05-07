import { useMutation } from '@tanstack/react-query';

import { createPostDot } from 'shared/actions/post/createPostDot';
import { toaster } from 'shared/components/ui/toaster';
import { useAppDispatch } from 'shared/store/hooks';

export const useCreatePostDot = (id: string) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: { text: string }) => {
      return dispatch(createPostDot(id, data));
    },
    onError: () => {
      toaster.create({
        description: 'Failed to create dot',
        type: 'error',
      });
    },
  });
};
