import { redirect } from 'react-router';

import { getUser } from 'shared/actions/auth';
import { BACK_URL } from 'shared/constants/queryKeys';
import { routeNames } from 'shared/constants/routeNames';
import { selectIsAuthenticated } from 'shared/selectors/auth/selectIsAuthenticated';
import { selectToken } from 'shared/selectors/auth/selectToken';
import { Guard } from 'shared/types/_router';
import { buildUrl } from 'shared/util/router/buildUrl';

export const userGuard: Guard = async ({ store, request }) => {
  const state = store.getState();

  const isAuthenticated = selectIsAuthenticated(state);
  const token = selectToken(state);
  const { pathname } = new URL(request.url);
  
  if (!isAuthenticated && !token) {
    return redirect(buildUrl({ routeName: routeNames.login, queryParams: { [BACK_URL]: pathname } }));
  }
  
  if (token && !isAuthenticated) {
    await store.dispatch(getUser());
  }
};