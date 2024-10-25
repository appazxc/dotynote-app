import React from 'react';

import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { useBrowserLocation } from 'shared/hooks/useBrowserLocation';
import { getTabMatch } from 'shared/modules/space/helpers/tabHelpers';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';

import { router } from 'mobile/modules/space/tabRoutes/router';
import { selectPrimaryNoteTab } from 'mobile/selectors/app/selectPrimaryNoteTab';

/**
 * 
 * @returns primary noteId if on primary url and tab noteId if on app url.
 * Null otherwise.
 */
export const useDotMenuNoteId = () => {
  const activeTab = useAppSelector(selectActiveTab);
  const { pathname } = useBrowserLocation();
  const primaryNoteTab = useAppSelector(selectPrimaryNoteTab);
  
  const isAppPage = pathname === '/app';
  const isPrimaryPage = pathname === '/app/primary';
  const isRightPage = isAppPage || isPrimaryPage;

  return React.useMemo(() => {
    if (!activeTab || !isRightPage) {
      return null;
    }

    let routes = activeTab.routes;
    if (isPrimaryPage && primaryNoteTab) {
      routes = primaryNoteTab?.routes;
    }

    const match = getTabMatch(routes[routes.length - 1], router);

    if (!match || match.routeId !== noteRoutePath) {
      return null;
    }

    return Number(match.params.noteId);
  }, [activeTab, isRightPage, isPrimaryPage, primaryNoteTab]);
};