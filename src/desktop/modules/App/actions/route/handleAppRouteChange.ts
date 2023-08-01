import { AppThunk } from 'shared/store';
import { RouterState } from '@remix-run/router';
import { selectActiveSpaceActiveTab } from 'shared/store/slices/appSlice';

export const handleAppRouteChange: AppThunk<RouterState> = (routerState) => (dispatch, getState) => {
  const { historyAction, location } = routerState;
  console.log('routerState', routerState);
  const activeTab = selectActiveSpaceActiveTab(getState());
  const { routes } = activeTab;

  let newRoutes = [...routes];
  if (historyAction === 'POP') {
    newRoutes = newRoutes.slice(0, -1)
  }
  if (historyAction === 'REPLACE') {
    newRoutes[newRoutes.length - 1] = location.pathname
  }
  if (historyAction === 'PUSH') {
    newRoutes.push(location.pathname)
  }

  dispatch(updateTab({ id: activeTab.id, data: { routes: newRoutes }}))
};
