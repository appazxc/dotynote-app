import React from 'react';
import { useAppDispatch } from 'shared/store/hooks';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { RouterState } from '@remix-run/router';

import { handleAppRouteChange } from 'shared/modules/space/actions/route/handleAppRouteChange';
import { store } from 'shared/store';
import { CreateRouterParams, createTabRouter } from 'shared/modules/space/helpers/createTabRouter';

function getMemoryRouterParams(spaceTab: SpaceTabEntity) {
  return {
    initialEntries: spaceTab.routes,
    initialIndex: spaceTab.routes.length - 1,
  };
}

export const useTabRouter = (
  spaceTab: SpaceTabEntity, 
  tabsDictionary: CreateRouterParams['tabsDictionary'],
  pages: CreateRouterParams['pages'],
) => {
  const dispatch = useAppDispatch();

  const router = React.useMemo(() => {
    const router = createTabRouter({
      tabsDictionary,
      store,
      pages,
      memoryRouteParams: getMemoryRouterParams(spaceTab),
    });

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
        
        callsCount++;
        dispatch(handleAppRouteChange(action));
      };
    }

    const unsubscribe = router.subscribe(handleChange());

    return unsubscribe;
  }, [router, dispatch]);

  return router;
};
