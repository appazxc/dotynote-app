import { redirect } from 'react-router';
import { queries } from 'shared/api/queries';
import { queryClient } from 'shared/api/queryClient';
import { USER_ID } from 'shared/constants/queryParams';
import { routeNames } from 'shared/constants/routeNames';
import { getUrl } from 'shared/util/router/getUrl';
import { selectActiveSpaceId, updateActiveSpaceId } from 'shared/store/slices/appSlice';
import { fetchMe, selectUser } from 'shared/store/slices/authSlice';
import { RouteLoader } from 'shared/types/common/router';

export const deferLoader: RouteLoader = async ({ store }) => {
  const { getState, dispatch } = store;

  try {
    await dispatch(fetchMe());

    const activeSpaceId = selectActiveSpaceId(getState());
    const user = selectUser(getState());
    const userSpaceIds = await queryClient.fetchQuery(queries.spaces.list({ [USER_ID]: user?.id }));

    if (!(activeSpaceId && userSpaceIds.includes(activeSpaceId)) || !activeSpaceId) {
      dispatch(updateActiveSpaceId(userSpaceIds[0]));
    }
  } catch (e) {
    return redirect(getUrl(routeNames.login));
  }
};
