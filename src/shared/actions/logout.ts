import { api } from 'shared/api';
import { queryClient } from 'shared/api/queryClient';
import { actions } from 'shared/constants/actions';
import { selectRefreshToken } from 'shared/selectors/auth/selectToken';
import { persistor } from 'shared/store';
import { ThunkAction } from 'shared/types/store';

export const logout = (shouldLogout = true): ThunkAction => async (dispatch, getState) => {
  if (shouldLogout) {
    await api.post('/auth/logout', { refreshToken: selectRefreshToken(getState()) });
  }
  
  await persistor.purge();
  
  queryClient.removeQueries();
  
  dispatch({
    type: actions.RESET_APP,
  });
  
  persistor.persist();
};