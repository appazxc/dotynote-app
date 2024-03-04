import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { hour } from 'shared/constants/time';
import { ThunkAction } from 'shared/types/store';

export const loadSpaces = (): ThunkAction => async () => {
  await queryClient.fetchQuery({
    ...options.spaces.userList(),
    staleTime: hour,
  });
};
