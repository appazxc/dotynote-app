import { logout } from 'shared/actions/logout';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { selectUser } from 'shared/selectors/user/selectUser';
import { setUser } from 'shared/store/slices/authSlice';
import { ThunkAction } from 'shared/types/store';

export const loadUser = (): ThunkAction => async (dispatch, getState) => {
  const user = selectUser(getState());

  if (user) {
    return;
  }
  
  try {
    const userId = await queryClient.fetchQuery(options.users.me());
    dispatch(setUser(userId));
  } catch (error) {
    const parsedError = parseApiError(error);
    if (parsedError.statusCode === 404) {
      dispatch(logout());
    }
    throw error;
  }
};