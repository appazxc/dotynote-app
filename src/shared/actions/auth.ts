import { AxiosError } from 'axios';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { actions } from 'shared/constants/actions';
import { selectToken } from 'shared/selectors/auth/selectToken';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { persistor } from 'shared/store';
import { setToken, setUser } from 'shared/store/slices/authSlice';
import { ThunkAction } from 'shared/types/store';

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
    const userId = await queryClient.fetchQuery({ ...options.users.me(), staleTime: 0 });
    dispatch(setUser(userId));
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      dispatch(setToken(null));
      dispatch(logout());
      throw Error('Can not authorize user');
    }

    throw Error('Unexpected error occurred');
  }
};

export const logout = (): ThunkAction => (dispatch) => {
  persistor.purge();
  
  dispatch({
    type: actions.RESET_APP,
  });
};