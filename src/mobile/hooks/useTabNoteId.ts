import React from 'react';

import { getTabMatch } from 'shared/modules/space/helpers/tabHelpers';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';

import { noteRoutePath } from 'mobile/modules/tabRoutes/note';
import { router } from 'mobile/modules/tabRoutes/router';

export const useTabNoteId = () => {
  const activeTab = useAppSelector(selectActiveTab);

  return React.useMemo(() => {
    if (!activeTab) {
      return null;
    }

    const { routes } = activeTab;
    const match = getTabMatch(routes[routes.length - 1], router);

    if (!match || match.routeId !== noteRoutePath) {
      return null;
    }

    return Number(match.params.noteId);
  }, [activeTab]);
};