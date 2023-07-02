import api from 'shared/api';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { loaderIds } from 'shared/constants/loaderIds';
import { AppThunk } from 'shared/store';
import { setToken } from 'shared/store/slices/authSlice';

export const loginEmail: AppThunk<string> = (email) =>
  withLoader(loaderIds.loginEmail, () => {
    return api.loginEmail(email);
  });

export const loginEmailWithCode: AppThunk<{ email: string, code: string }> = ({ email, code }) =>
  withLoader(loaderIds.loginEmailWithCode, async (dispatch) => {
    const { token } = await api.loginEmailWithCode({ email, code });

    dispatch(setToken(token));
  });
