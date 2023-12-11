import React from 'react';

import { RouterState } from '@remix-run/router';

import { handleAppRouteChange } from 'shared/modules/space/actions/route/handleAppRouteChange';
import { CreateRouterParams, createTabRouter } from 'shared/modules/space/helpers/createTabRouter';
import { store } from 'shared/store';
import { useAppDispatch } from 'shared/store/hooks';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { getRoutesMap } from './getRoutesMap';

function getMemoryRouterParams(spaceTab: SpaceTabEntity) {
  return {
    initialEntries: spaceTab.routes,
    initialIndex: spaceTab.routes.length - 1,
  };
}

export const useTabRouter = (
  spaceTab: SpaceTabEntity, 
  tabsDictionary: CreateRouterParams['tabsDictionary'],
  pages: CreateRouterParams['pages']
) => {
  const dispatch = useAppDispatch();

  const router = React.useMemo(() => {
    let router;
    const routesMap = getRoutesMap();
    if (routesMap.get(spaceTab?.id)) {
      router = routesMap.get(spaceTab?.id);
    } else {
      router = createTabRouter({
        tabsDictionary,
        store,
        pages,
        memoryRouteParams: getMemoryRouterParams(spaceTab),
      });

      routesMap.set(spaceTab?.id, router);
    }

    return router;
    // updating only when the space tab is changed
  }, [spaceTab?.id]);

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
