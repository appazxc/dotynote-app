import React from 'react';

import { RouterState } from '@remix-run/router';

import { handleAppRouteChange } from 'shared/modules/space/actions/route/handleAppRouteChange';
import { CreateRouterParams, createTabRouter } from 'shared/modules/space/helpers/createTabRouter';
import { spaceTabSelector } from 'shared/selectors/entities';
import { store } from 'shared/store';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { invariant } from 'shared/util/invariant';

import { getRoutesMap } from './getRoutesMap';

function getMemoryRouterParams(spaceTab: SpaceTabEntity) {
  return {
    initialEntries: spaceTab.routes,
    initialIndex: spaceTab.routes.length - 1,
  };
}

export const useTabRouter = (
  spaceTabId: IdentityType, 
  tabsDictionary: CreateRouterParams['tabsDictionary'],
  pages: CreateRouterParams['pages']
) => {
  const dispatch = useAppDispatch();
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, spaceTabId));

  invariant(spaceTab, 'Missing spaceTab');
  
  const router = React.useMemo(() => {
    let router;
    const routesMap = getRoutesMap();
    if (routesMap.get(spaceTabId)) {
      router = routesMap.get(spaceTabId);
    } else {
      router = createTabRouter({
        tabsDictionary,
        store,
        pages,
        memoryRouteParams: getMemoryRouterParams(spaceTab),
      });

      routesMap.set(spaceTabId, router);
    }

    return router;
    // updating only when the space tab is changed
  }, [spaceTabId]);

  React.useEffect(() => {
    function handleChange() {
      // need to remove first call because router send not valid event
      let callsCount = 0;

      return (action: RouterState) => {
        if (!callsCount) {
          callsCount++;
          return;
        }
        console.log('action', action);
        
        callsCount++;
        dispatch(handleAppRouteChange(action));
      };
    }

    const unsubscribe = router.subscribe(handleChange());

    return unsubscribe;
  }, [router, dispatch]);

  return router;
};
