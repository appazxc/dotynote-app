import { useMutation } from '@tanstack/react-query';

import { UpdateDotParams, updatePostDot } from 'shared/actions/dot/updatePostDot';
import { toaster } from 'shared/components/ui/toaster';
import { useAppDispatch } from 'shared/store/hooks';

export const useUpdatePostDot = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: UpdateDotParams) => {
      return dispatch(updatePostDot(data));
    },
    onError: () => {
      toaster.create({
        description: 'Failed to update dot',
        type: 'error',
      });
    },
  });
};
