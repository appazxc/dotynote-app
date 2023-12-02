import { entityApi } from 'shared/api/entityApi';
import { queries } from 'shared/api/queries';
import { queryClient } from 'shared/api/queryClient';
import { USER_ID } from 'shared/constants/queryParams';
import { selectActiveSpaceId, updateActiveSpaceId } from 'shared/store/slices/appSlice';
import { selectUser } from 'shared/store/slices/authSlice';
import { RouteLoader } from 'shared/types/common/router';

export const deferLoader: RouteLoader = async ({ store }) => {
  const { getState, dispatch } = store;

  const activeSpaceId = selectActiveSpaceId(getState());
  const user = selectUser(getState());
    
  const userSpaceIds = await queryClient.fetchQuery(queries.spaces.list({ [USER_ID]: user?.id }));

  if (!(activeSpaceId && userSpaceIds.includes(activeSpaceId)) || !activeSpaceId) {
    dispatch(updateActiveSpaceId(userSpaceIds[0]));
  }

  const { waitedRoute } = getState().app;

  if (waitedRoute) {
    await entityApi.spaceTab.create({
      spaceId: activeSpaceId,
      routes: [waitedRoute],
    });
  }
};
