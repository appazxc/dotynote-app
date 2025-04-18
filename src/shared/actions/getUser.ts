import { AxiosError } from 'axios';

import { logout } from 'shared/actions/logout';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { selectToken } from 'shared/selectors/auth/selectToken';
import { selectUser } from 'shared/selectors/user/selectUser';
import { setUser } from 'shared/store/slices/authSlice';
import { ThunkAction } from 'shared/types/store';
import { UnauthorizedError } from 'shared/util/errors';

export const getUser = (): ThunkAction => async (dispatch, getState) => {
  const token = selectToken(getState());
  const user = selectUser(getState());

  if (user) {
    return;
  }

  if (!token) {
    throw Error('Missing token');
  }

  try {
    const userId = await queryClient.fetchQuery({ ...options.users.me() });
    dispatch(setUser(userId));
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      dispatch(logout());
      throw new UnauthorizedError();
    }

    throw Error('Unexpected error occurred');
  }
};