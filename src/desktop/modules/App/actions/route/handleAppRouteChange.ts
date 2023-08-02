import { AppThunk } from 'shared/store';
import { RouterState } from '@remix-run/router';
import { selectActiveSpaceActiveTab, updateTab } from 'shared/store/slices/appSlice';

export const handleAppRouteChange: AppThunk<RouterState> = (routerState) =>
  (dispatch, getState) => {
    const { historyAction, location } = routerState;
    const activeTab = selectActiveSpaceActiveTab(getState());

    if (!activeTab) return;
    
    const { routes } = activeTab;

    let newRoutes = [...routes];
    if (historyAction === 'POP' && newRoutes.length > 1) {
      newRoutes = newRoutes.slice(0, -1);
    }
    if (historyAction === 'REPLACE') {
      newRoutes[newRoutes.length - 1] = location.pathname;
    }
    if (historyAction === 'PUSH') {
      newRoutes.push(location.pathname);
    }

    dispatch(updateTab({ id: activeTab.id, data: { routes: newRoutes }}));
  };
