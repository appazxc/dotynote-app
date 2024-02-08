import { AxiosError } from 'axios';

import api from 'shared/api';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { loaderIds } from 'shared/constants/loaderIds';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { AppThunk, ThunkAction } from 'shared/store';
import { selectToken, selectUser, setToken, setUser } from 'shared/store/slices/authSlice';

export const loginEmail: AppThunk<string> = (email) =>
  withLoader(loaderIds.loginEmail, () => {
    return api.sendCodeEmail(email);
  });

export const loginEmailWithCode: AppThunk<{ email: string; code: string }> = ({ email, code }) =>
  withLoader(loaderIds.loginEmailWithCode, async (dispatch) => {
    const { token } = await api.loginEmail({ email, code });

    dispatch(setToken(token));
    await dispatch(authoriseUser());
  });

export const authoriseUser = (): ThunkAction => async (dispatch, getState) => {
  const token = selectToken(getState());
  const user = selectUser(getState());

  if (user) {
    return;
  }

  if (!token) {
    throw Error('Missing token');
  }

  try {
    const userId = await queryClient.fetchQuery(options.users.me());
    dispatch(setUser(userId));
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log('dispatch(setToken(null));');
      
      dispatch(setToken(null));
      return;
    }

    if (error instanceof Error) {
      console.log('instanceof Error', error);
    }
    
    throw Error('Unexpected error occurred');
  }
};
