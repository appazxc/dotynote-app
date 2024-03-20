import { loadSpaces } from 'shared/actions/space/loadSpaces';
import { openTab } from 'shared/actions/space/openTab';
import {
  cleanWaitedRoute,
  selectActiveSpace,
} from 'shared/store/slices/appSlice';
import { RouteLoader } from 'shared/types/common/router';

// TODO: редиректить если нет активного роута
export const deferLoader: RouteLoader = async ({ store }) => {
  const { dispatch, getState } = store;
  
  await dispatch(loadSpaces());
  const activeSpace = selectActiveSpace(getState());

  const { waitedRoute } = getState().app;

  if (waitedRoute && activeSpace) {
    await dispatch(openTab({ route: waitedRoute, makeActive: true }));
    dispatch(cleanWaitedRoute());
  }
};
