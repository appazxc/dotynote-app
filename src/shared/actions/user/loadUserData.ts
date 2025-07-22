import { redirect } from '@tanstack/react-router';

import { loadUser } from 'shared/actions/user/loadUser';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { selectUser } from 'shared/selectors/user/selectUser';
import { ThunkAction } from 'shared/types/store';

export const loadUserData = (): ThunkAction => async (dispatch, getState) => {
  await Promise.all([
    dispatch(loadUser()),
    queryClient.fetchQuery(options.users.userBalance()),
  ]);

  const user = selectUser(getState());

  if (!user?.region) {
    throw redirect({
      to: '/app/onboarding',
    });
  }
};