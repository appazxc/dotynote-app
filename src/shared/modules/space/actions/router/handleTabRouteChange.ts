import { HistoryLocation } from '@tanstack/react-router';

import { updateTab } from 'shared/actions/space/updateTab';
import { selectActiveTab } from 'shared/store/slices/appSlice';
import { ThunkAction } from 'shared/types/store';

export const handleTabRouteChange = (action: string, location: HistoryLocation): ThunkAction =>
  (dispatch, getState) => {
    const activeTab = selectActiveTab(getState());

    if (!activeTab) return;
    
    const { routes } = activeTab;

    let newRoutes = [...routes];
    if (action === 'back' && newRoutes.length > 1) {
      newRoutes = newRoutes.slice(0, -1);
    }
    if (action === 'replace') {
      newRoutes[newRoutes.length - 1] = location.href;
    }
    if (action === 'push') {
      newRoutes.push(location.href);
    }

    dispatch(updateTab({ id: activeTab.id, data: { routes: newRoutes } }));
  };
