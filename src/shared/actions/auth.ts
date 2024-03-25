import { AxiosError } from 'axios';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { actions } from 'shared/constants/actions';
import { persistor } from 'shared/store';
import { selectToken, selectUser, setToken, setUser } from 'shared/store/slices/authSlice';
import { ThunkAction } from 'shared/types/store';

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

export const logout = (): ThunkAction => (dispatch) => {
  persistor.purge();
  
  dispatch({
    type: actions.RESET_APP,
  });
};