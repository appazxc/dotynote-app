import api from 'shared/api';
import { queries } from 'shared/api/queries';
import { queryClient } from 'shared/api/queryClient';
import { loaderIds } from 'shared/constants/loaderIds';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { AppThunk, ThunkAction } from 'shared/store';
import { selectToken, selectUser, setToken, setUser } from 'shared/store/slices/authSlice';

export const loginEmail: AppThunk<string> = (email) =>
  withLoader(loaderIds.loginEmail, () => {
    return api.sendCodeEmail(email);
  });

export const loginEmailWithCode: AppThunk<{ email: string, code: string }> = ({ email, code }) =>
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
    const userId = await queryClient.fetchQuery(queries.users.me());
    dispatch(setUser(userId));
  } catch(e: any) {
    // dispatch(setToken(null));
    throw Error(e);
  }
};
