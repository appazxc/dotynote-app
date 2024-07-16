import { redirect } from 'react-router';

import { routeNames } from 'shared/constants/routeNames';
import { selectToken } from 'shared/selectors/auth/selectToken';
import { Guard } from 'shared/types/_router';
import { buildUrl } from 'shared/util/router/buildUrl';

export const guestGuard: Guard = async ({ store }) => {
  const state = store.getState();
  const token = selectToken(state);

  if (token) {
    return redirect(buildUrl({ routeName: routeNames.app }));
  }
};