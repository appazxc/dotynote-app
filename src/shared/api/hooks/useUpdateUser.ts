import { useMutation } from '@tanstack/react-query';

import { entityApi } from 'shared/api/entityApi';
import { selectUserId } from 'shared/selectors/auth/selectUserId';
import { useAppSelector } from 'shared/store/hooks';
import { UserEntity } from 'shared/types/entities/UserEntity';
import { invariant } from 'shared/util/invariant';

export const updateUserMutationKey = () => ['user'];

export const useUpdateUser = () => {
  const userId = useAppSelector(selectUserId);
  
  invariant(userId, 'Missing userId');

  return useMutation({
    mutationKey: updateUserMutationKey(),
    mutationFn: (user: Partial<UserEntity>) => {
      return entityApi.user.update(userId, user);
    },
  });
};
