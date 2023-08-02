import React from 'react';
import { useAppDispatch } from 'shared/store/hooks';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { RouterState } from '@remix-run/router';

import { handleAppRouteChange } from '../actions/route/handleAppRouteChange';
import { store } from 'shared/store';
import { routeDictionary } from './appRouteDictionary';
import { createRouter } from '../helpers/route';
import { LoadingPage } from './loading/LoadingPage';
import { ErrorPage } from './error/ErrorPage';
import { HomePage } from './home/HomePage';

function getMemoryRouterParams(spaceTab: SpaceTabEntity) {
  return {
    initialEntries: spaceTab.routes,
    initialIndex: spaceTab.routes.length - 1,
  };
}

export const useAppRouter = (spaceTab: SpaceTabEntity) => {
  const dispatch = useAppDispatch();

  const router = React.useMemo(() => {
    const router = createRouter({
      routeDictionary,
      store,
      pages: {
        notFoundPage: <HomePage />,
        errorPage: <ErrorPage />,
        loadingPage: <LoadingPage />,
      },
      memoryRouteParams: getMemoryRouterParams(spaceTab),
    });

    return router;
    // updating only when the space tab is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaceTab?.id]);

  React.useEffect(() => {
    function handleChange(action: RouterState) {
      dispatch(handleAppRouteChange(action));
    }
    // router.revalidate()
    const unsubscribe = router.subscribe(handleChange);

    return unsubscribe;
  }, [router, dispatch]);

  return router;
};
