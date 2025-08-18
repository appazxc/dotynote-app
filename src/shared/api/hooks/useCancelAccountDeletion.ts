import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from 'shared/api';
import { accountDeletionRequestQueryKey } from 'shared/api/options/users';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { selectUserId } from 'shared/selectors/auth/selectUserId';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const cancelAccountDeletionMutationKey = () => ['user', 'cancel-deletion'];

export const useCancelAccountDeletion = () => {
  const userId = useAppSelector(selectUserId);
  const queryClient = useQueryClient();
  
  invariant(userId, 'Missing userId');

  return useMutation({
    mutationKey: cancelAccountDeletionMutationKey(),
    mutationFn: async (): Promise<{ message: string }> => {
      return api.get('/users/delete/cancel');
    },
    onSuccess: () => {
      // Invalidate deletion request query to refetch status
      queryClient.invalidateQueries({
        queryKey: accountDeletionRequestQueryKey(),
      });
      
      toaster.create({
        title: 'Deletion Cancelled',
        description: 'Your account deletion has been cancelled.',
        type: 'success',
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Cancellation Failed',
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
