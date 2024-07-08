import React from 'react';

import { RouterHistory, createMemoryHistory } from '@tanstack/react-router';

import { handleTabRouteChange } from 'shared/modules/space/actions/router/handleTabRouteChange';
import { getRoutesMap } from 'shared/modules/space/helpers/getRoutesMap';
import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { invariant } from 'shared/util/invariant';

import { createTabRouter } from './router';

let lastAction: string | null = null;
function extendHistory(history: RouterHistory, listenTo: string[]): RouterHistory {
  Object.keys(history).forEach((key) => {
    if (typeof history[key] === 'function' && listenTo.includes(key)) {
      const oldFunction = history[key];

      const newFunction = function(...args) {
        lastAction = key;
        return oldFunction(...args);
      };

      newFunction.bind(history);
      history[key] = newFunction;
    }
  });

  return history;
}

function getMemoryHistoryParams(spaceTab: SpaceTabEntity) {
  return {
    initialEntries: [...spaceTab.routes],
    initialIndex: spaceTab.routes.length - 1,
  };
}

export const useTabRouter = (spaceTabId: IdentityType) => {
  const dispatch = useAppDispatch();
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, spaceTabId));

  invariant(spaceTab, 'Missing spaceTab');

  const router = React.useMemo(() => {
    let router: ReturnType<typeof createTabRouter>;
    const routesMap = getRoutesMap();
    if (routesMap.get(spaceTabId)) {
      router = routesMap.get(spaceTabId);
    } else {
      console.log('newRouter', spaceTabId);
      router = createTabRouter(extendHistory(
        createMemoryHistory((getMemoryHistoryParams(spaceTab))),
        ['push', 'back', 'replace', 'go']
      ));

      routesMap.set(spaceTabId, router);
    }

    return router;
    // updating only when the space tab is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaceTabId]);

  React.useEffect(() => {
    function handleChange() {
      if (lastAction) {
        dispatch(handleTabRouteChange(lastAction, router.history.location));
        lastAction = null;
      }
    }

    const unsubscribe = router.history.subscribe(handleChange);

    return unsubscribe;
  }, [router, dispatch]);

  return router;
};
