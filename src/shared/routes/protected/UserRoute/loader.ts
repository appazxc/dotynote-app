import { BACK_URL } from 'shared/constants/queryParams';
import { routeNames } from 'shared/constants/routeNames';
import { createRedirect } from 'shared/helpers/router/createRedirect';
import { getMe, selectToken, selectIsAuthenticated } from 'shared/store/slices/authSlice';
import { RouteLoader } from 'shared/types/common/router';
import { wait } from 'shared/utils/wait';

export const loader: RouteLoader = async ({ store, request }) => {
  const { getState } = store;
  console.log('loader protected');

  const token = selectToken(getState());

  if (!token) {
    return createRedirect(routeNames.login, {
      queryParams: {
        [BACK_URL]: request.url,
      },
    });
  }

  await wait(5000);
  console.log('after await');

  if (!selectIsAuthenticated(store.getState())) {
    await store.dispatch(getMe());
  }
};
