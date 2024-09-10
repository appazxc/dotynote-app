import { HistoryLocation } from '@tanstack/react-router';

import { updateTab } from 'shared/actions/space/updateTab';
import { spaceTabSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';

export const handleTabRouteChange = (tabId: string, action: string, location: HistoryLocation): ThunkAction =>
  (dispatch, getState) => {
    const tab = spaceTabSelector.getEntityById(getState(), tabId);

    if (!tab) return;
    
    const { routes } = tab;

    let newRoutes = [...routes];
    if (action === 'back' && newRoutes.length > 1) {
      newRoutes = newRoutes.slice(0, -1);
    } else if (action === 'replace') {
      newRoutes[newRoutes.length - 1] = location.href;
    } else if (action === 'push') {
      newRoutes.push(location.href);
    } else {
      throw new Error(`Invalid history action: ${action}`);
    }

    dispatch(updateTab({ id: tab.id, data: { routes: newRoutes } }));
  };
