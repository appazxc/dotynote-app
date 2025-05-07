import { useMutation } from '@tanstack/react-query';

import { createNoteDot } from 'shared/actions/note/createNoteDot';
import { toaster } from 'shared/components/ui/toaster';
import { useAppDispatch } from 'shared/store/hooks';

export const useCreateNoteDot = (id: string) => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: { text: string }) => {
      return dispatch(createNoteDot(id, data));
    },
    onError: () => {
      toaster.create({
        description: 'Failed to create dot',
        type: 'error',
      });
    },
  });
};
