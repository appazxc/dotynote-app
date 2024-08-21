import React from 'react';

import { useBrowserLocation } from 'shared/components/BrowserLocationProvider';
import { getTabMatch } from 'shared/modules/space/helpers/tabHelpers';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';

import { noteRoutePath } from 'mobile/modules/space/tabRoutes/note';
import { router } from 'mobile/modules/space/tabRoutes/router';

/**
 * 
 * @returns primary noteId if on primary url and tab noteId if on app url.
 * Null otherwise.
 */
export const useDotMenuNoteId = () => {
  const activeTab = useAppSelector(selectActiveTab);
  const { pathname } = useBrowserLocation();
  const activeSpace = useAppSelector(selectActiveSpace);
  
  const isAppPage = pathname === '/app';
  const isPrimaryPage = pathname === '/app/primary';
  const isRightPage = isAppPage || isPrimaryPage;

  return React.useMemo(() => {
    if (!activeTab || !isRightPage) {
      return null;
    }

    if (isPrimaryPage) {
      return activeSpace?.mainNoteId || null;
    }

    const { routes } = activeTab;
    const match = getTabMatch(routes[routes.length - 1], router);

    if (!match || match.routeId !== noteRoutePath) {
      return null;
    }

    return Number(match.params.noteId);
  }, [activeTab, isRightPage, isPrimaryPage, activeSpace]);
};