import { AxiosError } from 'axios';

import { logout } from 'shared/actions/logout';
import { loadUser } from 'shared/actions/user/loadUser';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { ThunkAction } from 'shared/types/store';
import { UnauthorizedError } from 'shared/util/errors';

export const loadUserData = (): ThunkAction => async (dispatch) => {
  try {
    await Promise.all([
      dispatch(loadUser()),
      queryClient.fetchQuery(options.users.userBalance()),
    ]);
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      dispatch(logout());
      throw new UnauthorizedError();
    }

    throw Error('Unexpected error occurred');
  }
};