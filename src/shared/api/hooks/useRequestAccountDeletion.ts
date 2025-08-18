import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from 'shared/api';
import { accountDeletionRequestQueryKey } from 'shared/api/options/users';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { selectUserId } from 'shared/selectors/auth/selectUserId';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const requestAccountDeletionMutationKey = () => ['user', 'request-deletion'];

export const useRequestAccountDeletion = () => {
  const userId = useAppSelector(selectUserId);
  const queryClient = useQueryClient();
  
  invariant(userId, 'Missing userId');

  return useMutation({
    mutationKey: requestAccountDeletionMutationKey(),
    mutationFn: async (): Promise<{ message: string }> => {
      return api.post('/users/delete');
    },
    onSuccess: () => {
      // Invalidate deletion request query to refetch status
      queryClient.invalidateQueries({
        queryKey: accountDeletionRequestQueryKey(),
      });
      
      toaster.create({
        title: 'Deletion Request Sent',
        description: 'Please check your email to confirm account deletion.',
        type: 'info',
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Deletion Request Failed',
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
