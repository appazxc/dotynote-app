import { useMutation } from '@tanstack/react-query';

import { updateNoteDot, UpdateDotParams } from 'shared/actions/dot/updateDot';
import { toaster } from 'shared/components/ui/toaster';
import { useAppDispatch } from 'shared/store/hooks';

export const useUpdateNoteDot = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: UpdateDotParams) => {
      return dispatch(updateNoteDot(data));
    },
    onError: () => {
      toaster.create({
        description: 'Failed to update dot',
        type: 'error',
      });
    },
  });
};
