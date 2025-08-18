import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';

export type DeletionRequestStatus = {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  requestedAt: string;
  confirmedAt?: string;
  scheduledDeletionAt?: string;
};

export const useAccountDeletionRequest = () => {
  return useQuery({
    ...options.users.userDeletionRequest(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};
