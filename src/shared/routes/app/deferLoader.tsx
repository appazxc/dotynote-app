import { createTab } from 'shared/actions/space/createTab';
import { loadSpacesAndMakeActive } from 'shared/actions/space/loadSpacesAndMakeActive';
import {
  cleanWaitedRoute,
  selectActiveSpaceId
} from 'shared/store/slices/appSlice';
import { RouteLoader } from 'shared/types/common/router';

export const deferLoader: RouteLoader = async ({ store }) => {
  const { dispatch, getState } = store;
  const activeSpaceId = selectActiveSpaceId(getState());
  
  await dispatch(loadSpacesAndMakeActive());

  const { waitedRoute } = getState().app;

  if (waitedRoute && activeSpaceId) {
    await dispatch(createTab({ route: waitedRoute, spaceId: activeSpaceId, makeActive: true }));
    dispatch(cleanWaitedRoute());
  }
};
