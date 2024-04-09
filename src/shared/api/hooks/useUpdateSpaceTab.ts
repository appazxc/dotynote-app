import { useMutation } from '@tanstack/react-query';

import { updateTab } from 'shared/actions/space/updateTab';
import { useAppDispatch } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

export const useUpdateSpaceTab = (id: IdentityType) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: Partial<SpaceTabEntity>) => {
      return dispatch(updateTab({ id, data }));
    },
  });
};
