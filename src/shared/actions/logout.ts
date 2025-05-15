import { api } from 'shared/api';
import { queryClient } from 'shared/api/queryClient';
import { actions } from 'shared/constants/actions';
import { getDesktopRoutesMap, getMobileRoutesMap } from 'shared/modules/space/helpers/routesMap';
import { selectRefreshToken } from 'shared/selectors/auth/selectToken';
import { persistor } from 'shared/store';
import { ThunkAction } from 'shared/types/store';

export const logout = (shouldLogout = true): ThunkAction => async (dispatch, getState) => {
  if (shouldLogout) {
    try {
      await api.post('/auth/logout', { refreshToken: selectRefreshToken(getState()) });
    } catch (_) {
      // ignore
    }
  }
  
  await persistor.purge();
  
  queryClient.removeQueries();
  
  dispatch({
    type: actions.RESET_APP,
  });
  
  persistor.persist();

  getMobileRoutesMap().clear();
  getDesktopRoutesMap().clear();
};