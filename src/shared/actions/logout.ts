import posthog from 'posthog-js';

import { trackEvent } from 'shared/analytics/posthog';
import { api } from 'shared/api';
import { queryClient } from 'shared/api/queryClient';
import { actions } from 'shared/constants/actions';
import { getDesktopRoutesMap, getMobileRoutesMap } from 'shared/modules/space/helpers/routesMap';
import { selectRefreshToken } from 'shared/selectors/auth/selectToken';
import { getBroadcastService } from 'shared/services/broadcastService';
import { logger } from 'shared/services/logger';
import { persistor } from 'shared/store';
import { ThunkAction } from 'shared/types/store';

export const logout = (shouldLogout = true, isBroadcast = false): ThunkAction => async (dispatch, getState) => {
  // Broadcast logout to other tabs before starting local logout
  if (!isBroadcast) {
    try {
      getBroadcastService()?.broadcastLogout('user_logout');
      logger.info('Logout broadcasted to other tabs');
    } catch (error) {
      logger.warn('Failed to broadcast logout');
    }
  }
  
  // Track logout event before resetting user
  trackEvent('user_logout', {
    logout_type: shouldLogout ? 'manual' : 'automatic',
    is_broadcast: isBroadcast,
  });

  posthog.reset();

  // Remove hasToken cookie
  document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
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
